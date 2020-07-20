import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
  getMetrics: string;
};

export type ApiErrorAction = {
  error: string;
};

export type MeasurementQuery = {
  metricName: string;
};

export type MultipleMeasurements = {
  metric: string;
  measurements: Measurement[];
};

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

const initialState = {
  getMetrics: '',
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metrics>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
