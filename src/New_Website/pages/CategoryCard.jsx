import React from 'react'
import { Card, CardContent } from "../../New_Website/uidata/card";

const CategoryCard = ({ name, image }) => {
  return (
    <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-category-${name.toLowerCase()}`}>
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          data-testid={`img-category-${name.toLowerCase()}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 
          className="absolute bottom-6 left-6 font-serif text-2xl font-bold text-white"
          data-testid={`text-category-${name.toLowerCase()}`}
        >
          {name}
        </h3>
      </div>
    </Card>
  )
}

export default CategoryCard