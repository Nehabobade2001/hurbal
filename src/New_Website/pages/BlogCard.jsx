import React from 'react'
import { Calendar } from "lucide-react";
import { Card, CardContent,CardFooter } from "../../New_Website/uidata/card";

const BlogCard = ({ title, date, image }) => {
  return (
     <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-blog-${title.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-0">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            data-testid={`img-blog-${title.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-6 bg-white">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span data-testid={`text-date-${title.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}>{date}</span>
        </div>
        <h3 className="font-semibold text-xl" data-testid={`text-title-${title.substring(0, 20).toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
      </CardFooter>
    </Card>
  )
}

export default BlogCard