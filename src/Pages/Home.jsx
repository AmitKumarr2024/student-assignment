// pages/Home.jsx
import { useEffect, useState } from "react";
import { getDatabase } from "firebase/database";
import toast from "react-hot-toast";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Store/studentSlice";
import StudentsCard from "../components/StudentsCard";
import AddStudent from "../components/AddStudent";

const db = getDatabase(app);

const Home = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    toast.success("Home");
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="p-4">
      

      {loading && <p>Loading...</p>}

      <AddStudent isOpen={showModal} onClose={() => setShowModal(false)} />

      <StudentsCard students={students} />
    </div>
  );
};

export default Home;
