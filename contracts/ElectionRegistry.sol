// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ElectionRegistry {
    address public admin;

    struct PVData {
        string hash;
        uint256 timestamp;
    }

    // Associe l'ID du bureau aux données du PV
    mapping(string => PVData) private pvRecords;

    // Événement pour que le front puisse réagir en temps réel
    event PVStored(string indexed bureauId, string pvHash, uint256 timestamp);

    constructor() {
        admin = msg.sender;
    }

    function registerPV(string memory _bureauId, string memory _pvHash) public {
        require(msg.sender == admin, "Acces refuse: Admin uniquement");
        // SECURITE : Verifie si un hash existe deja pour ce bureau
        require(bytes(pvRecords[_bureauId].hash).length == 0, "Erreur: PV deja enregistre et immuable");

        pvRecords[_bureauId] = PVData({
            hash: _pvHash,
            timestamp: block.timestamp
        });

        emit PVStored(_bureauId, _pvHash, block.timestamp);
    }

    function getPV(string memory _bureauId) public view returns (string memory pvHash, uint256 time) {
        PVData memory data = pvRecords[_bureauId];
        require(bytes(data.hash).length > 0, "Aucun PV trouve pour ce bureau");
        return (data.hash, data.timestamp);
    }
}