import axios from 'axios';

const apiUrl = 'http://localhost:5114';  // Backend URL

export const getCafes = () => axios.get(`${apiUrl}/cafes`);
export const getEmployees = () => axios.get(`${apiUrl}/employees`);
export const addCafe = (cafe) => axios.post(`${apiUrl}/cafes`, cafe);
export const updateCafe = (id, cafe) => axios.put(`${apiUrl}/cafes`, cafe);
export const deleteCafe = (id) => axios.delete(`${apiUrl}/cafes/${id}`);
export const addEmployee = (employee) => axios.post(`${apiUrl}/employees`, employee);
export const updateEmployee = (id, employee) => axios.put(`${apiUrl}/employees`, employee);
export const deleteEmployee = (id) => axios.delete(`${apiUrl}/employees/${id}`);
