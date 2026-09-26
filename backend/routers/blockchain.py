"""
🔗 Blockchain Router
POST /api/blockchain/submit-farmer-request  — Hash farmer data & create block.
POST /api/blockchain/commit-company-solution — Company issues fertiliser prescription.
GET  /api/blockchain/chain                   — View the full blockchain ledger.
GET  /api/blockchain/pending                 — View pending farmer requests.
"""

from fastapi import APIRouter
from models.schemas import FarmerRequestPayload, CompanySolutionPayload
from services.blockchain_service import (
    submit_farmer_request,
    commit_company_solution,
    get_chain,
    get_pending_requests
)

router = APIRouter(prefix="/api/blockchain", tags=["Blockchain"])


@router.post("/submit-farmer-request")
async def submit_farmer(payload: FarmerRequestPayload):
    """
    Submit farmer telemetry data to the blockchain.
    Hashes plant disease, MQTT sensor, and soil data using SHA-256.
    Builds a Merkle Tree and creates a new block.
    """
    result = submit_farmer_request(payload.model_dump())
    return result


@router.post("/commit-company-solution")
async def commit_solution(payload: CompanySolutionPayload):
    """
    Company reviews farmer data and commits a fertiliser prescription.
    The prescription is hashed and minted as a new block on the chain.
    Farmer's dashboard automatically receives the recommendation.
    """
    result = commit_company_solution(payload.model_dump())
    return result


@router.get("/chain")
async def view_chain():
    """
    Get the full blockchain ledger with all blocks.
    """
    return get_chain()


@router.get("/pending")
async def view_pending():
    """
    Get all pending farmer requests awaiting company analysis.
    """
    pending = get_pending_requests()
    return {
        "success": True,
        "pending_requests": pending,
        "count": len(pending)
    }
