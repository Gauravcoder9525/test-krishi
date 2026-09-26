"""
🔗 Blockchain Service
SHA-256 hashing, Merkle Tree construction, and in-memory blockchain ledger.
Handles farmer telemetry submission and company prescription minting.
"""

import hashlib
import json
import time
from typing import Any, Dict, List, Optional


# ──────────────────────────────────────────────
# In-Memory Blockchain Ledger
# ──────────────────────────────────────────────
_blockchain_ledger: List[Dict[str, Any]] = []
_pending_requests: Dict[str, Dict[str, Any]] = {}


def sha256_hash(data: Any) -> str:
    """Compute SHA-256 hash of any data (string, dict, etc.)."""
    if isinstance(data, dict):
        data_str = json.dumps(data, sort_keys=True, default=str)
    else:
        data_str = str(data)
    return "0x" + hashlib.sha256(data_str.encode("utf-8")).hexdigest()


def calculate_merkle_root(leaves: List[str]) -> str:
    """Build a Merkle tree from leaf hashes and return the root hash."""
    if not leaves:
        return sha256_hash("EMPTY_LEAF")

    current_level = list(leaves)

    while len(current_level) > 1:
        next_level = []
        for i in range(0, len(current_level), 2):
            if i + 1 < len(current_level):
                combined = current_level[i] + current_level[i + 1]
            else:
                combined = current_level[i] + current_level[i]
            next_level.append(sha256_hash(combined))
        current_level = next_level

    return current_level[0]


def get_previous_hash() -> str:
    """Get the hash of the last block in the chain."""
    if _blockchain_ledger:
        return _blockchain_ledger[-1].get("hash", sha256_hash("GENESIS"))
    return sha256_hash("GENESIS_BLOCK_KRISHI_AI")


def submit_farmer_request(payload: dict) -> dict:
    """
    Process farmer telemetry data:
    1. Hash each data component (plant disease, MQTT sensors, soil)
    2. Build Merkle Tree
    3. Create and store a block
    """
    # Extract data components
    plant_data = payload.get("plantDiseaseData") or {
        "disease": "Pearl Millet Downy Mildew / Rust",
        "confidence": 93.3,
        "severity": "Moderate to Severe (Stage 2-3)"
    }
    mqtt_data = payload.get("mqttData") or {
        "soil1": 43.5,
        "temperature": 28.2,
        "humidity": 64,
        "rain": False,
        "counter": 142
    }
    soil_data = payload.get("soilData") or {
        "soilType": "Red Soil (लाल मिट्टी)",
        "ph": "6.5",
        "confidence": 94.3
    }

    # ── Hash each data leaf ──
    plant_leaf_hash = sha256_hash(plant_data)
    mqtt_leaf_hash = sha256_hash(mqtt_data)
    soil_leaf_hash = sha256_hash(soil_data)

    # ── Build Merkle Root ──
    merkle_root = calculate_merkle_root([plant_leaf_hash, mqtt_leaf_hash, soil_leaf_hash])

    # ── Create Block ──
    block_index = len(_blockchain_ledger) + 1
    block_id = f"MST-TX-{str(int(time.time()))[-4:]}"
    timestamp = int(time.time() * 1000)
    previous_hash = get_previous_hash()

    block = {
        "index": block_index,
        "blockId": block_id,
        "timestamp": timestamp,
        "blockType": "FARMER_TELEMETRY_REQUEST",
        "sender": payload.get("farmerName", "Rameshwar Sharma (Kisan)"),
        "farmerId": payload.get("farmerId", "KISAN-7829"),
        "location": payload.get("location", "Ghaziabad, Uttar Pradesh"),
        "crop": payload.get("crop", "Pearl Millet (Bajra)"),
        "plantDiseaseData": plant_data,
        "mqttData": mqtt_data,
        "soilData": soil_data,
        "leaves": {
            "plantLeafHash": plant_leaf_hash,
            "mqttLeafHash": mqtt_leaf_hash,
            "soilLeafHash": soil_leaf_hash
        },
        "merkleRoot": merkle_root,
        "previousHash": previous_hash,
        "status": "PENDING_COMPANY_ANALYSIS",
        "companyPrescription": None,
        "hash": sha256_hash({"merkleRoot": merkle_root, "time": timestamp})
    }

    # Store in ledger
    _blockchain_ledger.append(block)

    # Also store as pending request for company to review
    _pending_requests[block_id] = block

    return {
        "success": True,
        "message": f"Block #{block_index} mined and added to Krishi AI Blockchain",
        "block": block
    }


def commit_company_solution(payload: dict) -> dict:
    """
    Company reviews pending farmer request and issues fertiliser prescription.
    Creates a new solution block minted to the chain.
    """
    prescription = payload.get("prescription") or {
        "recommendedFertilizer": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
        "category": "Broad-Spectrum Bio-Fungicide",
        "dosage": "1.0 ml / Litre",
        "sprayTiming": "06:30 AM – 08:30 AM",
        "sprayFrequency": "2 Sprays (7-day gap)",
        "estimatedPriceINR": 480,
        "costPerAcre": "₹480 / एकड़",
        "subsidyINR": 120,
        "netPriceINR": 360,
        "urgency": "High (Immediate Spray Needed)"
    }

    block_index = len(_blockchain_ledger) + 1
    block_id = f"MST-SOL-{str(int(time.time()))[-4:]}"
    timestamp = int(time.time() * 1000)
    previous_hash = get_previous_hash()
    proof_hash = sha256_hash({"prescription": prescription, "time": timestamp})

    solution_block = {
        "index": block_index,
        "blockId": block_id,
        "timestamp": timestamp,
        "blockType": "FERTILIZER_PRESCRIPTION_SETTLED",
        "sender": payload.get("companyName", "IFFCO Precision Agri-Chemicals & Bio-Solutions"),
        "companyId": payload.get("companyId", "IFFCO-IND-409"),
        "prescription": prescription,
        "officerNotes": payload.get("officerNotes", "Approved by Chief Agronomist"),
        "blockProof": proof_hash,
        "previousHash": previous_hash,
        "status": "VERIFIED_AND_MINTED",
        "hash": sha256_hash({"proof": proof_hash, "time": timestamp})
    }

    # Add to ledger
    _blockchain_ledger.append(solution_block)

    # Update any pending request status
    for req_id, req_block in _pending_requests.items():
        if req_block.get("status") == "PENDING_COMPANY_ANALYSIS":
            req_block["status"] = "SOLVED_AND_PRESCRIBED"
            req_block["companyPrescription"] = prescription
            break

    return {
        "success": True,
        "message": "Prescription verified and minted on MST ledger",
        "result": {
            "solutionBlock": solution_block
        }
    }


def get_chain() -> dict:
    """Return the full blockchain ledger."""
    return {
        "success": True,
        "blocks": _blockchain_ledger,
        "length": len(_blockchain_ledger)
    }


def get_pending_requests() -> list:
    """Get all pending farmer requests awaiting company analysis."""
    return [
        block for block in _pending_requests.values()
        if block.get("status") == "PENDING_COMPANY_ANALYSIS"
    ]
