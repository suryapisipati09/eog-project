import { spawn, call } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/Metrics/metrics-saga';

function* fetchAll() {
  yield spawn(weatherSaga);
  yield spawn(metricsSaga);
}

export default function* root() {
  yield call(fetchAll);
}
