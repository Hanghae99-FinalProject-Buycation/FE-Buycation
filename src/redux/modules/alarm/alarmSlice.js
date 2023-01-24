import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  alarmList: [],
  isLoading: false,
  error: null,
};

export const __getAlarmCount = createAsyncThunk(
  "alarmList/get",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURLwToken.get(`alarm/count`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getAlarmList = createAsyncThunk(
  "alarmList/get",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await baseURLwToken.get(`alarm?key=${payload}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteAlarm = createAsyncThunk(
  "deleteAlarm/delete",
  async (payload, thunkAPI) => {
    console.log("알림Id", payload);
    try {
      const data = await baseURLwToken.delete(`alarm/${payload}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchAlarmState = createAsyncThunk(
  "patchAlarmState/patch",
  async (payload, thunkAPI) => {
    console.log("알림Id", payload);
    try {
      const data = await baseURLwToken.delpatchete(`alarm/${payload}`);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getAlarmList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmList = action.payload;
    });
  },
});

export const {} = alarmSlice.actions;
export default alarmSlice.reducer;
