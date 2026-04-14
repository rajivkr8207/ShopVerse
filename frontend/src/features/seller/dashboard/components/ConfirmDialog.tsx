import React from "react";
import Modal from "./Modal";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p className="text-gray-300 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition decoration-none"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition decoration-none"
                >
                    Confirm Delete
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;
