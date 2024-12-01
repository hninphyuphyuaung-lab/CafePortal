// src/components/AddEditCafe.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCafe, updateCafe, getCafes } from '../api';
import { TextField, Button, Typography } from '@mui/material';

function AddEditCafe() {
  const { id } = useParams(); // Get the café ID from the URL for editing
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });
  const [isDirty, setIsDirty] = useState(false); // Track unsaved changes

  useEffect(() => {
    if (id) {
      // Prefill the form for editing
      fetchCafeDetails();
    }
  }, [id]);

  const fetchCafeDetails = async () => {
    try {
      const response = await getCafes();
      const cafe = response.data.find((cafe) => cafe.id === id);
      if (cafe) {
        setFormValues(cafe);
      }
    } catch (error) {
      console.error('Error fetching café details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setIsDirty(true);
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, logo: e.target.files[0] });
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => formData.append(key, value));
      if (id) {
        await updateCafe(id, formData);
      } else {
        await addCafe(formData);
      }
      navigate('/'); // Redirect to café page
    } catch (error) {
      console.error('Error saving café:', error);
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Do you want to leave?')) {
      return;
    }
    navigate('/'); // Redirect to café page
  };

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Café' : 'Add New Café'}</Typography>
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
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleChange}
          inputProps={{ maxLength: 256 }}
          multiline
          required
        />
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <TextField
          name="location"
          label="Location"
          value={formValues.location}
          onChange={handleChange}
          required
        />
        <div>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button onClick={handleCancel} variant="outlined" style={{ marginLeft: '1rem' }}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCafe;
