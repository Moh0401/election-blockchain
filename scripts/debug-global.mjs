import "@nomicfoundation/hardhat-toolbox-mocha-ethers";
console.log("globalThis.hre", globalThis.hre);
console.log("globalThis.hre keys", globalThis.hre ? Object.keys(globalThis.hre) : null);
