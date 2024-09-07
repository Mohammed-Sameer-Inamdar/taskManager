import mongoose from "mongoose";
import { sendResponse } from "../utils/helper.js";
import Task from "./Task.js"

const getTasks = async ({ match = {} }) => {
    return await Task.aggregate([
        { $match: match },
        {
            $lookup: {
                localField: 'user',
                foreignField: '_id',
                from: 'users',
                as: 'userDoc',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            userName: 1,
                        }
                    }
                ]
            }
        },
        { $unwind: '$userDoc' },
        {
            $project: {
                id: "$_id",
                _id: 0,
                status: 1,
                title: 1,
                description: 1,
                endDate: 1,
                position: 1,
                user: '$userDoc'
            }
        },
        { $sort: { position: -1 } }
    ]);
}

export const tasksList = async (req, res) => {
    const userId = req.user.userId;
    const taskList = await getTasks({ match: { user: new mongoose.Types.ObjectId(userId) } });
    return sendResponse(res, 200, 'Searching successful', taskList);
}

export const saveTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const { title, description, status, endDate } = req.body;
    if (!title) return sendResponse(res, 400, 'Title is required');

    let savedTask;
    if (id) {
        savedTask = await Task.findByIdAndUpdate(id, { title, description, status, endDate }, { new: true });
    } else {
        const position = await Task.countDocuments() + 1;
        savedTask = await Task.create({ title, description, user: userId, position });
    }
    const populatedTask = await Task.populate(savedTask, {
        path: 'user',
        select: '_id userName email'
    });
    return sendResponse(res, 200, 'Task saved successfully', populatedTask);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!id) return sendResponse(res, 400, 'Task id is required');
    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
        await Task.updateMany({ position: { $gt: deletedTask.position }, user: deletedTask.user }, { $inc: { position: -1 } });
        checkAndUpdatePositions(deleteTask.user);
    }

    const taskList = await getTasks({ match: { user: deletedTask.user } });
    return sendResponse(res, 200, 'Deleted successfully', { deletedId: id, tasks: taskList });
}

export const updateTaskPosition = async (req, res) => {
    const { id } = req.params;
    const { toPosition, toPositionId } = req.body;
    if (!id) return sendResponse(res, 400, 'Task id is required');

    const updatedTask = await Task.findById(id);
    if (!updatedTask) return sendResponse(res, 200, 'Task already deleted');
    const fromPosition = updatedTask.position;

    if (toPosition > fromPosition) {
        await Task.updateMany({ position: { $gt: fromPosition, $lte: toPosition } }, { $inc: { position: -1 } });
    } else if (toPosition < fromPosition) {
        await Task.updateMany({ position: { $lt: fromPosition, $gte: toPosition } }, { $inc: { position: 1 } });
    }
    updatedTask.position = toPosition;
    await updatedTask.save();
    checkAndUpdatePositions(updatedTask.user);

    const taskList = await getTasks({ match: { user: updatedTask.user } });

    return sendResponse(res, 200, 'Updated successfully', taskList);
}

const checkAndUpdatePositions = async (userId) => {
    const tasks = await Task.find({ user: userId }).sort({ position: 1 });
    tasks.forEach((task, index) => {
        if (task.position !== index) {
            task.position = index;
            task.save();
        }
    });
}
