import { useState, useEffect } from "react";

export default function StudentForm({ addStudent, updateStudent, editStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      alert("Invalid email");
      return;
    }

    if (editStudent) {
      updateStudent({ ...form, id: editStudent.id });
    } else {
      addStudent(form);
    }

    setForm({
      name: "",
      email: "",
      age: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">

      <div className="grid grid-cols-4 gap-4">

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white rounded">
          {editStudent ? "Update" : "Add"}
        </button>

      </div>

    </form>
  );
}