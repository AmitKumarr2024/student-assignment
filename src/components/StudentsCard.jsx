import { Link } from "react-router-dom";

const StudentsCard = ({ students = [] }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map((student) => (
          <Link to={`/studentDetails/${student.id}`} key={student.id} className="bg-white shadow-md rounded-lg p-4 w-64">
            <img
              src={student.avatar || "https://avatar.iran.liara.run/public/girl"}
              alt={student.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold text-center mt-2">{student.name}</h2>
            <p className="text-sm text-center">Email: {student.email}</p>
            <p className="text-sm text-center">Age: {student.age}</p>
            <p className="text-sm text-center">Class: {student.className}</p>
            <p className="text-sm text-center">Gender: {student.gender}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default StudentsCard;
