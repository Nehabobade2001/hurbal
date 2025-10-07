import React from "react";
import { products } from "../data/productData";
import ProductCard from "../components/ProductCard";
import { Grid, Typography, Container } from "@mui/material";

const ProductsPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
          color: "#1F934A",
        }}
      >
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;
