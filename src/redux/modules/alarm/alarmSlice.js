import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  alarmCount: 0,
  alarmList: [],
  alarmKey: "",
  deleteState: false,

  isLoading: false,
  error: null,
};

export const __getAlarmCount = createAsyncThunk(
  "alarmCount/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`alarm/count`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getAlarmList = createAsyncThunk(
  "alarmList/get",
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseURLwToken.get(`alarm?key=${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteAlarm = createAsyncThunk(
  "deleteAlarm/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURLwToken.delete(`alarm/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchAlarmState = createAsyncThunk(
  "patchAlarmState/patch",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURLwToken.patch(`alarm/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: {
    __deleteState: (state, action) => {
      state.deleteState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAlarmCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmCount = action.payload;
    });
    builder.addCase(__getAlarmList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmList = action.payload;
      // if (action.payload.nextPageRequest) {
      //   state.alarmKey = action.payload.nextPageRequest.key;
      // }
    });
    builder.addCase(__deleteAlarm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteState = true;
    });
    builder.addCase(__patchAlarmState.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmList = action.payload;
    });
  },
});

export const { __deleteState } = alarmSlice.actions;
export default alarmSlice.reducer;
