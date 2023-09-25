import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

function Chart({ data }) {
  const pieData = data.map((item) => ({
    state: item.city_name,
    population: item.population,
  }));

  const lineData = data.map((item) => ({
    state: item.city_name,
    population: item.population,
  }));

  const barData = data.map((item) => ({
    state: item.city_name,
    population: item.population,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length > 0) {
      const entry = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>State: {entry.state}</p>
          <p>Population: {entry.population}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>Population Distribution by Country</h2>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="population"
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Line Chart */}
      <h3>Population Over Time (Line Chart)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineData}>
          <XAxis dataKey="state" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Line type="monotone" dataKey="population" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Bar Diagram */}
      <h3>Population Comparison (Bar Diagram)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="state" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="population" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
