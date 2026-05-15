import { useState, useEffect, useRef } from "react";

const DONNEES_SOC = `
Infrastructure OpenStack :
- SOC-Server : 192.168.100.10
- Victime Ubuntu : 192.168.100.3
- Attaquant Kali : 192.168.100.60
- Réseau : net-soc 192.168.100.0/24

Outils déployés :
- Wazuh v4.10.0 (SIEM)
- Suricata v8.0.4 (IDS/IPS)
- Shuffle (SOAR)
- TheHive v5.2 (Case Management)
- Brevo (Notifications)
- OpenStack (Cloud)

Statistiques réelles :
- Total événements : 284 909
- Emails alertes envoyés : 9 272
- Agents Wazuh actifs : 4
- Règles Suricata chargées : 65 499
- Conformité CIS : 45%

Incidents détectés :
1. Brute Force SSH — Source: 192.168.100.60 (Kali) — Cible: 192.168.100.3 — 47 tentatives/32min — 02h15 — CRITIQUE
2. Scan Nmap — Source: 192.168.100.60 — Ports: 22,80,443,3306 — 08h30 — MOYEN
3. ICMP Ping — Source: 10.0.2.15 — Dest: 192.168.100.1 — 10h45 — FAIBLE
4. GPL ATTACK_RESPONSE root — Priorité Suricata: 2 — 14h37 — ÉLEVÉ
5. Utilisateur HackerTest — Machine: Windows-client1 — Création compte admin — 00h00 — CRITIQUE

MITRE ATT&CK :
- Defense Evasion : 60 alertes
- Persistence : 59 alertes
- Privilege Escalation : 58 alertes

Conformité CIS Ubuntu 22.04 : 89 réussis / 107 échecs — Score 45%
`;

const SUGGESTED_QUESTIONS = [
  { icon: "🔴", text: "Analyser l'attaque Brute Force SSH", tag: "CRITIQUE" },
  { icon: "📊", text: "Rapport de conformité CIS complet", tag: "RAPPORT" },
  { icon: "🎯", text: "Identifier l'attaquant Kali Linux", tag: "ÉLEVÉ" },
  { icon: "🛡️", text: "Statut des outils Wazuh et Suricata", tag: "INFO" },
  { icon: "⚡", text: "Actions MITRE ATT&CK détectées", tag: "MOYEN" },
  { icon: "👤", text: "Incident utilisateur HackerTest", tag: "CRITIQUE" },
];

const STATS = [
  { value: "284 909", label: "Événements", color: "#ff6600" },
  { value: "9 272", label: "Alertes Email", color: "#ff9900" },
  { value: "4", label: "Agents Actifs", color: "#00cc66" },
  { value: "45%", label: "Score CIS", color: "#ff3333" },
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendQuestion = async (q) => {
    const text = q || question;
    if (!text.trim() || loading) return;

    if (showStats) setShowStats(false);
    const userMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Tu es un expert SOC senior chez Orange Maroc. Voici les données SOCaaS :\n${DONNEES_SOC}\nRéponds en français, de façon professionnelle. Utilise des emojis. Structure ta réponse avec : ✅ Analyse, 🎯 Niveau de risque (🔴CRITIQUE / 🟠ÉLEVÉ / 🟡MOYEN / 🟢FAIBLE), 🛡️ Actions recommandées.`,
          messages: updated.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Erreur de réponse.";
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "❌ Impossible de joindre le serveur proxy. Assurez-vous que `node server.js` est lancé sur le port 5000." }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const getRiskColor = (content) => {
    if (content.includes("CRITIQUE") || content.includes("🔴")) return "#ff3333";
    if (content.includes("ÉLEVÉ") || content.includes("🟠")) return "#ff6600";
    if (content.includes("MOYEN") || content.includes("🟡")) return "#ffaa00";
    if (content.includes("FAIBLE") || content.includes("🟢")) return "#00cc66";
    return "#ff6600";
  };

  return (
    <div style={s.root}>
      {/* Scanline overlay */}
      <div style={s.scanlines} />

      {/* HEADER */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.logo}>
            <span style={s.logoOrange}>Orange</span>
            <span style={s.logoWhite}> SOC AI</span>
          </div>
          <div style={s.liveIndicator}>
            <span style={s.liveDot} />
            LIVE MONITORING
          </div>
        </div>
        <div style={s.headerRight}>
          <span style={s.headerTag}>SOCaaS Platform</span>
          <span style={s.headerTag}>PFE 2026</span>
        </div>
      </header>

      {/* STATS BAR */}
      {showStats && (
        <div style={s.statsBar}>
          {STATS.map((st, i) => (
            <div key={i} style={s.statCard}>
              <div style={{ ...s.statValue, color: st.color }}>{st.value}</div>
              <div style={s.statLabel}>{st.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* MESSAGES */}
      <div style={s.chatArea} ref={scrollRef}>
        {messages.length === 0 && (
          <div style={s.welcome}>
            <div style={s.welcomeIcon}>🛡️</div>
            <h2 style={s.welcomeTitle}>Orange SOC AI — Prêt à analyser</h2>
            <p style={s.welcomeSub}>Posez une question ou choisissez un scénario ci-dessous</p>
            <div style={s.suggestions}>
              {SUGGESTED_QUESTIONS.map((sq, i) => (
                <button key={i} style={s.suggBtn} onClick={() => sendQuestion(sq.text)}>
                  <span style={s.suggIcon}>{sq.icon}</span>
                  <span style={s.suggText}>{sq.text}</span>
                  <span style={{ ...s.suggTag, background: sq.tag === "CRITIQUE" ? "#ff333322" : sq.tag === "ÉLEVÉ" ? "#ff660022" : "#ffffff11", color: sq.tag === "CRITIQUE" ? "#ff5555" : sq.tag === "ÉLEVÉ" ? "#ff8800" : "#aaa", border: `1px solid ${sq.tag === "CRITIQUE" ? "#ff333344" : sq.tag === "ÉLEVÉ" ? "#ff660044" : "#ffffff22"}` }}>{sq.tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ ...s.msgRow, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && <div style={s.avatar}>🤖</div>}
            <div style={{
              ...s.bubble,
              background: msg.role === "user" ? "linear-gradient(135deg, #ff6600, #ff8800)" : "#0e0e1f",
              borderLeft: msg.role === "assistant" ? `3px solid ${getRiskColor(msg.content)}` : "none",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
            }}>
              <div style={s.bubbleLabel}>
                {msg.role === "user" ? "👤 Analyste SOC" : "🤖 Assistant IA — Orange SOC"}
              </div>
              <div style={s.bubbleText}>{msg.content}</div>
            </div>
            {msg.role === "user" && <div style={s.avatar}>👤</div>}
          </div>
        ))}

        {loading && (
          <div style={s.msgRow}>
            <div style={s.avatar}>🤖</div>
            <div style={{ ...s.bubble, background: "#0e0e1f", borderLeft: "3px solid #ff6600" }}>
              <div style={s.bubbleLabel}>🤖 Assistant IA — Orange SOC</div>
              <div style={s.typingDots}>
                <span style={{ ...s.dot, animationDelay: "0s" }} />
                <span style={{ ...s.dot, animationDelay: "0.2s" }} />
                <span style={{ ...s.dot, animationDelay: "0.4s" }} />
                <span style={{ marginLeft: 10, color: "#ff6600", fontSize: 12 }}>Analyse en cours...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div style={s.inputZone}>
        {messages.length > 0 && (
          <div style={s.quickBtns}>
            {SUGGESTED_QUESTIONS.slice(0, 3).map((sq, i) => (
              <button key={i} style={s.quickBtn} onClick={() => sendQuestion(sq.text)}>
                {sq.icon} {sq.text}
              </button>
            ))}
          </div>
        )}
        <div style={s.inputRow}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendQuestion()}
            placeholder="Ex: Que faire face à l'attaque brute force SSH ?"
            style={s.input}
          />
          <button onClick={() => sendQuestion()} disabled={loading} style={{ ...s.sendBtn, opacity: loading ? 0.5 : 1 }}>
            {loading ? "..." : "▶ Envoyer"}
          </button>
        </div>
        <div style={s.footer}>Orange SOC AI — Propulsé par Claude AI · Projet PFE 2026</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080812; }
        ::-webkit-scrollbar-thumb { background: #ff6600; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
      `}</style>
    </div>
  );
}

const s = {
  root: { display:"flex", flexDirection:"column", height:"100vh", background:"#080812", color:"#fff", fontFamily:"'Syne', sans-serif", position:"relative", overflow:"hidden" },
  scanlines: { position:"absolute", top:0, left:0, right:0, bottom:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,102,0,0.015) 2px,rgba(255,102,0,0.015) 4px)", pointerEvents:"none", zIndex:0 },
  header: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 24px", borderBottom:"1px solid #ff660033", background:"rgba(8,8,18,0.95)", backdropFilter:"blur(10px)", zIndex:10, position:"relative" },
  headerLeft: { display:"flex", alignItems:"center", gap:16 },
  logo: { fontSize:22, fontWeight:800, letterSpacing:2 },
  logoOrange: { color:"#ff6600" },
  logoWhite: { color:"#fff" },
  liveIndicator: { display:"flex", alignItems:"center", gap:6, fontSize:10, color:"#00cc66", fontFamily:"'Space Mono', monospace", letterSpacing:2 },
  liveDot: { width:7, height:7, borderRadius:"50%", background:"#00cc66", display:"inline-block", animation:"pulse 1.5s infinite" },
  headerRight: { display:"flex", gap:8 },
  headerTag: { fontSize:10, padding:"4px 10px", borderRadius:20, border:"1px solid #ff660033", color:"#ff6600", fontFamily:"'Space Mono',monospace", letterSpacing:1 },
  statsBar: { display:"flex", gap:12, padding:"12px 24px", borderBottom:"1px solid #ffffff08", background:"#0a0a18", zIndex:5 },
  statCard: { flex:1, background:"#0e0e1f", border:"1px solid #ffffff08", borderRadius:10, padding:"10px 14px", textAlign:"center" },
  statValue: { fontSize:20, fontWeight:800, fontFamily:"'Space Mono',monospace" },
  statLabel: { fontSize:10, color:"#666", marginTop:2, letterSpacing:1 },
  chatArea: { flex:1, overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:16, position:"relative", zIndex:1 },
  welcome: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, gap:16, padding:"20px 0" },
  welcomeIcon: { fontSize:48 },
  welcomeTitle: { fontSize:20, fontWeight:800, color:"#fff", textAlign:"center" },
  welcomeSub: { fontSize:13, color:"#666", textAlign:"center" },
  suggestions: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, width:"100%", maxWidth:680 },
  suggBtn: { display:"flex", alignItems:"center", gap:10, background:"#0e0e1f", border:"1px solid #ff660022", borderRadius:10, padding:"12px 14px", cursor:"pointer", color:"#ccc", fontSize:13, textAlign:"left", transition:"all 0.2s" },
  suggIcon: { fontSize:18, flexShrink:0 },
  suggText: { flex:1, color:"#ddd" },
  suggTag: { fontSize:10, padding:"2px 7px", borderRadius:10, flexShrink:0, fontFamily:"'Space Mono',monospace" },
  msgRow: { display:"flex", alignItems:"flex-start", gap:10 },
  avatar: { fontSize:22, flexShrink:0, marginTop:4 },
  bubble: { maxWidth:"78%", padding:"14px 18px", color:"#fff" },
  bubbleLabel: { fontSize:10, color:"#ff6600", fontFamily:"'Space Mono',monospace", letterSpacing:1, marginBottom:8, opacity:0.8 },
  bubbleText: { fontSize:14, lineHeight:1.8, whiteSpace:"pre-wrap" },
  typingDots: { display:"flex", alignItems:"center", gap:6, padding:"4px 0" },
  dot: { width:8, height:8, borderRadius:"50%", background:"#ff6600", display:"inline-block", animation:"bounce 0.8s infinite" },
  inputZone: { padding:"12px 24px 16px", borderTop:"1px solid #ff660022", background:"rgba(8,8,18,0.98)", zIndex:10 },
  quickBtns: { display:"flex", gap:8, marginBottom:10, overflowX:"auto", paddingBottom:4 },
  quickBtn: { flexShrink:0, background:"#0e0e1f", border:"1px solid #ff660033", color:"#aaa", padding:"6px 12px", borderRadius:20, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" },
  inputRow: { display:"flex", gap:10 },
  input: { flex:1, background:"#0e0e1f", border:"1px solid #ff660044", color:"#fff", padding:"13px 18px", borderRadius:12, fontSize:14, outline:"none", fontFamily:"'Syne',sans-serif" },
  sendBtn: { background:"linear-gradient(135deg,#ff6600,#ff8800)", color:"#fff", border:"none", padding:"0 24px", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:14, fontFamily:"'Syne',sans-serif", letterSpacing:1 },
  footer: { textAlign:"center", fontSize:10, color:"#333", marginTop:10, letterSpacing:1, fontFamily:"'Space Mono',monospace" },
};