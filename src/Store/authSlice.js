import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

// Google login
export const googleLogin = createAsyncThunk("auth/googleLogin", async (_, thunkAPI) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const googleUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL
    };
    return googleUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

// Check if the user is authenticated on app load
export const checkUserStatus = createAsyncThunk("auth/checkUserStatus", async (_, thunkAPI) => {
  try {
    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user ? {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL
        } : null);
      });
    });
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

// Email/Password login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName || null,
      photoURL: user.photoURL || null
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

// Signup user
export const signupUser = createAsyncThunk("auth/signupUser", async ({ email, password }, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName || null,
      photoURL: user.photoURL || null
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
