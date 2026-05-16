const hre = require("hardhat");

async function main() {
  console.log("🚀 Lancement du déploiement de ElectionRegistry...");

  // 1. Récupérer le contrat compilé
  const ElectionRegistry = await hre.ethers.getContractFactory("ElectionRegistry");
  
  // 2. Déclencher le déploiement
  const electionRegistry = await ElectionRegistry.deploy();

  // 3. Attendre la confirmation sur la blockchain locale
  await electionRegistry.waitForDeployment();

  const address = await electionRegistry.getAddress();

  console.log("✅ Contrat déployé avec succès !");
  console.log("📍 Adresse du contrat :", address);
  console.log("--------------------------------------------------");
  console.log("Copie cette adresse dans ton application.properties");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});