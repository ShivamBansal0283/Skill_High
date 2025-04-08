import React, { useState, useEffect, ChangeEvent } from 'react';
import apiSet from '../auth/axiosConfig';
import Card from '../components/Card';
import Reports from '../components/Reports';
import dayjs from 'dayjs';

interface CardData {
  totalSales: number;
  fullPaymentSales: number;
  remainingSales: number;
  fullPaymentCount: number;
}

const Dashboard: React.FC = () => {
  const [cardsData, setCardsData] = useState<CardData>({
    totalSales: 0,
    fullPaymentSales: 0,
    remainingSales: 0,
    fullPaymentCount: 0,
  });

  const [filter, setFilter] = useState<'today' | 'this_month' | 'past_month'>('this_month');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSidebarClass = () => {
      setIsSidebarOpen(document.body.classList.contains('toggle-sidebar'));
    };

    checkSidebarClass();

    const observer = new MutationObserver(checkSidebarClass);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiSet.get(`/analytics/sales-analytics/${filter}`);
      const salesData = response.data.data || [];

      let totalSales = 0;
      let fullPaymentSales = 0;
      let remainingSales = 0;
      let fullPaymentCount = 0;

      salesData.forEach((item: any) => {
        const itemDate = dayjs(item.dateTime || item.date);
        const match =
          (filter === 'today' && itemDate.isSame(dayjs(), 'day')) ||
          (filter === 'this_month' && itemDate.month() === dayjs().month()) ||
          (filter === 'past_month' &&
            itemDate.month() === dayjs().subtract(1, 'month').month() &&
            itemDate.year() === dayjs().subtract(1, 'month').year());

        if (match) {
          totalSales += item.totalSales || 0;
          fullPaymentSales += item.fullPaymentSales || 0;
          remainingSales += item.remainingSales || 0;
          fullPaymentCount += item.fullPaymentCount || 0;
        }
      });

      setCardsData({
        totalSales,
        fullPaymentSales,
        remainingSales,
        fullPaymentCount,
      });
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'today' | 'this_month' | 'past_month');
  };

  return (
    <section className={`dashboard pt-20 ${isSidebarOpen ? 'lg:ml-[13rem]' : ''}`}>
      <div className="container mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-4 bg-white px-6 py-2 rounded-full shadow-md">
            <label htmlFor="filter" className="text-lg font-semibold text-gray-700">Filter by:</label>
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="text-sm border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            >
              <option value="today">Today</option>
              <option value="this_month">This Month</option>
              <option value="past_month">Past Month</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Card title="Total Sales" data={cardsData.totalSales} filter={filter} />
            <Card title="Full Payment Sales" data={cardsData.fullPaymentSales} filter={filter} />
            <Card title="Remaining Sales" data={cardsData.remainingSales} filter={filter} />
            <Card title="Full Payment Count" data={cardsData.fullPaymentCount} filter={filter} />
          </div>

          <Reports filter={filter} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;