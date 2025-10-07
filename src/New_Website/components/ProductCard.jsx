import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import hurbal1 from "/attached_assets/generated_images/hurbal1.jpeg";
import hurbal2 from "/attached_assets/generated_images/hurbal2.jpeg";
import hurbal3 from "/attached_assets/generated_images/hurbal3.jpeg";
import hurbal4 from "/attached_assets/generated_images/hurbal4.jpeg";
import hurbal5 from "/attached_assets/generated_images/hurbal5.jpeg";
import hurbal6 from "/attached_assets/generated_images/hurbal6.jpeg";
import hurbal7 from "/attached_assets/generated_images/hurbal7.jpeg";
import hurbal8 from "/attached_assets/generated_images/hurbal8.jpeg";
import hurbal9 from "/attached_assets/generated_images/hurbal9.jpeg";
import hurbal10 from "/attached_assets/generated_images/hurbal10.jpeg";
import hurbal11 from "/attached_assets/generated_images/hurbal11.jpeg";
import hurbal12 from "/attached_assets/generated_images/hurbal12.jpeg";

const imageMap = {
  "/attached_assets/generated_images/hurbal1.jpeg": hurbal1,
  "/attached_assets/generated_images/hurbal2.jpeg": hurbal2,
  "/attached_assets/generated_images/hurbal3.jpeg": hurbal3,
  "/attached_assets/generated_images/hurbal4.jpeg": hurbal4,
  "/attached_assets/generated_images/hurbal5.jpeg": hurbal5,
  "/attached_assets/generated_images/hurbal6.jpeg": hurbal6,
  "/attached_assets/generated_images/hurbal7.jpeg": hurbal7,
  "/attached_assets/generated_images/hurbal8.jpeg": hurbal8,
  "/attached_assets/generated_images/hurbal9.jpeg": hurbal9,
  "/attached_assets/generated_images/hurbal10.jpeg": hurbal10,
  "/attached_assets/generated_images/hurbal11.jpeg": hurbal11,
  "/attached_assets/generated_images/hurbal12.jpeg": hurbal12,
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateDescription = (description, limit) => {
    if (description.length <= limit) {
      return description;
    }
    return description.substring(0, limit) + "...";
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageMap[product.image]}
        alt={product.name}
        sx={{
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isExpanded
            ? product.description
            : truncateDescription(product.description, 100)}
        </Typography>
        {product.description.length > 100 && (
          <Button
            size="small"
            onClick={toggleDescription}
            sx={{
              marginTop: 1,
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#1F934A" }}
          >
            ₹{product.price}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ backgroundColor: "#1F934A", '&:hover': { backgroundColor: '#14753D' } }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
