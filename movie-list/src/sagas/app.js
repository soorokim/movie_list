import { all, put, takeEvery, call, select } from 'redux-saga/effects';

import { AppActions, AppTypes, INITIAL_STATE } from "../reducers/app";

import { autoRestart } from './util'
import Api from './api';
import { store } from "../store";

const getState = state => state.app;

const makeRequestURL= (state) => {
  let requestURL = ""
  requestURL += state.genre ? `genres__genre=${state.genre}&` : ""
  requestURL += state.year ? `year=${state.year}&` : ""
  requestURL += state.sort ? `sort=${state.sort}&` : ""
  requestURL += state.search ? `search=${state.search}&` : ""
  console.log(state.search)
  console.log(requestURL)

  requestURL += `page=${state.page}`
  return requestURL
}
export default function* root() {
    yield all([
        takeEvery(AppTypes.MOVIE_LIST_REQUEST, function* movieListRequest({data}) {
            const LIST_URL = '/movie-list/?'

            const state = yield select(getState)
            let requestURL = makeRequestURL(state)

            let response = yield call(Api.genericCRUD, "select", LIST_URL+requestURL);
            if (response.ok) {
                yield put(AppActions.movieListSuccess(response.data));
            } else {
                yield put(AppActions.movieListFail(response.data));
            }
        }),
        takeEvery(AppTypes.CHART_REQUEST, function* chartRequest({data}) {
            const CHART_URL = '/chart'

            let response = yield call(Api.genericCRUD, "select", CHART_URL);
            if (response.ok) {
                yield put(AppActions.chartSuccess(response.data));
            } else {
                yield put(AppActions.chartFail(response.data));
            }
        }),
        takeEvery(AppTypes.DETAIL_CHART_REQUEST, function* chartRequest({data}) {
            const state = yield select(getState)

            const DETAIL_CHART_URL = '/detail-chart/?year='+state.detailChart.select

            let response = yield call(Api.genericCRUD, "select", DETAIL_CHART_URL);
            if (response.ok) {
                yield put(AppActions.detailChartSuccess(response.data));
            } else {
                yield put(AppActions.detailChartFail(response.data));
            }
        }),
    ])
}
