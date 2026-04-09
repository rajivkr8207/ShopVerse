export const asyncHandler = async<T>(fn: () => Promise<T>): Promise<[T | null, any]> => {
    try {
        const data = await fn();
        return [data, null];
    } catch (error) {
        return [null, error];
    }
};