import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import assert from "node:assert";

async function main() {
  console.log("--- DÉBUT DU TEST ELECTION REGISTRY ---");

  const ElectionRegistry = await ethers.getContractFactory("ElectionRegistry");
  const election = await ElectionRegistry.deploy();
  await election.waitForDeployment();

  const tx = await election.registerPV("BAMAKO_001", "HASH_TEST_2026_V1");
  await tx.wait();

  const data = await election.getPV("BAMAKO_001");
  assert.equal(data[0], "HASH_TEST_2026_V1");
  assert(Number(data[1]) > 0);

  console.log("✅ Déploiement et enregistrement réussis.");
  console.log("Hash récupéré :", data[0]);
  console.log("Timestamp :", data[1].toString());
}

main().catch((error) => {
  console.error("❌ Erreur de test :", error);
  process.exitCode = 1;
});
