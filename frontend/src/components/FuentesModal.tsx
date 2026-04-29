import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { marked } from "marked";
import { fetchFuentes } from "../lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function FuentesModal({ open, onClose }: Props) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || html) return;
    setLoading(true);
    fetchFuentes()
      .then((md) => setHtml(marked.parse(md) as string))
      .catch(() => setHtml("<p>Error cargando fuentes</p>"))
      .finally(() => setLoading(false));
  }, [open, html]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slide-up"
      >
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Fuentes y metodología</h3>
            <p className="text-xs text-slate-400">
              Datos públicos · IDAE · IPCC AR6 · IEA · REE · MAPA · DATADISTA
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {loading ? (
            <p className="text-slate-400 italic">Cargando…</p>
          ) : (
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
