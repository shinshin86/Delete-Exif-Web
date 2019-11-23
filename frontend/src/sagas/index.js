import { take, put, call, fork } from 'redux-saga/effects'
import{
  DELETE_EXIF, successDeleteExif, failureDeleteExif
} from '../actions'
import fetch from 'isomorphic-fetch'
import FileSaver from 'file-saver';

export function* handleDeleteExif() {
  while(true) {
    const action = yield take(DELETE_EXIF)
    const successFiles = yield call(fileUpload, action.files)

    if(successFiles.length !== 0) {
      const res = Object.assign(successFiles, {result: true})
      yield put(successDeleteExif(res))
    } else {
      yield put(failureDeleteExif({result: false}))
    }
  }
}

async function fileUpload(files){
  let successFiles = []
  const url = 'http://localhost:3001/upload'

  await Promise.all(files.map(async (file) => {
      const formData = new FormData()
      formData.append('upload_file', file)

      return fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => {
          if (res.status === 200) {
            return res.blob()
          } else {
            console.error("ERROR: Not response status 200")
          }
        })
        .then(blob => {
          if(blob.type === "image/jpeg" ) {
            FileSaver.saveAs(blob, file.name)
            successFiles.push(file)
          } else {
            console.log(`Failured file : ${file.name}`)
          }
        })
        .catch(err => {
          console.log(`Failured file : ${file.name}`)
        })
    })
  )
  return successFiles
}

export default function* root() {
  yield fork(handleDeleteExif)
}
