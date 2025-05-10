import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../Store/studentSlice";

const AddStudent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    studentClass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(formData);
    if (values.some((value) => value === "")) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addStudent(formData));
    setFormData({
      name: "",
      email: "",
      course: "",
      phone: "",
      address: "",
      age: "",
      gender: "",
      studentClass: "",
    });
    setIsOpen(false); // Close modal after submit
  };

  return (
    <div className="flex justify-center mt-6">
      {/* Open Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Add Student
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-20  flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Student</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-red-500 text-lg"
              >
                ✖
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { name: "name", type: "text", placeholder: "Name" },
                { name: "email", type: "email", placeholder: "Email" },
                { name: "course", type: "text", placeholder: "Course" },
                { name: "phone", type: "text", placeholder: "Phone" },
                { name: "address", type: "text", placeholder: "Address" },
                { name: "age", type: "number", placeholder: "Age" },
                { name: "gender", type: "text", placeholder: "Gender" },
                { name: "studentClass", type: "text", placeholder: "Class" },
              ].map((input) => (
                <input
                  key={input.name}
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name]}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              ))}

              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
              >
                {loading ? "Adding..." : "Add Student"}
              </button>

              {error && <p className="text-red-600 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
