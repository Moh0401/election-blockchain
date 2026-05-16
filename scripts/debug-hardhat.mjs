const hardhat = await import("hardhat");
console.log("module keys:", Object.keys(hardhat));
console.log("default keys:", Object.keys(hardhat.default || {}));
