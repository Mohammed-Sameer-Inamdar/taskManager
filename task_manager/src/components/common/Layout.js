import { Outlet } from "react-router-dom"
import MessageDialog from "./MessageDialog";

const Layout = () => {
    return (
        <div className="App">
            <Outlet />
            <MessageDialog />
        </div>
    )
}

export default Layout;