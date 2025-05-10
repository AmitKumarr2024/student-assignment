import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentsCard from "../components/StudentsCard";
import { fetchStudents } from "../Store/studentSlice";


const Students = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      
      <StudentsCard students={students} />;
    </>
  );
};

export default Students;
