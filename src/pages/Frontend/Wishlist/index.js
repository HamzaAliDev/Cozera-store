import React from 'react'
import { ImCross } from 'react-icons/im'
import Breadcrumb from '../../../components/Breadcrumb'
import { useWishlistStore } from '../../../store/useWishlistStore'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Wishlist() {
    const { user } = useAuthContext()
    const { wishlist, removeFromWishlist } = useWishlistStore();

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(user?._id, productId)
    }

    return (
        <main className='container-fluid bg-light p-0'>
            {/* Breadcrumb Section Begin */}
            <Breadcrumb />

            <section>
                <div className="container">
                    <div className="row my-5 px-lg-5">
                        <div className="table-responsive">
                            <table className="table table-light cart-table align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock Status</th>
                                        <th scope="col">Action</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.length === 0 ? (
                                        <tr className='text-center'>
                                            <td colSpan={5} className='py-5'>No items in your wishlist</td>
                                        </tr>
                                    ) : (
                                        wishlist.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center ">
                                                        <img src={item.product?.image || "/placeholder.jpg"} alt="" width={110} />
                                                        <div className="ms-3 product-info">
                                                            <p>{item.product.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    ${item.product.price}
                                                </td>
                                                <td>
                                                    Instock
                                                </td>
                                                <td>
                                                    <button className='btn btn-dark text-uppercase rounded-0' style={{ fontSize: "12px" }}>add to cart</button>
                                                </td>
                                                <td>
                                                    <span onClick={() => handleRemoveFromWishlist(item.product._id)}><ImCross style={{ cursor: "pointer" }} /></span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
