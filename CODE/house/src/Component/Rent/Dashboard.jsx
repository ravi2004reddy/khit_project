import React,{useEffect} from 'react'
import Chart from 'react-apexcharts'; 
import {dashboardss} from '../Actions/Rental';
import {useDispatch,useSelector} from 'react-redux';


const Dashboard = () => {

  const dispatch = useDispatch();

  const rental = sessionStorage.getItem('rentals');
  const rentals = JSON.parse(rental || '{}');

  console.log(rentals, "rentals");

  useEffect(() => {
    dispatch(dashboardss(rentals._id));
  },[

  ]);


  const dashboards = useSelector((state) => state.Rental.dashboard);

  console.log(dashboards, "dashboards");










      // Dummy data
  const dashboard = {
    movies: 100, // Number of movies
    ratings: 250, // Number of ratings
    users: 150, // Number of users
    orders: 200, // Number of orders
    orderdata: [
      { _id: 1, count: 20 },
      { _id: 2, count: 30 },
      { _id: 3, count: 25 },
      { _id: 4, count: 50 },
      { _id: 5, count: 45 },
      { _id: 6, count: 40 },
    ],
    offerdata: [
      { _id: 1, count: 10 },
      { _id: 2, count: 15 },
      { _id: 3, count: 5 },
      { _id: 4, count: 25 },
      { _id: 5, count: 20 },
      { _id: 6, count: 15 },
    ],
    userdata: [
      { _id: 1, count: 10 },
      { _id: 2, count: 20 },
      { _id: 3, count: 15 },
      { _id: 4, count: 30 },
      { _id: 5, count: 25 },
      { _id: 6, count: 20 },
    ],
  };
  
  const summaryData = [
    { title: 'No. of house', value: dashboards?.totalRentals},
    { title: 'No. of booking', value: dashboards?.totalBookings},
    // { title: 'No. of users', value: dashboard?.users},
    // { title: 'Orders', value: dashboard.orders },
  ];



  const chartOptions2 = {
    chart: {
      type: 'bar', // Bar chart for revenue
      height: 350,
    },
    series: [{
      name: ' monthWiseBookings',
      data: dashboards.monthWiseBookings.map((item) => item.count) || []
    }],
    xaxis: {
      categories: [dashboards?.monthWiseBookings.map((item) => item._id) || [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'
      ]]
    }
  };

  const chartOptions3 = {
    chart: {
      type: 'area', // Area chart for customers
      height: 350,
    },
    series: [{
      name: 'monthWiseRentals',
      data: dashboards.monthWiseRentals.map((item) => item.count) || []
    }],
    xaxis: {
      categories: [dashboards?.monthWiseRentals.map((item) => item._id) || [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'
      ]]
    }
  };

  const chartOptions4 = {
    chart: {
      type: 'pie', // Pie chart for service types
      height: 350,
    },
    series: [dashboards?.totalRentals, dashboards?.totalBookings],
    labels: ['No. of house', 'No. of booking'],
  };





  return (
    <div className="dashboard p-4 overflow-auto">
      <div className="summary-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div className="summary-box bg-white shadow-lg rounded-lg p-6 text-center" key={index}>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="card-column grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions2} series={chartOptions2.series} type={chartOptions2.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions3} series={chartOptions3.series} type={chartOptions3.chart.type} />
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <Chart options={chartOptions4} series={chartOptions4.series} type={chartOptions4.chart.type} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
