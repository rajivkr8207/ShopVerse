import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        
        // Default to dark mode for 'Digital Obsidian' aesthetic if no preference is found
        return "dark";
    }
    return "dark";
};

const initialState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", state.mode);
            }
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", state.mode);
            }
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
