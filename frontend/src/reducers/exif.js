import {
  DELETE_EXIF, SUCCESS_DELETE_EXIF, FAILURE_DELETE_EXIF
} from '../actions'

const initial = {
  data: {
    isProcessing: false,
    data: {}
  },
};

export default function userManager(
  state=initial.data,
  action
) {
  switch (action.type) {
    case DELETE_EXIF:
      return {
        ...state,
        isProcessing: true
      }
    case SUCCESS_DELETE_EXIF:
      return {
        ...state, 
        isProcessing: false,
        data: action.data
      }
    case FAILURE_DELETE_EXIF:
      return {
        ...state, 
        isProcessing: false,
        data: action.data
      }
    default:
      return state
  }
}
