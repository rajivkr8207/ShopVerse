import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/app.store";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import {
    Edit, Trash, Plus, Search, ImagePlus,
    ChevronRight, Layers, X, Check, ArrowRight,
    ArrowLeft, ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { IProduct, IProductVariant } from "../types/seller.type";
import useCategory from "../hooks/useCategory";
import useProduct from "../hooks/useProduct";
import useVariant from "../hooks/useVariant";

const COLOR_PRESETS = [
    { name: "Black", hex: "#1a1a1a" }, { name: "White", hex: "#f5f5f5" },
    { name: "Red", hex: "#ef4444" }, { name: "Blue", hex: "#3b82f6" },
    { name: "Green", hex: "#22c55e" }, { name: "Yellow", hex: "#eab308" },
    { name: "Purple", hex: "#a855f7" }, { name: "Orange", hex: "#f97316" },
    { name: "Pink", hex: "#ec4899" }, { name: "Gray", hex: "#6b7280" },
];
const SIZES: IProductVariant["size"][] = ["S", "M", "L", "XL", "XXL"];

const ProductsPage = () => {
    // Hooks
    const { products, loading: productLoading } = useSelector((s: RootState) => s.product);
    const { variants, loading: variantLoading } = useSelector((s: RootState) => s.productVariant);
    const { categories } = useSelector((s: RootState) => s.category);

    const { handleGetAllProducts, handleCreateProduct, handleUpdateProduct, handleDeleteProduct } = useProduct();
    const { handleGetAllVariants, handleCreateVariant, handleDeleteVariant } = useVariant();
    const { handleGetAllCategories } = useCategory();

    // Local State
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState<"product" | "variants">("product");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);

    // Form State - Product
    const [productFormData, setProductFormData] = useState({
        title: "", description: "", brand: "", category: "", price: "",
    });
    const [productImages, setProductImages] = useState<FileList | null>(null);

    // Form State - Variant
    const [variantFormData, setVariantFormData] = useState({
        size: "M" as IProductVariant["size"],
        color: "Black",
        stock: "",
        price: "",
        discountPrice: "",
        sku: "",
    });

    // Confirmation State
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleteType, setDeleteType] = useState<"product" | "variant">("product");

    // Fetch Data
    useEffect(() => {
        handleGetAllProducts();
        handleGetAllCategories();
        handleGetAllVariants();
    }, []);

    // Filtered Products
    const filteredProducts = useMemo(() => {
        if (!search.trim()) return products;
        const q = search.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
        );
    }, [products, search]);

    // Helpers
    const getProductVariants = (pid: string) =>
        variants.filter(v => {
            const id = typeof v.productId === "object" ? (v.productId as IProduct)._id : v.productId;
            return id === pid;
        });

    const getColorHex = (name: string) =>
        COLOR_PRESETS.find(c => c.name === name)?.hex || name;

    // Handlers - Product
    const openAddProductModal = () => {
        setEditingId(null);
        setCurrentProductId(null);
        setProductFormData({ title: "", description: "", category: "", price: "" });
        setProductImages(null);
        setModalStep("product");
        setIsModalOpen(true);
    };

    const openEditProductModal = (product: IProduct) => {
        setEditingId(product._id);
        setCurrentProductId(product._id);
        setProductFormData({
            title: product.title,
            description: product.description,
            category: typeof product.category === "object" ? (product.category as any)._id : product.category,
            price: product.price?.toString() || "",
        });
        setProductImages(null);
        setModalStep("product");
        setIsModalOpen(true);
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const fData = new FormData();
        Object.entries(productFormData).forEach(([key, value]) => fData.append(key, value));
        if (productImages) {
            for (let i = 0; i < productImages.length; i++) fData.append("images", productImages[i]);
        }

        try {
            let result;
            if (editingId) {
                result = await handleUpdateProduct(editingId, fData);
            } else {
                result = await handleCreateProduct(fData);
            }
            if (result) {
                setCurrentProductId(result._id);
                setModalStep("variants");
            }
        } catch (error) {
            // Error handled in hook
        }
    };

    // Handlers - Variant
    const handleVariantSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProductId) return;

        const payload = {
            ...variantFormData,
            productId: currentProductId,
            stock: Number(variantFormData.stock),
            price: variantFormData.price ? Number(variantFormData.price) : undefined,
            discountPrice: variantFormData.discountPrice ? Number(variantFormData.discountPrice) : undefined,
        };

        try {
            await handleCreateVariant(payload);
            setVariantFormData({ size: "M", color: "Black", stock: "", price: "", discountPrice: "", sku: "" });
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        if (deleteType === "product") {
            await handleDeleteProduct(deleteId);
        } else {
            await handleDeleteVariant(deleteId);
        }
        setIsConfirmOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                        Inventory Management
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your products and their variants with ease.</p>
                </div>
                <button
                    onClick={openAddProductModal}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all"
                >
                    <Plus size={20} /> Add New Product
                </button>
            </div>

            {/* Search & Stats Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl">
                <div className="relative flex-1 w-full">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name, brand or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/[0.08] rounded-xl text-white text-sm focus:border-cyan-400/50 outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-6 px-4 py-2 border-l border-white/[0.08] hidden sm:flex">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Products</p>
                        <p className="text-xl font-bold text-white">{products.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Variants</p>
                        <p className="text-xl font-bold text-white">{variants.length}</p>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {productLoading && products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Loading your catalog...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-dashed border-white/[0.08] rounded-3xl">
                    <ShoppingBag size={64} strokeWidth={1} className="text-gray-700 mb-4" />
                    <p className="text-gray-400 text-lg font-medium">No products found</p>
                    <button onClick={openAddProductModal} className="mt-4 text-cyan-400 font-bold hover:underline">Add your first product</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => {
                            const pVariants = getProductVariants(product._id);
                            const mainImg = product.images?.[0]?.url || product.images?.[0]?.thumbnailUrl;

                            return (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group flex flex-col bg-white/[0.03] border border-white/[0.06] rounded-[2rem] overflow-hidden hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
                                >
                                    {/* Product Image & Info */}
                                    <div className="relative h-64 w-full bg-black/40 overflow-hidden">
                                        {mainImg ? (
                                            <img src={mainImg} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-700 bg-black/20">
                                                <ImagePlus size={48} strokeWidth={1} />
                                                <span className="text-xs font-bold uppercase mt-2">No Image</span>
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-tighter text-cyan-400 border border-cyan-400/30">
                                                {product.brand}
                                            </span>
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-tighter text-white/70 border border-white/10">
                                                {typeof product.category === 'object' ? (product.category as any).name : 'Uncategorized'}
                                            </span>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                            <button
                                                onClick={() => openEditProductModal(product)}
                                                className="p-3 bg-white/10 hover:bg-cyan-500 backdrop-blur-xl rounded-2xl text-white transition-all shadow-xl"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => { setDeleteId(product._id); setDeleteType("product"); setIsConfirmOpen(true); }}
                                                className="p-3 bg-white/10 hover:bg-red-500 backdrop-blur-xl rounded-2xl text-white transition-all shadow-xl"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                            <h3 className="text-xl font-bold text-white leading-tight truncate">{product.name}</h3>
                                            <p className="text-cyan-400 font-black text-lg">₹{product.basePrice || '---'}</p>
                                        </div>
                                    </div>

                                    {/* Variants Preview */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Live Variants</span>
                                                <span className="text-[10px] font-black px-2 py-0.5 bg-white/5 rounded-full text-gray-400">{pVariants.length}</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {pVariants.length > 0 ? (
                                                    pVariants.slice(0, 4).map(v => (
                                                        <div key={v._id} className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getColorHex(v.color) }} />
                                                            <span className="text-[10px] font-bold text-gray-300">{v.size}</span>
                                                            <span className={`text-[10px] font-black ${v.stock < 5 ? 'text-red-400' : 'text-green-500'}`}>{v.stock}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-gray-600 italic">No variants active</p>
                                                )}
                                                {pVariants.length > 4 && (
                                                    <div className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-gray-500">
                                                        +{pVariants.length - 4} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setCurrentProductId(product._id);
                                                setEditingId(product._id);
                                                setModalStep("variants");
                                                setIsModalOpen(true);
                                            }}
                                            className="w-full mt-6 py-3 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-xs font-bold text-gray-300 transition-all group/btn"
                                        >
                                            Manage Inventory <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            {/* Step-based CRUD Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalStep === "product" ? (editingId ? "Refine Product" : "Launch Product") : "Inventory Config"}
                size={modalStep === "product" ? "lg" : "xl"}
            >
                <div className="flex flex-col h-full max-h-[85vh]">
                    {/* Stepper Header */}
                    <div className="flex items-center gap-4 mb-8 px-2">
                        <div className={`flex items-center gap-2 ${modalStep === 'product' ? 'text-cyan-400' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${modalStep === 'product' ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700'}`}>1</div>
                            <span className="text-xs font-black uppercase tracking-widest">General Info</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-800 rounded-full" />
                        <div className={`flex items-center gap-2 ${modalStep === 'variants' ? 'text-cyan-400' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${modalStep === 'variants' ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700'}`}>2</div>
                            <span className="text-xs font-black uppercase tracking-widest">Variants</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
                        {modalStep === "product" ? (
                            <form id="productForm" onSubmit={handleProductSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Product Name</label>
                                        <input
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400/50 transition-all"
                                            placeholder="e.g. Urban Edge Oversized Hoodie"
                                            value={productFormData.title}
                                            onChange={(e) => setProductFormData({ ...productFormData, title: e.target.value })}
                                        />
                                    </div>
                                    {/* <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Brand Name</label>
                                        <input 
                                            required 
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400/50 transition-all"
                                            placeholder="e.g. ShopVerse Originals"
                                            value={productFormData.brand}
                                            onChange={(e) => setProductFormData({...productFormData, brand: e.target.value})}
                                        />
                                    </div> */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Market Category</label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400/50 transition-all appearance-none"
                                            value={productFormData.category}
                                            onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                                        >
                                            <option value="" className="bg-gray-900">Select Category</option>
                                            {categories.map(c => <option key={c._id} value={c._id} className="bg-gray-900">{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Base Price (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-bold">₹</span>
                                            <input
                                                required
                                                type="number"
                                                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400/50 transition-all"
                                                placeholder="999"
                                                value={productFormData.price}
                                                onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Story / Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-400/50 transition-all resize-none"
                                        placeholder="Tell the story of your product..."
                                        value={productFormData.description}
                                        onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Visual Assets (Max 5)</label>
                                    <div
                                        onClick={() => document.getElementById('img-input')?.click()}
                                        className="relative group/upload border-2 border-dashed border-white/10 rounded-[2rem] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-cyan-400/30 transition-all"
                                    >
                                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover/upload:scale-110 group-hover/upload:text-cyan-400 transition-all">
                                            <ImagePlus size={32} />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className="text-sm font-bold text-gray-200">
                                                {productImages ? `${productImages.length} files selected` : "Drop product imagery here"}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG or WebP up to 5MB</p>
                                        </div>
                                        <input id="img-input" type="file" multiple className="hidden" onChange={(e) => setProductImages(e.target.files)} />
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Variant Quick Add */}
                                <form onSubmit={handleVariantSubmit} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Layers size={18} className="text-cyan-400" />
                                        <h4 className="text-sm font-black uppercase tracking-widest">New Variant Config</h4>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Size Scale</label>
                                            <select
                                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white text-sm outline-none appearance-none"
                                                value={variantFormData.size}
                                                onChange={(e) => setVariantFormData({ ...variantFormData, size: e.target.value as any })}
                                            >
                                                {SIZES.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Units in Stock</label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white text-sm outline-none"
                                                placeholder="0"
                                                value={variantFormData.stock}
                                                onChange={(e) => setVariantFormData({ ...variantFormData, stock: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Unique SKU</label>
                                            <input
                                                required
                                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white text-sm outline-none"
                                                placeholder="SKU-XXXX"
                                                value={variantFormData.sku}
                                                onChange={(e) => setVariantFormData({ ...variantFormData, sku: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Select Hue / Color</label>
                                        <div className="flex flex-wrap gap-3">
                                            {COLOR_PRESETS.map(c => (
                                                <button
                                                    key={c.name}
                                                    type="button"
                                                    onClick={() => setVariantFormData({ ...variantFormData, color: c.name })}
                                                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${variantFormData.color === c.name ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-500/20' : 'border-transparent hover:scale-105'}`}
                                                >
                                                    <div className="w-full h-full rounded-full" style={{ backgroundColor: c.hex }} title={c.name} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={variantLoading}
                                        className="w-full py-4 bg-cyan-400 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-300 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        {variantLoading ? <div className="w-4 h-4 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin" /> : <Plus size={18} />}
                                        Inject Variant
                                    </button>
                                </form>

                                {/* Variants List */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Current Inventory Mix</h4>
                                        <span className="text-[10px] font-bold text-cyan-400">{currentProductId ? getProductVariants(currentProductId).length : 0} Total</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-6">
                                        {currentProductId && getProductVariants(currentProductId).map(v => (
                                            <div key={v._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors group/v">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center relative overflow-hidden">
                                                        <div className="absolute inset-0 opacity-20" style={{ backgroundColor: getColorHex(v.color) }} />
                                                        <span className="text-sm font-black text-white relative z-10">{v.size}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-black text-gray-200 uppercase tracking-tight">{v.color}</p>
                                                        <p className="text-[10px] font-bold text-gray-500">{v.sku}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Stock</p>
                                                        <p className={`text-sm font-black ${v.stock < 5 ? 'text-red-400' : 'text-cyan-400'}`}>{v.stock}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => { setDeleteId(v._id); setDeleteType("variant"); setIsConfirmOpen(true); }}
                                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modal Footer Controls */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        {modalStep === "variants" ? (
                            <button
                                onClick={() => setModalStep("product")}
                                className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={18} /> Back to Details
                            </button>
                        ) : (
                            <div />
                        )}

                        {modalStep === "product" ? (
                            <button
                                form="productForm"
                                type="submit"
                                disabled={productLoading}
                                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95"
                            >
                                {productLoading ? "Syncing..." : (editingId ? "Update & Next" : "Deploy & Next")}
                                <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95"
                            >
                                <Check size={18} /> Finish Config
                            </button>
                        )}
                    </div>
                </div>
            </Modal>

            {/* Global Deletion Confirmation */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title={deleteType === "product" ? "Decommission Product" : "Erase Variant"}
                message={deleteType === "product"
                    ? "Are you sure? This will permanently erase this product and all associated inventory configurations from the cloud."
                    : "This variant will be removed from your active stock list. This action cannot be reversed."
                }
            />
        </div>
    );
};

export default ProductsPage;
