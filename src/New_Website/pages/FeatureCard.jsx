// import React from 'react'
// import { Card, CardContent } from "../../New_Website/uidata/card";
// import { LucideIcon } from "lucide-react";

// const FeatureCard = ({ icon: Icon, title, description }) => {
//   return (
//      <Card className="text-center" data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
//       <CardContent className="p-8 space-y-4">
//         <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
//           <Icon className="w-8 h-8 text-primary" />
//         </div>
//         <h3 className="font-serif text-xl font-bold" data-testid={`text-feature-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
//           {title}
//         </h3>
//         <p className="text-muted-foreground" data-testid={`text-feature-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
//           {description}
//         </p>
//       </CardContent>
//     </Card>
//   )
// }

// export default FeatureCard

import React from "react";
import { Card, CardContent } from "../../New_Website/uidata/card";

// No need to import LucideIcon — we receive the icon as a prop
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card
      className="text-center"
      data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardContent className="p-8 space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#1F934A]/10 rounded-full flex items-center justify-center">
          {/* Render the icon dynamically */}
          <Icon className="w-8 h-8 text-[#1F934A]" />
        </div>
        <h3
          className="font-serif text-xl font-bold"
          data-testid={`text-feature-title-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {title}
        </h3>
        <p
          className="text-muted-foreground"
          data-testid={`text-feature-description-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
