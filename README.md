# bes
A simulator/assembler pairing for developing for the BE6502.

## Building
### Locally

```
cargo build --release
```

### Browser
```
wasm-pack build
cd www/
npm run start
```

## Running Locally

```
bes --input-file <src file> --cycles <number of cycles to run>
```