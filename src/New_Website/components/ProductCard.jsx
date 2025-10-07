import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { addtoCart, getCarts, getSingleProductDetails, getAllProducts } from '../../api/user.api'
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";


const ProductCard = ({ product, showDescription = false }) => {  
  const [isInCart, setIsInCart] = useState(false);
  const user = useSelector((state) => state.auth);
  const userId = user?.user?._id;
  const [isHovered, setIsHovered] = useState(false); 
  const {
    _id,
    name,
    category,
    mrp,
    dp, pv,sp,
    discountPrice,
    images,
    isNew,
    isLimited,
    description,
  } = product;

  const discountPercentage = discountPrice
    ? Math.round(((mrp - discountPrice) / price) * 100)
    : 0;



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

    
    if (status === false) {
      Swal.fire({
        title: "Profile Incomplete",
        text: "Please complete your profile before adding items to cart.",
        icon: "warning",
        confirmButtonColor: "#90479B",
        confirmButtonText: "Complete Profile",
      }).then(() => navigate(Routers.Profile));
      return;
    }

    const payload = {
      productId: product._id,
      userId: userId,
      quantity: 1,
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



  return (
    <div
      className="card group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        <Link to={`/products/${_id}`}>
          <img
            src={images?.[0] || 'https://atlas-content-cdn.pixelsquid.com/assets_v2/260/2601734072459859015/previews/G03-200x200.jpg'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPrice && (
            <span className="badge-accent">{discountPercentage}% OFF</span>
          )}
          {isNew && <span className="badge-primary">NEW</span>}
          {isLimited && <span className="badge-gold">LIMITED</span>}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4 bg-white/80 backdrop-blur-sm transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            className="p-2 rounded-full bg-white text-primary-600 hover:bg-primary-50 shadow-sm transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </button>

          {/* shopping card button  */}
          <button
            className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-sm transition-colors"
            aria-label="Add to cart"
             onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
          <Link
            to={`/products/${_id}`}
            className="p-2 rounded-full bg-white text-primary-600 hover:bg-primary-50 shadow-sm transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-sm text-gray-500 mb-1">{category?.name}</span>

        <Link to={`/products/${_id}`} className="hover:text-primary-600 transition-colors">
          <h3 className="font-medium text-sm md:text-lg mb-2 line-clamp-2">{name}</h3>
        </Link>

        {showDescription && (
          <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{description}</p>
        )}

        <div className="mt-auto flex items-center">
          {dp ? (
            <>
              <span className="font-semibold text-lg">₹{dp?.toFixed(2)}</span>
              <span className="text-gray-500 line-through text-sm ml-2">
                ₹{mrp?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-lg">₹ {mrp?.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
