import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/app.store";
import {
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
} from "../category.slice";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { Edit, Trash, Plus } from "lucide-react";

const CategoriesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading } = useSelector((state: RootState) => state.category);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleOpenModal = (category?: any) => {
        if (category) {
            setEditingId(category._id);
            setFormData({ name: category.name, slug: category.slug, description: category.description });
        } else {
            setEditingId(null);
            setFormData({ name: "", slug: "", description: "" });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await dispatch(editCategory({ id: editingId, data: formData }));
        } else {
            await dispatch(addCategory(formData));
        }
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await dispatch(removeCategory(deleteId));
        }
    };

    const columns = [
        { header: "Name", accessorKey: "name" },
        { header: "Slug", accessorKey: "slug" },
        { header: "Description", accessorKey: "description" },
        {
            header: "Actions",
            cell: (row: any) => (
                <div className="flex gap-3">
                    <button onClick={() => handleOpenModal(row)} className="text-secondary hover:text-white transition">
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setDeleteId(row._id);
                            setIsConfirmOpen(true);
                        }}
                        className="text-red-500 hover:text-red-400 transition"
                    >
                        <Trash size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Categories</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    style={{ backgroundColor: "var(--tertiary)" }}
                >
                    <Plus size={20} /> Add Category
                </button>
            </div>

            <DataTable data={categories} columns={columns as any} loading={loading} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Category" : "Add Category"}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input
                            required
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                        style={{ backgroundColor: "var(--primary)", color: "var(--secondary)" }}
                    >
                        {editingId ? "Update" : "Create"}
                    </button>
                </form>
            </Modal>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
            />
        </div>
    );
};

export default CategoriesPage;
