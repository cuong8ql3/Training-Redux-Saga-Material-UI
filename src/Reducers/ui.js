import * as types from '../Constants/ui'

const uiState = {
  showLoading: false,
  showSideBar: true,
}

const uiReducer = (state = uiState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
      }

    case types.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
      }

    case types.SHOW_SIDEBAR:
      return {
        ...state,
        showSideBar: true,
      }

    case types.HIDE_SIDEBAR:
      return {
        ...state,
        showSideBar: false,
      }

    default:
      return state
  }
}
export default uiReducer
