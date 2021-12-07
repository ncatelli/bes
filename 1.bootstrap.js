(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../pkg/bes.js":
/*!*********************!*\
  !*** ../pkg/bes.js ***!
  \*********************/
/*! exports provided: simulate, hexdump, assemble_object, Mos6502JsSafe, __wbindgen_string_new, __wbindgen_throw, __wbindgen_rethrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bes_bg.wasm */ \"../pkg/bes_bg.wasm\");\n/* harmony import */ var _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bes_bg.js */ \"../pkg/bes_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"simulate\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"simulate\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hexdump\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"hexdump\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"assemble_object\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"assemble_object\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Mos6502JsSafe\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Mos6502JsSafe\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_string_new\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_rethrow\", function() { return _bes_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_rethrow\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/bes.js?");

/***/ }),

/***/ "../pkg/bes_bg.js":
/*!************************!*\
  !*** ../pkg/bes_bg.js ***!
  \************************/
/*! exports provided: simulate, hexdump, assemble_object, Mos6502JsSafe, __wbindgen_string_new, __wbindgen_throw, __wbindgen_rethrow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"simulate\", function() { return simulate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hexdump\", function() { return hexdump; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assemble_object\", function() { return assemble_object; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mos6502JsSafe\", function() { return Mos6502JsSafe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_rethrow\", function() { return __wbindgen_rethrow; });\n/* harmony import */ var _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bes_bg.wasm */ \"../pkg/bes_bg.wasm\");\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction getObject(idx) { return heap[idx]; }\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nfunction getArrayU8FromWasm0(ptr, len) {\n    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArray8ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 1);\n    getUint8Memory0().set(arg, ptr / 1);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n/**\n* @param {number} cycles\n* @param {Uint8Array} bin\n* @returns {Mos6502JsSafe}\n*/\nfunction simulate(cycles, bin) {\n    var ptr0 = passArray8ToWasm0(bin, _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"simulate\"](cycles, ptr0, len0);\n    return Mos6502JsSafe.__wrap(ret);\n}\n\n/**\n* hexdump formats a binary array into a a format emulating the output of xxd\n* or hexdump.\n* @param {Uint8Array} bytes\n* @returns {string}\n*/\nfunction hexdump(bytes) {\n    try {\n        const retptr = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](-16);\n        var ptr0 = passArray8ToWasm0(bytes, _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"]);\n        var len0 = WASM_VECTOR_LEN;\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"hexdump\"](retptr, ptr0, len0);\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        return getStringFromWasm0(r0, r1);\n    } finally {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](16);\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1);\n    }\n}\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n/**\n* @param {string} asm_src\n* @returns {Uint8Array}\n*/\nfunction assemble_object(asm_src) {\n    try {\n        const retptr = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](-16);\n        var ptr0 = passStringToWasm0(asm_src, _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n        var len0 = WASM_VECTOR_LEN;\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"assemble_object\"](retptr, ptr0, len0);\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        var v1 = getArrayU8FromWasm0(r0, r1).slice();\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1 * 1);\n        return v1;\n    } finally {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](16);\n    }\n}\n\n/**\n*/\nclass Mos6502JsSafe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Mos6502JsSafe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_mos6502jssafe_free\"](ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get acc() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_acc\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set acc(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_acc\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get x() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_x\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set x(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_x\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get y() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_y\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set y(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_y\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get sp() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_sp\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set sp(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_sp\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get pc() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_pc\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set pc(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_pc\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get ps() {\n        var ret = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_mos6502jssafe_ps\"](this.ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set ps(arg0) {\n        _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_mos6502jssafe_ps\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {Uint8Array}\n    */\n    ram() {\n        try {\n            const retptr = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](-16);\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mos6502jssafe_ram\"](retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v0 = getArrayU8FromWasm0(r0, r1).slice();\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1 * 1);\n            return v0;\n        } finally {\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](16);\n        }\n    }\n    /**\n    * @returns {Uint8Array}\n    */\n    rom() {\n        try {\n            const retptr = _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](-16);\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"mos6502jssafe_rom\"](retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            var v0 = getArrayU8FromWasm0(r0, r1).slice();\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](r0, r1 * 1);\n            return v0;\n        } finally {\n            _bes_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_add_to_stack_pointer\"](16);\n        }\n    }\n}\n\nfunction __wbindgen_string_new(arg0, arg1) {\n    var ret = getStringFromWasm0(arg0, arg1);\n    return addHeapObject(ret);\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\nfunction __wbindgen_rethrow(arg0) {\n    throw takeObject(arg0);\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/bes_bg.js?");

/***/ }),

/***/ "../pkg/bes_bg.wasm":
/*!**************************!*\
  !*** ../pkg/bes_bg.wasm ***!
  \**************************/
/*! exports provided: memory, __wbg_mos6502jssafe_free, __wbg_get_mos6502jssafe_acc, __wbg_set_mos6502jssafe_acc, __wbg_get_mos6502jssafe_x, __wbg_set_mos6502jssafe_x, __wbg_get_mos6502jssafe_y, __wbg_set_mos6502jssafe_y, __wbg_get_mos6502jssafe_sp, __wbg_set_mos6502jssafe_sp, __wbg_get_mos6502jssafe_pc, __wbg_set_mos6502jssafe_pc, __wbg_get_mos6502jssafe_ps, __wbg_set_mos6502jssafe_ps, mos6502jssafe_ram, mos6502jssafe_rom, simulate, hexdump, assemble_object, __wbindgen_add_to_stack_pointer, __wbindgen_free, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./bes_bg.js */ \"../pkg/bes_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/bes_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var bes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bes */ \"../pkg/bes.js\");\n\n\n// assembler constants\nconst assemblyInputTextObject = document.getElementById(\"assemblyInput\");\nconst assembleBtn = document.getElementById(\"assembleBtn\");\nconst binaryOutputTextObject = document.getElementById(\"binaryOutput\");\n\n// simulator constants\nconst simulateBtn = document.getElementById(\"simulateBtn\");\nconst simulatorSubSection = document.getElementById(\"simulatorSubSection\");\nconst simulatorAccRegisterOutputTextObject = document.getElementById(\"registerAccOutput\");\nconst simulatorXRegisterOutputTextObject = document.getElementById(\"registerYOutput\");\nconst simulatorYRegisterOutputTextObject = document.getElementById(\"registerXOutput\");\nconst simulatorPCRegisterOutputTextObject = document.getElementById(\"registerPCOutput\");\nconst simulatorPSRegisterOutputTextObject = document.getElementById(\"registerPSOutput\");\nconst simulatorSPRegisterOutputTextObject = document.getElementById(\"registerSPOutput\");\n\nconst simulatorMemoryOutputTextObject = document.getElementById(\"memoryOutput\");\n\n\nfunction download(filename, contentType, data) {\n    var element = document.createElement('a');\n    element.setAttribute('href', contentType + encodeURIComponent(data));\n    element.setAttribute('download', filename);\n\n    element.style.display = 'none';\n    document.body.appendChild(element);\n\n    element.click();\n\n    document.body.removeChild(element);\n}\n\nfunction assembleBinaryandUpdateHexdump(source) {\n    var binary = bes__WEBPACK_IMPORTED_MODULE_0__[\"assemble_object\"](source);\n    binaryOutputTextObject.textContent = bes__WEBPACK_IMPORTED_MODULE_0__[\"hexdump\"](binary);\n\n    return binary;\n}\n\nassembleBtn.addEventListener(\"click\", event => {\n    var source = assemblyInputTextObject.value;\n    var binary = assembleBinaryandUpdateHexdump(source);\n\n    // Start file download.\n    var b64Binary = Buffer.from(binary).toString('base64');\n    download(\"rom.bin\", 'data:application/octet-stream;base64,', b64Binary);\n});\n\nsimulateBtn.addEventListener(\"click\", event => {\n    var source = assemblyInputTextObject.value;\n    var binary = assembleBinaryandUpdateHexdump(source);\n    var state = bes__WEBPACK_IMPORTED_MODULE_0__[\"simulate\"](10000, binary);\n\n    simulatorAccRegisterOutputTextObject.value = state.acc;\n    simulatorXRegisterOutputTextObject.value = state.x;\n    simulatorYRegisterOutputTextObject.value = state.y;\n    simulatorPCRegisterOutputTextObject.value = state.pc;\n    simulatorPSRegisterOutputTextObject.value = state.ps;\n    simulatorSPRegisterOutputTextObject.value = state.sp;\n\n    simulatorMemoryOutputTextObject.textContent = bes__WEBPACK_IMPORTED_MODULE_0__[\"hexdump\"](state.ram())\n\n    simulatorSubSection.classList.remove(\"hidden\");\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/buffer/index.js */ \"./node_modules/buffer/index.js\").Buffer))\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);