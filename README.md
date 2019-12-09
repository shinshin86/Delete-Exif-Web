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


## How to use

Running Backend server

	cd backend
	python delete_exif_web.py

Running Frontend's local server

```bash
cd frontend
yarn run start # npm run start
```

**Browser access to "localhost:3000"**



## How to use - Concurrent Start (Recommended)

```bash
# development mode
NODE_ENV=development bash start.sh

# production mode
NODE_ENV=production bash start.sh
```

**Browser access to "localhost:3000"**