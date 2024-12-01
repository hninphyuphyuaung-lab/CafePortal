// src/pages/EmployeePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../api';
import { AgGridReact } from 'ag-grid-react';
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For delete confirmation
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    navigate('/add-employee');
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };

  const handleDeleteEmployee = async () => {
    try {
      if (selectedEmployee) {
        await deleteEmployee(selectedEmployee.id);
        setSelectedEmployee(null);
        fetchEmployees(); // Refresh the employee list
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const openDeleteConfirmation = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDeleteConfirmation = () => {
    setSelectedEmployee(null);
  };

  const columns = [
    { headerName: 'Employee ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
    { headerName: 'Days Worked', field: 'daysWorked', sortable: true, filter: true },
    { headerName: 'Café', field: 'cafeName', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginRight: '8px' }}
            onClick={() => handleEditEmployee(params.data.id)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => openDeleteConfirmation(params.data)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: '16px' }}>Employees</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px' }}
        onClick={handleAddEmployee}
      >
        Add New Employee
      </Button>
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          loadingOverlayComponent={() => <div>Loading...</div>}
          loadingOverlayComponentParams={{ loading }}
        />
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!selectedEmployee}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee "{selectedEmployee?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleDeleteEmployee} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeePage;
