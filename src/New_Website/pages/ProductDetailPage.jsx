import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import { addtoCart, getCarts, getSingleProductDetails, getAllProducts } from '../../api/user.api'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import PageLoader from '../../Component/PageLoader';
import { Routers } from '../../constants/Routes';

const ProductDetailPage = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [mainImage, setMainImage] = useState('');
  // const [selectedColor, setSelectedColor] = useState('');
  // const [selectedSize, setSelectedSize] = useState('');
  // const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth);
  const userId = user?.user?._id;
  const status = user?.user?.status

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
    } finally {
      setLoading(false);
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


  if (!product) {
    return (
      <div className="">
        <PageLoader />
      </div>
    );
  }

  const {
    name,
    category,
    mrp,
    dp,
    discountPrice,
    rating,
    reviewCount,
    images,
    description,
    features,
    colors,
    sizes,
    stock
  } = product;
  return (
    <div className="container-custom py-24">
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-800">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img src={`${selectedImage}`} alt={name} className="w-full h-full object-contain" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-primary-500' : 'border-transparent'
                  }`}
                onClick={() => setSelectedImage(img)}
              // onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`${name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-gray-500 mb-2 block">{category?.name}</span>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>

            {/* <div className="flex items-center mb-4">
              <div className="flex text-gold-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(rating) ? 'text-gold-500' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-500">{rating} ({reviewCount} reviews)</span>
            </div> */}

            <div className="mb-6">
              {discountPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{discountPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through text-lg ml-3">
                    ₹{dp?.toFixed(2)}
                  </span>
                  <span className="ml-3 bg-accent-100 text-accent-800 px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((mrp - discountPrice) / mrp) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary-600">
                  ₹ 
                  {dp?.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-8">{description}</p>
          </div>

          {/* Colors */}
          {/* <div className="mb-6">
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="flex gap-3">
              {colors.map((clr) => (
                <button
                  key={clr}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center ${selectedColor === clr ? 'ring-2 ring-primary-500 ring-offset-2' : 'border-gray-300'
                    }`}
                  style={{ backgroundColor: clr }}
                  onClick={() => setSelectedColor(clr)}
                  aria-label={`Select color ${clr}`}
                >
                  {selectedColor === clr && <span className="text-white text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div> */}

          {/* Sizes */}
          {/* <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Size</h3>
              <button className="text-sm text-primary-600">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  className={`px-4 py-2 border rounded-md min-w-20 text-center transition-colors ${selectedSize === sz
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-primary-600'
                    }`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div> */}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
                // onClick={() => handleQuantityChange(quantity - 1)}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              // disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}

                // onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                className="w-16 h-10 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="1"
                max="10"
              />
              <button
                className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center"
                // onClick={() => handleQuantityChange(quantity + 1)}
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {!stock ? (
              <button className="bg-gray-400 text-white flex-1 py-3 cursor-not-allowed" disabled>
                Out of Stock
              </button>
            ) : isInCart ? (
              <button className="btn-primary flex-1 py-3" onClick={() => navigate("/cart")}>
                <ShoppingCart size={20} className="mr-2" />
                Go to Cart
              </button>
            ) : (
              <button className="btn-primary flex-1 py-3" onClick={handleAddToCart}>
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            )}
          </div>

          {/* Trust Signals */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-primary-600" />
              <span>Free shipping on orders</span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className="text-primary-600" />
              <span>15-day easy returns</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-primary-600" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 ${activeTab === 'details'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`py-4 ${activeTab === 'shipping'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 ${activeTab === 'reviews'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Reviews ({reviewCount})
            </button>
          </nav>
        </div>

        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              {/* <ul className="list-disc list-inside space-y-2 text-gray-700">
                {features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul> */}
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Store in a cool, dry place away from direct sunlight</li>
                <li>Clean with appropriate products specific to the material</li>
                <li>Handle with care to prevent scratches or damage</li>
                <li>Follow manufacturer guidelines for specific care instructions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Care Instructions</h3>
              <p className="text-gray-700 mb-4">
                To ensure your {name} maintains its premium quality and appearance, we recommend:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Store in a cool, dry place away from direct sunlight</li>
                <li>Clean with appropriate products specific to the material</li>
                <li>Handle with care to prevent scratches or damage</li>
                <li>Follow manufacturer guidelines for specific care instructions</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold">Shipping & Returns</h3>
            <p>
              We offer free standard shipping on orders over $100. Expedited options available at checkout.
            </p>
            <p>
              Returns accepted within 30 days of purchase. Item must be in original condition with tags attached.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>
            <p className="text-gray-600">No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
