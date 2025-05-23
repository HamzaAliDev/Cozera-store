import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useProductStore } from '../store/useProductStore';
import { useAuthContext } from '../contexts/AuthContext';
import { useWishlistStore } from '../store/useWishlistStore';

export default function Products({ large, medium, showLoadMore = false }) {
    const { user } = useAuthContext()
    const { products, fetchProducts, currentPage, totalPages, isProductLoading } = useProductStore();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
    const navigate = useNavigate();

    const isLiked = (product) => isInWishlist(product._id);


    const handleToggleLike = (product) => {
        if (!user?._id) return window.toastify("Please log in to add to wishlist", 'error');

        if (isLiked(product)) {
            removeFromWishlist(user._id, product._id);
            window.toastify("Removed from wishlist", 'warning');
        } else {
            addToWishlist(user._id, product);
            window.toastify("Added to wishlist", 'success');
        }
    };


    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            fetchProducts(currentPage + 1, true); // append = true
        }
    };

    return (
        <section>
            <div className="row mt-5 d-flex justify-content-center align-items-center">
                {products.map((product, index) => ( // Assuming 7 items
                    <div key={index} className={`col-lg-${large} col-md-${medium} col-6 mb-3`}>
                        <div className="featured-item">
                            <div className="product-img-container">
                                <img src={product.images[0]} alt="" className='product-img' />
                                <button className="product-btn" onClick={() => navigate(`/shop-detail/${product._id}`)}>Quick View</button>
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <div>
                                    <p>{product.name}</p>
                                    <p>$ {product.price}</p>
                                </div>
                                <div>
                                    {isLiked(product) ? (
                                        <GoHeartFill
                                            size={20}
                                            onClick={() => handleToggleLike(product)}
                                            style={{ color: 'red', cursor: 'pointer' }}
                                        />
                                    ) : (
                                        <GoHeart
                                            size={20}
                                            onClick={() => handleToggleLike(product)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {showLoadMore && currentPage < totalPages && (
                <div className="text-center mt-4">
                    <button className="btn btn-outline-secondary rounded-0 px-4 py-2" onClick={handleLoadMore}>
                        {isProductLoading ? "...loading" : " load More"}
                    </button>
                </div>
            )}
        </section>
    )
}
