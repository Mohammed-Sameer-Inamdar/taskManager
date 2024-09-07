import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { clearTasks } from "../../store/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
const ConfirmLogout = ({ open, onCancel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(open);

    const handleLogout = () => {
        navigate('/login');
        dispatch(clearTasks());
        dispatch(logout());
    }

    const handleCancel = () => {
        if (onCancel) onCancel();
        setIsOpen(false);
    }

    useEffect(() => {
        setIsOpen(open);
    }, [open])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleCancel} title="Logout" message="Are you sure to logout?" onConfirm={handleLogout} showConfirmButton={true} confirmText="Logout" cancelText="Not now" confirmClass="btn btn-danger" />
        </div>
    )
}
export default ConfirmLogout;