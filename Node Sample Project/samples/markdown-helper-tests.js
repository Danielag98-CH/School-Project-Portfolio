const {convertMarkdown, getMarkdownMetaData} = require("../modules/markdown-helpers");

const filePath = __dirname + "/sample.md"
console.log(convertMarkdown(filePath));

console.log(getMarkdownMetaData(filePath));