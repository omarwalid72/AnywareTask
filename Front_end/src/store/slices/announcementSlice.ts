import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import { mockAnnouncements } from "../../data/mockData";

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
  priority: "low" | "medium" | "high";
}

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null,
};

// ✅ Get All Announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/announcements");
      return res.data;
    } catch (error: any) {
      thunkAPI.rejectWithValue(
        error.message || "Failed to fetch announcements"  
      );
    }
  }
);

// ✅ Add Announcement
export const addAnnouncement = createAsyncThunk(
  "announcements/add",
  async (
    announcement: {
      title: string;
      content: string;
      date: string;
      priority: "low" | "medium" | "high";
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("/announcements", announcement);
      return res.data;
    } catch (error: any) {
    
      return thunkAPI.rejectWithValue(error.message || "Failed to add announcement");
    }
  }
);

// ✅ Update Announcement
export const updateAnnouncement = createAsyncThunk(
  "announcements/update",
  async (announcement: Announcement, thunkAPI) => {
    try {
      const { _id, ...data } = announcement;
      const res = await axios.put(`/announcements/${_id}`, data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to update announcement");
    }
  }
);

// ✅ Delete Announcement
export const deleteAnnouncement = createAsyncThunk(
  "announcements/delete",
  async (_id: string, thunkAPI) => {
    try {
      if (!_id) throw new Error("Missing _id");
      await axios.delete(`/announcements/${_id}`);
      return _id;
    } catch (error: any) {
      console.error("❌ Failed to delete:", error?.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to delete announcement"
      );
    }
  }
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.announcements.push(action.payload);
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const index = state.announcements.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) state.announcements[index] = action.payload;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter((a) => a._id !== action.payload);
      });
  },
});

export default announcementSlice.reducer;
