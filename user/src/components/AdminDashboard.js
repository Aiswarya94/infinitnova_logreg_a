import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'
// import Sidebar from './Sidebar';

function AdminDashboard() {
  

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
      setIsOpen(!isOpen);
  };

    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        city_name: '',
        population: 0,
        country: '',
        year: 2021,
    });

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/get-population');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({
            city_name: '',
            population: 0,
            country: '',
            year: 2021,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/add-population', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleCloseDialog();
            } else {
                console.error('Error adding data:', response.status);
            }
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/update-population/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleCloseDialog();
            } else {
                console.error('Error updating data:', response.status);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/delete-population/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchData();
            } else {
                console.error('Error deleting data:', response.status);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
      
        <div className="admin-page">


<div className="sidebar">
  <div className="accordion-header" onClick={toggleAccordion}>
    Menu
  </div>
  {isOpen && (
    <ul className="menu-list">
      <li>
        <Link to="/dashboard" className="link-no-decoration">
          Dashboard
        </Link>
      </li>
      <li>Editor</li>
      <li>
        {/* "Pages" dropdown */}
        <div className="dropdown">
          <span className="dropdown-header">Pages </span>
          <ul className="submenu">
            <li>
              <Link to="/pages/page1" className="link-no-decoration">
                Page 1
              </Link>
            </li>
            <li>
              <Link to="/pages/page2" className="link-no-decoration">
                Page 2
              </Link>
            </li>
            <li>
              <Link to="/pages/page3" className="link-no-decoration">
                Page 3
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )}
</div>

        <div className="admin">
        <h1>Admin Page</h1>
            <button className="add-button" onClick={handleOpenDialog}>
                Add Data
            </button>

            <table className="data-table">
            
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Population</th>
                        <th>Country</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.city_name}</td>
                            <td>{item.population}</td>
                            <td>{item.country}</td>
                            <td>{item.year}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setFormData({ ...item });
                                        handleOpenDialog();
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        handleDelete(item._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {openDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <div className="dialog-title">{formData._id ? 'Edit Data' : 'Add Data'}</div>
                        <div className="dialog-content">
                            <input
                                className="input-field"
                                type="text"
                                placeholder="City Name"
                                value={formData.city_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, city_name: e.target.value })
                                }
                            />
                            <input
                                className="input-field"
                                type="number"
                                placeholder="Population"
                                value={formData.population}
                                onChange={(e) =>
                                    setFormData({ ...formData, population: e.target.value })
                                }
                            />
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Country"
                                value={formData.country}
                                onChange={(e) =>
                                    setFormData({ ...formData, country: e.target.value })
                                }
                            />
                            <input
                                className="input-field"
                                type="number"
                                placeholder="Year"
                                value={formData.year}
                                onChange={(e) =>
                                    setFormData({ ...formData, year: e.target.value })
                                }
                            />
                        </div>
                        <div className="dialog-actions">
                            <button className="cancel-button" onClick={handleCloseDialog}>
                                Cancel
                            </button>
                            <button
                                className="save-button"
                                onClick={formData._id ? () => handleUpdate(formData._id) : handleSubmit}
                            >
                                {formData._id ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
