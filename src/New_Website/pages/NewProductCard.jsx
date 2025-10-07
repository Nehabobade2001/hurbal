import React from "react";
import { Button } from "../../New_Website/uidata/button";
import { Card, CardContent,CardFooter } from "../../New_Website/uidata/card";
import { Star } from "lucide-react";

export const NewProductCard =({ name, price, image, reviews = 2145 }) => {
  return (
    <Card
      className="overflow-hidden hover-elevate"
      data-testid={`card-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`img-product-${name.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-6">
        <h3
          className="font-semibold text-lg"
          data-testid={`text-product-name-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-chart-2 text-chart-2" />
          <span data-testid={`text-reviews-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {reviews} Reviews
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span
            className="text-2xl font-bold text-chart-2"
            data-testid={`text-price-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            ${price}
          </span>
          <Button data-testid={`button-add-to-cart-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default NewProductCard;