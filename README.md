# mslice-boilerplate
## Overview
### Quick Start

Recommend to use yarn install!

```
git clone https://github.com/sanmaopep/mslice-boilerplate.git
cd mslice-biolerplate
npm install -g yarn
yarn install
npm run dev
```
### Production
```
npm run clean
npm run build
```
**Notice:**  clean will only clean files in \css,\js as well as files which type is html

## Structure
	├── dist # compile results and assets
	├── gulpfile.js
	├── LICENSE
	├── package.json
	├── README.md
	├── src
	│   ├── css
	│   │   └── main.scss # store scss source file
	│   ├── js
	│   │   └── main.js # store js source file
	│   └── pug
	│       └── index.pug # store pug source file
	└── yarn.lock
	

### TODOLIST

- CSS Sprite
- img 2 base64
- image uglify
- file hash in prod
- font uglify


## FAQ
Waiting....