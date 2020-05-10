import * as Types from '../Constants/modal'

const modalState = {
  showModal: false,
  title: '',
  component: null,
}

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case Types.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
      }
    case Types.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        title: '',
        component: null,
      }
    case Types.CHANGE_MODAL_TITLE: {
      const { title } = action.payload
      return {
        ...state,
        title,
      }
    }
    case Types.CHANGE_MODAL_CONTENT: {
      const { component } = action.payload
      return {
        ...state,
        component,
      }
    }

    default:
      return state
  }
}

export default modalReducer
