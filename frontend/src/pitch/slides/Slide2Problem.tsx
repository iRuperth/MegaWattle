import { AlertTriangle, Droplets, Server, Zap } from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

interface SlideProps {
  compact?: boolean;
}

export function Slide2Problem({ compact = false }: SlideProps) {
  return (
    <SlideLayout variant="light">
      <div className="flex-1 px-12 py-10 flex flex-col">
        <SlideHeading>El gran desafío ecológico y social</SlideHeading>
        {!compact && (
          <p className="text-lg text-slate-600 mb-6 max-w-4xl">
            Dos crisis paralelas que España vive ahora mismo, conectadas por un denominador común: <strong>recursos mal asignados</strong>.
          </p>
        )}

        <div className="grid grid-cols-2 gap-8 flex-1">
          <ProblemCard
            icon={Droplets}
            title="Crisis rural"
            stat="C-575/22"
            statLabel="Procedimiento UE contra España"
            color="from-[#26BDE2]/20 to-[#26BDE2]/5"
            iconBg="bg-[#26BDE2]"
            border="border-[#26BDE2]/30"
            bullets={
              compact
                ? []
                : [
                    "Purines de macrogranjas contaminan suelos y acuíferos",
                    "Lixiviados de nitratos sobrepasan los 50 mg/L permitidos",
                    "Comisión Europea con procedimiento abierto por incumplimiento de la Directiva 91/676/CEE",
                    "Pueblos rurales pierden agua potable y biodiversidad",
                  ]
            }
          />
          <ProblemCard
            icon={Server}
            title="Presión urbana"
            stat="41%"
            statLabel="Energía regional consumida por CPDs"
            color="from-[#FFB900]/20 to-[#FFB900]/5"
            iconBg="bg-[#FFB900]"
            border="border-[#FFB900]/30"
            bullets={
              compact
                ? []
                : [
                    "Hyperscalers (Microsoft, AWS, Meta) aterrizan en España",
                    "Microsoft Aragón solo proyecta 10.500 GWh/año — más que todo Aragón",
                    "La red eléctrica no aguanta y las ciudades pelean por capacidad",
                    "Tensiones por agua y suelo industrial",
                  ]
            }
          />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-slate-700">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span className="text-base">
            <strong>El residuo de uno</strong> podría ser <strong>el combustible del otro</strong>.
            {!compact && " Pero hoy nadie los conecta."}
          </span>
        </div>
      </div>
    </SlideLayout>
  );
}

function ProblemCard({
  icon: Icon,
  title,
  stat,
  statLabel,
  color,
  iconBg,
  border,
  bullets,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  stat: string;
  statLabel: string;
  color: string;
  iconBg: string;
  border: string;
  bullets: string[];
}) {
  return (
    <div
      className={`relative bg-gradient-to-br ${color} rounded-2xl border ${border} p-8 flex flex-col shadow-sm`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="mb-5">
        <div className="text-5xl font-black text-slate-900">{stat}</div>
        <div className="text-xs uppercase tracking-wide text-slate-500 mt-1">
          {statLabel}
        </div>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
