import { useState, useEffect, useRef } from "react";

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700;800&display=swap');

:root {
  --saffron: #E8621A;
  --saffron-light: #F4822A;
  --deep: #6B2400;
  --deep2: #8B3A00;
  --cream: #FDF6EC;
  --gold: #C9900C;
  --gold-light: #F0C040;
  --green: #2E7D32;
  --teal: #00796B;
  --lavender: #6A3DB8;
  --bg: #FFF8F0;
  --card: #FFFFFF;
  --border: #F0D5B8;
  --gray: #7B6B5A;
  --text: #2D1500;
  --shadow-sm: 0 2px 12px rgba(232,98,26,0.10);
  --shadow-md: 0 6px 28px rgba(232,98,26,0.15);
  --shadow-lg: 0 12px 48px rgba(107,36,0,0.18);
  --r: 16px;
  --r-lg: 24px;
}

*, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
html { scroll-behavior: smooth; }
body { font-family:'Nunito',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; }

.app { display:flex; flex-direction:column; min-height:100vh; }

/* ── ACCESSIBILITY BAR ── */
.a11y {
  background: var(--deep);
  padding: 8px 20px;
  display: flex; align-items:center; gap:10px; flex-wrap:wrap;
  font-size: 13px; color: rgba(255,255,255,0.8);
}
.a11y-label { font-weight:600; color:white; margin-right:4px; }
.a11y-btn {
  background: rgba(255,255,255,0.14);
  border: 1.5px solid rgba(255,255,255,0.28);
  color: white; border-radius:8px;
  padding: 5px 14px; cursor:pointer; font-size:13px; font-family:inherit;
  transition: background .2s, transform .1s;
}
.a11y-btn:hover { background:rgba(255,255,255,0.26); }
.a11y-btn.on { background:var(--saffron-light); border-color:var(--saffron-light); }

/* ── HEADER ── */
.header {
  background: linear-gradient(120deg, var(--deep) 0%, #A84000 60%, var(--saffron) 100%);
  padding: 18px 28px;
  display: flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px;
  box-shadow: var(--shadow-lg);
  position: relative; overflow:hidden;
}
.header::before {
  content:'🕉️';
  position:absolute; right:28px; top:50%; transform:translateY(-50%);
  font-size:90px; opacity:.07; pointer-events:none;
}
.brand { display:flex; align-items:center; gap:14px; }
.brand-icon { font-size:42px; line-height:1; }
.brand-text h1 {
  font-family:'Yatra One',serif; font-size:26px; color:white; line-height:1.1;
}
.brand-text p { font-size:13px; color:rgba(255,255,255,.75); margin-top:2px; }
.verse-pill {
  background:rgba(255,255,255,.12);
  border:1.5px solid rgba(255,255,255,.25);
  border-radius:50px; padding:8px 20px;
  color:white; font-size:13px; max-width:400px; text-align:center; line-height:1.6;
  cursor:pointer; transition:background .2s;
}
.verse-pill:hover { background:rgba(255,255,255,.2); }
.verse-pill small { opacity:.7; font-size:11px; display:block; margin-top:2px; }

/* ── NAV ── */
.nav {
  background:white;
  border-bottom:3px solid var(--saffron);
  position:sticky; top:0; z-index:200;
  box-shadow:0 2px 16px rgba(0,0,0,.08);
}
.nav-scroll { display:flex; overflow-x:auto; scrollbar-width:none; }
.nav-scroll::-webkit-scrollbar { display:none; }
.nav-tab {
  display:flex; flex-direction:column; align-items:center; gap:3px;
  padding:11px 20px; border:none; background:none; cursor:pointer;
  font-family:inherit; font-size:12px; font-weight:700;
  color:var(--gray); white-space:nowrap;
  border-bottom:3px solid transparent; margin-bottom:-3px;
  transition:all .2s; min-width:72px;
}
.nav-tab .ti { font-size:22px; }
.nav-tab:hover { color:var(--saffron); background:#FFF3E0; }
.nav-tab.active { color:var(--deep); border-bottom-color:var(--saffron); background:#FFF8F0; }

/* ── PAGE WRAPPER ── */
.page { padding:32px 24px; max-width:1080px; margin:0 auto; width:100%; }

/* ── SECTION HEADING ── */
.sh { display:flex; align-items:center; gap:10px; margin-bottom:8px; }
.sh h2 { font-family:'Yatra One',serif; font-size:24px; color:var(--deep); }
.sh-sub { color:var(--gray); font-size:14px; margin-bottom:20px; }
.divider { height:3px; width:52px; background:var(--saffron); border-radius:4px; margin-bottom:22px; }

/* ── CARD ── */
.card {
  background:var(--card); border-radius:var(--r);
  border:1.5px solid var(--border); box-shadow:var(--shadow-sm);
  padding:22px;
}
.card-hover { transition:all .2s; cursor:pointer; }
.card-hover:hover { border-color:var(--saffron); box-shadow:var(--shadow-md); transform:translateY(-3px); }

/* ── GRID ── */
.grid-2 { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
.grid-3 { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:18px; }
.grid-4 { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:16px; }
.col { display:flex; flex-direction:column; gap:14px; }

/* ── HERO ── */
.hero {
  background:linear-gradient(135deg, var(--deep) 0%, #B04500 50%, var(--saffron-light) 100%);
  border-radius:var(--r-lg); padding:48px 36px;
  color:white; position:relative; overflow:hidden;
  margin-bottom:32px; box-shadow:var(--shadow-lg);
}
.hero::after {
  content:''; position:absolute; right:-40px; top:-40px;
  width:260px; height:260px; border-radius:50%;
  background:rgba(255,255,255,.06); pointer-events:none;
}
.hero h1 { font-family:'Yatra One',serif; font-size:36px; margin-bottom:12px; line-height:1.2; }
.hero p { font-size:16px; opacity:.92; max-width:540px; line-height:1.75; margin-bottom:26px; }
.hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
.btn-solid {
  background:white; color:var(--deep); border:none;
  border-radius:50px; padding:11px 26px; font-size:14px; font-weight:800;
  font-family:inherit; cursor:pointer; transition:all .15s;
}
.btn-solid:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.2); }
.btn-ghost {
  background:transparent; color:white;
  border:2px solid rgba(255,255,255,.6);
  border-radius:50px; padding:11px 26px; font-size:14px; font-weight:700;
  font-family:inherit; cursor:pointer; transition:all .15s;
}
.btn-ghost:hover { background:rgba(255,255,255,.15); }

/* ── STAT ROW ── */
.stats { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:32px; }
.stat {
  background:white; border:2px solid var(--border); border-radius:50px;
  padding:10px 22px; text-align:center; box-shadow:var(--shadow-sm);
}
.stat-n { font-size:20px; font-weight:800; color:var(--saffron); }
.stat-l { font-size:12px; color:var(--gray); }

/* ── KANDA CARD ── */
.kanda {
  background:white; border:2px solid var(--border); border-radius:var(--r);
  padding:20px; cursor:pointer; transition:all .2s; display:flex; flex-direction:column; gap:8px;
}
.kanda:hover { border-color:var(--saffron); box-shadow:var(--shadow-md); transform:translateY(-3px); }
.kanda-emoji { font-size:36px; }
.kanda-name { font-family:'Yatra One',serif; font-size:17px; color:var(--deep); }
.kanda-sub { font-size:12px; color:var(--gray); }
.kanda-desc { font-size:13px; color:#5D3000; line-height:1.55; }
.tag { display:inline-block; border-radius:20px; padding:3px 12px; font-size:11px; font-weight:700; }
.tag-saffron { background:#FFF3E0; color:var(--saffron); }
.tag-green { background:#E8F5E9; color:var(--green); }
.tag-teal { background:#E0F2F1; color:var(--teal); }
.tag-purple { background:#EDE7F6; color:var(--lavender); }

/* ── BHAJAN ROW ── */
.bhajan-row {
  background:white; border:2px solid var(--border); border-radius:var(--r);
  padding:16px 20px; display:flex; align-items:center; gap:16px; transition:all .2s;
}
.bhajan-row:hover { border-color:var(--saffron); box-shadow:var(--shadow-sm); }
.play-btn {
  width:48px; height:48px; border-radius:50%;
  background:var(--saffron); color:white; border:none;
  font-size:16px; cursor:pointer; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  transition:all .15s; box-shadow:0 3px 10px rgba(232,98,26,.35);
}
.play-btn:hover { background:var(--deep); transform:scale(1.1); }
.play-btn.active { background:var(--deep); }
.bhajan-info { flex:1; min-width:0; }
.bhajan-title { font-weight:800; font-size:15px; color:var(--text); }
.bhajan-meta { font-size:12px; color:var(--gray); margin-top:3px; display:flex; gap:10px; flex-wrap:wrap; }

/* ── VIDEO CARD ── */
.video-card {
  background:white; border:2px solid var(--border); border-radius:var(--r);
  overflow:hidden; cursor:pointer; transition:all .2s; display:flex; flex-direction:column;
}
.video-card:hover { border-color:var(--saffron); box-shadow:var(--shadow-md); transform:translateY(-3px); }
.video-thumb {
  position:relative; background:linear-gradient(135deg,#1a0a00,#3D1A00);
  height:160px; display:flex; align-items:center; justify-content:center;
  flex-direction:column; gap:8px; overflow:hidden;
}
.video-thumb-emoji { font-size:52px; }
.video-thumb-play {
  position:absolute; bottom:10px; right:10px;
  background:var(--saffron); color:white; border:none;
  border-radius:50px; padding:6px 16px; font-size:12px; font-weight:700;
  cursor:pointer; font-family:inherit;
}
.video-duration {
  position:absolute; bottom:10px; left:10px;
  background:rgba(0,0,0,.65); color:white;
  font-size:11px; padding:3px 8px; border-radius:6px;
}
.video-category {
  position:absolute; top:10px; left:10px;
  border-radius:6px; padding:3px 10px; font-size:11px; font-weight:700; color:white;
}
.video-body { padding:16px; flex:1; display:flex; flex-direction:column; gap:6px; }
.video-title { font-weight:800; font-size:14px; color:var(--text); line-height:1.4; }
.video-doctor { font-size:12px; color:var(--gray); }
.video-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:4px; }

/* ── VIDEO PLAYER MODAL ── */
.modal-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,.72);
  z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px;
}
.modal {
  background:white; border-radius:var(--r-lg);
  max-width:720px; width:100%; max-height:90vh; overflow-y:auto;
  box-shadow:0 24px 80px rgba(0,0,0,.4);
}
.modal-video-screen {
  background:linear-gradient(135deg,#0a0500,#2A0D00);
  height:320px; display:flex; align-items:center; justify-content:center;
  flex-direction:column; gap:16px; color:white; border-radius:var(--r-lg) var(--r-lg) 0 0;
  position:relative;
}
.modal-video-emoji { font-size:72px; }
.modal-playing-label {
  background:var(--saffron); color:white;
  border-radius:50px; padding:6px 20px; font-size:13px; font-weight:700;
  animation: pulse-glow 2s infinite;
}
@keyframes pulse-glow {
  0%,100% { box-shadow:0 0 0 0 rgba(232,98,26,.5); }
  50% { box-shadow:0 0 0 12px rgba(232,98,26,0); }
}
.modal-controls {
  display:flex; gap:10px; align-items:center; justify-content:center; margin-top:16px; flex-wrap:wrap;
}
.modal-body { padding:24px; }
.modal-title { font-family:'Yatra One',serif; font-size:22px; color:var(--deep); margin-bottom:6px; }
.modal-close {
  position:absolute; top:14px; right:14px;
  background:rgba(255,255,255,.18); border:none; color:white;
  border-radius:50%; width:34px; height:34px; font-size:18px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
}

/* ── AI CHAT ── */
.ai-box {
  background:linear-gradient(135deg,#FFF8F0,#FFF3E0);
  border-radius:var(--r-lg); padding:26px;
  border:2px solid var(--border); margin-bottom:24px;
}
.ai-box h3 { font-family:'Yatra One',serif; font-size:20px; color:var(--deep); margin-bottom:4px; }
.ai-box p { font-size:13px; color:var(--gray); margin-bottom:16px; }
.ai-row { display:flex; gap:10px; }
.ai-input {
  flex:1; padding:12px 18px; border-radius:50px;
  border:2px solid var(--border); font-size:14px; font-family:inherit;
  outline:none; background:white; transition:border-color .2s;
}
.ai-input:focus { border-color:var(--saffron); }
.ai-send {
  background:var(--saffron); color:white; border:none;
  border-radius:50px; padding:12px 24px; font-size:14px; font-weight:700;
  font-family:inherit; cursor:pointer; transition:background .2s; white-space:nowrap;
}
.ai-send:hover { background:var(--deep); }
.ai-send:disabled { opacity:.55; cursor:not-allowed; }
.ai-msgs { display:flex; flex-direction:column; gap:12px; margin-top:16px; max-height:360px; overflow-y:auto; }
.ai-bubble { border-radius:var(--r); padding:14px 18px; font-size:14px; line-height:1.75; }
.ai-bubble.user { background:var(--saffron); color:white; align-self:flex-end; max-width:80%; }
.ai-bubble.bot { background:white; border:1.5px solid var(--border); color:var(--text); align-self:flex-start; max-width:90%; }
.ai-bubble.bot.loading { color:var(--gray); font-style:italic; }
.ai-bubble .speak-btn { background:none; border:none; cursor:pointer; font-size:18px; padding:4px 6px; border-radius:8px; transition:all .2s; opacity:0.6; }
.ai-bubble .speak-btn:hover { opacity:1; background:rgba(232,98,26,0.1); }
.ai-bubble .speak-btn.speaking { opacity:1; animation: pulse-speak 1.2s infinite; }
@keyframes pulse-speak { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
.auto-speak-toggle { display:flex; align-items:center; gap:10px; padding:8px 14px; border-radius:12px; background:rgba(232,98,26,0.06); border:1.5px solid transparent; transition:all .3s; cursor:pointer; user-select:none; }
.auto-speak-toggle:hover { border-color:var(--saffron); }
.auto-speak-toggle.active { background:rgba(232,98,26,0.12); border-color:var(--saffron); }
.auto-speak-switch { width:40px; height:22px; border-radius:11px; background:#ccc; position:relative; transition:background .3s; flex-shrink:0; }
.auto-speak-switch.on { background:var(--saffron); }
.auto-speak-switch::after { content:''; position:absolute; top:2px; left:2px; width:18px; height:18px; border-radius:50%; background:white; transition:transform .3s; box-shadow:0 1px 3px rgba(0,0,0,0.2); }
.auto-speak-switch.on::after { transform:translateX(18px); }
.speaking-indicator { display:inline-flex; align-items:center; gap:6px; font-size:12px; color:var(--saffron); font-weight:600; }
.speaking-indicator .bars { display:flex; gap:2px; align-items:flex-end; height:14px; }
.speaking-indicator .bar { width:3px; background:var(--saffron); border-radius:2px; animation:sound-bar 0.8s infinite ease-in-out; }
.speaking-indicator .bar:nth-child(1) { animation-delay:0s; height:6px; }
.speaking-indicator .bar:nth-child(2) { animation-delay:0.15s; height:10px; }
.speaking-indicator .bar:nth-child(3) { animation-delay:0.3s; height:4px; }
.speaking-indicator .bar:nth-child(4) { animation-delay:0.45s; height:12px; }
@keyframes sound-bar { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.8)} }

/* ── PRAYER ── */
.prayer-block {
  font-family:'Noto Serif',serif; font-size:18px;
  line-height:2.1; color:var(--deep);
  text-align:center; background:linear-gradient(135deg,#FFF8F0,#FFF3E0);
  padding:28px; border-radius:var(--r); border:2px solid var(--border);
  margin-bottom:16px;
}
.prayer-trans {
  font-size:14px; color:#6B4000; text-align:center;
  font-style:italic; line-height:1.7; margin-bottom:14px;
}

/* ── WELLNESS ACTIVITY ── */
.wellness-card {
  background:linear-gradient(135deg,#FFF3E0,#FFF8F0);
  border:2px solid var(--border); border-radius:var(--r);
  padding:22px; text-align:center; cursor:pointer; transition:all .2s;
}
.wellness-card:hover { border-color:var(--saffron); box-shadow:var(--shadow-md); }
.wellness-emoji { font-size:42px; margin-bottom:10px; }

/* ── COMMUNITY CHAT ── */
.chat-list { display:flex; flex-direction:column; gap:12px; max-height:400px; overflow-y:auto; padding-right:4px; }
.chat-bubble { background:white; border:1.5px solid var(--border); border-radius:var(--r); padding:14px 18px; }
.chat-meta { font-size:12px; color:var(--gray); margin-bottom:4px; display:flex; gap:8px; align-items:center; }
.chat-name { font-weight:800; color:var(--deep); font-size:13px; }
.chat-text { font-size:14px; line-height:1.6; color:var(--text); }

/* ── ABOUT FEATURE ── */
.feature-row {
  display:flex; gap:16px; align-items:flex-start;
  background:white; border-radius:var(--r); padding:18px;
  border:2px solid var(--border);
}
.feature-icon { font-size:30px; flex-shrink:0; }

/* ── BACK BTN ── */
.back-btn {
  background:none; border:none; color:var(--saffron);
  font-size:14px; font-weight:800; font-family:inherit;
  cursor:pointer; margin-bottom:20px; display:flex; align-items:center; gap:6px;
}
.back-btn:hover { color:var(--deep); }

/* ── FOOTER ── */
.footer {
  background:var(--deep); color:rgba(255,255,255,.65);
  text-align:center; padding:18px; font-size:13px; margin-top:auto;
}
.footer b { color:white; }

/* ── LARGE TEXT MODE ── */
.lt .chat-text, .lt .kanda-desc, .lt .bhajan-title,
.lt .bhajan-meta, .lt .video-title, .lt .video-doctor,
.lt .ai-bubble { font-size:17px !important; }
.lt .sh h2 { font-size:30px !important; }
.lt .nav-tab { font-size:14px !important; padding:14px 22px !important; }
.lt .nav-tab .ti { font-size:26px !important; }
.lt .hero h1 { font-size:42px !important; }
.lt .hero p { font-size:19px !important; }
.lt .prayer-block { font-size:22px !important; }
.lt .ai-input { font-size:16px !important; }

/* HIGH CONTRAST */
.hc { filter:contrast(1.25) brightness(0.96); }

/* ── RESPONSIVE ── */
@media(max-width:640px){
  .hero h1 { font-size:24px; }
  .hero::after { display:none; }
  .header::before { display:none; }
  .page { padding:20px 14px; }
  .verse-pill { display:none; }
  .modal-video-screen { height:220px; }
  .modal-video-emoji { font-size:50px; }
}

/* ── RELIGION PICKER ── */
.rel-overlay {
  position:fixed;inset:0;background:rgba(0,0,0,.72);
  z-index:900;display:flex;align-items:center;justify-content:center;padding:20px;
  animation:fdIn .2s ease;
}
@keyframes fdIn{from{opacity:0}to{opacity:1}}
.rel-box {
  background:white;border-radius:28px;max-width:660px;width:100%;
  padding:36px;box-shadow:0 24px 80px rgba(0,0,0,.35);
  animation:slUp .25s ease;max-height:92vh;overflow-y:auto;
}
@keyframes slUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse-mic{0%{box-shadow:0 0 0 0 rgba(229,57,53,0.5)}70%{box-shadow:0 0 0 14px rgba(229,57,53,0)}100%{box-shadow:0 0 0 0 rgba(229,57,53,0)}}
.rel-title{font-family:'Yatra One',serif;font-size:26px;color:var(--deep);text-align:center;margin-bottom:6px;}
.rel-sub{font-size:14px;color:var(--gray);text-align:center;margin-bottom:28px;}
.rel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;}
.rel-card{
  border:2.5px solid #EEE;border-radius:18px;padding:20px 14px;
  text-align:center;cursor:pointer;transition:all .22s;background:white;
}
.rel-card:hover{transform:translateY(-5px);box-shadow:0 10px 28px rgba(0,0,0,.13);}
.rel-emoji{font-size:36px;margin-bottom:8px;}
.rel-name{font-weight:800;font-size:14px;color:var(--text);}
.rel-desc{font-size:11px;color:var(--gray);margin-top:3px;}
.rel-badge{
  background:rgba(255,255,255,.18);border:1.5px solid rgba(255,255,255,.35);
  border-radius:50px;padding:6px 16px;color:white;font-size:13px;font-weight:700;
  cursor:pointer;display:flex;align-items:center;gap:6px;transition:background .2s;
  white-space:nowrap;
}
.rel-badge:hover{background:rgba(255,255,255,.28);}
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const RELIGIONS = [
  {id:"hinduism",    name:"Hinduism",    emoji:"🕉️", color:"#E8621A", desc:"Vedic & Puranic traditions"},
  {id:"islam",       name:"Islam",       emoji:"☪️", color:"#00796B", desc:"Quran, Hadith & Sunnah"},
  {id:"christianity",name:"Christianity",emoji:"✝️", color:"#1565C0", desc:"Bible & Gospel traditions"},
  {id:"sikhism",     name:"Sikhism",     emoji:"☬",  color:"#F57F17", desc:"Guru Granth Sahib Ji"},
  {id:"buddhism",    name:"Buddhism",    emoji:"☸️", color:"#6A1B9A", desc:"Dhamma & Meditation"},
  {id:"jainism",     name:"Jainism",     emoji:"🕊️", color:"#2E7D32", desc:"Ahimsa & Agama teachings"},
];

const NAV = [
  { id:"home",      icon:"🏠", label:"Home" },
  { id:"bhajans",   icon:"🎵", label:"Devotional" },
  { id:"therapy",   icon:"🎬", label:"Therapy Videos" },
  { id:"prayers",   icon:"🙏", label:"Prayers" },
  { id:"wellness",  icon:"🧘", label:"Wellness" },
  { id:"guruji",    icon:"🤖", label:"Ask Guide" },
  { id:"community", icon:"👥", label:"Community" },
  { id:"about",     icon:"ℹ️", label:"About" },
];

const KANDAS = [
  { id:1, emoji:"👶", name:"Bal Kand",       chapters:77, desc:"Birth and divine childhood of Lord Ram" },
  { id:2, emoji:"🏯", name:"Ayodhya Kand",   chapters:119, desc:"Ram's exile and life in Ayodhya" },
  { id:3, emoji:"🌳", name:"Aranya Kand",    chapters:75, desc:"Forest life and Sita's abduction" },
  { id:4, emoji:"🐒", name:"Kishkindha Kand",chapters:67, desc:"Alliance with Vanaras and Sugriva" },
  { id:5, emoji:"🌊", name:"Sundar Kand",    chapters:68, desc:"Hanuman's glorious journey to Lanka" },
  { id:6, emoji:"⚔️", name:"Lanka Kand",     chapters:128, desc:"Great battle and victory of Dharma" },
  { id:7, emoji:"👑", name:"Uttar Kand",     chapters:111, desc:"Ram's reign and eternal legacy" },
];

const BHAJANS = [
  { id:1, title:"Jai Shri Ram",          singer:"Pt. Jasraj",         dur:"7:23", cat:"Ram Bhajan",   emoji:"🚩", ytId:"VJ-o8y8JqCQ" },
  { id:2, title:"Hanuman Chalisa",       singer:"Lata Mangeshkar",    dur:"8:45", cat:"Hanuman",      emoji:"🐒", ytId:"AETFvQonfV8" },
  { id:3, title:"Ram Naam Sukhdayi",     singer:"Anup Jalota",        dur:"6:12", cat:"Ram Bhajan",   emoji:"🕉️", ytId:"_lpnj5CcsUg" },
  { id:4, title:"Sita Ram Sita Ram",     singer:"Hari Om Sharan",     dur:"5:30", cat:"Ram Bhajan",   emoji:"🙏", ytId:"4v8nHUvwNLY" },
  { id:5, title:"Bhaye Pragat Kripala",  singer:"Kumar Vishwas",      dur:"9:00", cat:"Bal Ram",      emoji:"🌸", ytId:"6Jteav3K_NE" },
  { id:6, title:"Man Tadapat Hari",      singer:"Mohammed Rafi",      dur:"4:55", cat:"Devotional",   emoji:"💫", ytId:"4c9yzRB5pPc" },
  { id:7, title:"Hey Ram Hey Ram",       singer:"Pandit Bhimsen Joshi",dur:"6:40",cat:"Ram Bhajan",   emoji:"🪔", ytId:"o-_qx6VXMA4" },
  { id:8, title:"Raghupati Raghav",      singer:"M.S. Subbulakshmi",  dur:"5:15", cat:"Traditional",  emoji:"✨", ytId:"Gtfufkz68KM" },
];

const THERAPY_VIDEOS = [
  {
    id:1,
    title:"Coping with Loneliness in Old Age",
    doctor:"Dr. Sunita Mehra, Geriatric Psychologist",
    dur:"18:24", emoji:"💙",
    cat:"Emotional Health", catColor:"#1565C0",
    tags:["Loneliness","Coping","Seniors"],
    ytId:"sfA3TQXvN6E",
    desc:"A gentle session helping elderly individuals understand loneliness as a natural emotion and build healthy coping strategies through connection, routine, and purpose.",
    points:["Understanding loneliness vs isolation","Building daily connection habits","The power of small conversations","Spiritual practices as emotional anchors"]
  },
  {
    id:2,
    title:"Guided Relaxation for Anxiety",
    doctor:"Dr. Ramesh Iyer, Clinical Psychologist",
    dur:"22:10", emoji:"🌿",
    cat:"Anxiety & Calm", catColor:"#2E7D32",
    tags:["Anxiety","Relaxation","Breathing"],
    ytId:"pU80BEm43JM",
    desc:"A guided therapeutic session using progressive muscle relaxation and breathing techniques designed specifically for older adults dealing with worry and anxiety.",
    points:["Progressive muscle relaxation walkthrough","4-7-8 breathing technique","Grounding exercises for seniors","Creating a daily calm routine"]
  },
  {
    id:3,
    title:"Grieving & Moving Forward",
    doctor:"Dr. Priya Varma, Grief Counsellor",
    dur:"25:45", emoji:"🌷",
    cat:"Grief Support", catColor:"#6A1B9A",
    tags:["Grief","Loss","Healing"],
    ytId:"sfA3TQXvN6E",
    desc:"A compassionate therapy session helping elders process grief over lost loved ones, declining health, or life transitions — with emphasis on meaning-making.",
    points:["Normalising grief in later life","Stages of loss simplified","Finding meaning after bereavement","Reconnecting with joy gradually"]
  },
  {
    id:4,
    title:"Memory, Mind & Staying Sharp",
    doctor:"Dr. Anil Sharma, Neuropsychologist",
    dur:"20:00", emoji:"🧠",
    cat:"Cognitive Health", catColor:"#E65100",
    tags:["Memory","Dementia","Brain Health"],
    ytId:"pU80BEm43JM",
    desc:"Expert guidance on maintaining cognitive health, understanding mild memory changes, and brain-stimulating activities tailored for seniors.",
    points:["Normal ageing vs memory disease","Daily brain exercises for seniors","Nutrition for cognitive health","When to consult a specialist"]
  },
  {
    id:5,
    title:"Sleep Well at Any Age",
    doctor:"Dr. Meena Pillai, Sleep Therapist",
    dur:"16:30", emoji:"🌙",
    cat:"Sleep Health", catColor:"#283593",
    tags:["Sleep","Insomnia","Rest"],
    ytId:"pU80BEm43JM",
    desc:"Practical, evidence-based therapy for common sleep problems in the elderly — covering sleep hygiene, evening routines, and relaxation before bed.",
    points:["Why sleep changes with age","Creating a bedtime ritual","Foods and habits that improve sleep","Guided body-scan for deep rest"]
  },
  {
    id:6,
    title:"Staying Positive — A Senior's Guide",
    doctor:"Dr. Kavitha Rao, Positive Psychologist",
    dur:"19:15", emoji:"☀️",
    cat:"Positivity", catColor:"#F57F17",
    tags:["Positivity","Gratitude","Happiness"],
    ytId:"sfA3TQXvN6E",
    desc:"An uplifting therapeutic session focusing on gratitude, life review, and positive reframing — especially designed to boost mood and emotional resilience.",
    points:["Life review therapy technique","Gratitude journaling for seniors","Reframing negative thoughts","Celebrating small daily joys"]
  },
  {
    id:7,
    title:"Family Relationships & Communication",
    doctor:"Dr. Rajan Pillai, Family Therapist",
    dur:"23:50", emoji:"👨‍👩‍👧",
    cat:"Relationships", catColor:"#00695C",
    tags:["Family","Communication","Bonds"],
    ytId:"sfA3TQXvN6E",
    desc:"A therapist-led session to help elderly individuals navigate changing family dynamics, express needs clearly, and maintain meaningful family bonds.",
    points:["Communicating needs without conflict","Understanding generational gaps","Rebuilding connection with children","Setting gentle expectations"]
  },
  {
    id:8,
    title:"Gentle Movement for Mental Health",
    doctor:"Dr. Sunita Krishnan, Physiotherapist",
    dur:"14:00", emoji:"🤸",
    cat:"Movement Therapy", catColor:"#2E7D32",
    tags:["Movement","Exercise","Mood"],
    ytId:"WkYz1g47Hj0",
    desc:"Simple seated and standing exercises that release mood-boosting hormones, reduce pain, and improve mental clarity — all safe for seniors.",
    points:["Seated stretches for daily practice","Chair yoga basics","Breathing + movement combination","Building consistency safely"]
  },
];

const PRAYERS = [
  {
    title:"Hanuman Chalisa",
    lang:"Sanskrit / Hindi",
    text:"श्री गुरु चरण सरोज रज, निज मन मुकुर सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
    trans:"I cleanse the mirror of my mind with the dust of my Guru's lotus feet, and narrate the unblemished glory of Shri Ram — bestower of the four-fold fruits of life."
  },
  {
    title:"Ram Raksha Stotram",
    lang:"Sanskrit",
    text:"अस्य श्रीरामरक्षास्तोत्रमन्त्रस्य।\nबुधकौशिक ऋषिः श्रीसीतारामचन्द्रो देवता।",
    trans:"This protective hymn of Shri Ram was composed by sage Budhakausika, with Sita and Ramachandra as the presiding deities who grant protection to all devotees."
  },
  {
    title:"Morning Aarti",
    lang:"Hindi",
    text:"आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की।\nगले में बैजंतीमाला, बजावत मुरली मधुर बाला॥",
    trans:"We offer Aarti to Kunjabihari — the one who lifts mountains, the divine flute-player Krishna — adorned with a garland, playing the sweet flute."
  },
];

const WELLNESS_ACTS = [
  { id:1, emoji:"🌅", title:"Morning Prayer Routine",   dur:"15 min", type:"Prayer",
    steps:["Begin with 3 deep breaths","Light a diya if available","Recite your favourite mantra slowly","Offer gratitude for this new day"] },
  { id:2, emoji:"🌬️", title:"4-7-8 Calming Breath",    dur:"10 min", type:"Breathwork",
    steps:["Sit comfortably, back straight","Inhale through nose for 4 counts","Hold gently for 7 counts","Exhale slowly through mouth for 8 counts — repeat 4 times"] },
  { id:3, emoji:"👂", title:"Mindful Listening",         dur:"20 min", type:"Meditation",
    steps:["Play a gentle bhajan or nature sound","Close your eyes softly","Notice the sounds without judging","Let thoughts pass like clouds"] },
  { id:4, emoji:"📝", title:"Gratitude Journaling",      dur:"10 min", type:"Reflection",
    steps:["Take a notebook or speak aloud","Name 3 things you are grateful for today","Why does each one matter to you?","End with 'Thank you' — to God, life, yourself"] },
  { id:5, emoji:"🪔", title:"Evening Aarti Meditation",  dur:"15 min", type:"Prayer",
    steps:["Light a lamp or candle","Sit quietly, gaze at the flame","Chant Ram Ram or any name of God","Let the day's worries melt in the light"] },
  { id:6, emoji:"🤸", title:"Gentle Chair Yoga",         dur:"12 min", type:"Movement",
    steps:["Sit in a sturdy chair","Roll shoulders back 5 times","Stretch arms overhead gently","Neck rotations left and right — slow and easy"] },
];

const COMMUNITY_MSGS = [
  { id:1, name:"Kamala Devi",   time:"9:12 AM", text:"🙏 Jai Shri Ram! Anyone else listening to today's Sundar Kand katha?" },
  { id:2, name:"Suresh Bhai",   time:"9:15 AM", text:"Haan ji! It brings such peace every morning 🕉️ I have been listening for 3 months now." },
  { id:3, name:"Meera Aunty",   time:"9:21 AM", text:"I also tried the therapy video on sleep — slept so well last night! 🌙 Thank you for the recommendation." },
  { id:4, name:"Rajan Uncle",   time:"9:35 AM", text:"The Grief Support video helped me a lot after losing my wife. Really touched my heart 💙" },
  { id:5, name:"Padma Ji",      time:"9:42 AM", text:"Jai Hanuman! I do Hanuman Chalisa every day on this app. My mind feels lighter 🐒" },
];

const DAILY_VERSE = {
  text:"रामं लक्ष्मणपूर्वजं रघुवरं सीतापतिं सुन्दरम्।",
  trans:"Ram, the elder of Lakshmana, best of Raghu's lineage, the consort of Sita — the beautiful one.",
  src:"Valmiki Ramayan"
};

// ─── RELIGION CONTENT ────────────────────────────────────────────────────────
const RELIGION_DATA = {
  hinduism:{
    aiName:"Guruji AI", color:"#E8621A",
    verse:DAILY_VERSE,
    sectionsLabel:"Ramayan — Seven Sacred Kandas", sections:KANDAS,
    songsLabel:"Bhajan Library", songs:BHAJANS,
    prayers:PRAYERS, wellness:WELLNESS_ACTS,
  },
  islam:{
    aiName:"Ilm AI", color:"#00796B",
    verse:{text:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",trans:"In the name of Allah, the Most Gracious, the Most Merciful.",src:"Quran — Al-Fatiha 1:1"},
    sectionsLabel:"Quran — Sacred Surahs",
    sections:[
      {id:1,emoji:"📖",name:"Al-Fatiha",chapters:7,desc:"The Opening — the essence of the entire Quran"},
      {id:2,emoji:"🌟",name:"Al-Baqarah",chapters:286,desc:"The Cow — guidance for all believers"},
      {id:3,emoji:"🕌",name:"Al-Imran",chapters:200,desc:"Family of Imran — lessons of steadfast faith"},
      {id:4,emoji:"☪️",name:"Ya-Sin",chapters:83,desc:"Heart of the Quran — reflection and remembrance"},
      {id:5,emoji:"🌙",name:"Ar-Rahman",chapters:78,desc:"The Most Merciful — Allah's infinite blessings"},
      {id:6,emoji:"📿",name:"Al-Mulk",chapters:30,desc:"The Sovereignty — protection and gratitude"},
      {id:7,emoji:"✨",name:"Al-Ikhlas",chapters:4,desc:"Sincerity — the pure essence of Tawhid"},
    ],
    songsLabel:"Nasheed & Qawwali Library",
    songs:[
      {id:1,title:"Tala al Badru Alayna",singer:"Traditional Nasheed",dur:"4:30",cat:"Nasheed",emoji:"🌙",ytId:"HoRCYiBZ2js"},
      {id:2,title:"Ya Nabi Salam Alayka",singer:"Maher Zain",dur:"5:12",cat:"Nasheed",emoji:"☪️",ytId:"Vqfy4ScRXFQ"},
      {id:3,title:"Asma ul Husna",singer:"Sami Yusuf",dur:"7:45",cat:"99 Names",emoji:"🌟",ytId:"Vqfy4ScRXFQ"},
      {id:4,title:"Subhanallah",singer:"Zain Bhikha",dur:"4:20",cat:"Dhikr",emoji:"🤲",ytId:"HoRCYiBZ2js"},
      {id:5,title:"Allah Hu",singer:"Nusrat Fateh Ali Khan",dur:"9:00",cat:"Qawwali",emoji:"📿",ytId:"Vqfy4ScRXFQ"},
      {id:6,title:"Masha Allah",singer:"Maher Zain",dur:"4:50",cat:"Nasheed",emoji:"✨",ytId:"HoRCYiBZ2js"},
      {id:7,title:"The Prophet's Name",singer:"Dawud Wharnsby",dur:"5:22",cat:"Nasheed",emoji:"💫",ytId:"Vqfy4ScRXFQ"},
      {id:8,title:"Allahu Allah",singer:"Zain Bhikha",dur:"4:00",cat:"Nasheed",emoji:"🌙",ytId:"HoRCYiBZ2js"},
    ],
    prayers:[
      {title:"Al-Fatiha",lang:"Arabic",text:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",trans:"In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to Allah, Lord of all worlds."},
      {title:"Ayat ul Kursi",lang:"Arabic",text:"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",trans:"Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. (2:255)"},
      {title:"Morning Dua",lang:"Arabic",text:"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ\nوَالْحَمْدُ لِلَّهِ",trans:"We have reached the morning and the entire kingdom belongs to Allah. All praise is to Allah."},
    ],
    wellness:[
      {id:1,emoji:"🌅",title:"Fajr Prayer Routine",dur:"15 min",type:"Prayer",steps:["Wake before sunrise","Perform Wudu with intention","Pray 2 Sunnah then 2 Fard rakaat","Read morning Adhkar (remembrances)"]},
      {id:2,emoji:"📿",title:"Dhikr Meditation",dur:"10 min",type:"Remembrance",steps:["Sit facing the Qibla","SubhanAllah × 33","Alhamdulillah × 33","Allahu Akbar × 34 — feel each word"]},
      {id:3,emoji:"📖",title:"Quran Recitation",dur:"20 min",type:"Scripture",steps:["Begin with Bismillah","Read slowly with meaning (Tarteel)","Reflect on one ayah deeply","End with Dua for understanding"]},
      {id:4,emoji:"📝",title:"Shukr Journaling",dur:"10 min",type:"Gratitude",steps:["Name 3 blessings from today","Recall a hardship Allah helped you through","Write a personal Dua of gratitude","End with Alhamdulillah"]},
      {id:5,emoji:"🌙",title:"Isha Reflection",dur:"15 min",type:"Prayer",steps:["After Isha prayer, sit in stillness","Recite Surah Al-Mulk for protection","Make heartfelt Dua for family","Sleep in peace and gratitude"]},
      {id:6,emoji:"🚶",title:"Mindful Walk",dur:"12 min",type:"Movement",steps:["Walk slowly in open space","With each step say 'Allahu Akbar'","Observe nature as signs of Allah","Return with a grateful heart"]},
    ],
  },
  christianity:{
    aiName:"Grace AI", color:"#1565C0",
    verse:{text:'"For God so loved the world that He gave His one and only Son."',trans:"Whoever believes in Him shall not perish but have eternal life.",src:"John 3:16"},
    sectionsLabel:"Bible — Sacred Books",
    sections:[
      {id:1,emoji:"📖",name:"Genesis",chapters:50,desc:"The story of creation and God's covenant with humanity"},
      {id:2,emoji:"🎵",name:"Psalms",chapters:150,desc:"Songs of praise, lament, and trust in God"},
      {id:3,emoji:"💡",name:"Proverbs",chapters:31,desc:"Timeless wisdom for daily righteous living"},
      {id:4,emoji:"✝️",name:"Matthew",chapters:28,desc:"The life, teachings, and resurrection of Jesus"},
      {id:5,emoji:"💙",name:"John",chapters:21,desc:"The Gospel of love — Jesus as the Word of God"},
      {id:6,emoji:"🙏",name:"Romans",chapters:16,desc:"Paul's letter on faith, grace, and salvation"},
      {id:7,emoji:"❤️",name:"Revelation",chapters:22,desc:"The glorious vision of God's eternal kingdom"},
    ],
    songsLabel:"Hymns & Gospel Library",
    songs:[
      {id:1,title:"Amazing Grace",singer:"Traditional Hymn",dur:"3:45",cat:"Hymn",emoji:"🕊️",ytId:"C2arm5ydeJc"},
      {id:2,title:"How Great Thou Art",singer:"Traditional",dur:"4:20",cat:"Hymn",emoji:"✨",ytId:"C2arm5ydeJc"},
      {id:3,title:"What a Friend in Jesus",singer:"Traditional",dur:"3:30",cat:"Hymn",emoji:"🙏",ytId:"C2arm5ydeJc"},
      {id:4,title:"Great Is Thy Faithfulness",singer:"Traditional",dur:"4:00",cat:"Hymn",emoji:"🌅",ytId:"C2arm5ydeJc"},
      {id:5,title:"Be Thou My Vision",singer:"Traditional Irish",dur:"3:50",cat:"Hymn",emoji:"👁️",ytId:"C2arm5ydeJc"},
      {id:6,title:"10,000 Reasons",singer:"Matt Redman",dur:"5:00",cat:"Contemporary",emoji:"💙",ytId:"XtwIT8JjddM"},
      {id:7,title:"Lord I Need You",singer:"Matt Maher",dur:"4:10",cat:"Contemporary",emoji:"❤️",ytId:"XtwIT8JjddM"},
      {id:8,title:"Holy Holy Holy",singer:"Traditional",dur:"3:20",cat:"Hymn",emoji:"✝️",ytId:"C2arm5ydeJc"},
    ],
    prayers:[
      {title:"The Lord's Prayer",lang:"English",text:"Our Father, who art in heaven,\nhallowed be thy name.\nThy kingdom come, thy will be done,\non earth as it is in heaven.",trans:"The prayer Jesus taught his disciples — the foundation of Christian prayer life."},
      {title:"Psalm 23",lang:"English",text:"The LORD is my shepherd; I shall not want.\nHe maketh me to lie down in green pastures;\nHe leadeth me beside the still waters.",trans:"The beloved psalm of comfort — God as a protective shepherd throughout every season of life."},
      {title:"Serenity Prayer",lang:"English",text:"God, grant me the serenity\nto accept the things I cannot change,\ncourage to change the things I can,\nand wisdom to know the difference.",trans:"A prayer for peace and discernment, beloved by millions seeking calm amid life's uncertainties."},
    ],
    wellness:[
      {id:1,emoji:"🌅",title:"Morning Devotion",dur:"15 min",type:"Prayer",steps:["Begin with the Lord's Prayer","Read a Psalm aloud slowly","Ask God to guide your day","End with silent listening"]},
      {id:2,emoji:"📖",title:"Lectio Divina",dur:"20 min",type:"Scripture",steps:["Choose one Bible verse","Read it slowly four times","Reflect: what word stands out?","Rest silently in God's presence"]},
      {id:3,emoji:"🙏",title:"Gratitude Prayer",dur:"10 min",type:"Gratitude",steps:["Name 3 blessings from today","Thank God specifically for each one","Pray for one person who needs grace","Close with Amen"]},
      {id:4,emoji:"🕊️",title:"Evening Examination",dur:"15 min",type:"Reflection",steps:["Sit quietly and still your mind","Review the day with gratitude","Acknowledge moments of grace","Forgive yourself — rest in God's love"]},
      {id:5,emoji:"🌿",title:"Creation Walk",dur:"12 min",type:"Movement",steps:["Walk slowly in a garden or park","Notice God's creation intentionally","Speak a word of praise for what you see","Return with a heart full of wonder"]},
      {id:6,emoji:"📝",title:"Prayer Journal",dur:"10 min",type:"Reflection",steps:["Write today's prayer requests","Note answered prayers from the past","Write a scripture that comforts you","End: 'Into Your hands I commit my spirit'"]},
    ],
  },
  sikhism:{
    aiName:"Waheguru AI", color:"#F57F17",
    verse:{text:"ਇੱਕ ਓਅੰਕਾਰ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ",trans:"One Universal Creator God. Truth is His Name. Creative Being. No Fear. No Hatred.",src:"Guru Granth Sahib Ji — Mool Mantar"},
    sectionsLabel:"Guru Granth Sahib Ji — Bani",
    sections:[
      {id:1,emoji:"📖",name:"Japji Sahib",chapters:38,desc:"Morning prayer by Guru Nanak Dev Ji — essence of Sikh teaching"},
      {id:2,emoji:"🎵",name:"Anand Sahib",chapters:40,desc:"Song of Bliss by Guru Amar Das Ji — sung at joyful occasions"},
      {id:3,emoji:"🙏",name:"Sukhmani Sahib",chapters:24,desc:"Psalm of Peace — brings tranquility to mind and soul"},
      {id:4,emoji:"☬",name:"Rehras Sahib",chapters:9,desc:"Evening prayer — gratitude and surrender to Waheguru"},
      {id:5,emoji:"🌙",name:"Kirtan Sohila",chapters:5,desc:"Bedtime prayer — protection and peace through the night"},
      {id:6,emoji:"⚔️",name:"Chandi di Var",chapters:8,desc:"Hymn of divine power — courage and righteousness"},
      {id:7,emoji:"👑",name:"Asa di Var",chapters:24,desc:"Morning hymn of Guru Nanak — wisdom for daily life"},
    ],
    songsLabel:"Shabad Kirtan Library",
    songs:[
      {id:1,title:"Waheguru Waheguru",singer:"Bhai Harjinder Singh",dur:"8:30",cat:"Naam Simran",emoji:"☬",ytId:"WcSe916m1sU"},
      {id:2,title:"Satnam Waheguru",singer:"Bhai Nirmal Singh",dur:"7:20",cat:"Naam Simran",emoji:"🙏",ytId:"WcSe916m1sU"},
      {id:3,title:"Deh Shiva Bar Mohe",singer:"Pandit Jasraj",dur:"6:00",cat:"Shabad Kirtan",emoji:"⚔️",ytId:"WcSe916m1sU"},
      {id:4,title:"So Dar Tera Keha",singer:"Bhai Ashish Singh",dur:"5:45",cat:"Shabad Kirtan",emoji:"🌅",ytId:"WcSe916m1sU"},
      {id:5,title:"Dukh Bhanjani Beri",singer:"Bhai Gurpreet Singh",dur:"9:00",cat:"Shabad Kirtan",emoji:"💙",ytId:"WcSe916m1sU"},
      {id:6,title:"Ik Ardas Bhayi",singer:"Surinder Kaur",dur:"5:00",cat:"Shabad Kirtan",emoji:"🌙",ytId:"WcSe916m1sU"},
      {id:7,title:"Man Mere Ram Nami",singer:"Bhai Joginder Singh",dur:"6:30",cat:"Shabad Kirtan",emoji:"✨",ytId:"WcSe916m1sU"},
      {id:8,title:"Mere Man Loche",singer:"Bhai Harjinder Singh",dur:"7:00",cat:"Shabad Kirtan",emoji:"🕊️",ytId:"WcSe916m1sU"},
    ],
    prayers:[
      {title:"Mool Mantar",lang:"Punjabi",text:"ਇੱਕ ਓਅੰਕਾਰ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ\nਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰਪ੍ਰਸਾਦਿ",trans:"One Creator. Truth is His Name. Without Fear. Without Hatred. Timeless. Beyond Birth. Self-Existent. By Guru's Grace."},
      {title:"Ardas",lang:"Punjabi / English",text:"ਪਹਿਲਾ ਸਤਿਗੁਰ ਕੀ ਰਹਿਣੀ ਰਹਿ\nਤਾਂ ਸਤਿਗੁਰ ਮਿਲੇ।",trans:"The Ardas is the universal Sikh prayer — a supplication to Waheguru offered before any important task, asking for divine grace for all of humanity."},
      {title:"Sikh Morning Prayer",lang:"English",text:"O Waheguru, as I begin this day,\nGuide my hands to serve,\nMy lips to speak truth,\nMy heart to love all equally.",trans:"A morning offering of the self to Waheguru — beginning the day in seva (selfless service) and simran (remembrance)."},
    ],
    wellness:[
      {id:1,emoji:"🌅",title:"Nitnem Morning Prayers",dur:"20 min",type:"Prayer",steps:["Wake at Amrit Vela (before dawn)","Recite Japji Sahib slowly","Focus on each shabad's meaning","End with Ardas for your family"]},
      {id:2,emoji:"📿",title:"Naam Simran",dur:"15 min",type:"Meditation",steps:["Sit comfortably, eyes gently closed","Inhale: 'Wahe', Exhale: 'guru'","Let the Naam wash over you like light","Continue for 15 minutes in stillness"]},
      {id:3,emoji:"🤝",title:"Seva Reflection",dur:"10 min",type:"Reflection",steps:["Recall any act of service today","If none, plan one small seva tomorrow","Reflect: how can I help one person?","End with a prayer for the needy"]},
      {id:4,emoji:"📝",title:"Gratitude Simran",dur:"10 min",type:"Gratitude",steps:["Name 3 blessings Waheguru gave today","Recall a hardship Waheguru helped you through","Express gratitude aloud","End: 'Waheguru tera shukar hai'"]},
      {id:5,emoji:"🌙",title:"Evening Kirtan Sohila",dur:"15 min",type:"Prayer",steps:["Read or listen to Kirtan Sohila","Reflect on the day's actions","Ask forgiveness for any wrongdoing","Sleep in Waheguru's protection"]},
      {id:6,emoji:"🚶",title:"Mindful Seva Walk",dur:"12 min",type:"Movement",steps:["Walk with 'Waheguru' on your lips","Look for one person who needs help","Offer a kind word or gesture of seva","Return home with a joyful heart"]},
    ],
  },
  buddhism:{
    aiName:"Dharma AI", color:"#6A1B9A",
    verse:{text:'"Thousands of candles can be lit from a single candle and the life of the candle will not be shortened."',trans:"Happiness never decreases by being shared. — The Buddha",src:"Dhammapada"},
    sectionsLabel:"Dhamma — Sacred Teachings",
    sections:[
      {id:1,emoji:"📖",name:"Dhammapada",chapters:26,desc:"423 verses of the Buddha's core teachings on the path"},
      {id:2,emoji:"💙",name:"Majjhima Nikaya",chapters:152,desc:"Middle-length discourses — practical teachings on meditation"},
      {id:3,emoji:"🌸",name:"Jataka Tales",chapters:547,desc:"Stories of the Buddha's past lives — wisdom through narrative"},
      {id:4,emoji:"☸️",name:"Sutta Pitaka",chapters:100,desc:"The Buddha's words on the Noble Eightfold Path"},
      {id:5,emoji:"💎",name:"Heart Sutra",chapters:1,desc:"The essence of wisdom — form is emptiness, emptiness is form"},
      {id:6,emoji:"🌿",name:"Udana",chapters:8,desc:"Inspired utterances — moments of joy and enlightenment"},
      {id:7,emoji:"🕯️",name:"Dhamma Vinaya",chapters:5,desc:"The Doctrine and Discipline — guidelines for peaceful living"},
    ],
    songsLabel:"Chants & Mantra Library",
    songs:[
      {id:1,title:"Om Mani Padme Hum",singer:"Imee Ooi",dur:"8:20",cat:"Mantra",emoji:"💎",ytId:"mvBLSJWk6HE"},
      {id:2,title:"Heart Sutra Chanting",singer:"Zen Monastery",dur:"7:45",cat:"Sutra",emoji:"☸️",ytId:"mvBLSJWk6HE"},
      {id:3,title:"Namo Amituofo",singer:"Traditional",dur:"10:00",cat:"Chant",emoji:"🌸",ytId:"mvBLSJWk6HE"},
      {id:4,title:"Metta Chant",singer:"Bhante Sujato",dur:"6:30",cat:"Loving-kindness",emoji:"💙",ytId:"mvBLSJWk6HE"},
      {id:5,title:"Pali Chanting",singer:"Thai Forest Monastery",dur:"9:00",cat:"Chant",emoji:"🌿",ytId:"mvBLSJWk6HE"},
      {id:6,title:"Gate Gate Paragate",singer:"Thich Nhat Hanh",dur:"5:15",cat:"Mantra",emoji:"🕊️",ytId:"mvBLSJWk6HE"},
      {id:7,title:"Loving Kindness",singer:"Sharon Salzberg",dur:"7:00",cat:"Metta",emoji:"❤️",ytId:"mvBLSJWk6HE"},
      {id:8,title:"Taking Refuge",singer:"Ajahn Chah",dur:"4:45",cat:"Refuge",emoji:"🪷",ytId:"mvBLSJWk6HE"},
    ],
    prayers:[
      {title:"Metta Prayer",lang:"Pali / English",text:"Sabbe sattā sukhitā hontu\nSabbe sattā averā hontu\nSabbe sattā abyāpajjhā hontu",trans:"May all beings be happy. May all beings be free from enmity. May all beings be free from suffering. — Loving-kindness for all life."},
      {title:"Three Refuges",lang:"Pali / English",text:"Buddhaṃ saraṇaṃ gacchāmi\nDhammaṃ saraṇaṃ gacchāmi\nSaṅghaṃ saraṇaṃ gacchāmi",trans:"I take refuge in the Buddha. I take refuge in the Dhamma. I take refuge in the Sangha."},
      {title:"Heart Sutra Opening",lang:"Sanskrit / English",text:"Gate gate pāragate\npārasaṃgate\nbodhi svāhā",trans:"Gone, gone, gone beyond, completely gone beyond — enlightenment! The mantra that leads beyond all suffering."},
    ],
    wellness:[
      {id:1,emoji:"🌅",title:"Morning Mindfulness",dur:"15 min",type:"Meditation",steps:["Wake gently — take 3 conscious breaths","Set an intention: 'May I be present today'","Recite the Three Refuges","Observe 5 things with beginner's eyes"]},
      {id:2,emoji:"💙",title:"Metta Meditation",dur:"15 min",type:"Loving-kindness",steps:["Close eyes and breathe naturally","'May I be happy, may I be well, may I be peaceful'","Extend to loved ones, then all beings","Rest in the feeling of universal compassion"]},
      {id:3,emoji:"🌿",title:"Mindful Breathing",dur:"10 min",type:"Meditation",steps:["Focus only on the breath at the nostrils","When mind wanders — gently return","No judgment, just noticing","Each breath is a fresh beginning 🌸"]},
      {id:4,emoji:"📝",title:"Dhamma Reflection",dur:"10 min",type:"Reflection",steps:["Name 3 conditions for happiness you have today","Recall impermanence: 'This too shall change'","Write a wish for one person's happiness","End: 'May all beings be free from suffering'"]},
      {id:5,emoji:"🕯️",title:"Evening Dhamma Sit",dur:"15 min",type:"Meditation",steps:["Light a candle and sit quietly","Review the day with detachment and compassion","Notice: where did you cling? Where resist?","Let it all go — breathe, release, rest"]},
      {id:6,emoji:"🚶",title:"Walking Meditation",dur:"12 min",type:"Movement",steps:["Walk very slowly in a quiet space","Feel each foot as it lifts, moves, places","With each step: 'I have arrived, I am home'","Let each step be a small act of peace"]},
    ],
  },
  jainism:{
    aiName:"Ahimsa AI", color:"#2E7D32",
    verse:{text:"णमो अरिहंताणं, णमो सिद्धाणं, णमो आयरियाणं, णमो उवज्झायाणं, णमो लोए सव्व साहूणं",trans:"I bow to the Arihantas (perfect souls). I bow to the Siddhas (liberated souls). I bow to the Acharyas, Upadhyayas, and all Sadhus.",src:"Navkar Mantra — The Supreme Jain Prayer"},
    sectionsLabel:"Agamas — Sacred Jain Texts",
    sections:[
      {id:1,emoji:"📖",name:"Acharanga Sutra",chapters:12,desc:"First Agama — teachings on non-violence and self-control"},
      {id:2,emoji:"🌿",name:"Uttaradhyayana",chapters:36,desc:"Final teachings of Mahavira — the way to liberation"},
      {id:3,emoji:"💎",name:"Tattvarthasutra",chapters:10,desc:"Reality explained — essence of Jain philosophy"},
      {id:4,emoji:"🕊️",name:"Dashavaikalika",chapters:10,desc:"Rules of conduct — Ahimsa in every moment"},
      {id:5,emoji:"🏔️",name:"Kalpa Sutra",chapters:3,desc:"Lives of the Tirthankaras — especially Mahavira"},
      {id:6,emoji:"🧘",name:"Samayasara",chapters:10,desc:"Essence of the Self — the pure soul beyond karma"},
      {id:7,emoji:"✨",name:"Niyamasara",chapters:10,desc:"Essence of Discipline — the path to inner purity"},
    ],
    songsLabel:"Jain Stuti & Stavan Library",
    songs:[
      {id:1,title:"Navkar Mantra",singer:"Traditional",dur:"5:00",cat:"Mantra",emoji:"📿",ytId:"CtTMILyOtNo"},
      {id:2,title:"Jai Jinendra",singer:"Traditional",dur:"4:30",cat:"Stuti",emoji:"✨",ytId:"CtTMILyOtNo"},
      {id:3,title:"Mahavir Swami Stuti",singer:"Traditional",dur:"6:00",cat:"Stuti",emoji:"🕊️",ytId:"CtTMILyOtNo"},
      {id:4,title:"Logassa",singer:"Traditional",dur:"3:45",cat:"Sutra",emoji:"🌟",ytId:"CtTMILyOtNo"},
      {id:5,title:"Rishabh Dev Stavan",singer:"Traditional",dur:"5:20",cat:"Stavan",emoji:"🏔️",ytId:"CtTMILyOtNo"},
      {id:6,title:"Shantinath Stuti",singer:"Traditional",dur:"4:50",cat:"Stuti",emoji:"💎",ytId:"CtTMILyOtNo"},
      {id:7,title:"Parshvanath Bhakti",singer:"Traditional",dur:"6:10",cat:"Bhakti",emoji:"🙏",ytId:"CtTMILyOtNo"},
      {id:8,title:"Samayik Path",singer:"Traditional",dur:"7:30",cat:"Samayik",emoji:"🧘",ytId:"CtTMILyOtNo"},
    ],
    prayers:[
      {title:"Navkar Mantra",lang:"Prakrit / English",text:"णमो अरिहंताणं\nणमो सिद्धाणं\nणमो आयरियाणं\nणमो उवज्झायाणं\nणमो लोए सव्व साहूणं",trans:"The supreme Jain prayer — bowing to five elevated souls. It destroys all sins and is the foremost of all mantras."},
      {title:"Shanti Path",lang:"Sanskrit / English",text:"सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु। मा कश्चित् दुःखभाग्भवेत्।",trans:"May all be happy. May all be free from illness. May all see goodness. May none suffer. — Universal prayer for all living beings."},
      {title:"Micchami Dukkadam",lang:"Prakrit / English",text:"खामेमि सव्वे जीवे, सव्वे जीवा खमंतु मे।\nमित्ती मे सव्व भूएसु, वेरं मज्झ न केण इ।",trans:"I forgive all living beings. May all living beings forgive me. I have friendship with all, enmity with none."},
    ],
    wellness:[
      {id:1,emoji:"🌅",title:"Samayik Morning Practice",dur:"20 min",type:"Meditation",steps:["Begin with Navkar Mantra (9 times)","Sit in equanimity — Samayik posture","Observe thoughts without attachment","End with: 'May all beings be happy'"]},
      {id:2,emoji:"🕊️",title:"Ahimsa Reflection",dur:"10 min",type:"Reflection",steps:["Review yesterday for harsh thoughts or words","Silently seek forgiveness: 'Micchami Dukkadam'","Set intention: 'I will harm no being today'","Extend compassion to all life forms"]},
      {id:3,emoji:"📿",title:"Navkar Mantra Meditation",dur:"15 min",type:"Mantra",steps:["Hold a mala or count on fingers","Recite Navkar Mantra with full attention","108 repetitions — one bead per recitation","Feel the vibration purifying your consciousness"]},
      {id:4,emoji:"📝",title:"Pratikraman Journaling",dur:"10 min",type:"Reflection",steps:["Write any action today that caused harm","Reflect on why it happened","Ask forgiveness mentally of all beings","Resolve one improvement for tomorrow"]},
      {id:5,emoji:"🌿",title:"Anuvrat Practice",dur:"15 min",type:"Ethics",steps:["Choose one small vow for the day","Examples: eat simply, speak gently, help one person","At evening, check how you did","Celebrate small victories in Ahimsa"]},
      {id:6,emoji:"🧘",title:"Kayotsarga Relaxation",dur:"12 min",type:"Movement",steps:["Stand or sit very still and upright","Consciously relax each body part","Remain in stillness, observe the breath","This body is temporary — the soul is eternal"]},
    ],
  },
};

// ─── MOCK AI ─────────────────────────────────────────────────────────────────
const getMockAI = (question, rel="hinduism") => {
  const q = question.toLowerCase();
  const lonely=/lonely|alone|isolat/.test(q);
  const anxiety=/anxi|worry|stress|fear|scared/.test(q);
  const grief=/grief|lost|death|died|mourn|sad/.test(q);
  const sleep=/sleep|insomnia|rest|night/.test(q);
  const family=/family|children|son|daughter|grandchild/.test(q);
  const R={
    hinduism:{
      lonely:"🙏 In Hinduism, the Atman (soul) is eternally united with Brahman — you are never truly alone. The Bhagavad Gita teaches 'Vasudeva sarvam iti' — the Divine dwells in everything. Try our Wellness Corner's Mindful Listening, or simply chant 'Ram Ram' softly. 🕉️",
      anxiety:"🙏 Lord Krishna tells Arjuna in the Gita: 'Do not give way to weakness — rise!' Anxiety comes from attachment to outcomes. Try the 4-7-8 breathing exercise in our Wellness Corner. The Hanuman Chalisa is also wonderfully calming. 🕉️",
      grief:"🙏 The Gita's greatest comfort: 'The soul is never born nor does it die — it is eternal.' (BG 2:20). Your loved one's soul continues its divine journey. Grief is love with no place to go — honour it through prayer and remembrance. 🕉️",
      sleep:"🙏 For restful sleep, listen to gentle Kirtan or recite Ram's name softly. Try our Evening Aarti Meditation in the Wellness Corner. Ancient Yoga Nidra (yogic sleep) practice is also deeply restoring. 🕉️",
      family:"🙏 The Ramayan itself is a beautiful teaching on family — Ram's devotion to his father, love for Sita, the bond with Lakshmana. Seva (service), patience, and dharma are the keys to harmonious family life. 🕉️",
      def:"🙏 Namaste! Whatever weighs on your heart, the vast ocean of Hindu wisdom has guidance. The Ramayan shows that even Lord Ram faced hardship — yet never lost his dharma. Ask me anything about scriptures, prayers, bhajans or your well-being! 🕉️",
    },
    islam:{
      lonely:"🤲 As-salamu alaykum! Allah (SWT) says: 'We are closer to him than his jugular vein' (50:16). You are never alone — Allah is always near. Make dhikr: 'La ilaha illallah' — remembrance of Allah brings peace to the heart. ☪️",
      anxiety:"🤲 Bismillah. The Quran says: 'Verily with every difficulty comes ease' (94:5) — Allah repeats this twice! Salah five times daily is a beautiful anxiety cure. 'Tawakkul' — trust in Allah — is the antidote to anxiety. ☪️",
      grief:"🤲 'Inna lillahi wa inna ilayhi raji'un' — To Allah we belong and to Him we return (2:156). Death is a return to the Beloved. May Allah grant your loved ones Jannah and give you sabr (patience). ☪️",
      sleep:"🤲 The Prophet (PBUH) recommended sleeping on the right side and reciting Ayat ul-Kursi before sleep. Surah Al-Mulk at night brings protection. Try our Isha Night Reflection wellness activity. ☪️",
      family:"🤲 'The best of you are those who are best to their families' (Prophet PBUH). Seniors deserve deep respect in Islam: 'Whoever does not respect elders is not of us.' Open, kind communication and Dua for family transforms relationships. ☪️",
      def:"🤲 As-salamu alaykum, dear seeker! Islam is a complete way of life — the Quran and Sunnah offer guidance for every situation. 'And whoever relies upon Allah — then He is sufficient for him' (65:3). ☪️",
    },
    christianity:{
      lonely:"✝️ Dear friend, Jesus said 'I am with you always, even unto the end of the world' (Matthew 28:20). Try Psalm 23 aloud — 'The Lord is my shepherd' — many find this brings instant companionship and peace. 🙏",
      anxiety:"✝️ 'Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God. The peace of God will guard your hearts' (Philippians 4:6-7). God is already holding tomorrow. 🙏",
      grief:"✝️ 'Blessed are those who mourn, for they will be comforted' (Matthew 5:4). In Christianity, death is not goodbye but 'until we meet again' — the resurrection of Christ gives hope that love is stronger than death. 🙏",
      sleep:"✝️ Psalm 4:8: 'In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.' Try our Evening Examination activity before bed — surrendering worries to God brings restful sleep. 🙏",
      family:"✝️ Ephesians 6:4 calls for raising children with love, not harshness. Proverbs 22:6: 'Train up a child in the way he should go.' Our Family Relationships therapy video has excellent guidance. 🙏",
      def:"✝️ Grace and peace to you! Proverbs 16:31 says 'Gray hair is a crown of glory — it is gained in a righteous life.' Your years are a blessing! Ask me about scripture, prayer, hymns, or anything on your heart. 🙏",
    },
    sikhism:{
      lonely:"🙏 Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh! The Guru Granth Sahib Ji reminds us: 'The Lord is always with you — as your companion and protector.' Naam Simran is the greatest remedy for loneliness. ☬",
      anxiety:"🙏 Guru Nanak Dev Ji teaches: 'Chinta ta ki kijiye jo anhoni hoy' — worry only about what truly cannot be avoided. The Japji Sahib each morning settles the mind beautifully. Try our Naam Simran wellness activity. ☬",
      grief:"🙏 'Jo upjio so binas hau' — all that is born must pass; this is eternal truth (SGGS). Death is the will of Waheguru — the soul returns to its source. Sukhmani Sahib brings profound peace in grief. ☬",
      sleep:"🙏 Kirtan Sohila — the bedtime prayer — is designed for peaceful sleep. Recite or listen to it each night. 'Sleep in God's name, wake in God's name.' Leave your worries with Waheguru before resting. ☬",
      family:"🙏 Sikhism calls for equality and respect for all family members — the same divine light is in every person. Seva (selfless service) within the family is the highest worship. ☬",
      def:"🙏 Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh! The Guru Granth Sahib Ji is our living, eternal Guru. 'Sab ki reena karta paya' — the Creator provides for all. Ask me anything about Sikh teachings or your inner well-being. ☬",
    },
    buddhism:{
      lonely:"☸️ The Buddha taught that loneliness arises from the illusion of separation. Metta meditation dissolves this: silently repeat 'May I be happy, may I be well, may I be peaceful.' As you wish others well, your loneliness dissolves. 🪷",
      anxiety:"☸️ 'The mind is everything — what you think, you become.' Anxiety lives in the imagined future. Mindfulness brings us back to this breath, this moment. Has the thing you worry about actually happened yet? In this moment — you are safe. 🪷",
      grief:"☸️ The Buddha wept — grief is honoured in Buddhism. 'Anicca' teaches that everything passes — including grief. Try Metta for your loved one: 'May you be happy wherever you are.' Our Grief Support therapy video may also offer comfort. 🪷",
      sleep:"☸️ A simple Buddhist sleep practice: lie on your right side. Observe each breath with gentle awareness. When thoughts arise, let them pass like clouds. Our Walking Meditation in the evening also calms the nervous system beautifully. 🪷",
      family:"☸️ The Buddha's teachings on family centre on Right Speech — speak only what is true, kind, helpful and timely. 'In the end, only three things matter: how much you loved, how gently you lived, how gracefully you let go.' 🪷",
      def:"☸️ Namo Buddhaya! The Dhamma offers practical tools for peace accessible to anyone. 'Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened.' What would you like to explore today? 🪷",
    },
    jainism:{
      lonely:"🕊️ Jai Jinendra! In Jain philosophy, the soul is self-luminous and eternally complete. Loneliness invites us inward — try Samayik (48 minutes of quiet reflection). 'Parasparopagraho Jīvānām' — all souls support one another. 🕊️",
      anxiety:"🕊️ The Navkar Mantra is Jainism's greatest peace-bringer. Recite it nine times: 'Namo Arihantanam, Namo Siddhanam…' Each line salutes a higher state of liberation — reminding you that peace is your true nature. 🕊️",
      grief:"🕊️ Jain philosophy teaches that the soul is eternal — 'Jivo nityo' — the soul is permanent. Your loved one's soul continues toward moksha (liberation). Pratikraman — the practice of reflection and forgiveness — brings deep peace in grief. 🕊️",
      sleep:"🕊️ Kayotsarga — the Jain practice of conscious body relaxation — is wonderful for sleep. Lie still, consciously release each body part from feet to head, reciting the Navkar Mantra softly. 🕊️",
      family:"🕊️ Jain family life is rooted in Ahimsa in all interactions — gentle speech, patient listening, and forgiveness. 'Kshama Viranam Bhushan' — forgiveness is the ornament of the brave. 🕊️",
      def:"🕊️ Jai Jinendra! The Jain Agamas and Mahavira's teachings offer a profound path of Ahimsa. The Navkar Mantra can be recited anytime for peace. Ask me about Jain scriptures, meditations, or your well-being. 🕊️",
    },
  };
  const r=R[rel]||R.hinduism;
  if(lonely)return r.lonely;
  if(anxiety)return r.anxiety;
  if(grief)return r.grief;
  if(sleep)return r.sleep;
  if(family)return r.family;
  return r.def;
};

const DEMO_USERS = [
  { user: "aarav", name: "Aarav Sharma", pass: "1234", emoji: "🧓" },
  { user: "meera", name: "Meera Patel", pass: "1234", emoji: "👵" },
  { user: "david", name: "David John", pass: "1234", emoji: "👨‍🦳" },
  { user: "fatima", name: "Fatima Ali", pass: "1234", emoji: "🧕" }
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginU, setLoginU] = useState("");
  const [loginP, setLoginP] = useState("");
  const [loginErr, setLoginErr] = useState("");
  
  const [page, setPage]             = useState("home");
  const [religion, setReligion]     = useState(null);       // null = not chosen
  const [showRelPicker, setShowRelPicker] = useState(false);
  const [pendingPage, setPendingPage]     = useState(null);
  const [largeText, setLargeText]   = useState(false);
  const [hiContrast, setHiContrast] = useState(false);
  const [playing, setPlaying]       = useState(null);
  const [selectedKanda, setKanda]   = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [aiMsgs, setAiMsgs]         = useState([
    { role:"bot", text:"🙏 Namaste! I am your Spiritual Guide AI. Ask me anything about scriptures, prayers, or your emotional well-being." }
  ]);
  const [aiInput, setAiInput]       = useState("");
  const [aiLoading, setAiLoading]   = useState(false);
  const [chatMsgs, setChatMsgs]     = useState([]);
  const [chatInput, setChatInput]   = useState("");
  const [wellnessActive, setWellnessActive] = useState(null);
  const [therapyCat, setTherapyCat] = useState("All");
  const [isListening, setIsListening] = useState(false);
  const [isChatListening, setIsChatListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgIdx, setSpeakingMsgIdx] = useState(null);
  const aiEndRef = useRef(null);

  // content pages that require a religion to be selected first
  const CONTENT_PAGES = ["bhajans","prayers","wellness","guruji"];

  // navigate: if content page and no religion selected, open picker first
  const navigate = (p) => {
    setKanda(null); setWellnessActive(null);
    if (CONTENT_PAGES.includes(p) && !religion) {
      setPendingPage(p);
      setShowRelPicker(true);
    } else {
      setPage(p);
    }
  };

  const pickReligion = (rel) => {
    setReligion(rel);
    setShowRelPicker(false);
    // reset AI greeting for new religion
    const rd = RELIGION_DATA[rel];
    setAiMsgs([{role:"bot", text:`🙏 ${rel==='islam'?'As-salamu alaykum':'Namaste'}! I am ${rd.aiName} — your spiritual companion. Ask me anything about scriptures, prayers, or your well-being.`}]);
    if (pendingPage) { setPage(pendingPage); setPendingPage(null); }
  };

  // current religion data (fall back to hinduism for home/community/about)
  const relData = RELIGION_DATA[religion] || RELIGION_DATA.hinduism;

  // Inject CSS
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // Fetch initial community messages from backend
  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setChatMsgs(data); })
      .catch(err => {
        console.warn("Could not fetch messages from backend, using fallback:", err);
        setChatMsgs(COMMUNITY_MSGS); // Fallback if backend is not running
      });
  }, []);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [aiMsgs]);

  const stripEmojis = (str) => {
    if (!str) return '';
    return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
  };

  const readAloud = (text) => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingMsgIdx(null);
    const u = new SpeechSynthesisUtterance(stripEmojis(text));
    u.lang = "en-IN"; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const speakAiReply = (text, msgIndex) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(stripEmojis(text));
    u.lang = "en-IN"; u.rate = 0.85;
    u.onstart = () => { setIsSpeaking(true); setSpeakingMsgIdx(msgIndex); };
    u.onend = () => { setIsSpeaking(false); setSpeakingMsgIdx(null); };
    u.onerror = () => { setIsSpeaking(false); setSpeakingMsgIdx(null); };
    window.speechSynthesis.speak(u);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingMsgIdx(null);
  };

  const askAI = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const q = aiInput.trim();
    setAiMsgs(m => [...m, { role:"user", text:q }]);
    setAiInput("");
    setAiLoading(true);
    setAiMsgs(m => [...m, { role:"bot", text:"🙏 Thinking…", loading:true }]);
    
    try {
      const recentMsgs = aiMsgs.filter(m => !m.loading).slice(-10);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: recentMsgs.concat({role:"user", text:q}),
          religion: religion || "hinduism"
        })
      });
      const data = await res.json();
      const replyText = data.reply || "Error fetching AI response";
      setAiMsgs(m => {
        const newMsgs = [...m.slice(0,-1), { role:"bot", text: replyText }];
        if (autoSpeak) {
          setTimeout(() => speakAiReply(replyText, newMsgs.length - 1), 100);
        }
        return newMsgs;
      });
    } catch {
      setAiMsgs(m => [...m.slice(0,-1), { role:"bot", text:"⚠️ Could not connect to AI. Please check the backend." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const q = chatInput.trim();
    setChatInput("");
    
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: currentUser?.name || "You", text: q })
      });
      const data = await res.json();
      if (data.id) {
        setChatMsgs(m => [...m, { id: data.id, name: data.name, time: data.time, text: data.text }]);
      }
    } catch {
      // Fallback
      setChatMsgs(m => [...m, {
        id: Date.now(), name: currentUser?.name || "You",
        time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
        text: q
      }]);
    }
  };

  const rootClass = [largeText?"lt":"", hiContrast?"hc":""].filter(Boolean).join(" ");

  // ─── RELIGION PICKER MODAL ───────────────────────────────────────────────────
  function ReligionPicker() {
    return (
      <div className="rel-overlay" onClick={()=>setShowRelPicker(false)}>
        <div className="rel-box" onClick={e=>e.stopPropagation()}>
          <div className="rel-title">Select Your Path</div>
          <div className="rel-sub">Choose a faith to personalise your spiritual experience</div>
          <div className="rel-grid">
            {RELIGIONS.map(r=>(
              <div key={r.id} className="rel-card" style={{borderBottomColor:r.color}} onClick={() => pickReligion(r.id)}>
                <div className="rel-emoji">{r.emoji}</div>
                <div className="rel-name">{r.name}</div>
                <div className="rel-desc">{r.desc}</div>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{borderColor:"var(--gray)",color:"var(--gray)",width:"100%",marginTop:24}} onClick={()=>setShowRelPicker(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  // ─── PAGE RENDERERS ──────────────────────────────────────────────────────────

  function HomePage() {
    return (
      <div className="page">
        <div className="hero" style={{background:`linear-gradient(135deg, var(--deep) 0%, ${relData.color} 100%)`}}>
          <h1>🪷 Spiritual Saathi</h1>
          <p>A peaceful digital home for elderly devotees — devotional songs, guided prayers, therapy videos & AI spiritual support. Simple. Caring. Made with love.</p>
          <div className="hero-btns">
            <button className="btn-solid" onClick={()=>navigate("bhajans")}>🎵 Devotional</button>
            <button className="btn-ghost" onClick={()=>navigate("therapy")}>🎬 Therapy Videos</button>
            <button className="btn-ghost" onClick={()=>navigate("guruji")}>🤖 {relData.aiName}</button>
          </div>
        </div>

        <div className="stats">
          {[["7+ Texts","Scriptures"],["8 Videos","Therapy"],["50+ Tracks","Audio Library"],["Daily Verse","Every Morning"]].map(([n,l])=>(
            <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>

        {/* Daily Verse */}
        <div className="card" style={{marginBottom:28,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <div className="sh"><h2>🌅 Today's Verse</h2></div>
          <div className="prayer-block" style={{whiteSpace:"pre-line"}}>{relData.verse.text}</div>
          <div className="prayer-trans">{relData.verse.trans}</div>
          <div style={{textAlign:"center",color:"var(--gray)",fontSize:13,marginBottom:14}}>— {relData.verse.src}</div>
          <div style={{textAlign:"center"}}>
            <button className="btn-solid" style={{background:"var(--saffron)",color:"white"}} onClick={()=>readAloud(relData.verse.trans)}>🔊 Listen</button>
          </div>
        </div>

        {/* Quick Nav Grid */}
        <div className="sh"><h2>✨ What would you like today?</h2></div>
        <div className="divider"/>
        <div className="grid-3">
          {[
            {emoji:"🎵",title:relData.songsLabel,sub:"A curated collection",p:"bhajans"},
            {emoji:"🎬",title:"Therapy Videos",sub:"8 expert-led sessions",p:"therapy"},
            {emoji:"🙏",title:"Daily Prayers",sub:"Morning & evening texts",p:"prayers"},
            {emoji:"🧘",title:"Wellness Corner",sub:"Breathing, calm & routine",p:"wellness"},
            {emoji:"🤖",title:relData.aiName,sub:"Spiritual Q&A anytime",p:"guruji"},
            {emoji:"👥",title:"Community",sub:"Connect with devotees",p:"community"},
            {emoji:"ℹ️",title:"About Us",sub:"Our mission & story",p:"about"},
          ].map(it=>(
            <div key={it.title} className="kanda card-hover" onClick={()=>navigate(it.p)}>
              <div className="kanda-emoji">{it.emoji}</div>
              <div className="kanda-name">{it.title}</div>
              <div className="kanda-desc">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }



  function BhajansPage() {
    return (
      <div className="page">
        <div className="sh"><h2>🎵 {relData.songsLabel}</h2></div>
        <p className="sh-sub">Devotional songs curated for peace, joy, and spiritual connection</p>
        <div className="divider"/>
        <div className="col">
          {relData.songs.map(b=>(
            <div key={b.id} className="bhajan-row">
              <button
                className={`play-btn ${playing===b.id?"active":""}`}
                onClick={()=>{
                  if(playing===b.id){setPlaying(null);}
                  else{setPlaying(b.id);}
                }}
              >{playing===b.id?"⏸":"▶"}</button>
              <div style={{fontSize:24,flexShrink:0}}>{b.emoji}</div>
              <div className="bhajan-info">
                <div className="bhajan-title">{b.title}</div>
                <div className="bhajan-meta">
                  <span>👤 {b.singer}</span>
                  <span>⏱ {b.dur}</span>
                  <span className="tag tag-saffron">{b.cat}</span>
                </div>
                {/* Inline YouTube player when playing */}
                {playing===b.id && b.ytId && (
                  <div style={{marginTop:12,borderRadius:14,overflow:"hidden",border:"2.5px solid var(--saffron)",width:"100%",maxWidth:640,boxShadow:"0 4px 20px rgba(232,98,26,0.15)"}}>
                    <iframe
                      width="100%" height="280"
                      src={`https://www.youtube.com/embed/${b.ytId}?autoplay=1&controls=1`}
                      title={b.title}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{display:"block"}}
                    />
                  </div>
                )}
              </div>
              <button style={{background:"none",border:"none",fontSize:20,cursor:"pointer"}} onClick={()=>readAloud(b.title+" by "+b.singer)}>🔊</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function TherapyPage() {
    const cats = ["All","Emotional Health","Anxiety & Calm","Grief Support","Cognitive Health","Sleep Health","Positivity","Relationships","Movement Therapy"];
    const filtered = therapyCat==="All" ? THERAPY_VIDEOS : THERAPY_VIDEOS.filter(v=>v.cat===therapyCat);
    return (
      <div className="page">
        <div className="sh"><h2>🎬 Therapy Video Library</h2></div>
        <p className="sh-sub">Pre-recorded expert therapy sessions designed specifically for senior well-being. Watch at your own pace.</p>
        <div className="divider"/>

        {/* Category filter */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
          {["All","Emotional Health","Anxiety & Calm","Grief Support","Cognitive Health","Sleep Health"].map(c=>(
            <button key={c}
              onClick={()=>setTherapyCat(c)}
              style={{
                padding:"7px 16px",borderRadius:50,border:"2px solid",
                borderColor:therapyCat===c?"var(--saffron)":"var(--border)",
                background:therapyCat===c?"var(--saffron)":"white",
                color:therapyCat===c?"white":"var(--gray)",
                fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer",transition:"all .2s"
              }}>{c}</button>
          ))}
        </div>

        <div className="grid-2">
          {filtered.map(v=>(
            <div key={v.id} className="video-card" onClick={()=>setVideoModal(v)}>
              <div className="video-thumb">
                <div className="video-thumb-emoji">{v.emoji}</div>
                <div className="video-category" style={{background:v.catColor}}>{v.cat}</div>
                <div className="video-duration">⏱ {v.dur}</div>
                <button className="video-thumb-play">▶ Watch</button>
              </div>
              <div className="video-body">
                <div className="video-title">{v.title}</div>
                <div className="video-doctor">👩‍⚕️ {v.doctor}</div>
                <div className="video-tags">
                  {v.tags.map(t=><span key={t} className="tag tag-teal">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{marginTop:28,background:"linear-gradient(135deg,#E3F2FD,#EDE7F6)"}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <span style={{fontSize:32}}>💡</span>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:"var(--deep)",marginBottom:6}}>Tip: Watch with a Family Member</div>
              <div style={{fontSize:14,color:"#3E2000",lineHeight:1.7}}>These therapy videos are most effective when watched with a trusted caregiver, family member, or friend. They can help you practice the techniques together.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PrayersPage() {
    return (
      <div className="page">
        <div className="sh"><h2>🙏 Daily Prayers & Mantras</h2></div>
        <p className="sh-sub">Sacred texts for morning and evening prayer — large text, audio read-aloud included</p>
        <div className="divider"/>
        <div className="col">
          {relData.prayers.map(p=>(
            <div key={p.title} className="card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <div style={{fontFamily:"'Yatra One',serif",fontSize:20,color:"var(--deep)"}}>{p.title}</div>
                  <div style={{fontSize:12,color:"var(--gray)",marginTop:2}}>{p.lang}</div>
                </div>
                <button className="play-btn" onClick={()=>readAloud(p.trans)}>🔊</button>
              </div>
              <div className="prayer-block" style={{whiteSpace:"pre-line"}}>{p.text}</div>
              <div className="prayer-trans">{p.trans}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function WellnessPage() {
    return (
      <div className="page">
        <div className="sh"><h2>🧘 Wellness Corner</h2></div>
        <p className="sh-sub">Gentle daily activities for emotional peace and physical comfort</p>
        <div className="divider"/>
        {wellnessActive ? (
          <div className="card" style={{textAlign:"center",padding:40}}>
            <div style={{fontSize:64,marginBottom:16}}>{wellnessActive.emoji}</div>
            <div style={{fontFamily:"'Yatra One',serif",fontSize:24,color:"var(--deep)",marginBottom:6}}>{wellnessActive.title}</div>
            <div style={{color:"var(--gray)",fontSize:14,marginBottom:28}}>⏱ {wellnessActive.dur} · {wellnessActive.type}</div>
            <div className="col" style={{maxWidth:480,margin:"0 auto 28px"}}>
              {wellnessActive.steps.map((s,i)=>(
                <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",background:"#FFF8F0",borderRadius:12,padding:"12px 16px",textAlign:"left"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"var(--saffron)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,flexShrink:0,fontSize:13}}>{i+1}</div>
                  <div style={{fontSize:15,lineHeight:1.6,color:"var(--text)"}}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:14,justifyContent:"center"}}>
              <button className="btn-solid" style={{background:"var(--saffron)",color:"white"}} onClick={()=>readAloud(wellnessActive.steps.join(". "))}>🔊 Listen</button>
              <button className="btn-ghost" style={{borderColor:"var(--saffron)",color:"var(--saffron)"}} onClick={()=>setWellnessActive(null)}>← Back</button>
            </div>
          </div>
        ) : (
          <div className="grid-2">
            {relData.wellness.map(w=>(
              <div key={w.id} className="wellness-card" onClick={()=>setWellnessActive(w)}>
                <div className="wellness-emoji">{w.emoji}</div>
                <div style={{fontFamily:"'Yatra One',serif",fontSize:17,color:"var(--deep)",marginBottom:6}}>{w.title}</div>
                <div style={{fontSize:13,color:"var(--gray)"}}>⏱ {w.dur} · {w.type}</div>
                <div style={{marginTop:12}}><span className="tag tag-saffron">Start Activity ›</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  function GurujiPage() {
    return (
      <div className="page">
        <div className="sh"><h2>🤖 Ask {relData.aiName}</h2></div>
        <p className="sh-sub">Your compassionate AI spiritual companion — ask anything about scriptures, prayers, or your well-being</p>
        <div className="divider"/>

        <div className="card" style={{marginBottom:16,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <span style={{fontSize:32}}>🤖</span>
            <div style={{flex:1,minWidth:140}}>
              <div style={{fontFamily:"'Yatra One',serif",fontSize:18,color:"var(--deep)"}}>{relData.aiName}</div>
              <div style={{fontSize:12,color:"var(--gray)"}}>Spiritual & Emotional Support</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {isSpeaking && (
                <div className="speaking-indicator">
                  <div className="bars"><div className="bar"/><div className="bar"/><div className="bar"/><div className="bar"/></div>
                  Speaking…
                  <button onClick={stopSpeaking} style={{background:"#E53935",border:"none",borderRadius:8,color:"white",padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>⏹ Stop</button>
                </div>
              )}
              <div className={`auto-speak-toggle ${autoSpeak?'active':''}`} onClick={()=>setAutoSpeak(a=>!a)}>
                <div className={`auto-speak-switch ${autoSpeak?'on':''}`}/>
                <span style={{fontSize:13,fontWeight:600,color:autoSpeak?'var(--saffron)':'var(--gray)',whiteSpace:'nowrap'}}>🔊 Auto Voice</span>
              </div>
            </div>
          </div>

          <div className="ai-msgs">
            {aiMsgs.map((m,i)=>(
              <div key={i} className={`ai-bubble ${m.role} ${m.loading?"loading":""}`}>
                {m.role==="bot" && (
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontWeight:700,fontSize:12,opacity:.7}}>🤖 {relData.aiName}</span>
                    {!m.loading && (
                      <button
                        className={`speak-btn ${speakingMsgIdx===i?'speaking':''}`}
                        onClick={(e)=>{ e.stopPropagation(); speakingMsgIdx===i ? stopSpeaking() : speakAiReply(m.text, i); }}
                        title={speakingMsgIdx===i ? "Stop speaking" : "Listen to this response"}
                      >
                        {speakingMsgIdx===i ? "⏹" : "🔊"}
                      </button>
                    )}
                  </div>
                )}
                {m.text}
              </div>
            ))}
            <div ref={aiEndRef}/>
          </div>

          <div className="ai-row" style={{marginTop:16}}>
            <input
              className="ai-input"
              placeholder="Ask about scriptures, prayers, your feelings…"
              value={aiInput}
              onChange={e=>setAiInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&askAI()}
            />
            <button
              style={{
                background: isListening ? "#E53935" : "var(--saffron)",
                border:"none", borderRadius:"50%",
                width:52, height:52, minWidth:52,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", transition:"all .3s",
                boxShadow: isListening ? "0 0 0 6px rgba(229,57,53,0.25)" : "0 2px 8px rgba(232,98,26,0.2)",
                animation: isListening ? "pulse-mic 1.5s infinite" : "none",
              }}
              title={isListening ? "Listening… tap to stop" : "Tap to speak"}
              onClick={() => {
                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                  alert('Speech recognition is not supported in this browser. Please use Chrome.');
                  return;
                }
                if (isListening) {
                  setIsListening(false);
                  return;
                }
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-IN';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                recognition.onstart = () => setIsListening(true);
                recognition.onresult = (event) => {
                  const transcript = event.results[0][0].transcript;
                  setAiInput(prev => prev ? prev + ' ' + transcript : transcript);
                  setIsListening(false);
                };
                recognition.onerror = () => setIsListening(false);
                recognition.onend = () => setIsListening(false);
                recognition.start();
              }}
            >
              <span style={{fontSize:26,color:"white"}}>{isListening ? "⏹" : "🎙️"}</span>
            </button>
            <button className="ai-send" onClick={askAI} disabled={aiLoading}>
              {aiLoading?"…":"Ask 🙏"}
            </button>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="sh"><h2>💡 Try asking…</h2></div>
        <div className="grid-2">
          {[
            "What is the meaning of Sundar Kand?",
            "How can I cope with loneliness?",
            "What is the significance of Hanuman Chalisa?",
            "Give me a morning prayer routine",
            "Why is Ram considered ideal for all?",
            "How do I calm my anxious mind?",
          ].map(q=>(
            <button key={q}
              onClick={()=>{setAiInput(q);}}
              style={{
                background:"white",border:"2px solid var(--border)",borderRadius:"16px",
                padding:"12px 16px",textAlign:"left",cursor:"pointer",
                fontSize:14,fontFamily:"inherit",color:"var(--text)",
                transition:"all .2s",lineHeight:1.5,
              }}
              onMouseOver={e=>e.currentTarget.style.borderColor="var(--saffron)"}
              onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}
            >"{q}"</button>
          ))}
        </div>
      </div>
    );
  }

  function CommunityPage() {
    return (
      <div className="page">
        <div className="sh"><h2>👥 Satsang Sabha</h2></div>
        <p className="sh-sub">Connect with fellow devotees across India. Share blessings, experiences, and joy.</p>
        <div className="divider"/>
        <div className="card">
          <div className="chat-list">
            {chatMsgs.map(m=>(
              <div key={m.id} className="chat-bubble">
                <div className="chat-meta"><span className="chat-name">{m.name}</span><span>{m.time}</span></div>
                <div className="chat-text">{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:16}}>
            <input className="ai-input" placeholder="Share your blessings or thoughts… 🙏"
              value={chatInput} onChange={e=>setChatInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&sendChat()}/>
            
            <button
              style={{
                background: isChatListening ? "#E53935" : "var(--saffron)",
                border:"none", borderRadius:"50%",
                width:52, height:52, minWidth:52,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", transition:"all .3s",
                boxShadow: isChatListening ? "0 0 0 6px rgba(229,57,53,0.25)" : "0 2px 8px rgba(232,98,26,0.2)",
                animation: isChatListening ? "pulse-mic 1.5s infinite" : "none",
              }}
              title={isChatListening ? "Listening… tap to stop" : "Tap to speak"}
              onClick={() => {
                if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                  alert('Speech recognition is not supported in this browser. Please use Chrome.');
                  return;
                }
                if (isChatListening) { setIsChatListening(false); return; }
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-IN';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                recognition.onstart = () => setIsChatListening(true);
                recognition.onresult = (event) => {
                  const transcript = event.results[0][0].transcript;
                  setChatInput(prev => prev ? prev + ' ' + transcript : transcript);
                  setIsChatListening(false);
                };
                recognition.onerror = () => setIsChatListening(false);
                recognition.onend = () => setIsChatListening(false);
                recognition.start();
              }}
            >
              <span style={{fontSize:26,color:"white"}}>{isChatListening ? "⏹" : "🎙️"}</span>
            </button>

            <button className="ai-send" onClick={sendChat}>Send 🙏</button>
          </div>
        </div>
      </div>
    );
  }

  function AboutPage() {
    return (
      <div className="page">
        <div className="sh"><h2>ℹ️ About Spiritual Saathi</h2></div>
        <p className="sh-sub">Bridging elderly devotees with spiritual peace and mental wellness through technology</p>
        <div className="divider"/>
        <div className="card" style={{marginBottom:22,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <p style={{fontSize:15,lineHeight:1.9,color:"#3E2000"}}>
            <b>Spiritual Saathi</b> (Spiritual Companion) was created after surveying 25–30 senior citizens across old age homes and neighbourhoods in India. Our research found that <b>45%</b> of elderly individuals strongly prefer spiritual content for emotional well-being, and that loneliness, grief, anxiety, and cognitive decline are among the most pressing daily challenges.
          </p>
          <p style={{fontSize:15,lineHeight:1.9,color:"#3E2000",marginTop:12}}>
            We built a simple, large-text, voice-friendly platform — combining devotional songs, guided prayers, expert therapy videos, and an AI spiritual guide — so that every senior can find peace, connection, and support.
          </p>
        </div>
        <div className="col">
          {[
            {emoji:"🎵",title:"Devotional Library",desc:"Curated devotional songs across all faiths with inline YouTube players."},
            {emoji:"🎬",title:"Pre-Recorded Therapy Videos",desc:"8 expert-led sessions covering loneliness, grief, anxiety, sleep, and more — watch anytime."},
            {emoji:"🤖",title:"Guruji AI",desc:"Ask any spiritual or emotional question and receive a kind, simple, personalised answer."},
            {emoji:"🔊",title:"Voice Navigation",desc:"Every button can be read aloud. Designed for users who find screens challenging."},
            {emoji:"🧘",title:"Wellness Activities",desc:"Breathing, chair yoga, prayer routines, and gratitude journaling — guided step-by-step."},
            {emoji:"👥",title:"Satsang Community",desc:"A gentle chat space to connect with other devotees and share daily blessings."},
          ].map(f=>(
            <div key={f.title} className="feature-row">
              <div className="feature-icon">{f.emoji}</div>
              <div>
                <div style={{fontWeight:800,fontSize:16,color:"var(--deep)",marginBottom:4}}>{f.title}</div>
                <div style={{fontSize:14,color:"#5D3000",lineHeight:1.65}}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{marginTop:24,textAlign:"center"}}>
          <div style={{fontSize:32,marginBottom:10}}>🙏</div>
          <div style={{fontFamily:"'Yatra One',serif",fontSize:18,color:"var(--deep)",marginBottom:8}}>Made with Love for Our Elders</div>
          <div style={{fontSize:14,color:"var(--gray)",lineHeight:1.7}}>Built by Shraddha Agnihotri · MGT1022 Lean Startup · VIT University<br/>Reg. No. 24MIC0067</div>
        </div>
      </div>
    );
  }

  // ─── VIDEO MODAL ────────────────────────────────────────────────────────────
  function VideoModal({ v, onClose }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={e=>e.stopPropagation()} style={{maxWidth:680}}>
          {/* YouTube Embedded Player */}
          <div style={{position:"relative",background:"#000",borderRadius:"var(--r-lg) var(--r-lg) 0 0",overflow:"hidden"}}>
            <button className="modal-close" onClick={onClose}>✕</button>
            {v.ytId ? (
              <iframe
                width="100%" height="360"
                src={`https://www.youtube.com/embed/${v.ytId}?autoplay=1&rel=0`}
                title={v.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{display:"block"}}
              />
            ) : (
              <div className="modal-video-screen" style={{minHeight:260,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <div className="modal-video-emoji">{v.emoji}</div>
                <div className="modal-playing-label">▶ Now Playing</div>
              </div>
            )}
          </div>
          <div className="modal-body">
            <div className="modal-title">{v.title}</div>
            <div style={{fontSize:13,color:"var(--gray)",marginBottom:12}}>👩‍⚕️ {v.doctor} · ⏱ {v.dur}</div>
            <div style={{fontSize:14,color:"var(--text)",lineHeight:1.75,marginBottom:16}}>{v.desc}</div>
            <div style={{fontWeight:800,fontSize:15,color:"var(--deep)",marginBottom:10}}>What you'll learn:</div>
            <div className="col" style={{gap:8,marginBottom:20}}>
              {v.points.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{color:"var(--saffron)",fontWeight:800,fontSize:16}}>✓</span>
                  <span style={{fontSize:14,color:"var(--text)",lineHeight:1.6}}>{p}</span>
                </div>
              ))}
            </div>
            <div className="modal-controls">
              <button className="btn-solid" style={{background:"var(--saffron)",color:"white"}} onClick={()=>readAloud(v.title+" by "+v.doctor+". "+v.desc)}>🔊 Read Description</button>
              <button className="btn-ghost" style={{borderColor:"var(--saffron)",color:"var(--saffron)"}} onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER ACTIVE PAGE ──────────────────────────────────────────────────────
  const renderPage = () => {
    switch(page) {
      case "home":      return HomePage();
      case "bhajans":   return BhajansPage();
      case "therapy":   return TherapyPage();
      case "prayers":   return PrayersPage();
      case "wellness":  return WellnessPage();
      case "guruji":    return GurujiPage();
      case "community": return CommunityPage();
      case "about":     return AboutPage();
      default:          return HomePage();
    }
  };

  if (!currentUser) {
    const doLoginManual = (e) => {
      e?.preventDefault();
      const found = DEMO_USERS.find(x => x.user === loginU.toLowerCase().trim() && x.pass === loginP);
      if (found) { setCurrentUser(found); setLoginErr(""); }
      else setLoginErr("Invalid details. Please click a profile below to log in.");
    };

    return (
      <div className={`app ${rootClass}`} style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#FFF8F0"}}>
        <form className="card" onSubmit={doLoginManual} style={{maxWidth:400, width:"100%", padding:32, textAlign:"center", boxShadow:"0 10px 40px rgba(0,0,0,0.1)"}}>
          <h1 style={{color:"var(--deep)", marginBottom:8, fontFamily:"'Yatra One', serif"}}>🪷 Spiritual Saathi</h1>
          <p style={{color:"var(--gray)", marginBottom:24}}>Please sign in to continue</p>
          
          <input className="ai-input" placeholder="Username" value={loginU} onChange={e=>setLoginU(e.target.value)} style={{marginBottom:12}} />
          <input className="ai-input" type="password" placeholder="Password" value={loginP} onChange={e=>setLoginP(e.target.value)} style={{marginBottom:24}} />
          
          {loginErr && <div style={{color:"#D32F2F", fontSize:14, marginBottom:16}}>{loginErr}</div>}
          
          <button type="submit" className="btn-solid" style={{width:"100%", padding:"14px", background:"var(--saffron)", color:"white", fontSize:16, marginBottom:32}}>Login</button>
          
          <div style={{textAlign:"left", background:"#FFF3E0", padding:16, borderRadius:12}}>
            <b style={{fontSize:15,color:"var(--deep)", display:"block", marginBottom:12}}>Test Profiles (Click to login):</b>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {DEMO_USERS.map(user => (
                <div key={user.user} onClick={()=> { setCurrentUser(user); setLoginErr(""); }} style={{cursor:"pointer", padding:"12px", background:"white", borderRadius:8, display:"flex", alignItems:"center", gap:12, border:"1px solid #FFE0B2", transition:"border 0.2s"}} onMouseOver={e=>e.currentTarget.style.borderColor="var(--saffron)"} onMouseOut={e=>e.currentTarget.style.borderColor="#FFE0B2"}>
                  <div style={{fontSize:24}}>{user.emoji}</div>
                  <div>
                    <div style={{fontWeight:600, color:"var(--deep)"}}>{user.name}</div>
                    <div style={{fontSize:12, color:"var(--gray)"}}>User: <b>{user.user}</b> • Pass: <b>{user.pass}</b></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`app ${rootClass}`}>
      {/* Accessibility Bar */}
      <div className="a11y">
        <span className="a11y-label">♿ Accessibility:</span>
        <button className={`a11y-btn ${largeText?"on":""}`} onClick={()=>setLargeText(t=>!t)}>
          🔡 {largeText?"Normal Text":"Large Text"}
        </button>
        <button className={`a11y-btn ${hiContrast?"on":""}`} onClick={()=>setHiContrast(h=>!h)}>
          🌓 {hiContrast?"Normal":"High Contrast"}
        </button>
        <button className="a11y-btn" onClick={()=>window.speechSynthesis.cancel()}>🔇 Stop Audio</button>
        <span style={{marginLeft:"auto",fontSize:12,opacity:.6}}>Elderly-Friendly Interface</span>
      </div>

      {/* Header */}
      <div className="header" style={{background:`linear-gradient(120deg, var(--deep) 0%, ${relData.color} 100%)`}}>
        <div className="brand" style={{flex:1}}>
          <div className="brand-icon">🪷</div>
          <div className="brand-text">
            <h1>Spiritual Saathi</h1>
            <p>Spiritual Wellness for Senior Citizens</p>
          </div>
          <div className="rel-badge" style={{marginLeft:"auto", marginRight:10, background:"rgba(255,255,255,0.15)"}} onClick={()=>setCurrentUser(null)}>
            {currentUser?.emoji} {currentUser?.name} <span style={{opacity:0.8, marginLeft:4}}>(Sign Out)</span>
          </div>
          <div className="rel-badge" onClick={()=>setShowRelPicker(true)}>
            {religion ? <>{RELIGIONS.find(r=>r.id===religion)?.emoji} {RELIGIONS.find(r=>r.id===religion)?.name}</> : "🌍 Select Religion"} ▾
          </div>
        </div>
        <div className="verse-pill" onClick={()=>readAloud(relData.verse.trans)}>
          {relData.verse.text.split('\n')[0]}...
          <small>Today's Verse — tap to hear 🔊</small>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-scroll">
          {NAV.map(n=>(
            <button key={n.id} className={`nav-tab ${page===n.id?"active":""}`} onClick={()=>navigate(n.id)}>
              <span className="ti">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main style={{flex:1}}>
        {renderPage()}
      </main>

      {/* Footer */}
      <div className="footer">
        <b>Spiritual Saathi</b> · Spiritual & Mental Wellness for Senior Citizens · Made with 🙏 in India
      </div>

      {/* Video Modal */}
      {videoModal && <VideoModal v={videoModal} onClose={()=>setVideoModal(null)}/>}

      {/* Religion Picker */}
      {showRelPicker && <ReligionPicker />}
    </div>
  );
}
