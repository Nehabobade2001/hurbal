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
        image={product.image}
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
