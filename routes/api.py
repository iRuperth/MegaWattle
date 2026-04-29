from flask import Blueprint, jsonify, request

import config

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("/cpds")
def list_cpds():
    ccaa = request.args.get("ccaa")
    provincia = request.args.get("provincia")
    items = config.CPDS
    if ccaa:
        items = [c for c in items if c.get("ccaa") == ccaa]
    if provincia:
        items = [c for c in items if c.get("provincia") == provincia]
    return jsonify(items)


@api_bp.route("/cpds/<cpd_id>")
def cpd_detail(cpd_id: str):
    for c in config.CPDS:
        if c.get("id") == cpd_id:
            return jsonify(c)
    return jsonify({"error": "not_found"}), 404


@api_bp.route("/granjas")
def list_granjas():
    ccaa = request.args.get("ccaa")
    tipo = request.args.get("tipo_animal")
    items = config.GRANJAS
    if ccaa:
        items = [g for g in items if g.get("ccaa") == ccaa]
    if tipo:
        items = [g for g in items if g.get("tipo_animal") == tipo]
    return jsonify(items)


@api_bp.route("/granjas/<granja_id>")
def granja_detail(granja_id: str):
    for g in config.GRANJAS:
        if g.get("id") == granja_id:
            return jsonify(g)
    return jsonify({"error": "not_found"}), 404


@api_bp.route("/factores")
def factores():
    return jsonify(config.FACTORES)


@api_bp.route("/match", methods=["POST"])
def match():
    from services.matching import match_cpds_granjas

    body = request.get_json(force=True) or {}
    cpd_ids = body.get("cpd_ids", [])
    radio_km = float(body.get("radio_km", 30))
    tipo_animal = body.get("tipo_animal")
    result = match_cpds_granjas(cpd_ids, radio_km, tipo_animal)
    return jsonify(result)


@api_bp.route("/ai/analizar", methods=["POST"])
def ai_analizar():
    from services.ai_client import analizar_escenario

    body = request.get_json(force=True) or {}
    parametros = body.get("parametros", {})
    resultados = body.get("resultados", {})
    out = analizar_escenario(parametros, resultados)
    return jsonify(out)
