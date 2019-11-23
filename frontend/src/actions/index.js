export const DELETE_EXIF = 'DELETE_EXIF'
export const SUCCESS_DELETE_EXIF = 'SUCCESS_DELETE_EXIF'
export const FAILURE_DELETE_EXIF = 'FAILURE_DELETE_EXIF'

export function deleteExif(files) {
  return {
    type: DELETE_EXIF,
    files
  }
}

export function successDeleteExif(data) {
  return {
    type: SUCCESS_DELETE_EXIF,
    data
  }
}
export function failureDeleteExif(data) {
  return {
    type: FAILURE_DELETE_EXIF,
    data
  }
}
