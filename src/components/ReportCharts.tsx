import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from '../auth/axiosConfig';
import dayjs from 'dayjs';

interface ReportChartsProps {
    filter: string;
  }

interface ChartSeries {
  name: string;
  data: number[];
}

interface SalesDataItem {
  date: string;
  totalSales: number;
  remainingSales: number;
  fullPaymentSales: number;
  fullPaymentCount: number;
  [key: string]: any;
}

const ReportCharts: React.FC<ReportChartsProps> = ({ filter }) => {
  const [chartData, setChartData] = useState<{
    series: ChartSeries[];
    options: any;
  }>({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: { show: false },
      },
      markers: { size: 4 },
      colors: ['#4154f1', '#2eca62', '#ff771d', 'rgb(13, 130, 103)'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 120],
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { type: 'datetime', categories: [] },
      tooltip: { x: { format: 'dd/MM/yyyy' } },
    },
  });

  const formatChartData = (salesData: SalesDataItem[], dates: string[]) => {
    const seriesData: ChartSeries[] = [
      { name: 'Total sales', data: [] },
      { name: 'Remaining', data: [] },
      { name: 'Full Payment Sales', data: [] },
      { name: 'Full Payment Count', data: [] },
    ];

    dates.forEach((date) => {
      const data = salesData.find((entry) => entry.date === date);
      seriesData[0].data.push(data?.totalSales ?? 0);
      seriesData[1].data.push(data?.remainingSales ?? 0);
      seriesData[2].data.push(data?.fullPaymentSales ?? 0);
      seriesData[3].data.push(data?.fullPaymentCount ?? 0);
    });

    setChartData((prev) => ({
      series: seriesData,
      options: {
        ...prev.options,
        xaxis: { ...prev.options.xaxis, categories: dates },
      },
    }));
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`/analytics/sales-analytics/${filter}`);
        const salesData: SalesDataItem[] = response.data.data;

        const today = new Date();
        const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 2);
        const firstDayOfPastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfPastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));

        const generateDatesInRange = (startDate: Date, endDate: Date): string[] => {
          const dates: string[] = [];
          let current = new Date(startDate);
          while (current <= endDate) {
            dates.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
          }
          return dates;
        };

        let dateRange: string[] = [];
        let formattedData: SalesDataItem[] = [];

        if (filter === 'today') {
          dateRange = [startOfToday.toISOString().split('T')[0]];
          formattedData.push(salesData[0]);
        } else if (filter === 'this_month') {
          dateRange = generateDatesInRange(firstDayOfThisMonth, new Date(today.getFullYear(), today.getMonth() + 1, 1));
          formattedData = salesData;
        } else if (filter === 'past_month') {
          dateRange = generateDatesInRange(firstDayOfPastMonth, lastDayOfPastMonth);
          formattedData = salesData;
        }

        formatChartData(formattedData, dateRange);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchSalesData();
  }, [filter]);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type={chartData.options.chart.type}
      height={chartData.options.chart.height}
    />
  );
};

export default ReportCharts;