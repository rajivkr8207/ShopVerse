import { useDispatch } from 'react-redux';
import { categoryService } from '../services/category.service';
import type { ICategory } from '../types/seller.type';
import { setCategories } from '../category.slice';

const useCategory = () => {
    const dispatch = useDispatch()

    const handleCreateCategory = async (data: Partial<ICategory>) => {
        const response = await categoryService.createCategory(data);
        return response.data;
    }

    const handleUpdateCategory = async (id: string, data: Partial<ICategory>) => {
        const response = await categoryService.updateCategory(id, data);
        return response.data;
    }

    const handleDeleteCategory = async (id: string) => {
        const response = await categoryService.deleteCategory(id);
        return response.data;

    }

    const handleGetAllCategories = async () => {
        const response = await categoryService.getCategories();
        dispatch(setCategories(response.data));
        return response.data;
    }

    const handleGetCategory = async (id: string) => {
        const response = await categoryService.getCategory(id);
        return response.data;
    }

    return {
        handleCreateCategory,
        handleUpdateCategory,
        handleDeleteCategory,
        handleGetAllCategories,
        handleGetCategory
    }
}

export default useCategory