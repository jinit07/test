import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('GRAFANA_API_URL', {
        headers: {
          'Authorization': 'Bearer YOUR_GRAFANA_API_KEY', // Replace with your Grafana API key
        },
      });
      setData(response.data); // Adjust this based on your API response structure
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* Render your dashboard data here, e.g., using charts or tables */}
    </div>
  );
};

export default Dashboard;
