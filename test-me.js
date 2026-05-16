import * as hre from "hardhat";

async function main() {
  console.log("--- DÉBUT DU TEST (GLOBAL ETHERS) ---");

  // On utilise 'ethers' directement sans l'importer
  // Hardhat l'injecte tout seul au moment de l'exécution
  const ElectionRegistry = await hre.ethers.getContractFactory("ElectionRegistry");
  
  console.log("Déploiement du contrat...");
  const election = await ElectionRegistry.deploy();
  await election.waitForDeployment();
  
  const address = await election.getAddress();
  console.log("✅ Contrat déployé à :", address);

  console.log("Enregistrement du PV pour BAMAKO_001...");
  const tx = await election.registerPV("BAMAKO_001", "HASH_TEST_2026_V1");
  await tx.wait(); 
  
  const data = await election.getPV("BAMAKO_001");
  console.log("\n--- VÉRIFICATION ---");
  console.log("Hash trouvé :", data[0]);
  console.log("-------------------\n");
}

main().catch((error) => {
  console.error("❌ Erreur :");
  console.error(error);
  process.exitCode = 1;
});