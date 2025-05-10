import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchStudents, updateStudent } from '../Store/studentSlice';

const StudentsEdit = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    studentClass: '', // Added field for class
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to edit student');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [dispatch, students]);

  // Log the fetched students data to check if students are being loaded correctly
  console.log("Fetched students:", students);

  useEffect(() => {
    const student = students?.find((stu) => stu.id === id);
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        course: student.course || '',
        phone: student.phone || '',
        address: student.address || '',
        age: student.age || '', // Populate age
        gender: student.gender || '', // Populate gender
        studentClass: student.studentClass || '', // Populate class
      });
      console.log("Student found for editing:", student);
    } else {
      console.log("No student found with id:", id); // Log if no student is found
    }
  }, [students, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Form data after change:", formData); // Log form data after change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData); // Log data before submitting

    try {
      // Dispatch the update action and log the response or error
      await dispatch(updateStudent({ id, ...formData })).unwrap();
      toast.success('Student updated successfully');
      navigate(`/studentDetails/${id}`);
    } catch (error) {
      toast.error('Failed to update student');
      console.error("Update error:", error); // Log the error if update fails
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Edit Student</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Class</label>
            <input
              type="text"
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              placeholder="Enter class"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentsEdit;
