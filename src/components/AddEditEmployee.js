// src/components/AddEditEmployee.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addEmployee, updateEmployee, getCafes, getEmployees } from '../api';
import { TextField, Button, Typography, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function AddEditEmployee() {
  const { id } = useParams(); // Get the employee ID for editing
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    assignedCafe: '',
  });
  const [isDirty, setIsDirty] = useState(false); // Track unsaved changes

  useEffect(() => {
    fetchCafes();
    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  const fetchCafes = async () => {
    try {
      const response = await getCafes();
      setCafes(response.data);
    } catch (error) {
      console.error('Error fetching cafés:', error);
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const response = await getEmployees();
      const employee = response.data.find((emp) => emp.id === id);
      if (employee) {
        setFormValues(employee);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, formValues);
      } else {
        await addEmployee(formValues);
      }
      navigate('/employees'); // Redirect to employee page
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Do you want to leave?')) {
      return;
    }
    navigate('/employees');
  };

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Employee' : 'Add New Employee'}</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <TextField
          name="name"
          label="Name"
          value={formValues.name}
          onChange={handleChange}
          inputProps={{ minLength: 6, maxLength: 10 }}
          required
        />
        <TextField
          name="email"
          label="Email"
          value={formValues.email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          name="phone"
          label="Phone Number"
          value={formValues.phone}
          onChange={handleChange}
          inputProps={{ pattern: '[89][0-9]{7}' }}
          required
        />
        <RadioGroup name="gender" value={formValues.gender} onChange={handleChange} row>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField
          name="assignedCafe"
          label="Assigned Café"
          select
          value={formValues.assignedCafe}
          onChange={handleChange}
          required
        >
          {cafes.map((cafe) => (
            <MenuItem key={cafe.id} value={cafe.id}>
              {cafe.name}
            </MenuItem>
          ))}
        </TextField>
        <div>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button onClick={handleCancel} variant="outlined" style={{ marginLeft: '1rem' }}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditEmployee;
