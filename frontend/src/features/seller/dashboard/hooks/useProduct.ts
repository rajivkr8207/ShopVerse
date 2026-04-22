import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { productService } from '../services/product.service';
import { 
    setProducts, 
    addProduct, 
    updateProduct, 
    removeProduct, 
    setLoading, 
    setError 
} from '../product.slice';

const useProduct = () => {
    const dispatch = useDispatch();

    const handleGetAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response = await productService.getProducts();
            dispatch(setProducts(response.data));
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch products';
            dispatch(setError(message));
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreateProduct = async (formData: FormData) => {
        try {
            dispatch(setLoading(true));
            const response = await productService.createProduct(formData);
            dispatch(addProduct(response.data));
            toast.success('Product created successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create product');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUpdateProduct = async (id: string, formData: FormData) => {
        try {
            dispatch(setLoading(true));
            const response = await productService.updateProduct(id, formData);
            dispatch(updateProduct(response.data));
            toast.success('Product updated successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update product');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            dispatch(setLoading(true));
            await productService.deleteProduct(id);
            dispatch(removeProduct(id));
            toast.success('Product deleted successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete product');
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetProductById = async (id: string) => {
        try {
            const response = await productService.getProductById(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to get product');
        }
    };

    return {
        handleGetAllProducts,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleGetProductById
    };
};

export default useProduct;
