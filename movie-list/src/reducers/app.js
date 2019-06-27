import update, { extend } from 'immutability-helper';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    movieListRequest: ['data'],
    movieListSuccess: ['data'],
    movieListFail: ['data'],
    sortChange: ['data'],
    genreChange: ['data'],
    yearChange: ['data'],
    searchChange: ['data'],
})

export const AppTypes = Types;
export const AppActions = Creators;

const ACTION_STATE = {
    init: {
        fetching: false,
        success: false,
        fail: false
    },
    request: {
        fetching: true,
        success: false,
        fail: false
    },
    success: {
        fetching: false,
        success: true,
        fail: false
    },
    fail: {
        fetching: false,
        success: false,
        fail: true
    }
}

export const INITIAL_STATE = {
  movieList:{
    data: [],
    ...ACTION_STATE.init
  },
  page: 1,
  genre: "",
  year: "",
  sort: "-rate",
  search: "",
}

export default createReducer(INITIAL_STATE, {
    [Types.MOVIE_LIST_REQUEST]: (state, {data}) => (
        update(state, {
            movieList: {
                $merge: {
                    ...ACTION_STATE.request
                }
            },
        })
    ),
    [Types.MOVIE_LIST_SUCCESS]: (state, {data}) => (
      update(state, {
        movieList: {
          $set: {
            data: state.movieList.data.concat(data.results),
            ...ACTION_STATE.request,
          }
        },
        page: {
          $set: data.next ? state.page+1 : 0
        }
      })
    ),
    [Types.MOVIE_LIST_FAIL]: (state, {data}) => (
        update(state, {
            movieList: {
                $set: {
                    data: data,
                    ...ACTION_STATE.fail
                }
            },
        })
    ),
    [Types.GENRE_CHANGE]: (state, {data}) => (
        update(state, {
            movieList: {
              $set: {
                data: [],
                ...ACTION_STATE.request,
              }
            },
            page: { $set:1 },
            genre: { $set:data }
        })
    ),
    [Types.YEAR_CHANGE]: (state, {data}) => (
        update(state, {
            movieList: {
              $set: {
                data: [],
                ...ACTION_STATE.request,
              }
            },
            page: { $set:1 },
            year: { $set:data }
        })
    ),
    [Types.SORT_CHANGE]: (state, {data}) => (
        update(state, {
            movieList: {
              $set: {
                data: [],
                ...ACTION_STATE.request,
              }
            },
            page: { $set:1 },
            sort: { $set:data }
        })
    ),
    [Types.SEARCH_CHANGE]: (state, {data}) => (
        update(state, {
            movieList: {
              $set: {
                data: [],
                ...ACTION_STATE.request,
              }
            },
            page: { $set:1 },
            search: { $set:data }
        })
    ),
})
