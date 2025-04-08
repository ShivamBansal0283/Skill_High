import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-500">It might have been moved or deleted.</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;