import React from 'react';
import ReportCharts from './ReportCharts';

interface ReportsProps {
  filter: string;
}

const Reports: React.FC<ReportsProps> = ({ filter }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h5 className="text-lg font-medium text-gray-700 mb-4">
        Reports <span className="text-sm text-gray-500">| {filter}</span>
      </h5>
      <ReportCharts filter={filter} />
    </div>
  );
};

export default Reports;