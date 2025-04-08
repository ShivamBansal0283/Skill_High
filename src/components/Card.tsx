import React from 'react';

interface CardProps {
  title: string;
  data: number | null | undefined;
  filter: string;
}

const Card: React.FC<CardProps> = ({ title, data, filter }) => {
  if (data === null || data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h5 className="text-lg font-medium text-gray-700 mb-4">
        {title} | <span className="text-sm text-gray-500">{filter}</span>
      </h5>
      <div className="flex items-center">
        <h6 className="text-2xl font-bold text-blue-800">
          {typeof data === 'number' ? data.toLocaleString('en-US') : 'N/A'}
        </h6>
      </div>
    </div>
  );
};

export default Card;