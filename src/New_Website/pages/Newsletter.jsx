import React from 'react'
import { Button } from "../../New_Website/uidata/button";
import { Input } from "../../New_Website/uidata/input";
import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Newsletter subscribe:", email);
    setEmail("");
  };
  
  return (
    <section className="bg-[#DBE6DF] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold mb-6">Subscribe Our Newsletter</h2>
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-newsletter-email"
          />
          <Button onClick={handleSubscribe} className="bg-[#1E8E48]" data-testid="button-subscribe">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Newsletter