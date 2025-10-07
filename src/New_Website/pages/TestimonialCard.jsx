import React from 'react'

import { Card, CardContent } from "../../New_Website/uidata/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../New_Website/uidata/avtar";

const TestimonialCard = ({ quote, name, role, image }) => {
  return (
    <Card data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-8 space-y-6">
        <p className="text-muted-foreground italic" data-testid={`text-quote-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          "{quote}"
        </p>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold" data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </p>
            <p className="text-sm text-muted-foreground" data-testid={`text-role-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard