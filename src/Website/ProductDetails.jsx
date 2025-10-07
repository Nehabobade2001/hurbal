import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addtoCart, getCarts, getSingleProductDetails, getAllProducts } from "../api/user.api";
import { useSelector } from "react-redux";
import PageLoader from "../Component/PageLoader";
import { backendConfig1 } from "../constants/mainContent";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInCart, setIsInCart] = useState(false);
    const [products, setProducts] = useState([]);
    const user = useSelector((state) => state.auth);
    const userId = user?.user?._id;

    useEffect(() => {
        if (user && userId && id) {
            fetchCartStatus();
        }
    }, [user, isInCart]);

    useEffect(() => {
        setProduct(null); 
        getSingleProduct();
        fetchAllProducts();
    }, [id]);

    const fetchCartStatus = async () => {
        try {
            const response = await getCarts(userId);
            const cartItems = response?.data?.cart.items;
            const productInCart = cartItems?.some((item) => item.product._id === id);
            setIsInCart(productInCart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const getSingleProduct = async () => {
        try {
            const response = await getSingleProductDetails(id);
            if (response?.data) {
                const fetchedProduct = response?.data?.data;
                setProduct(fetchedProduct);
                setSelectedImage(fetchedProduct?.images?.[0] || "");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllProducts = async () => {
        try {
            const response = await getAllProducts();
            const items = response?.data?.data || [];
            setProducts(items);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    const handleAddToCart = async () => {
        if (!userId) {
            Swal.fire({
                title: "Login Required",
                text: "Please login to add items to the cart.",
                icon: "warning",
                confirmButtonColor: "#90479B",
                confirmButtonText: "Login",
            }).then(() => navigate("/login"));
            return;
        }

        const payload = {
            productId: product._id,
            userId: userId,
            quantity: quantity,
        };

        try {
            const response = await addtoCart(payload);
            if (response?.data) {
                setIsInCart(true);
                Swal.fire({
                    title: "Added to Cart",
                    text: "Product has been added to your cart.",
                    icon: "success",
                    confirmButtonColor: "#90479B",
                    confirmButtonText: "ok",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response?.data?.message || "Something went wrong!",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to add product to cart.",
                icon: "error",
            });
        }
    };

    const SkeletonCard = () => (

        <div className="bg-white p-3 rounded-xl border animate-pulse flex flex-col gap-5">
            <div className="h-44 bg-gray-300 rounded-xl"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-8 w-full bg-gray-300 rounded"></div>
        </div>
    );

    const truncateDescription = (text, wordLimit) => {
        const words = text?.split(" ");
        if (words?.length <= wordLimit) return text;
        return words?.slice(0, wordLimit).join(" ") + " ...";
    };

    if (loading) return <PageLoader />;

    if (!product) return <h1 className="text-center text-2xl py-4">Product not found</h1>;
    console.log(products);
    
    return (
        <div className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 grid-cols-1  md:p-10 gap-5 md:gap-10">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative w-full h-96 rounded-xl overflow-hidden border box-shadow">
                        <img src={`${backendConfig1.origin}/${selectedImage}`} alt={product.productName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2 top-2 left-2">
                        {product.images.slice(0, 5).map((img, index) => (
                            <img
                                key={index}
                                src={`${backendConfig1.origin}/${img}`}
                                alt="Thumbnail"
                                className={`xl:w-20 xl:h-16 h-8 w-9 md:w-14 md:h-10 lg:w-16 lg:h-14 border-2 object-cover rounded cursor-pointer ${selectedImage === img ? "border-[#90479B]" : ""}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-bold mt-2 line-clamp-2 mb-2">{product?.productName}</h1>
                    <div>
                        <h1 className="text-sm" dangerouslySetInnerHTML={{ __html: product?.productDetails }}></h1>
                    </div>
                    <p className="text-gray-600 mt-2">Price: ₹ {product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-lg font-semibold">Quantity</span>
                        <div className="flex items-center border rounded px-3 py-1">
                            <button className="px-2 text-lg" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                            <span className="px-4">{quantity}</span>
                            <button className="px-2 text-lg" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        {isInCart ? (
                            <button disabled className="bg-bg-color/40 text-white px-6 py-2 rounded cursor-not-allowed" onClick={() => navigate("/cart")}>
                                GO TO CART
                            </button>
                        ) : (
                            <button disabled className="bg-bg-color text-white px-6 py-2 rounded cursor-not-allowed" onClick={handleAddToCart}>
                                ADD TO CART
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-10 border">
                {products.length === 0
                    ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                    : [...products].reverse().slice(0, 4).map((product) => (
                        <div
                            key={product?._id}
                            className="bg-white p-3 rounded-xl border hover:shadow-md transition-all flex flex-col justify-between gap-5"
                        >
                            <div className="w-full min-h-44 flex items-center justify-center bg-gray-100 rounded-xl">
                                <img
                                    src={`${backendConfig1.origin}/${product?.defaultImage}`}
                                    alt="Product"
                                    className="w-full h-56 object-cover rounded-xl"
                                />
                            </div>

                            <div className="flex flex-col gap-2 items-start">
                                <h3 className="font-semibold text-sm">{truncateDescription(product?.productName, 4)}</h3>
                                <p className="text-gray-600 text-xs mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: truncateDescription(product?.productDetails, 15) }}></p>
                                <div className="flex justify-between items-center gap-5 w-full">
                                    <p className="text-base font-medium">₹ {product.price}</p>
                                    <Link to={`/product/${product._id}`} className="bg-bg-color text-white px-3 py-2 text-xs rounded-lg">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProductDetails;
