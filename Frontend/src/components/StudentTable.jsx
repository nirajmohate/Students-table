export default function StudentTable({ students, deleteStudent, setEditStudent }) {

  if (students.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No students found
      </p>
    );
  }

  return (
    <table className="w-full border rounded">

      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.id} className="border-t hover:bg-gray-50">

            <td className="p-3">{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td className="space-x-2">

              <button
                onClick={() => setEditStudent(student)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStudent(student.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}