// import { useState, useEffect } from 'react';
// import { Filter, SlidersHorizontal } from 'lucide-react';
// import ProductCard from '../components/ProductCard';
// import { getAllProducts } from '../../api/user.api';
// import PageLoader from '../../Component/PageLoader';

// const ProductsPage = () => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState(null);
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [sortOption, setSortOption] = useState('newest');
//   const [showFilters, setShowFilters] = useState(false);

//   const categories = [...new Set(allProducts.map(p => p.category))];
//   const getAllProductsList = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllProducts();
//       if (response?.data) {
//         setAllProducts(response?.data?.data);
//         setFilteredProducts(response?.data?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllProductsList();
//   }, []);

//   useEffect(() => {
//     let result = [...allProducts];
//     if (categoryFilter) {
//       result = result.filter(p => p?.category === categoryFilter);
//     }

//     result = result.filter(p => {
//       const priceToCompare = p.discountPrice || p.price;
//       return priceToCompare >= priceRange[0] && priceToCompare <= priceRange[1];
//     });

//     switch (sortOption) {
//       case 'newest':
//         result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         break;
//       case 'price-asc':
//         result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
//         break;
//       case 'price-desc':
//         result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
//         break;
//       case 'rating':
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//     }

//     setFilteredProducts(result);
//   }, [allProducts, categoryFilter, priceRange, sortOption]);

//   return (
//     <div className="container-custom py-24">
//       <div className="mb-12 pt-10">
//         <h1 className="text-4xl font-bold mb-4">All Products</h1>
//         <p className="text-gray-600 max-w-2xl">
//           Browse our complete collection of premium products, carefully curated for quality and style.
//         </p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-1/4">
//           <div className="lg:sticky lg:top-24">
//             <div className="flex items-center justify-between mb-6 lg:mb-8">
//               <h2 className="text-xl font-semibold">Filters</h2>
//               <button
//                 className="lg:hidden flex items-center gap-1 text-primary-600"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter size={18} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//               </button>
//             </div>

//             <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-8`}>
//               <div>
//                 <h3 className="font-medium mb-3">Categories</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="all-categories"
//                       name="category"
//                       checked={categoryFilter === null}
//                       onChange={() => setCategoryFilter(null)}
//                       className="mr-2"
//                     />
//                     <label htmlFor="all-categories">All Categories</label>
//                   </div>

//                   {Array.isArray(categories) &&
//                     [...new Map(categories.map(cat => [cat?.name, cat])).values()].map(cat => (
//                       <div key={cat?.name} className="flex items-center">
//                         <input
//                           type="radio"
//                           id={cat?.name}
//                           name="category"
//                           checked={categoryFilter === cat?.name}
//                           onChange={() => setCategoryFilter(cat?.name)}
//                           className="mr-2"
//                         />
//                         <label htmlFor={cat?.name}>{cat?.name}</label>
//                       </div>
//                     ))}
//                 </div>

//               </div>

//               <div>
//                 <h3 className="font-medium mb-3">Price Range</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span>₹{priceRange[0]}</span>
//                     <span>₹{priceRange[1]}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="0"
//                     max="5000"
//                     step="10"
//                     value={priceRange[1]}
//                     onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
//                     className="w-full"
//                   />
//                 </div>
//               </div>

//               <button
//                 className="text-primary-600 hover:text-primary-700 font-medium"
//                 onClick={() => {
//                   setCategoryFilter(null);
//                   setPriceRange([0, 500]);
//                 }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-3/4">
//           <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
//             <div className="text-sm text-gray-500">
//               Showing {filteredProducts?.length} of {allProducts?.length} products
//             </div>
//             <div className="relative inline-block">
//               <div className="flex items-center gap-2">
//                 <SlidersHorizontal size={18} />
//                 <label htmlFor="sort-options">Sort by:</label>
//                 <select
//                   id="sort-options"
//                   value={sortOption}
//                   onChange={e => setSortOption(e.target.value)}
//                   className="bg-white border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <PageLoader />
//           ) : filteredProducts?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredProducts?.map(p => {
//                 return <ProductCard key={p?._id} product={p} showDescription />;
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <h3 className="text-xl font-medium mb-2">No products found</h3>
//               <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;



// src/components/ProductCard.js
import React from "react";
import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProductsPage = ({ name, price, image, reviews = 2145 }) => {
  return (
    <Card 
      sx={{ overflow: "hidden", transition: "0.3s", "&:hover": { boxShadow: 6 } }} 
      data-testid={`card-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ position: "relative", pt: "100%", overflow: "hidden", bgcolor: "#f5f5f5" }}>
          <img
            src={image}
            alt={name}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            data-testid={`img-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </Box>
      </CardContent>
      <CardContent sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          data-testid={`text-product-name-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: 14 }}>
          <StarIcon sx={{ fontSize: 16, color: "#fbbf24" }} />
          <span data-testid={`text-reviews-${name.toLowerCase().replace(/\s+/g, '-')}`}>{reviews} Reviews</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography 
            variant="h5" 
            component="span" 
            sx={{ fontWeight: "bold", color: "#1e40af" }}
            data-testid={`text-price-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            ${price}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            data-testid={`button-add-to-cart-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductsPage