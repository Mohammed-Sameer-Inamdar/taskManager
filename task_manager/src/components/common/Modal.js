import React from 'react';
import { CheckIcon, ErrorIcon, Spinner } from '../../utils/icons';

const Icon = ({ type }) => {
    switch (type) {
        case 'success':
            return <CheckIcon width={60} height={60} />
        case 'error':
            return <ErrorIcon  width={60} height={60}/>
        default:
            return null

    }
}
const Modal = ({ isOpen, onClose, dialogType, title, message, onConfirm, showConfirmButton = false, confirmText = "Confirm", cancelText = "Cancel", confirmClass = "btn btn-primary", cancelClass = "btn btn-secondary", isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white shadow-lg max-w-sm w-full mx-2 p-5">
                <div className='w-full text-center'><Icon type={dialogType} /></div>
                <div className="text-lg font-semibold text-gray-800 text-center ">{title}</div>
                <div className="mt-4 text-gray-600 w-full">{message}</div>
                <div className="mt-6 flex justify-end space-x-3">
                    {showConfirmButton && (<button
                        className={cancelClass}
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    )}
                    {showConfirmButton && (
                        <button
                            disabled={isLoading}
                            className={confirmClass}
                            onClick={onConfirm}
                        >
                            {confirmText}
                            {isLoading && <Spinner width={20} height={20} tintColor={'white'} />}
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Modal;