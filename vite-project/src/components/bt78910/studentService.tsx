
import axios from 'axios';
import { Student } from './types';

const API_URL = 'http://localhost:3000/students';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const addStudent = async (student: Student) => {
  try {
    const response = await axios.post(API_URL, student);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const updateStudent = async (id: number, student: Student) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
