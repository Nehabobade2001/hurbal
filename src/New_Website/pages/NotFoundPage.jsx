import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-24 min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <ArrowLeft size={18} className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;