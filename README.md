# Alteryx Tool Generator

Overview
---
Generator that scaffolds a custom Alteryx Designer tool with the HTML SDK and the choice of engine between JavaScript or Alteryx macro.

Running the main script will prompt questions, and then write files needed to scaffold.

Features
---
* Answer a set of questions and generate files for the scaffold
* Generated tool can immediately be viewed in Alteryx Designer
   * Written files are saved in *C:\Users\\{username}\AppData\Roaming\Alteryx\Tools*

Getting Started
---
* __Install__:
   1. clone this repo: [alteryx/alteryx-tool-generator](https://github.com/alteryx/alteryx-tool-generator.git)
   2. `npm install` in directory with *package.json*
* __Run__: `node alteryx-tool-generator.js` to scaffold your tool

Docs
---

Options
---
* *__Placeholder__: for additional commands*

Version Support
---
* **Should we have this section?**

|Technology|Version|
|----------|------:|
|node      |  6.9.1|
|npm       | 3.10.8|
|Alteryx   |   11.3|

Contribute
---
* *__Placeholder__: Need to discuss*

License
---
MIT License