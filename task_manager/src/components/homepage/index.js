import React, {  useEffect, useState } from "react";
import { Spinner } from "../../utils/icons";
import TaskView from "./TaskView";
import { useDispatch, useSelector } from "react-redux";
import { taskById, taskIds } from "../../store/slices/taskSlice";
import { deleteTaskApi, fetchTasksApi, updateTaskPosition } from "../../store/apis/taskApi";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { store } from '../../store'

const HomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allTasksIds = useSelector(taskIds);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchTasksApi());
    }, [dispatch])


    const confirmTaskDelete = (taskId) => {
        setIsDeleteOpen(true);
        setSelectedTaskId(taskId);
    }

    const handleTaskDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await dispatch(deleteTaskApi(selectedTaskId)).unwrap();
        } catch (err) {
            console.log(err);
        } finally {
            setIsDeleteLoading(false);
            setIsDeleteOpen(false);
            setSelectedTaskId(null)
        }
    }

    const handleOnDragEnd = async (result) => {

        try {

            if (!result.destination) return;

            const toIndex = result.destination.index;
            const idAt = allTasksIds.at(toIndex);

            const id = result.draggableId;

            const task = taskById(store.getState(), idAt);
            const toPosition = task?.position;
            await dispatch(updateTaskPosition({ id, toPosition })).unwrap();
        } catch (err) {
            console.log('handleOnDragEnd', err);
        }
    }

    const RenderTasks = () => {
        return !allTasksIds || allTasksIds.length === 0 ?
            (<div className="flex items-center justify-center">
                <p className="card max-w-sm w-11/12 md:w-2/3 text-center">
                    No tasks found
                </p>
            </div>)
            :
            (<DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) =>
                    (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {allTasksIds.map((taskId, index) =>
                            (
                                <Draggable key={taskId} draggableId={taskId} index={index}>
                                    {((provided) =>
                                    (
                                        <TaskView ref={provided.innerRef} key={taskId} taskId={taskId} confirmTaskDelete={confirmTaskDelete} {...provided.draggableProps}
                                            {...provided.dragHandleProps} />
                                    ))}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>)
    }

    return (
        <div>
            <div className="min-h-full flex flex-col items-center p-2">
                <button className="btn btn-primary mt-4 px-4 py-2 text-white" onClick={() => navigate('/task')}>Add task</button>
            </div>
            <RenderTasks />
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title={'Confirm delete task'}
                message={'Are you sure you want to delete this task?'}
                onConfirm={handleTaskDelete}
                cancelText={'No'}
                confirmText={'Yes'}
                showConfirmButton={true}
                confirmClass="btn btn-danger"
                Loader={isDeleteLoading ? <Spinner tintColor={'white'} /> : null}
            />

        </div>
    )
}
export default HomePage;
