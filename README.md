Alteryx Tool Generator
===

Overview
---
The Alteryx Tool Generator scaffolds a custom Alteryx Designer tool using the HTML GUI SDK and either the Javascript or Alteryx macro engine.

To use, run the main Node script and answer the prompts to write the needed files.

Features
---
* __Program__: Tool generation script
* __Output__: Alteryx Designer compatible tool

Getting Started
---
- Install the generator using the command line
   1. Clone or download the tool generator repository: [alteryx/alteryx-tool-generator](https://github.com/alteryx/alteryx-tool-generator.git)
   2. Navigate to the directory housing *package.json*
   3. Use `npm install`
- Run the generator
   1. Use `node alteryx-tool-generator.js` to create your new tool
- Access the written tool files
   1. Navigate to the tool directory: *C:\Users\\%USERNAME%\AppData\Roaming\Alteryx\Tools*

Docs
---
* [The Alteryx HTML GUI SDK help page](https://help.alteryx.com/developer/current/index.htm#HTML/Overview.htm)
* [Engine Works Blog Post](https://community.alteryx.com/t5/Engine-Works-Blog/Alteryx-Tool-Generator/ba-p/75216)

Version Support
---

|Technology|Version|
|----------|------:|
|[Alteryx](http://downloads.alteryx.com/)   |   11.5|
|[node](https://nodejs.org/en/download/)      |  6.9.1|
|[npm](https://nodejs.org/en/download/)       | 3.10.8|

Contribute
---
 Contributions, questions, and comments are welcome and encouraged. To contribute code, submit a pull request. To report website-related issues, file a report using the Alteryx Tool Generator [issue tracker](https://github.com/alteryx/alteryx-tool-generator/issues/new).

License
---
* [MIT License](https://github.com/alteryx/alteryx-tool-generator/blob/master/LICENSE)
* Alteryx Copyright 2017