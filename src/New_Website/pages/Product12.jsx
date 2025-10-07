import React from "react";
import { products } from "../data/productData";
import ProductCard from "../components/ProductCard";
import { Grid, Container, Typography } from "@mui/material";

const Product12 = () => {
  return (
    <Container backgroundColor="#EFECE7">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ my: 4, fontWeight: 'bold', }}>
        <h1 className="font-serif text-4xl font-bold mb-4">Our Products</h1>
        <p className="font-serif text-xl  mb-20">Our products are made from 100% natural herbs, offering safe, gentle, and effective solutions for everyday wellness without any side effects. Experience the power of nature in every drop.</p>
      </Typography>
      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={8} md={6}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product12;
