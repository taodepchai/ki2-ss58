import React from 'react';
import { Student } from './types';

interface StudentItemProps {
  student: Student;
  index: number;
  deleteStudent: (id: number) => void;
  editStudent: (student: Student) => void;
}

const StudentItem: React.FC<StudentItemProps> = ({ student, index, deleteStudent, editStudent }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{student.student_name}</td>
      <td>{student.email}</td>
      <td>{student.address}</td>
      <td>{student.phone}</td>
      <td>{student.status ? 'Active' : 'Inactive'}</td>
      <td>{new Date(student.created_at).toLocaleDateString()}</td>
      <td>
        <button onClick={() => editStudent(student)}>Sửa</button>
        <button onClick={() => deleteStudent(student.id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default StudentItem;
