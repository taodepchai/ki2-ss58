
import React, { useState } from "react";
import { deleteStudentById } from "./studentService";

const DeleteStudent: React.FC = () => {
  const [studentId, setStudentId] = useState<number>(1); 

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(parseInt(e.target.value));
  };

  const handleDelete = async () => {
    try {
      const success = await deleteStudentById(studentId);
      if (success) {
        console.log(`Student with ID ${studentId} deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div>
      <h1>Delete Student</h1>
      <div>
        <label>Student ID:</label>
        <input type="number" value={studentId} onChange={handleIdChange} />
      </div>
      <button onClick={handleDelete}>Delete Student</button>
    </div>
  );
};

export default DeleteStudent;
