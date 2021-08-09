import * as wasm from "bes";

// assembler constants
const assemblyInputTextObject = document.getElementById("assemblyInput");
const assembleBtn = document.getElementById("assembleBtn");
const binaryOutputTextObject = document.getElementById("binaryOutput");

// simulator constants
const simulateBtn = document.getElementById("simulateBtn");
const simulatorAccRegisterOutputTextObject = document.getElementById("registerAccOutput");
const simulatorXRegisterOutputTextObject = document.getElementById("registerYOutput");
const simulatorYRegisterOutputTextObject = document.getElementById("registerXOutput");
const simulatorPCRegisterOutputTextObject = document.getElementById("registerPCOutput");
const simulatorPSRegisterOutputTextObject = document.getElementById("registerPSOutput");
const simulatorSPRegisterOutputTextObject = document.getElementById("registerSPOutput");

const simulatorMemoryOutputTextObject = document.getElementById("memoryOutput");


function download(filename, contentType, data) {
    var element = document.createElement('a');
    element.setAttribute('href', contentType + encodeURIComponent(data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function assembleBinaryandUpdateHexdump(source) {
    var binary = wasm.assemble_object(source);
    binaryOutputTextObject.textContent = wasm.hexdump(binary);

    return binary;
}

assembleBtn.addEventListener("click", event => {
    var source = assemblyInputTextObject.value;
    var binary = assembleBinaryandUpdateHexdump(source);

    // Start file download.
    var b64Binary = Buffer.from(binary).toString('base64');
    download("rom.bin", 'data:application/octet-stream;base64,', b64Binary);
});

simulateBtn.addEventListener("click", event => {
    var source = assemblyInputTextObject.value;
    var binary = assembleBinaryandUpdateHexdump(source);
    var state = wasm.simulate(10000, binary);

    simulatorAccRegisterOutputTextObject.value = state.acc;
    simulatorXRegisterOutputTextObject.value = state.x;
    simulatorYRegisterOutputTextObject.value = state.y;
    simulatorPCRegisterOutputTextObject.value = state.pc;
    simulatorPSRegisterOutputTextObject.value = state.ps;
    simulatorSPRegisterOutputTextObject.value = state.sp;

    simulatorMemoryOutputTextObject.textContent = wasm.hexdump(state.ram())
});