import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/app.store";
import { fetchProducts, addProduct, editProduct, removeProduct } from "../product.slice";
import { fetchCategories } from "../category.slice";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { Edit, Trash, Plus } from "lucide-react";
import { toast } from "react-toastify";

const ProductsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: RootState) => state.product);
    const { categories } = useSelector((state: RootState) => state.category);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        brand: "",
        category: "",
        basePrice: "",
    });
    const [images, setImages] = useState<FileList | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleOpenModal = (product?: any) => {
        if (product) {
            setEditingId(product._id);
            setFormData({
                name: product.name,
                description: product.description,
                brand: product.brand,
                category: product.category._id || product.category,
                basePrice: product.basePrice || "",
            });
        } else {
            setEditingId(null);
            setFormData({ name: "", description: "", brand: "", category: "", basePrice: "" });
        }
        setImages(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fData = new FormData();
        fData.append("name", formData.name);
        fData.append("description", formData.description);
        fData.append("brand", formData.brand);
        fData.append("category", formData.category);
        fData.append("basePrice", formData.basePrice.toString());
        if (images) {
            for (let i = 0; i < images.length; i++) {
                fData.append("images", images[i]);
            }
        }
        if (editingId) {
            await dispatch(editProduct({ id: editingId, data: fData as any }));
            toast.success("Product updated successfully");
        } else {
            try {
                await dispatch(addProduct(fData as any)).unwrap();
                toast.success("Product added successfully");
            } catch (err: any) {
                toast.error(err || "Failed to add product");
            }
        }
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await dispatch(removeProduct(deleteId));
            toast.success("Product deleted");
        }
    };

    const columns = [
        { header: "Name", accessorKey: "name" },
        { header: "Brand", accessorKey: "brand" },
        { header: "Category", cell: (row: any) => row.category?.name || "N/A" },
        {
            header: "Actions",
            cell: (row: any) => (
                <div className="flex gap-3">
                    <button onClick={() => handleOpenModal(row)} className="text-blue-400 hover:text-blue-300 transition">
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
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    style={{ backgroundColor: "var(--tertiary)" }}
                >
                    <Plus size={20} /> Add Product
                </button>
            </div>

            <DataTable data={products} columns={columns as any} loading={loading} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Product" : "Add Product"}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Brand</label>
                            <input required type="text" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Base Price</label>
                            <input required type="number" min="0" value={formData.basePrice} onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                    </div>

                    {!editingId && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Images (Max 4)</label>
                            <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} className="w-full p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white" />
                        </div>
                    )}


                    <button type="submit"
                        disabled={loading}
                        className="mt-4 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition" style={{ backgroundColor: "var(--primary)", color: "var(--secondary)" }}>
                        {editingId ? "Update Product" : "Create Product"}
                    </button>
                </form>
            </Modal>

            <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Delete Product" message="Are you sure you want to delete this product? This action cannot be undone." />
        </div>
    );
};

export default ProductsPage;
