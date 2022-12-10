import { take, put, call, fork } from 'redux-saga/effects';
import { DELETE_EXIF, successDeleteExif, failureDeleteExif } from '../actions';
import fetch from 'isomorphic-fetch';
import FileSaver from 'file-saver';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* handleDeleteExif() {
  while (true) {
    const action = yield take(DELETE_EXIF);
    const successFiles = yield call(fileUpload, action.files);

    // chunk file upload
    // [Note] Not yet fix is done on the return value
    // const successFiles = yield call(chunkFileUpload, action.files);
    if (successFiles.length !== 0) {
      const res = Object.assign(successFiles, { result: true });
      yield put(successDeleteExif(res));
    } else {
      yield put(failureDeleteExif({ result: false }));
    }
  }
}

async function fileUpload(files) {
  let successFiles = [];
  const url = 'http://localhost:3001/upload';

  await Promise.all(
    files.map(async file => {
      const formData = new FormData();
      formData.append('upload_file', file);

      return fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => {
          if (res.status === 200) {
            return res.blob();
          } else {
            console.error('ERROR: Not response status 200');
          }
        })
        .then(blob => {
          if (blob.type === 'image/jpeg') {
            FileSaver.saveAs(blob, file.name);
            successFiles.push(file);
          } else {
            console.log(`Failured file : ${file.name}`);
          }
        })
        .catch(err => {
          console.log(`Failured file : ${file.name}`);
        });
    })
  );
  return successFiles;
}

const chunkFileUpload = async files => {
  let successFiles = [];
  const url = 'http://localhost:3001/chunk-upload';

  await Promise.all(
    files.map(async file => {
      // Create 2MB chunk files
      const size = 1024 * 1024 * 2;
      const fileChunks = [];
      let index = 1;

      for (let cur = 0; cur < file.size; cur += size) {
        fileChunks.push({
          name: file.name,
          index,
          chunk: file.slice(cur, cur + size),
          size: file.size
        });

        index++;
      }

      const uploadFileChunks = async chunks => {
        const pool = [];
        const max = 3;
        let finishdChunks = 0;

        for (let i = 0; i < chunks.length; i++) {
          // TODO:
          // sleep is put in so that the order of processing on the backend side is completely serial.
          // There may be a better way here.
          await sleep(300);

          const item = chunks[i];
          const formData = new FormData();
          formData.append('index', item.index);
          formData.append('chunk', item.chunk);
          formData.append('name', item.name);
          formData.append('file_size', item.size);
          formData.append('total', chunks.length);

          const uploadTask = fetch(url, {
            method: 'POST',
            body: formData
          });

          uploadTask
            .then(data => {
              const index = pool.findIndex(t => t === uploadTask);
              pool.splice(index);
            })
            .catch(err => {
              console.error(err);
            })
            .finally(async () => {
              finishdChunks++;

              if (finishdChunks === chunks.length) {
                const downloadUrl =
                  'http://localhost:3001/merged-file-download';
                const payload = { name: item.name };

                fetch(downloadUrl, {
                  method: 'POST',
                  body: JSON.stringify(payload)
                })
                  .then(res => {
                    if (res.status === 200) {
                      return res.blob();
                    } else {
                      console.error('ERROR: Not response status 200');
                    }
                  })
                  .then(blob => {
                    if (blob.type === 'image/jpeg') {
                      FileSaver.saveAs(blob, file.name);
                      successFiles.push(file);
                    } else {
                      console.log(`Failured file : ${file.name}`);
                    }
                  })
                  .catch(error => {
                    console.log({ error });
                    console.log(`Failured file : ${file.name}`);
                  });
              }
            });

          pool.push(uploadTask);
          if (pool.length === max) {
            await Promise.race(pool);
          }
        }
      };

      uploadFileChunks(fileChunks);
    })
  );
  return successFiles;
};

export default function* root() {
  yield fork(handleDeleteExif);
}
