import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { productVariantService } from '../services/productVariant.service';
import { 
    setVariants, 
    addVariant, 
    updateVariant, 
    removeVariant, 
    setLoading, 
    setError 
} from '../productVariant.slice';
import type { IProductVariant } from '../types/seller.type';

const useVariant = () => {
    const dispatch = useDispatch();

    const handleGetAllVariants = async () => {
        try {
            dispatch(setLoading(true));
            const response = await productVariantService.getVariants();
            dispatch(setVariants(response.data));
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch variants';
            dispatch(setError(message));
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreateVariant = async (data: FormData | Partial<IProductVariant>) => {
        try {
            dispatch(setLoading(true));
            const response = await productVariantService.createVariant(data);
            dispatch(addVariant(response.data));
            toast.success('Variant added successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add variant');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUpdateVariant = async (id: string, data: FormData | Partial<IProductVariant>) => {
        try {
            dispatch(setLoading(true));
            const response = await productVariantService.updateVariant(id, data);
            dispatch(updateVariant(response.data));
            toast.success('Variant updated successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update variant');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteVariant = async (id: string) => {
        try {
            dispatch(setLoading(true));
            await productVariantService.deleteVariant(id);
            dispatch(removeVariant(id));
            toast.success('Variant deleted successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete variant');
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetVariantById = async (id: string) => {
        try {
            const response = await productVariantService.getVariant(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to get variant');
        }
    };

    return {
        handleGetAllVariants,
        handleCreateVariant,
        handleUpdateVariant,
        handleDeleteVariant,
        handleGetVariantById
    };
};

export default useVariant;
