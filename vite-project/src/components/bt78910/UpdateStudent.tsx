import React, { useState } from 'react';
import { updateStudentById, Student } from './studentService';

const UpdateStudent: React.FC = () => {
  const [student, setStudent] = useState<Student>({
    student_name: '',
    age: 0,
    grade: '',
    email: '',
    address: '',
    phone: '',
    status: false,
    created_at: new Date().toISOString().split('T')[0]
  });
  const [studentId, setStudentId] = useState<number>(1); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: name === 'age' ? parseInt(value) : name === 'status' ? value === 'true' : value
    }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedStudent = await updateStudentById(studentId, student);
      console.log('Student updated successfully:', updatedStudent);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="number" value={studentId} onChange={handleIdChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="student_name" value={student.student_name} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={student.age} onChange={handleChange} />
        </div>
        <div>
          <label>Grade:</label>
          <input type="text" name="grade" value={student.grade} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={student.address} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={student.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <input type="checkbox" name="status" checked={student.status} onChange={(e) => setStudent(prevState => ({ ...prevState, status: e.target.checked }))} />
        </div>
        <div>
          <label>Created At:</label>
          <input type="date" name="created_at" value={student.created_at} onChange={handleChange} />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
