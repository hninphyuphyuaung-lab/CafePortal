// src/components/CafeTable.js
import React, { useState, useEffect } from 'react';
import { getCafes, deleteCafe } from '../api';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ConfirmationDialog from '../components/ConfirmationDialog';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function CafePage() {
  const [cafes, setCafes] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await getCafes();
      console.log(response);
      setCafes(response.data);
    } catch (error) {
      console.error('Error fetching cafes:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCafe(cafeToDelete);
      fetchCafes(); // Refresh list
      setConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting cafe:', error);
    }
  };

  const columns = [
    { headerName: 'Logo', field: 'logo', cellRenderer: ({ value }) => <img src={value} alt="logo" style={{ height: 50 }} /> },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Employees', field: 'employees', cellRenderer: ({ value }) => <Button onClick={() => navigate('/employees')}>{value}</Button> },
    {
      headerName: 'Actions',
      cellRenderer: ({ data }) => (
        <div>
          <Button onClick={() => navigate(`/edit-cafe/${data.id}`)}>Edit</Button>
          <Button onClick={() => { setCafeToDelete(data.id); setConfirmationOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
      <Button variant="contained" onClick={() => navigate('/add-cafe')}>Add New Café</Button>
      <AgGridReact rowData={cafes} columnDefs={columns} />
      <ConfirmationDialog open={confirmationOpen} onConfirm={handleDelete} onCancel={() => setConfirmationOpen(false)} />
    </div>
  );
}

export default CafePage;
