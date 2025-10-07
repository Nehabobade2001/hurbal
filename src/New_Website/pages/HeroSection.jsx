import React from 'react'
import { Button } from "../../New_Website/uidata/button";
import { Badge } from "../../New_Website/uidata/badge";
import heroImage from '../../../attached_assets/generated_images/Hero_section_product_composition_fd6982f5.png';
import decorativeImage from '../../../attached_assets/generated_images/Decorative_herbal_products_arrangement_e57fff70.png';

const HeroSection = () => {
  return (
      <section className=" py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-green-600 text-primary-foreground" data-testid="badge-new-arrival">
              Natural
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Herbal Without Side Effects
            </h1>
            <p className="text-muted-foreground text-lg">
             Discover the pure power of nature with our herbal formulations crafted to promote holistic wellness without any harmful side effects. Each product is made from time-tested natural ingredients, ensuring balance, vitality, and long-term health.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="lg" data-testid="button-read-more">
                Read More About
              </Button>
              <Button size="lg" className="bg-green-600" data-testid="button-shop-now">
                Shop Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Natural herbal products"
              className="w-full h-auto rounded-lg"
              data-testid="img-hero-main"
            />
            <img
              src={decorativeImage}
              alt="Herbal products arrangement"
              className="absolute -bottom-8 -left-8 w-1/3 h-auto rounded-lg shadow-lg hidden md:block"
              data-testid="img-hero-decorative"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection