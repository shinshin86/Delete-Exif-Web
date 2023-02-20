# Delete-Exif-Web
Delete a Exif at JPEG file.

The web version of [this repository(Delete-Exif)](https://github.com/shinshin86/Delete-Exif).


[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE)
------
## Install

    git clone https://github.com/shinshin86/Delete-Exif-Web.git

## Install python library

	pip install pillow
	pip install flask
	pip install -U flask-cors

### And install npm library

```bash
cd frontend
yarn # or "npm install"
```

## How to use - Concurrent Start (Recommended)

```bash
# development mode
NODE_ENV=development bash start.sh

# production mode
NODE_ENV=production bash start.sh
```

**Browser access to "localhost:3000"**


## How to use

Running Backend server

	cd backend
	python delete_exif_web.py

Running Frontend's local server

```bash
cd frontend

# development mode
NODE_ENV=development yarn run start # NODE_ENV=development npm run start

# production mode
NODE_ENV=production yarn run start # NODE_ENV=production npm run start
```

**Browser access to "localhost:3000"**

## Development tools

Delete all upload files `backend/static/tmp`

```sh
bash tmp-delete.sh
```


## Memo
This includes some of my own experiments.
And this project is not aimed at a practical tool.
For example...

* Implement SSR
* Chunk file upload (By default, this feature is commented out)

### Chunk file upload

When trying chunk file upload, please modify as follows.

```diff
--- a/frontend/src/sagas/index.js
+++ b/frontend/src/sagas/index.js
@@ -8,11 +8,11 @@ const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
 export function* handleDeleteExif() {
   while (true) {
     const action = yield take(DELETE_EXIF);
-    const successFiles = yield call(fileUpload, action.files);
+    // const successFiles = yield call(fileUpload, action.files);

     // chunk file upload
     // [Note] Not yet fix is done on the return value
-    // const successFiles = yield call(chunkFileUpload, action.files);
+    const successFiles = yield call(chunkFileUpload, action.files);
     if (successFiles.length !== 0) {
       const res = Object.assign(successFiles, { result: true });
       yield put(successDeleteExif(res));
```