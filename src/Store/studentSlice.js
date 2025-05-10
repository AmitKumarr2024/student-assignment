import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch students
export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const res = await axios.get(
    "https://681f463472e59f922ef5c432.mockapi.io/Student/students"
  );
  return res.data;
});

// Async thunk to update a student
export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, studentData }) => {
    const res = await axios.put(
      `https://681f463472e59f922ef5c432.mockapi.io/Student/students/${id}`,
      studentData
    );
    return res.data;
  }
);

// Async thunk to delete a student
export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await axios.delete(
    `https://681f463472e59f922ef5c432.mockapi.io/Student/students/${id}`
  );
  return id; // Return the id to remove the student from the state
});

// Async thunk to add a student
export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData) => {
    const res = await axios.post(
      "https://681f463472e59f922ef5c432.mockapi.io/Student/students",
      studentData
    );
    return res.data;
  }
);

// Create the student slice
const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch students cases
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update student cases
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        // Use map to return a new array with updated student data
        state.students = state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        );
        state.loading = false;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add student cases
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload); // Add new student to the list
        state.loading = false;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete student cases
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        // Filter out the student that was deleted
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default studentSlice.reducer;
