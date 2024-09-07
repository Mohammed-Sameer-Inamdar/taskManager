import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { taskById } from "../../store/slices/taskSlice";
import { DragIcon, TrashIcon } from "../../utils/icons";
import { updateTaskApi } from "../../store/apis/taskApi";

const TaskView = forwardRef(({ taskId, confirmTaskDelete, ...props }, ref) => {

    const dispatch = useDispatch();
    const task = useSelector(state => taskById(state, taskId));

    const updateTaskStatus = async () => {
        try {
            const { status, ...rest } = task;
            await dispatch(updateTaskApi({ status: !status, ...rest })).unwrap();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div ref={ref} className="flex items-center justify-center" {...props}>
            <div className="card max-w-sm w-11/12 md:w-2/3 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                    <DragIcon />
                    <input checked={task?.status} type="checkbox" onChange={updateTaskStatus} className="w-5 h-5 border-0 hover:text-primary" />
                    <Link className={`col-span-2 card-title  text-black no-underline hover:text-primary ${task?.status ? '!line-through' : ''}`} to={`task/${task?.id}`}>{task?.title}</Link>
                </div>
                <button className="flex btn btn-danger card-action" onClick={() => { confirmTaskDelete(taskId) }}><TrashIcon tintColor={'white'} /></button>
            </div>

        </div>
    )
})
export default TaskView;