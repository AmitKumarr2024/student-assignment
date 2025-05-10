import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchStudents } from '../Store/studentSlice';

const StudentsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const studentState = useSelector((state) => state.students);

  const { user } = authState || {};
  const { students, loading } = studentState || {};

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view student details');
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch students when component mounts and if the students array is empty
  useEffect(() => {
    if (!students || students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [students, dispatch]);

  // Find the student after the list is updated or on id change
  const student = students?.find((stu) => stu.id === id);

  if (loading) {
    return <div className="text-center mt-6 text-blue-500">Loading student details...</div>;
  }

  if (!student) {
    return (
      <div className="p-4 text-center text-xl text-red-500">
        Student not found
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Student Details</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
      <p><strong>Address:</strong> {student.address || 'N/A'}</p>

      <button
        onClick={() => navigate(`/studentEdit/${student.id}`)}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    </div>
  );
};

export default StudentsDetail;
