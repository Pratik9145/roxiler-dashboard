// File: src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchStatistics = (month) => API.get(`/statistics?month=${month}`);
export const fetchBarChart = (month) => API.get(`/bar-chart?month=${month}`);
export const fetchPieChart = (month) => API.get(`/pie-chart?month=${month}`);
