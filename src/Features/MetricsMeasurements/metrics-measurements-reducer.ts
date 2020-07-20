import { createSlice, PayloadAction } from 'redux-starter-kit';
import { MultipleMeasurements } from '../Metrics/metrics-reducer';

export type MetricsMeasurements = {
  getMultipleMeasurements: [
    {
      metric: string;
      measurements: [
        {
          metric: string;
          at: number;
          unit: string;
          value: number;
        },
      ];
    },
  ];
};

export type ApiErrorAction = {
  error: string;
};

const initialState: MultipleMeasurements[] = [];

const slice = createSlice({
  name: 'metricsMeasurements',
  initialState,
  reducers: {
    metricMeasurementsDataRecevied: (state, action: PayloadAction<any>) => {
      //First rest the previous state
      state = [];
      //Then add new data in store
      return state.concat(action.payload.getMultipleMeasurements);
    },
    metricsMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {},
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
