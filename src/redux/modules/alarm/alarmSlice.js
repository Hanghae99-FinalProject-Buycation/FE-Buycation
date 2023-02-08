import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURLwToken } from "../../../core/axios";

const initialState = {
  alarmList: [],
  alarmKey: "",
  alarmModalStatus: false,
  deleteState: false,
  isLoading: false,
  error: null,
};

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
      const data = await baseURLwToken.delete(`alarm/${payload.alarmId}`);
      return thunkAPI.fulfillWithValue({ ...data.data, index: payload.index });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTotalAlarm = createAsyncThunk(
  "deleteTotalAlarm/delete",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURLwToken.delete(`alarm`);
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
    __sendAlarmModalStatus: (state, action) => {
      state.alarmModalStatus = action.payload;
    },
    __deleteState: (state, action) => {
      state.deleteState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAlarmList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmList = action.payload;
      // if (action.payload.nextPageRequest) {
      //   state.alarmKey = action.payload.nextPageRequest.key;
      // }
    });
    builder.addCase(__deleteAlarm.fulfilled, (state, action) => {
      // console.log(action.payload.index);
      state.isLoading = false;
      state.deleteState = true;
      state.alarmList = [
        ...state.alarmList.dataList.splice(action.payload.index, 1),
      ];
    });
    builder.addCase(__deleteTotalAlarm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteState = true;
      state.alarmList = action.payload;
    });
    builder.addCase(__patchAlarmState.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarmList = action.payload;
    });
  },
});

export const { __sendAlarmModalStatus, __deleteState } = alarmSlice.actions;
export default alarmSlice.reducer;
