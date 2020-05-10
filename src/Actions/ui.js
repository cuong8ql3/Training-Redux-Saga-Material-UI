import * as uiTypes from '../Constants/ui'

export const showLoading = () => ({
  type: uiTypes.SHOW_LOADING,
})

export const hideLoading = () => ({
  type: uiTypes.HIDE_LOADING,
})

export const showSideBar = () => ({
  type: uiTypes.SHOW_SIDEBAR,
})

export const hideSideBar = () => ({
  type: uiTypes.HIDE_SIDEBAR,
})
