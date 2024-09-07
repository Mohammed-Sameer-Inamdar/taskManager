import { useDispatch, useSelector } from "react-redux"
import { getMessageData, hideMessage } from "../../../store/slices/dialogSlice"
import Modal from "../Modal";
import { useEffect } from "react";

const MessageDialog = () => {
    const dispatch = useDispatch();
    const data = useSelector(getMessageData);
    const { message, type, visible } = data || {}
    const title = type === 'success' ? 'Success' : "Error";

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideMessage());
        }, 3000)
    }, [visible, dispatch])


    return (
        <Modal isOpen={visible} onClose={() => { }} title={title} message={message} dialogType={type} />
    )
}
export default MessageDialog;