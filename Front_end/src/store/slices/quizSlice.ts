import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import { mockQuizzes } from "../../data/mockData";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questionCount: number;
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null,
};

// ✅ Get All Quizzes
export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/quizzes");
      return res.data;
    } catch (error: any) {
      thunkAPI.rejectWithValue(
        error.message || "Failed to fetch quizzes"
      );
    }
  }
);

// ✅ Add Quiz (define fields manually instead of Omit)
export const addQuiz = createAsyncThunk(
  "quizzes/add",
  async (
    quiz: {
      title: string;
      description: string;
      questionCount: number;
      duration: number;
      difficulty: "easy" | "medium" | "hard";
      category: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("/quizzes", quiz);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to add quiz"
      );
    }
  }
);

// ✅ Update Quiz
export const updateQuiz = createAsyncThunk(
  "quizzes/update",
  async (quiz: Quiz, thunkAPI) => {
    try {
      const { _id, ...data } = quiz;
      const res = await axios.put(`/quizzes/${_id}`, data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update quiz");
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/delete",
  async (_id: string, thunkAPI) => {
    try {
      if (!_id) throw new Error("Missing ID");
      const res = await axios.delete(`/quizzes/${_id}`);
      return _id;
    } catch (error: any) {
      console.error(
        "❌ Failed to delete:",
        error?.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete quiz"
      );
    }
  }
);

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        const index = state.quizzes.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) state.quizzes[index] = action.payload;
      })
     
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
      });
  },
});

export default quizSlice.reducer;
