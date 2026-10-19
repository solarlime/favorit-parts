import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchManufacturers, searchAnalogues } from '../services/api';

export const fetchManufacturers = createAsyncThunk(
  'parts/fetchManufacturers',
  async (number, { rejectWithValue }) => {
    try {
      const response = await searchManufacturers(number);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnalogues = createAsyncThunk(
  'parts/fetchAnalogues',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      const response = await searchAnalogues(number, brand);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  number: '',
  manufacturers: [],
  selectedBrand: null,
  analogues: [],
  loading: false,
  error: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    clearResults: (state) => {
      state.manufacturers = [];
      state.analogues = [];
      state.selectedBrand = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search manufacturers
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        state.manufacturers = action.payload.goods || [];
        state.error = null;
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search manufacturers';
      })
      // Search analogues
      .addCase(fetchAnalogues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalogues.fulfilled, (state, action) => {
        state.loading = false;
        state.analogues = action.payload.goods || [];
        state.error = null;
      })
      .addCase(fetchAnalogues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search analogues';
      });
  },
});

export const { setNumber, setSelectedBrand, clearResults } = partsSlice.actions;
export default partsSlice.reducer;
