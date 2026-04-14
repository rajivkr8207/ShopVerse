import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/app.store";
import { fetchVariants, addVariant, editVariant, removeVariant } from "../productVariant.slice";
import { fetchProducts } from "../product.slice";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { Edit, Trash, Plus } from "lucide-react";
import { toast } from "react-toastify";

const ProductVariantsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { variants, loading } = useSelector((state: RootState) => state.productVariant);
    const { products } = useSelector((state: RootState) => state.product);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        productId: "",
        size: "M",
        color: "",
        stock: 0,
        price: "",
        sku: "",
    });

    useEffect(() => {
        dispatch(fetchVariants());
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOpenModal = (variant?: any) => {
        if (variant) {
            setEditingId(variant._id);
            setFormData({
                productId: variant.productId._id || variant.productId,
                size: variant.size,
                color: variant.color,
                stock: variant.stock,
                price: variant.price || "",
                sku: variant.sku,
            });
        } else {
            setEditingId(null);
            setFormData({ productId: "", size: "M", color: "", stock: 0, price: "", sku: "" });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload: any = { ...formData };
        if (payload.price === "") delete payload.price;

        if (editingId) {
            await dispatch(editVariant({ id: editingId, data: payload }));
            toast.success("Variant updated");
        } else {
            try {
                await dispatch(addVariant(payload)).unwrap();
                toast.success("Variant added");
            } catch (error: any) {
                toast.error(error);
            }
        }
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (deleteId) {
            await dispatch(removeVariant(deleteId));
            toast.success("Variant deleted");
        }
    };

    const columns = [
        { header: "Product", cell: (row: any) => products.find(p => p._id === (row.productId._id || row.productId))?.name || "Unknown" },
        { header: "SKU", accessorKey: "sku" },
        { header: "Color", accessorKey: "color" },
        { header: "Size", accessorKey: "size" },
        { header: "Stock", accessorKey: "stock" },
        { header: "Override Price", cell: (row: any) => row.price ? `$${row.price}` : "-" },
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
                <h1 className="text-2xl font-bold">Product Variants</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    style={{ backgroundColor: "var(--tertiary)" }}
                >
                    <Plus size={20} /> Add Variant
                </button>
            </div>

            <DataTable data={variants} columns={columns as any} loading={loading} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Variant" : "Add Variant"}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product</label>
                        <select required value={formData.productId} onChange={(e) => setFormData({ ...formData, productId: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
                            <option value="">Select Product</option>
                            {products.map((p) => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">SKU</label>
                            <input required type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Color</label>
                            <input required type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Size</label>
                            <select value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white">
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input required type="number" min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Override Price (Optional)</label>
                        <input type="number" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white" />
                    </div>

                    <button type="submit" className="mt-4 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 rounded-lg transition" style={{ backgroundColor: "var(--primary)", color: "var(--secondary)" }}>
                        {editingId ? "Update Variant" : "Create Variant"}
                    </button>
                </form>
            </Modal>

            <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Delete Variant" message="Are you sure you want to delete this variant? This action cannot be undone." />
        </div>
    );
};

export default ProductVariantsPage;
