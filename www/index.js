import * as wasm from "bes";

const assemblyInputTextObject = document.getElementById("assemblyInput");
const assembleBtn = document.getElementById("assembleBtn");
const binaryOutputTextObject = document.getElementById("binaryOutput");

assembleBtn.addEventListener("click", event => {
    var binary = wasm.assemble_object_js(assemblyInputTextObject.value);
    binaryOutputTextObject.textContent = binary;
});
