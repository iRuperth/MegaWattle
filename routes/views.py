from flask import Blueprint, render_template, send_from_directory

import config

views_bp = Blueprint("views", __name__)

DIST_DIR = config.BASE_DIR / "static" / "dist"


@views_bp.route("/")
def index():
    """Sirve el bundle de React si existe (make build), si no la plantilla legacy."""
    if (DIST_DIR / "index.html").exists():
        return send_from_directory(DIST_DIR, "index.html")
    return render_template("index.html")


@views_bp.route("/assets/<path:filename>")
def dist_assets(filename: str):
    return send_from_directory(DIST_DIR / "assets", filename)


@views_bp.route("/logo.png")
def logo():
    return send_from_directory(DIST_DIR, "logo.png")


@views_bp.route("/favicon.png")
def favicon_png():
    return send_from_directory(DIST_DIR, "favicon.png")


@views_bp.route("/favicon.ico")
def favicon():
    return send_from_directory(DIST_DIR, "favicon.png")


@views_bp.route("/pitch/<path:filename>")
def pitch_assets(filename: str):
    return send_from_directory(DIST_DIR / "pitch", filename)


@views_bp.route("/fuentes")
def fuentes():
    path = config.BASE_DIR / "docs" / "fuentes.md"
    if not path.exists():
        return "Documento no disponible", 404
    return path.read_text(encoding="utf-8"), 200, {"Content-Type": "text/markdown; charset=utf-8"}


@views_bp.route("/healthz")
def healthz():
    return {"ok": True}
