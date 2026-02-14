import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function App() {
  const [phase, setPhase] = useState('lock');
  const [progress, setProgress] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ top: '60%', left: '65%' });

  useEffect(() => {
    if (phase === 'loading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('proposal'), 800);
            return 100;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const moveNoButton = () => {
    const x = Math.random() * 60 + 20 + '%';
    const y = Math.random() * 60 + 20 + '%';
    setNoButtonPos({ top: y, left: x });
  };

  const handleYes = () => {
    setPhase('success');
    const end = Date.now() + 5 * 1000;
    const colors = ['#e11d48', '#ffffff', '#fb7185'];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* CAPA DE FONDO: Círculos de luz y Grid */}
      <div className="absolute inset-0 grid-bg z-0"></div>
      <div className="blur-circle w-96 h-96 bg-rose-900 -top-20 -left-20"></div>
      <div className="blur-circle w-[500px] h-[500px] bg-red-950 bottom-0 right-0 animate-delay-1000"></div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        
        {/* FASE 1: BLOQUEO ESTILO TERMINAL */}
        {phase === 'lock' && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-5xl animate-pulse">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">SECURITY INTERFACE</h1>
            <p className="text-rose-500/60 text-sm mb-10 font-medium tracking-[0.3em]">JZ.DEV SYSTEM v2.0</p>
            <button 
              onClick={() => setPhase('loading')}
              className="group relative px-12 py-5 bg-rose-600 rounded-2xl text-white font-bold transition-all hover:bg-rose-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
            >
              INICIAR PROTOCOLO VALENTINE
            </button>
          </div>
        )}

        {/* FASE 2: CARGA CON CONSOLA */}
        {phase === 'loading' && (
          <div className="bg-black/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl w-full max-w-md mx-auto">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Status</p>
                <p className="text-rose-500 font-bold text-xs animate-pulse">OVERRIDING_LOCKS...</p>
              </div>
              <span className="text-3xl font-black text-white">{progress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-rose-700 to-rose-400 transition-all duration-150" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="bg-black/20 rounded-lg p-4 font-mono text-[9px] text-zinc-600 space-y-1">
              <p>{progress > 10 && "> Sincronizando servidores de SafeCam..."}</p>
              <p>{progress > 40 && "> Verificando credenciales de amor..."}</p>
              <p>{progress > 70 && "> Generando respuesta final..."}</p>
            </div>
          </div>
        )}

        {/* FASE 3: LA PROPUESTA */}
        {phase === 'proposal' && (
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-16 tracking-tighter leading-tight">
              ¿Quieres ser mi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400">
                San Valentín?
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleYes}
                className="z-20 px-16 py-6 bg-rose-600 rounded-3xl text-white font-black text-2xl shadow-[0_20px_50px_rgba(225,29,72,0.4)] hover:scale-110 transition-all"
              >
                ¡POR SUPUESTO! ❤️
              </button>
              <button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="absolute transition-all duration-300 px-8 py-3 bg-white/5 border border-white/10 text-zinc-500 rounded-xl cursor-not-allowed"
                style={{ top: noButtonPos.top, left: noButtonPos.left }}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* FASE 4: ÉXITO TOTAL */}
        {phase === 'success' && (
          <div className="text-center animate-in zoom-in duration-700">
            <div className="relative inline-block mb-10">
              <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-30 animate-pulse"></div>
              <span className="text-9xl relative z-10">🤴❤️👸</span>
            </div>
            <h1 className="text-6xl font-black text-white mb-4 italic tracking-tighter">
              ¡SÍ CONCEDIDO!
            </h1>
            <p className="text-rose-500 text-xl font-medium tracking-[0.2em] uppercase">
              Nos vemos este 14 de febrero
            </p>
            <div className="mt-12 flex justify-center gap-4">
               <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-zinc-500 border border-white/10">JZ.DEV ORIGINAL</span>
               <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-zinc-500 border border-white/10">SECURED BY SAFECAM</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}