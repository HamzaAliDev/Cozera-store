import { create } from 'zustand';

export const useWishlistStore = create((set) => ({
    wishlist: [],
    userId: null,

    initializeWishlist: (userId) => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const userWishlist = storedWishlist.filter(item => item.userId === userId);
        set({ wishlist: userWishlist, userId });
    },

    addToWishlist: (userId, prod) => {
        let product = {
            _id: prod._id,
            name: prod.name,
            price: prod.price,
            image: prod.images[0],
        }
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedAll = [...storedWishlist, { userId, product }];
        const updatedUserWishlist = updatedAll.filter(item => item.userId === userId);
        localStorage.setItem('wishlist', JSON.stringify(updatedAll));
        set({ wishlist: updatedUserWishlist });
    },

    removeFromWishlist: (userId, productId) => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedAll = storedWishlist.filter(item => !(item.userId === userId && item.product._id === productId));
        const updatedUserWishlist = updatedAll.filter(item => item.userId === userId);
        localStorage.setItem('wishlist', JSON.stringify(updatedAll));
        set({ wishlist: updatedUserWishlist });
    },

    isInWishlist: (productId) => {
        const { wishlist } = useWishlistStore.getState();
        return wishlist.some(item => item.product._id === productId);
    },

    clearWishlist: () => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const { userId } = useWishlistStore.getState();
        const updatedAll = storedWishlist.filter(item => item.userId !== userId);
        localStorage.setItem('wishlist', JSON.stringify(updatedAll));
        set({ wishlist: [] });
    },
}));
