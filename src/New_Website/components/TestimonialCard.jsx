import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  const { name, avatar, role, content, rating, product } = testimonial;

  return (
    <div className="card p-6 h-full flex flex-col">
      {/* Stars */}
      <div className="flex text-gold-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? 'currentColor' : 'none'}
            className={i < rating ? 'text-gold-500' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-6 flex-grow">"{content}"</p>

      {/* Product Reference */}
      {product && (
        <div className="text-sm text-gray-500 mb-4">
          On <span className="font-medium text-primary-600">{product}</span>
        </div>
      )}

      {/* Person */}
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <span className="text-sm text-gray-500">{role}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
