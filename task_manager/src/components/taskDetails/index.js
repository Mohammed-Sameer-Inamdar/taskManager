import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import CustomInput from "../common/CustomInput";
import { Spinner } from "../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { taskById } from "../../store/slices/taskSlice";
import { createTaskApi, deleteTaskApi, updateTaskApi } from "../../store/apis/taskApi";
import Modal from "../common/Modal";

const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const taskData = useSelector(state => taskById(state, id));
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [taskStatus, setTaskStatus] = useState(false);

    const [addUpdateLoading, setAddUpdateLoading] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value.split('T')[0]);
    const handleStatusChange = (e) => setTaskStatus(!taskStatus);

    useEffect(() => {
        if (id && taskData) {

            setTitle(taskData.title);
            setDescription(taskData.description);
            setTaskStatus(taskData.status);
            if (taskData.endDate)
                setEndDate(new Date(taskData.endDate).toISOString().split('T')[0]);
        }
    }, [id, taskData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!title) {
                setTitleError('Title is required');
                return;
            }
            setAddUpdateLoading(true);
            const taskData = { title, description, endDate, status: taskStatus };
            if (id)
                await dispatch(updateTaskApi({ id, ...taskData })).unwrap();
            else
                await dispatch(createTaskApi(taskData)).unwrap();

            navigate('/');
        } catch (err) {
            console.log(err);
        } finally {
            setAddUpdateLoading(false);
        }
    }
    const handleDeleteClick = async () => {
        setIsDeleteOpen(true);
    }

    const onConfirmDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await dispatch(deleteTaskApi(id)).unwrap();
            navigate('/');
        } catch (err) {
            console.log(err);
        } finally {
            setIsDeleteLoading(false);
            setIsDeleteOpen(false);
        }
    }

    return (
        <div className='flex justify-center'>
            <section className='container'>
                <div className="p-5 w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='sm:mx-auto sm:w-full sm:mx-w-sm flex flex-col justify-center items-center'>
                        <h1 className='text-center text-2xl font-bold leading-9 tracking-tight text-grey-900'>Task</h1>
                    </div>
                    <div className='mt-10 sm:w-full'>

                        <form className='space-y-6' onSubmit={handleSubmit}>
                            <CustomInput label="Title" labelClass="required" errorMessage={titleError} id="title" name="title" value={title} onChange={handleTitleChange} />
                            <CustomInput label="Description" type="textarea" id="description" name="description" value={description} onChange={handleDescriptionChange} />
                            <CustomInput label="End Date" id="endDate" name="endDate" type="date" value={endDate} onChange={handleEndDateChange} />
                            <CustomInput label="Status" id="status" name="status" type="checkbox" checked={taskStatus} onChange={handleStatusChange} />
                            <div className="flex flex-row justify-center">
                                <button type="submit" className="btn btn-primary mr-2" disabled={addUpdateLoading}>Save {addUpdateLoading && <Spinner />}</button>
                                {id && <button type="button" onClick={handleDeleteClick} className="btn btn-danger" disabled={isDeleteLoading}>Delete</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title={'Confirm delete task'}
                message={'Are you sure you want to delete this task?'}
                onConfirm={onConfirmDelete}
                cancelText={'No'}
                confirmText={'Yes'}
                showConfirmButton={true}
                confirmClass="btn btn-danger"
                isLoading={isDeleteLoading}
            />
        </div>
    )
}
export default TaskDetailsPage;
