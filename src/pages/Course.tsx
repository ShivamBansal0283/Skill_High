import React, { useState, useEffect } from 'react';
import apiSet from '../auth/axiosConfig';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import the correct ApexOptions type

interface CourseData {
  course: string;
  studentCount: number;
}

const CourseAnalytics: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: 'bar', // Now correctly typed as 'bar' (or any other valid ApexCharts type)
      toolbar: {
        show: false,
      },
    },
    colors: ['#4154f1'],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Preferred Domains',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Courses',
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val} Courses`;
        },
      },
    },
  });

  const formatChartData = (courseData: CourseData[]) => {
    const newSeries = [
      {
        name: 'Courses',
        data: courseData.map((data) => data.studentCount),
      },
    ];

    const categories = courseData.map((data) => data.course);

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: categories,
      },
    }));

    return newSeries;
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await apiSet.get('/analytics/course-analytics');
        const courseData = response.data.data;

        const formattedData = formatChartData(courseData);
        setCourseData(courseData);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: formattedData,
        }));
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <section className={`course-analytics pt-20 ${isSidebarOpen ? 'lg:ml-[13rem]' : ''}`}>
      <div className="container mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Course Analytics</h2>

          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <Chart
              options={chartOptions || {}}
              series={chartOptions.series || []}
              type={chartOptions.chart?.type || 'bar'}
              height={chartOptions.chart?.height || 350}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseAnalytics;