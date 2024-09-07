import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTaskStatus } from "../../store/slices/taskSlice";
import { Spinner, UserIcon } from "../../utils/icons";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../store/slices/authSlice";
import ConfirmLogout from "./ConfirmLogout";
const Header = () => {
    const taskStatus = useSelector(getTaskStatus);
    const user = useSelector(loggedInUser);
    const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

    const Loading = () => {
        if (taskStatus !== 'loading')
            return null;

        return <Spinner width={30} height={30} tintColor={'white'} />
    }

    const handleLogout = () => {
        setOpenConfirmLogout(true);
    }

    const onCancelLogout = () => {
        setOpenConfirmLogout(false);
    }

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <header className="Header">
            <h1 className="font-semibold text-xl text-white tracking-tight">Task Manager</h1>
            <div className="flex flex-row items-center">
                <Loading />
                <nav className="nav-header">
                    <Link className="nav-item" to="/task">Add Task</Link>
                    <Link className="nav-item" to="/">All Tasks</Link>
                    <div className="relative group">
                        <div href="" className="bg-transparent nav-item flex items-center" onClick={toggleDropdown}>
                            <UserIcon width={40} height={40} tintColor={'white'} />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute right-0  w-48 bg-white rounded shadow-lg z-10 group-hover:block">
                                <div className="text-black p-2">{user?.userName}</div>
                                <ul className="py-1 m-0 p-0 list-none">
                                    <li><Link className="block p-2 hover:bg-gray-200" onClick={handleLogout}>Logout</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
                <ConfirmLogout open={openConfirmLogout} onCancel={onCancelLogout} />
            </div>
        </header>
    )

}
export default Header;