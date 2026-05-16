# election-blockchain
VoteLedger — Blockchain Smart Contracts (Hardhat)
Ce dépôt contient l'infrastructure blockchain du projet VoteLedger, un système décentralisé de vérification et d'audit des Procès-Verbaux (PV) d'élections. Il utilise le framework Hardhat pour le développement, le test et le déploiement du smart contract core ElectionRegistry.

L'objectif de cette couche est d'assurer l'ancrage cryptographique immuable des résultats terrain pour empêcher toute altération ultérieure dans les registres centralisés.

🚀 Fonctionnalités Core
Ancrage Immuable : Enregistrement des empreintes numériques (SHA-256) des PV associés à un identifiant unique de bureau de vote.

Vérification Transparente : Consultation publique et décentralisée des hachages pour l'audit en temps réel (utilisé par l'API Spring Boot).

Sécurisation des Rôles : Seuls les comptes d'agents ou d'administrateurs autorisés (CENI) peuvent sceller de nouvelles données.

🛠️ Prérequis
Avant de commencer, assure-toi d'avoir installé :

Node.js (v18+ recommandé)

Nnpm ou Yarn

📦 Installation & Configuration
Clône le dépôt et installe les dépendances :

Bash
git clone https://github.com/votre-username/voteledger-blockchain.git
cd voteledger-blockchain
npm install
Crée un fichier .env à la racine du projet en te basant sur le fichier d'exemple :

Bash
cp .env.example .env
Remplis les variables d'environnement dans le .env :

Extrait de code
PRIVATE_KEY="votre_cle_privee_de_deploiement"
RPC_URL="http://127.0.0.1:8545" # Pour le réseau local Hardhat
💻 Commandes Utiles
1. Compiler le Smart Contract
Génère les artefacts (ABI et Bytecode) indispensables pour la génération du wrapper Web3j côté backend Spring Boot.

Bash
npx hardhat compile
2. Lancer une Node Locale (Blockchain de test)
Démarre un réseau Ethereum local simulant des blocs instantanés avec 20 comptes pré-alimentés en faux ETH. Laisse ce terminal ouvert.

Bash
npx hardhat node
3. Déployer le Smart Contract
Déploie le contrat ElectionRegistry sur le réseau local (ou un testnet spécifié).

Bash
# Déploiement en local
npx hardhat run scripts/deploy.js --network localhost
Note : Une fois le contrat déployé, récupère l'adresse générée (ex: 0x5FbDB2315678afecb367f032d93F642f64180aa3) et reporte-la dans le fichier application.properties du backend Spring Boot.

4. Exécuter les Tests Unitaires
Lance la suite de tests écrits avec Chai/Mocha pour valider la robustesse et la sécurité des fonctions électorales.

Bash
npx hardhat test
📄 Structure du Smart Contract (ElectionRegistry.sol)
Le contrat expose principalement deux fonctions clés lues par l'écosystème :

registerPV(string memory _bureauId, string memory _photoHash) : Permet d'ancrer l'empreinte d'un PV original. Émet un événement pour le suivi des blocs.

getPV(string memory _bureauId) : Renvoie un tuple contenant le hachage stocké et le timestamp exact du bloc d'écriture. (Méthode en lecture seule sans frais de Gas).

🔗 Intégration avec le Backend (Spring Boot)
Pour régénérer le wrapper Java nécessaire à l'API VoteLedger après une modification du contrat Solidity :

Installe l'outil CLI Web3j.

Exécute la commande d'exportation :

Bash
web3j generate solidity -a ./artifacts/contracts/ElectionRegistry.sol/ElectionRegistry.json -o ../backend-api/src/main/java/ -p com.voteledger.backend_api.wrapper
🔒 Sécurité
Les fonctions de modification d'état sont protégées par des modificateurs de type onlyOwner ou onlyAgent.

Les hachages transmis sont au format hexadécimal strict pour optimiser le stockage en mémoire (Gas optimization).
