
import axios from 'axios';

export interface Student {
  id?: number;
  student_name: string;
  age: number;
  grade: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

const API_URL = 'http://localhost:3000/students';

export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudentById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("Không tìm thấy bản ghi");
    } else {
      console.error('Error fetching student:', error);
    }
    throw error;
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

export const updateStudentById = async (id: number, student: Student) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("Không tìm thấy bản ghi");
    } else {
      console.error('Error updating student:', error);
    }
    throw error;
  }
};

export const deleteStudentById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status === 200) {
      console.log(`Student with ID ${id} deleted successfully`);
      return true;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("Không tìm thấy bản ghi");
    } else {
      console.error('Error deleting student:', error);
    }
    throw error;
  }
};
