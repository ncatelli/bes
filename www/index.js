import * as wasm from "bes";

const assemblyInputTextObject = document.getElementById("assemblyInput");
const assembleBtn = document.getElementById("assembleBtn");
const binaryOutputTextObject = document.getElementById("binaryOutput");

function download(filename, contentType, data) {
    var element = document.createElement('a');
    element.setAttribute('href', contentType + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

assembleBtn.addEventListener("click", event => {
    var binary = wasm.assemble_object_js(assemblyInputTextObject.value);
    binaryOutputTextObject.textContent = Buffer.from(binary).toString('hex');
    // Start file download.

    var b64Binary = Buffer.from(binary).toString('base64');
    download("rom.bin", 'data:application/octet-stream;base64,', b64Binary);
});