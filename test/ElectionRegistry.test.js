const assert = require("node:assert");
const { ethers } = require("hardhat");

describe("ElectionRegistry", function () {
  it("should allow admin to register and retrieve a PV", async function () {
    const ElectionRegistry = await ethers.getContractFactory("ElectionRegistry");
    const election = await ElectionRegistry.deploy();
    await election.waitForDeployment();

    await election.registerPV("BAMAKO_001", "HASH_TEST_2026_V1");
    const [hash, timestamp] = await election.getPV("BAMAKO_001");

    assert.equal(hash, "HASH_TEST_2026_V1");
    assert(Number(timestamp) > 0);
  });

  it("should reject registration by a non-admin account", async function () {
    const ElectionRegistry = await ethers.getContractFactory("ElectionRegistry");
    const election = await ElectionRegistry.deploy();
    await election.waitForDeployment();

    const [, other] = await ethers.getSigners();
    await assert.rejects(
      election.connect(other).registerPV("BAMAKO_002", "HASH_TEST_2026_V2"),
      /Acces refuse/
    );
  });
});
