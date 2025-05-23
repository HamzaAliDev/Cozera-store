import { message } from 'antd';
import axios from 'axios';
import { create } from 'zustand';


export const useProductStore = create((set) => ({
    products: [],
    currentPage: 1,
    totalPages: 1,
    total: 0,
    isProductLoading: false,
    searchProductLoading: false,

    fetchProducts: async (page = 1, append = false) => {
        try {
            set({ isProductLoading: true });
            const response = await axios.get('http://localhost:8000/products/', {
                params: {
                    page,
                    limit: 8,
                }
            });
            // console.log("response", response.data);
            const { data, currentPage, totalPages, total } = response.data;

            set(state => ({
                products: append ? [...state.products, ...data] : data,
                currentPage,
                totalPages,
                total,
            }));
        } catch (error) {
            console.error("Error fetching products:", error);
            message.error("Error fetching products:", error.message || "Something went wrong.");
        } finally {
            set({ isProductLoading: false });
        }
    },

    searchProduct: async (searchTerm) => {
        try {
            set({ searchProductLoading: true });
            const response = await axios.get('http://localhost:8000/products/search', {
                params: {
                    search: searchTerm,
                }
            });

            const { data } = response.data;

            set({ products: data });
        } catch (error) {
            console.error("Error searching products:", error);
            message.error(error.response.data.message || "Something went wrong.");
        } finally {
            set({ searchProductLoading: false });
        }
    },

    searchProductByCategory: async (category) => {
        console.log("category on store", category);
        try {
            set({ searchProductLoading: true });
            const response = await axios.get('http://localhost:8000/products/search-category', {
                params: {
                    category,
                }
            });

            const { data } = response.data;

            set({ products: data });
        } catch (error) {
            console.error("Error searching products:", error);
            message.error("Error searching products:", error.message || "Something went wrong.");

        } finally {
            set({ searchProductLoading: false });
        }
    }


}));