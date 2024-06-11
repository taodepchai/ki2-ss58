import React, { useEffect, useState } from 'react';
import { Student } from './types';

interface StudentFormProps {
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  student: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({ addStudent, updateStudent, student }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'>>({
    student_name: '',
    email: '',
    address: '',
    phone: '',
    status: true,
    created_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (student) {
      setFormData({
        student_name: student.student_name,
        email: student.email,
        address: student.address,
        phone: student.phone,
        status: student.status,
        created_at: student.created_at,
      });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? value === 'true' : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (student) {
      updateStudent({ ...formData, id: student.id });
    } else {
      addStudent({ ...formData, id: Date.now() });
    }
    setFormData({
      student_name: '',
      email: '',
      address: '',
      phone: '',
      status: true,
      created_at: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} placeholder="Tên sinh viên" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại" required />
      <select name="status" value={formData.status ? 'true' : 'false'} onChange={handleChange}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input type="date" name="created_at" value={formData.created_at} onChange={handleChange} required />
      <button type="submit">{student ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}</button>
    </form>
  );
};

export default StudentForm;
