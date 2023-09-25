import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import './Dashboard.css'
import Sidebar from './Sidebar';

function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-population');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="dashboard-content">
      <div className="Dashboard-page">
        <h1>Profile Page</h1>
        <div>
          <h2>Population Data</h2>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Population</th>
                <th>Country</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.city_name}</td>
                  <td>{item.population}</td>
                  <td>{item.country}</td>
                  <td>{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Chart data={data} /> 
      </div>
    </div>
  </div>
);
}

export default Dashboard;
