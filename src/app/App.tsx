import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  FileText,
  Compass,
  TrendingUp,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Star,
} from "lucide-react";

const HOTMART_URL =
  "https://hotmart.com/pt-br/marketplace/produtos/hagsxd-clube-dos-5-ao7oc/E103234541H?system=product_page";

const NAV_ITEMS = [
  { label: "Como funciona", id: "como-funciona" },
  { label: "O que você recebe", id: "o-que-voce-recebe" },
  { label: "Para quem é", id: "para-quem-e" },
  { label: "Oferta", id: "oferta" },
  { label: "FAQ", id: "faq" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((n) => n.id));

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: "rgba(3,5,15,0.75)",
        backdropFilter: "blur(22px)",
        borderBottom: "1px solid rgba(255,120,30,0.08)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#ff7820,#ff4500)" }}
        >
          <Globe size={16} className="text-[#03050f]" />
        </div>
        <span
          className="font-bold text-lg tracking-tight"
          style={{ fontFamily: "Outfit, sans-serif", color: "#e8edf8" }}
        >
          Insight<span style={{ color: "#ff7820" }}>verso</span>
        </span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative text-sm transition-colors duration-200 pb-1"
              style={{
                fontFamily: "Inter, sans-serif",
                color: isActive ? "#ff7820" : "#6b82a8",
              }}
            >
              {label}
              {isActive && (
                <span
                  className="absolute left-0 bottom-0 w-full h-[2px] rounded-full"
                  style={{
                    background: "#ff7820",
                    boxShadow: "0 0 8px rgba(255,120,32,0.8)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => window.open(HOTMART_URL, "_blank")}
        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg,#ff7820,#ff4500)",
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        Começar agora
      </button>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-[#e8edf8]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <div
          className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "" }}
        />
        <div
          className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300"
          style={{ opacity: menuOpen ? 0 : 1 }}
        />
        <div
          className="w-6 h-0.5 bg-current transition-all duration-300"
          style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "" }}
        />
      </button>

      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 p-6 flex flex-col gap-4"
          style={{
            background: "rgba(3,5,15,0.97)",
            backdropFilter: "blur(22px)",
            borderBottom: "1px solid rgba(255,120,30,0.08)",
          }}
        >
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
              className="text-left text-base transition-colors"
              style={{
                fontFamily: "Inter, sans-serif",
                color: activeId === id ? "#ff7820" : "#e8edf8",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { window.open(HOTMART_URL, "_blank"); setMenuOpen(false); }}
            className="mt-2 px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg,#ff7820,#ff4500)",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Começar agora
          </button>
        </div>
      )}
    </nav>
  );
}

function GlowOrb({ x, y, color, size }: { x: string; y: string; color: string; size: string }) {
  return (
    <div
      className="absolute pointer-events-none rounded-full"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(140px)", opacity: 0.07 }}
    />
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
      <GlowOrb x="-10%" y="10%" color="#ff7820" size="600px" />
      <GlowOrb x="60%" y="40%" color="#ff4500" size="500px" />
      <GlowOrb x="30%" y="70%" color="#7c3aed" size="400px" />

      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1758874384930-6e1452bb9c71?w=1600&h=900&fit=crop&auto=format"
          alt="Pessoa empolgada com resultado no computador"
          className="w-full h-full object-cover opacity-10"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(3,5,15,0.7) 0%, rgba(3,5,15,0.95) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-medium tracking-widest uppercase"
          style={{
            background: "rgba(255,120,32,0.08)",
            border: "1px solid rgba(255,120,32,0.2)",
            color: "#ff7820",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          <Star size={12} />
          Comunidade de Empreendedorismo Digital
        </div>

        <h1
          className="font-black leading-[1.05] mb-6"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#e8edf8" }}
        >
          Talvez o problema
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#ff7820,#ffb347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            nunca tenha sido você.
          </span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg leading-relaxed mb-10"
          style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}
        >
          Você acorda cedo, trabalha muito, faz tudo certo — e ainda assim o mês termina igual ao anterior.
          Não é falta de esforço. É falta de{" "}
          <span style={{ color: "#e8edf8" }}>direção no lugar certo.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,120,32,0.5)]"
            style={{
              background: "linear-gradient(135deg,#ff7820,#ff4500)",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              textDecoration: "none",
            }}
          >
            Começar minha jornada no digital
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => scrollTo("como-funciona")}
            className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:border-[rgba(255,120,32,0.4)]"
            style={{ border: "1px solid rgba(255,120,32,0.15)", color: "#6b82a8", fontFamily: "Inter, sans-serif" }}
          >
            Como funciona
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
          {[
            ["500+", "Membros ativos"],
            ["R$ 20", "Por mês"],
            ["100%", "Para iniciantes"],
          ].map(([n, l]) => (
            <div key={l} className="flex flex-col items-center">
              <span
                className="font-black text-2xl"
                style={{ fontFamily: "Outfit, sans-serif", color: "#ff7820" }}
              >
                {n}
              </span>
              <span
                className="text-xs mt-1"
                style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={20} style={{ color: "#6b82a8" }} />
      </div>
    </section>
  );
}

// ─── TRANSITION ──────────────────────────────────────────────────────────────
function TransitionSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "#03050f" }}
      />
      <GlowOrb x="50%" y="50%" color="#ff7820" size="700px" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div
          className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full"
          style={{ background: "rgba(255,120,32,0.08)", border: "1px solid rgba(255,120,32,0.2)" }}
        >
          <Globe size={24} style={{ color: "#ff7820" }} />
        </div>
        <h2
          className="font-black leading-tight mb-6"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#e8edf8" }}
        >
          Existe um universo de oportunidades que{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#ff7820,#ffb347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            quase ninguém te mostrou.
          </span>
        </h2>
        <p className="text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
          O mercado digital gera bilhões todos os dias. Pessoas comuns, sem diploma de Harvard, sem capital inicial,
          estão construindo renda real. O problema nunca foi capacidade — foi a ausência de um caminho claro e de
          alguém que já atravessou esse caminho antes de você.
        </p>
      </div>
    </section>
  );
}

// ─── COMMUNITY / 3 PILLARS ───────────────────────────────────────────────────
function CommunitySection() {
  return (
    <section id="como-funciona" className="relative py-28 px-6 overflow-hidden">
      <GlowOrb x="-5%" y="30%" color="#7c3aed" size="500px" />
      <GlowOrb x="80%" y="60%" color="#ff7820" size="400px" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,120,32,0.08)",
              border: "1px solid rgba(255,120,32,0.2)",
              color: "#ff7820",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            A Comunidade
          </span>
          <h2
            className="font-black leading-tight mb-6"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#e8edf8" }}
          >
            Bem-vindo à Comunidade{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#ff7820,#ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Insightverso
            </span>
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}
          >
            Um sistema de evolução contínua no empreendedorismo digital, feito para iniciantes que querem{" "}
            <span style={{ color: "#e8edf8" }}>clareza e execução guiada</span> — sem enrolação, sem excesso de
            informação, sem ficar perdido.
          </p>
        </div>

        {/* 3 pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Zap size={28} />,
              title: "Execução com clareza",
              desc: "Cada passo é guiado. Você sabe exatamente o que fazer, quando fazer e por quê. Sem paralisia por excesso de informação.",
              glow: "#ff7820",
            },
            {
              icon: <Users size={28} />,
              title: "Comunidade viva",
              desc: "Não é grupo de WhatsApp abandonado. É uma comunidade ativa com suporte real, dúvidas respondidas e pessoas caminhando com você.",
              glow: "#ffb347",
            },
            {
              icon: <Calendar size={28} />,
              title: "Consultoria mensal",
              desc: "Todo mês, alinhamento direto. Você não fica à deriva: tem direção, ajuste de rota e acompanhamento sem complicação.",
              glow: "#7c3aed",
            },
          ].map(({ icon, title, desc, glow }) => (
            <div
              key={title}
              className="relative group rounded-2xl p-8 text-left transition-all duration-500 hover:-translate-y-2"
              style={{
                background: "rgba(8,15,35,0.6)",
                border: "1px solid rgba(255,120,32,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${glow}18, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div
                  className="mb-6 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${glow}18`, border: `1px solid ${glow}40`, color: glow }}
                >
                  {icon}
                </div>
                <h3
                  className="font-bold text-xl mb-3"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#e8edf8" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 3 images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop&auto=format",
              alt: "Workspace de empreendedor digital com laptop e caderno",
              caption: "Trabalhe de qualquer lugar",
            },
            {
              src: "https://images.unsplash.com/photo-1768055104923-a6f76e7478c7?w=600&h=400&fit=crop&auto=format",
              alt: "Gráficos de crescimento e análise de resultados digitais",
              caption: "Acompanhe seus resultados",
            },
            {
              src: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=600&h=400&fit=crop&auto=format",
              alt: "MacBook com dashboard de negócio digital",
              caption: "Seu negócio na palma da mão",
            },
          ].map(({ src, alt, caption }) => (
            <div
              key={caption}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                border: "1px solid rgba(255,120,32,0.12)",
                background: "#0a0f1e",
              }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(3,5,15,0.9) 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#ff7820" }}
                >
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHAT YOU GET ────────────────────────────────────────────────────────────
function WhatYouGetSection() {
  const items = [
    { icon: <FileText size={20} />, title: "Materiais de apoio", desc: "Conteúdo direto ao ponto, sem enrolação" },
    { icon: <Compass size={20} />, title: "Execução guiada", desc: "Um passo de cada vez, sem se perder" },
    { icon: <Users size={20} />, title: "Comunidade ativa", desc: "Suporte real de pessoas na mesma jornada" },
    { icon: <TrendingUp size={20} />, title: "Direcionamento diário", desc: "Sabe o que fazer todos os dias" },
    { icon: <Calendar size={20} />, title: "Consultoria mensal", desc: "Alinhamento e ajuste de rota garantidos" },
    { icon: <Star size={20} />, title: "Clareza de evolução", desc: "Visualiza seu progresso com nitidez" },
  ];

  return (
    <section id="o-que-voce-recebe" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "#03050f" }}
      />
      <GlowOrb x="70%" y="20%" color="#ff7820" size="500px" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,120,32,0.08)",
              border: "1px solid rgba(255,120,32,0.2)",
              color: "#ff7820",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            O que você recebe
          </span>
          <h2
            className="font-black leading-tight"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8edf8" }}
          >
            Tudo que você precisa para
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#ff7820,#ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sair do lugar e evoluir.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:border-[rgba(255,120,32,0.3)]"
              style={{
                background: "rgba(8,15,35,0.5)",
                border: "1px solid rgba(255,120,32,0.1)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,120,32,0.1)",
                  border: "1px solid rgba(255,120,32,0.25)",
                  color: "#ff7820",
                }}
              >
                {icon}
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#e8edf8" }}>
                  {title}
                </h4>
                <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOR WHOM ────────────────────────────────────────────────────────────────
function ForWhomSection() {
  const profiles = [
    "Você trabalha muito mas o saldo bancário não reflete isso.",
    "Quer entrar no digital mas não sabe por onde começar.",
    "Consome muito conteúdo sobre empreendedorismo mas não executa.",
    "Sente que falta direção, não disciplina.",
    "Quer uma renda extra sem depender de chefe ou horário fixo.",
    "Está cansado de promessas vazias e quer algo real e acessível.",
  ];

  return (
    <section id="para-quem-e" className="relative py-28 px-6 overflow-hidden">
      <GlowOrb x="10%" y="50%" color="#ff4500" size="600px" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,120,32,0.08)",
                border: "1px solid rgba(255,120,32,0.2)",
                color: "#ff7820",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              Para quem é
            </span>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8edf8" }}
            >
              Isso foi feito{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#ff7820,#ffb347)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                para você
              </span>{" "}
              se...
            </h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
              A Insightverso é para quem está cansado de estagnação e quer um caminho real — não mais um curso que
              você começa e nunca termina.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((p) => (
              <div
                key={p}
                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-300 hover:border-[rgba(255,120,32,0.3)]"
                style={{
                  background: "rgba(8,15,35,0.5)",
                  border: "1px solid rgba(255,120,32,0.08)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#ff7820" }} />
                <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#b0bcd4" }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OFFER ───────────────────────────────────────────────────────────────────
function OfferSection() {
  return (
    <section id="oferta" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "#03050f" }}
      />
      <GlowOrb x="30%" y="50%" color="#ff7820" size="700px" />
      <GlowOrb x="70%" y="30%" color="#ff4500" size="400px" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span
          className="inline-block text-xs font-medium tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,120,32,0.08)",
            border: "1px solid rgba(255,120,32,0.2)",
            color: "#ff7820",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          Oferta de entrada
        </span>

        <h2
          className="font-black leading-tight mb-4"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#e8edf8" }}
        >
          Comece sua jornada por apenas
        </h2>
        <div className="flex items-baseline justify-center gap-2 mb-4">
          <span
            className="font-black"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(4rem, 12vw, 8rem)",
              background: "linear-gradient(135deg,#ff7820,#ffb347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            R$ 20
          </span>
          <span className="font-medium text-2xl" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
            /mês
          </span>
        </div>
        <p className="text-base mb-10" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
          Sem taxas ocultas. Sem letras miúdas. Cancele quando quiser.
        </p>

        <div
          className="p-8 rounded-3xl mb-8"
          style={{
            background: "rgba(8,15,35,0.6)",
            border: "1px solid rgba(255,120,32,0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
            {[
              "Materiais de apoio exclusivos",
              "Execução guiada passo a passo",
              "Acesso à comunidade ativa",
              "Direcionamento diário prático",
              "Consultoria mensal inclusa",
              "Suporte contínuo e respostas reais",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={16} style={{ color: "#ff7820", flexShrink: 0 }} />
                <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#b0bcd4" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href={HOTMART_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,120,32,0.6)] uppercase tracking-wide text-center"
            style={{
              background: "linear-gradient(135deg,#ff7820,#ff4500)",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              textDecoration: "none",
            }}
          >
            Começar minha jornada no digital →
          </a>
        </div>

        <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#3d5270" }}>
          Mais de 500 pessoas já começaram. Sua vez é agora.
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "Preciso saber algo antes de entrar?",
      a: "Não. A Insightverso foi criada especificamente para iniciantes. Você não precisa de conhecimento prévio em marketing, tecnologia ou negócios. O sistema é desenhado para te pegar do zero e te levar passo a passo.",
    },
    {
      q: "Tem custos adicionais além dos R$ 20?",
      a: "Não. O valor é tudo incluso: comunidade, materiais, execução guiada e consultoria mensal. Sem upsells obrigatórios, sem surpresas no cartão.",
    },
    {
      q: "Preciso de muito tempo disponível?",
      a: "Não. O sistema é flexível e feito para quem ainda tem emprego, família ou outros compromissos. Com 30 a 60 minutos por dia você já consegue evoluir consistentemente.",
    },
    {
      q: "E se eu não me adaptar? Posso cancelar?",
      a: "Sim, sem burocracia. Você pode cancelar quando quiser, sem multa e sem precisar justificar. Mas acreditamos que você não vai querer.",
    },
    {
      q: "A consultoria mensal é individual ou em grupo?",
      a: "É uma sessão de alinhamento em que você tira dúvidas, ajusta sua estratégia e recebe direcionamento personalizado para o seu momento. Não é uma aula genérica.",
    },
  ];

  return (
    <section id="faq" className="relative py-28 px-6 overflow-hidden">
      <GlowOrb x="60%" y="50%" color="#7c3aed" size="500px" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(255,120,32,0.08)",
              border: "1px solid rgba(255,120,32,0.2)",
              color: "#ff7820",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            FAQ
          </span>
          <h2
            className="font-black"
            style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#e8edf8" }}
          >
            Perguntas frequentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(8,15,35,0.6)",
                border: `1px solid ${openIdx === i ? "rgba(255,120,32,0.35)" : "rgba(255,120,32,0.08)"}`,
                backdropFilter: "blur(16px)",
              }}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <span
                  className="font-semibold pr-4"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#e8edf8", fontSize: "1rem" }}
                >
                  {q}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "#ff7820",
                    flexShrink: 0,
                    transform: openIdx === i ? "rotate(180deg)" : "",
                    transition: "transform 0.3s",
                  }}
                />
              </div>
              {openIdx === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
                    {a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#03050f" }} />
      <GlowOrb x="20%" y="40%" color="#ff7820" size="600px" />
      <GlowOrb x="70%" y="60%" color="#ff4500" size="400px" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2
          className="font-black leading-tight mb-6"
          style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#e8edf8" }}
        >
          O próximo passo é{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#ff7820,#ffb347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            sempre o mais difícil.
          </span>
          <br />
          Mas você não vai dar ele sozinho.
        </h2>
        <p className="text-lg mb-10" style={{ fontFamily: "Inter, sans-serif", color: "#6b82a8" }}>
          Entre para a Insightverso por R$ 20/mês e comece a construir sua realidade no digital com clareza, suporte e
          direção real.
        </p>
        <a
          href={HOTMART_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,120,32,0.6)] uppercase tracking-wide"
          style={{
            background: "linear-gradient(135deg,#ff7820,#ff4500)",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
            textDecoration: "none",
          }}
        >
          Começar minha jornada no digital
          <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative py-10 px-6 text-center"
      style={{ borderTop: "1px solid rgba(255,120,32,0.08)" }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#ff7820,#ff4500)" }}
        >
          <Globe size={12} className="text-[#03050f]" />
        </div>
        <span className="font-bold text-sm" style={{ fontFamily: "Outfit, sans-serif", color: "#e8edf8" }}>
          Insight<span style={{ color: "#ff7820" }}>verso</span>
        </span>
      </div>
      <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#3d5270" }}>
        © 2025 Insightverso. Todos os direitos reservados.
      </p>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#03050f", fontFamily: "Outfit, Inter, sans-serif" }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #03050f; }
        ::-webkit-scrollbar-thumb { background: rgba(255,120,32,0.25); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,120,32,0.5); }
      `}</style>
      <NavBar />
      <HeroSection />
      <TransitionSection />
      <CommunitySection />
      <WhatYouGetSection />
      <ForWhomSection />
      <OfferSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
