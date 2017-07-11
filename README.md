Alteryx Tool Generator
===

Overview
---
Generator that scaffolds a custom Alteryx Designer tool with the HTML SDK and the choice of engine between JavaScript or Alteryx macro.

Running the main Node script will prompt questions, and then write files needed to scaffold.

Features
---
* Answer a set of questions and generate files for the scaffold
* Generated tool can immediately be viewed in Alteryx Designer

Getting Started
---
* __Install__:
   1. clone this repo: [alteryx/alteryx-tool-generator](https://github.com/alteryx/alteryx-tool-generator.git)
   2. `npm install` in directory with *package.json*
* __Run__: `node alteryx-tool-generator.js` to scaffold your tool
* __Tool Directory__: the written files are saved in *C:\Users\\{username}\AppData\Roaming\Alteryx\Tools*

Docs
---
* **Link to Alteryx documentation on HTML SDK**

Version Support
---

|Technology|Version|
|----------|------:|
|[Alteryx](http://downloads.alteryx.com/)   |   11.3|
|[node](https://nodejs.org/en/download/)      |  6.9.1|
|[npm](https://nodejs.org/en/download/)       | 3.10.8|

Contribute
---
* Contributions, questions, and comments are all welcome and encouraged. For code contributions, please submit a pull request. Website related issues should be filed on the [Alteryx Tool Generator](https://github.com/alteryx/alteryx-tool-generator/issues/new) issue tracker.

License
---
* [MIT License](https://github.com/alteryx/alteryx-tool-generator/blob/master/LICENSE)
* Alteryx Copyright 2017