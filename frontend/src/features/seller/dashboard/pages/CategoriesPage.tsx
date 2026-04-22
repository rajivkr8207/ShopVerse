import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/app.store";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { Edit, Trash, Plus, Search, FolderOpen, Layers } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import useCategory from "../hooks/useCategory";

const CategoriesPage = () => {
    const { categories, loading } = useSelector((s: RootState) => s.category);

    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { handleGetAllCategories, handleUpdateCategory, handleCreateCategory, handleDeleteCategory } = useCategory();
    useEffect(() => {
        handleGetAllCategories();
    }, []);

    const filtered = categories.filter((c) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q);
    });

    const handleOpenModal = (cat?: any) => {
        if (cat) {
            setEditingId(cat._id);
            setFormData({ name: cat.name, description: cat.description || "" });
        } else {
            setEditingId(null);
            setFormData({ name: "", description: "" });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            try {
                await handleUpdateCategory(editingId, formData);
                toast.success("Category updated");
            } catch (err: any) {
                toast.error(err || "Failed to update");
            }
        } else {
            try {
                await handleCreateCategory(formData);
                toast.success("Category created");
            } catch (err: any) {
                toast.error(err || "Failed to create");
            }
        }
        setIsModalOpen(false);
        await handleGetAllCategories();
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await handleDeleteCategory(deleteId);
            toast.success("Category deleted");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Categories
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-3 pl-11 pr-4 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm outline-none placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08)] transition-all duration-200"
                />
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="w-10 h-10 rounded-full border-3 border-white/[0.08] border-t-cyan-400 animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500 gap-4 text-center">
                    <FolderOpen size={48} strokeWidth={1} />
                    <p className="text-sm">No categories found. Click "Add Category" to get started.</p>
                </div>
            ) : (
                /* Category Grid */
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" layout>
                    <AnimatePresence>
                        {filtered.map((cat) => (
                            <motion.div
                                key={cat._id}
                                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:border-cyan-400/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300"
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Icon */}
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/15 border border-cyan-400/10 flex items-center justify-center mb-4">
                                    <Layers size={20} className="text-cyan-400" />
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-semibold text-gray-100 mb-1.5 truncate">
                                    {cat.name}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                    {cat.description || "No description provided"}
                                </p>

                                {/* Slug */}
                                {cat.slug && (
                                    <span className="inline-block mt-3 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.06] text-[0.68rem] text-gray-400 font-mono">
                                        /{cat.slug}
                                    </span>
                                )}

                                {/* Actions */}
                                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                        onClick={() => handleOpenModal(cat)}
                                        className="w-8 h-8 rounded-lg bg-blue-500/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-500/95 transition-all duration-200 cursor-pointer"
                                        title="Edit"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => { setDeleteId(cat._id); setIsConfirmOpen(true); }}
                                        className="w-8 h-8 rounded-lg bg-red-500/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/95 transition-all duration-200 cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Add / Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Category" : "Add Category"}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Electronics"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm outline-none placeholder:text-gray-600 focus:border-cyan-400/40 focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08)] transition-all duration-200"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Describe this category..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm outline-none placeholder:text-gray-600 focus:border-cyan-400/40 focus:shadow-[0_0_0_3px_rgba(0,229,255,0.08)] transition-all duration-200 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 hover:shadow-[0_4px_20px_rgba(0,229,255,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none transition-all duration-200 cursor-pointer mt-1"
                    >
                        {editingId ? "Update Category" : "Create Category"}
                    </button>
                </form>
            </Modal>

            {/* Delete Confirm */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? Products linked to it may be affected."
            />
        </div>
    );
};

export default CategoriesPage;
