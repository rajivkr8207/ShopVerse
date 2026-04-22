import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/app.store";
import Navbar from "../components/Navbar";
import { useCart } from "../hooks/useCart";
import { Loader2, ArrowLeft, ShoppingCart, Check } from "lucide-react";
import type { IProduct, IProductVariant } from "../../../seller/dashboard/types/seller.type";
import useProduct from "../../../seller/dashboard/hooks/useProduct";
import useVariant from "../../../seller/dashboard/hooks/useVariant";

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { handleAddToCart } = useCart();
    const { handleGetProductById } = useProduct();
    const { handleGetAllVariants } = useVariant();

    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);

    const variants = useSelector((state: RootState) => state.productVariant.variants).filter(
        (v) => (typeof v.productId === 'string' ? v.productId === id : v.productId._id === id)
    );

    useEffect(() => {
        const loadProduct = async () => {
            try {
                if (id) {
                    const data = await handleGetProductById(id);
                    setProduct(data);
                    await handleGetAllVariants();
                }
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id, handleGetProductById, handleGetAllVariants]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-4">Product not found</h1>
                <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-600 rounded-lg">Back to Home</button>
            </div>
        );
    }

    const currentPrice = selectedVariant?.price || product.basePrice || 0;
    const currentImages = selectedVariant?.images?.length ? selectedVariant.images : (product.images || []);

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-20">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 mt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-neutral-400 hover:text-white transition mb-8"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
                            <img
                                src={currentImages[0]?.url || "https://placehold.co/600x600/262626/white?text=No+Image"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {currentImages.slice(1, 5).map((img, i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer hover:border-blue-500 transition">
                                    <img src={img.thumbnailUrl} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <span className="text-blue-500 font-medium tracking-wider uppercase text-sm mb-2">{product.brand}</span>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">{product.description}</p>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-5xl font-bold text-white">₹{currentPrice}</span>
                            {selectedVariant?.discountPrice && (
                                <span className="text-2xl text-neutral-500 line-through">₹{selectedVariant.price}</span>
                            )}
                        </div>

                        {/* Variants */}
                        {variants.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-neutral-400 mb-4uppercase tracking-wider mb-4">Select Variant</h3>
                                <div className="flex flex-wrap gap-4">
                                    {variants.map((variant) => (
                                        <button
                                            key={variant._id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-3 rounded-xl border flex flex-col items-center min-w-[100px] transition ${selectedVariant?._id === variant._id
                                                ? "border-blue-500 bg-blue-500/10"
                                                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
                                                }`}
                                        >
                                            <span className="text-sm font-bold">{variant.size}</span>
                                            <span className="text-xs text-neutral-400">{variant.color}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity & Add to Cart */}
                        <div className="mt-auto flex gap-4">
                            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-2">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-blue-500">-</button>
                                <span className="w-12 text-center font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-blue-500">+</button>
                            </div>

                            <button
                                onClick={() => handleAddToCart(product._id, selectedVariant?._id, quantity)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition transform active:scale-95 shadow-lg shadow-blue-900/20"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Benefits/Badges */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                                <div className="p-2 bg-green-500/10 rounded-lg"><Check className="w-5 h-5 text-green-500" /></div>
                                <span className="text-sm text-neutral-300">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-neutral-900/50 rounded-2xl border border-neutral-800/50">
                                <div className="p-2 bg-green-500/10 rounded-lg"><Check className="w-5 h-5 text-green-500" /></div>
                                <span className="text-sm text-neutral-300">Original Product</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
