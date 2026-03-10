import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { id: 1, name: "Rahul", email: "rahul@test.com", age: 21 },
        { id: 2, name: "Priya", email: "priya@test.com", age: 22 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  const updateStudent = (student) => {
    setStudents(
      students.map((s) => (s.id === student.id ? student : s))
    );
    setEditStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Students Management</h1>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editStudent={editStudent}
      />

      <button
        onClick={downloadExcel}
        className="mt-4 mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Excel
      </button>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <StudentTable
          students={students}
          deleteStudent={deleteStudent}
          setEditStudent={setEditStudent}
        />
      )}
    </div>
  );
}

export default App;