import React, { useState } from "react";
import axios from "axios";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/doctors", doctor);
      alert("Doctor added successfully!");
      setDoctor({ name: "", specialization: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="specialization"
          value={doctor.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          required
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={doctor.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={doctor.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
