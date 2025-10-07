import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../../api/user.api';
import PageLoader from '../../Component/PageLoader';

const Collection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState([]);
    const getAllProductsList = async () => {
        try {
            setLoading(true);
            const response = await getAllProducts();
            if (response?.data) {
                setFeaturedProducts(response?.data?.data)
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductsList();
    }, []);
    return (
        <div>
            <div className="container-custom py-24">
                <h1 className="text-4xl font-bold text-center">All Collections</h1>
                <div className="mb-12 pt-10">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                        {featuredProducts.slice().reverse().map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            {loading && (
                <div>
                    <PageLoader />
                </div>
            )}
        </div>
    )
}

export default Collection