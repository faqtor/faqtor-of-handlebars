const { render } = require("../dist/index");
const { cmd } = require("faqtor");

const testFile = "./test.html";
const testOutput = "./tested.html";

module.exports = {
    render: render(testFile, testOutput, {title: "Hello", text: "Hello from Handlebars."}).factor(),
    clean: cmd(`rimraf ${testOutput}`).factor(testOutput)
}