import React from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl shadow-xl overflow-hidden p-6 text-white" style={{ backgroundColor: "var(--secondary)" }}>
                <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-neutral-800 transition text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
