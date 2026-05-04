import json
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6")
PORT = int(os.getenv("PORT", "5000"))


def _load_json(filename: str):
    path = DATA_DIR / filename
    if not path.exists():
        return [] if filename != "factores_biogas.json" else {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


CPDS = _load_json("cpds.json")
GRANJAS = _load_json("granjas.json")
FACTORES = _load_json("factores_biogas.json")
