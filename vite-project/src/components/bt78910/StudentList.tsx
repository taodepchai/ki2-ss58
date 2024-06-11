// src/components/StudentList.tsx
import React, { useEffect, useState } from 'react';
import StudentItem from './StudentItem';
import StudentForm from './StudentForm';
import { Student } from './types';
import { getAllStudents, addStudent, updateStudent, deleteStudent } from './studentService';

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data: Student[] = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleAddStudent = async (student: Student) => {
    try {
      await addStudent(student);
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleUpdateStudent = async (updatedStudent: Student) => {
    try {
      await updateStudent(updatedStudent.id, updatedStudent);
      fetchStudents();
      setSelectedStudent(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
  };

  return (
    <div>
      <button onClick={() => setIsEditing(true)}>Thêm mới sinh viên</button>
      {isEditing && (
        <StudentForm
          addStudent={handleAddStudent}
          updateStudent={handleUpdateStudent}
          student={selectedStudent}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Ngày thêm</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentItem
              key={student.id}
              student={student}
              index={index}
              deleteStudent={handleDeleteStudent}
              editStudent={handleEditStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
