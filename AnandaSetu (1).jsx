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
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"home",      icon:"🏠", label:"Home" },
  { id:"ramayan",   icon:"📖", label:"Ramayan" },
  { id:"bhajans",   icon:"🎵", label:"Bhajans" },
  { id:"therapy",   icon:"🎬", label:"Therapy Videos" },
  { id:"prayers",   icon:"🙏", label:"Prayers" },
  { id:"wellness",  icon:"🧘", label:"Wellness" },
  { id:"guruji",    icon:"🤖", label:"Ask Guruji" },
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
  { id:1, title:"Jai Shri Ram",          singer:"Pt. Jasraj",         dur:"7:23", cat:"Ram Bhajan",   emoji:"🚩" },
  { id:2, title:"Hanuman Chalisa",       singer:"Lata Mangeshkar",    dur:"8:45", cat:"Hanuman",      emoji:"🐒" },
  { id:3, title:"Ram Naam Sukhdayi",     singer:"Anup Jalota",        dur:"6:12", cat:"Ram Bhajan",   emoji:"🕉️" },
  { id:4, title:"Sita Ram Sita Ram",     singer:"Hari Om Sharan",     dur:"5:30", cat:"Ram Bhajan",   emoji:"🙏" },
  { id:5, title:"Bhaye Pragat Kripala",  singer:"Kumar Vishwas",      dur:"9:00", cat:"Bal Ram",      emoji:"🌸" },
  { id:6, title:"Man Tadapat Hari",      singer:"Mohammed Rafi",      dur:"4:55", cat:"Devotional",   emoji:"💫" },
  { id:7, title:"Hey Ram Hey Ram",       singer:"Pandit Bhimsen Joshi",dur:"6:40",cat:"Ram Bhajan",   emoji:"🪔" },
  { id:8, title:"Raghupati Raghav",      singer:"M.S. Subbulakshmi",  dur:"5:15", cat:"Traditional",  emoji:"✨" },
];

const THERAPY_VIDEOS = [
  {
    id:1,
    title:"Coping with Loneliness in Old Age",
    doctor:"Dr. Sunita Mehra, Geriatric Psychologist",
    dur:"18:24", emoji:"💙",
    cat:"Emotional Health", catColor:"#1565C0",
    tags:["Loneliness","Coping","Seniors"],
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

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]             = useState("home");
  const [largeText, setLargeText]   = useState(false);
  const [hiContrast, setHiContrast] = useState(false);
  const [playing, setPlaying]       = useState(null);
  const [selectedKanda, setKanda]   = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [aiMsgs, setAiMsgs]         = useState([
    { role:"bot", text:"🙏 Namaste! I am Guruji AI — your spiritual companion. Ask me anything about the Ramayan, bhajans, prayers, or your emotional well-being." }
  ]);
  const [aiInput, setAiInput]       = useState("");
  const [aiLoading, setAiLoading]   = useState(false);
  const [chatMsgs, setChatMsgs]     = useState(COMMUNITY_MSGS);
  const [chatInput, setChatInput]   = useState("");
  const [wellnessActive, setWellnessActive] = useState(null);
  const [therapyCat, setTherapyCat] = useState("All");
  const aiEndRef = useRef(null);

  // Inject CSS
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = STYLES;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [aiMsgs]);

  const readAloud = (text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "hi-IN"; u.rate = 0.82;
    window.speechSynthesis.speak(u);
  };

  const askAI = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const q = aiInput.trim();
    setAiMsgs(m => [...m, { role:"user", text:q }]);
    setAiInput("");
    setAiLoading(true);
    setAiMsgs(m => [...m, { role:"bot", text:"🙏 Thinking…", loading:true }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:`You are Guruji AI — a warm, knowledgeable, and compassionate spiritual guide for elderly Indian devotees. You specialise in the Ramayan, Hindu philosophy, bhajans, mantras, and emotional well-being for seniors. Respond in simple, respectful language. Keep answers to 3-5 sentences. Be warm and encouraging. Occasionally use 🙏 or 🕉️. If asked about therapy or mental health, gently encourage watching therapy videos on the platform and consulting a professional.`,
          messages: aiMsgs.filter(m=>!m.loading).concat({role:"user",content:q})
            .map(m=>({ role: m.role==="bot"?"assistant":"user", content:m.text }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I could not fetch an answer. Please try again. 🙏";
      setAiMsgs(m => [...m.slice(0,-1), { role:"bot", text:reply }]);
    } catch {
      setAiMsgs(m => [...m.slice(0,-1), { role:"bot", text:"⚠️ Network issue. Please try again." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMsgs(m => [...m, {
      id: Date.now(), name:"You",
      time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
      text: chatInput
    }]);
    setChatInput("");
  };

  const rootClass = [largeText?"lt":"", hiContrast?"hc":""].filter(Boolean).join(" ");

  // ─── PAGE RENDERERS ──────────────────────────────────────────────────────────

  function HomePage() {
    return (
      <div className="page">
        <div className="hero">
          <h1>🙏 Ananda Setu</h1>
          <p>A peaceful digital home for elderly devotees — Ramayan stories, bhajans, guided prayers, therapy videos & AI spiritual support. Simple. Caring. Made with love.</p>
          <div className="hero-btns">
            <button className="btn-solid" onClick={()=>setPage("ramayan")}>📖 Ramayan Kathas</button>
            <button className="btn-ghost" onClick={()=>setPage("therapy")}>🎬 Therapy Videos</button>
            <button className="btn-ghost" onClick={()=>setPage("guruji")}>🤖 Ask Guruji</button>
          </div>
        </div>

        <div className="stats">
          {[["7 Kandas","Ramayan"],["8 Videos","Therapy"],["50+ Bhajans","Audio Library"],["Daily Verse","Every Morning"]].map(([n,l])=>(
            <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>

        {/* Daily Verse */}
        <div className="card" style={{marginBottom:28,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <div className="sh"><h2>🌅 Today's Verse</h2></div>
          <div className="prayer-block">{DAILY_VERSE.text}</div>
          <div className="prayer-trans">{DAILY_VERSE.trans}</div>
          <div style={{textAlign:"center",color:"var(--gray)",fontSize:13,marginBottom:14}}>— {DAILY_VERSE.src}</div>
          <div style={{textAlign:"center"}}>
            <button className="btn-solid" style={{background:"var(--saffron)",color:"white"}} onClick={()=>readAloud(DAILY_VERSE.trans)}>🔊 Listen</button>
          </div>
        </div>

        {/* Quick Nav Grid */}
        <div className="sh"><h2>✨ What would you like today?</h2></div>
        <div className="divider"/>
        <div className="grid-3">
          {[
            {emoji:"📖",title:"Ramayan Stories",sub:"7 Kandas · Audio & Large Text",p:"ramayan"},
            {emoji:"🎵",title:"Bhajan Library",sub:"50+ devotional songs",p:"bhajans"},
            {emoji:"🎬",title:"Therapy Videos",sub:"8 expert-led sessions",p:"therapy"},
            {emoji:"🙏",title:"Daily Prayers",sub:"Chalisa · Aarti · Mantras",p:"prayers"},
            {emoji:"🧘",title:"Wellness Corner",sub:"Breathing · Chair Yoga · Calm",p:"wellness"},
            {emoji:"🤖",title:"Ask Guruji AI",sub:"Spiritual Q&A anytime",p:"guruji"},
            {emoji:"👥",title:"Community",sub:"Connect with devotees",p:"community"},
            {emoji:"ℹ️",title:"About Us",sub:"Our mission & story",p:"about"},
          ].map(it=>(
            <div key={it.title} className="kanda card-hover" onClick={()=>setPage(it.p)}>
              <div className="kanda-emoji">{it.emoji}</div>
              <div className="kanda-name">{it.title}</div>
              <div className="kanda-desc">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function RamayanPage() {
    return (
      <div className="page">
        {selectedKanda ? (
          <>
            <button className="back-btn" onClick={()=>setKanda(null)}>← All Kandas</button>
            <div className="sh"><h2>{selectedKanda.emoji} {selectedKanda.name}</h2></div>
            <p className="sh-sub">{selectedKanda.desc} · {selectedKanda.chapters} Chapters</p>
            <div className="divider"/>
            <div className="col">
              {Array.from({length:8},(_,i)=>i+1).map(ch=>(
                <div key={ch} className="bhajan-row">
                  <div style={{width:40,height:40,borderRadius:"50%",background:"var(--saffron)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,flexShrink:0}}>{ch}</div>
                  <div className="bhajan-info">
                    <div className="bhajan-title">Chapter {ch} — Sarga {ch}</div>
                    <div className="bhajan-meta"><span>Click to listen or read</span></div>
                  </div>
                  <button className="play-btn" onClick={()=>readAloud(`Now reading Chapter ${ch} of ${selectedKanda.name}. ${selectedKanda.desc}.`)}>▶</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="sh"><h2>📖 Ramayan — Seven Sacred Kandas</h2></div>
            <p className="sh-sub">Tap any Kanda to read & listen. Audio, large text, and chapter navigation included.</p>
            <div className="divider"/>
            <div className="grid-2">
              {KANDAS.map(k=>(
                <div key={k.id} className="kanda card-hover" onClick={()=>setKanda(k)}>
                  <div className="kanda-emoji">{k.emoji}</div>
                  <div className="kanda-name">{k.name}</div>
                  <div className="kanda-sub">{k.chapters} Chapters</div>
                  <div className="kanda-desc">{k.desc}</div>
                  <div style={{marginTop:8,display:"flex",gap:8}}>
                    <span className="tag tag-saffron">📖 Read</span>
                    <span className="tag tag-green">🔊 Audio</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  function BhajansPage() {
    return (
      <div className="page">
        <div className="sh"><h2>🎵 Bhajan Library</h2></div>
        <p className="sh-sub">Devotional songs curated for peace, joy, and spiritual connection</p>
        <div className="divider"/>
        <div className="col">
          {BHAJANS.map(b=>(
            <div key={b.id} className="bhajan-row">
              <button
                className={`play-btn ${playing===b.id?"active":""}`}
                onClick={()=>{
                  if(playing===b.id){window.speechSynthesis.cancel();setPlaying(null);}
                  else{readAloud(`Now playing ${b.title} by ${b.singer}`);setPlaying(b.id);}
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
          {PRAYERS.map(p=>(
            <div key={p.title} className="card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <div style={{fontFamily:"'Yatra One',serif",fontSize:20,color:"var(--deep)"}}>{p.title}</div>
                  <div style={{fontSize:12,color:"var(--gray)",marginTop:2}}>{p.lang}</div>
                </div>
                <button className="play-btn" onClick={()=>readAloud(p.trans)}>🔊</button>
              </div>
              <div className="prayer-block">{p.text}</div>
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
            {WELLNESS_ACTS.map(w=>(
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
        <div className="sh"><h2>🤖 Ask Guruji AI</h2></div>
        <p className="sh-sub">Your compassionate AI spiritual companion — ask anything about the Ramayan, prayers, bhajans, or your well-being</p>
        <div className="divider"/>

        <div className="card" style={{marginBottom:16,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:16}}>
            <span style={{fontSize:32}}>🤖</span>
            <div>
              <div style={{fontFamily:"'Yatra One',serif",fontSize:18,color:"var(--deep)"}}>Guruji AI</div>
              <div style={{fontSize:12,color:"var(--gray)"}}>Powered by Claude · Spiritual & Emotional Support</div>
            </div>
          </div>

          <div className="ai-msgs">
            {aiMsgs.map((m,i)=>(
              <div key={i} className={`ai-bubble ${m.role} ${m.loading?"loading":""}`}>
                {m.role==="bot" && <span style={{fontWeight:700,display:"block",marginBottom:4,fontSize:12,opacity:.7}}>🤖 Guruji AI</span>}
                {m.text}
              </div>
            ))}
            <div ref={aiEndRef}/>
          </div>

          <div className="ai-row" style={{marginTop:16}}>
            <input
              className="ai-input"
              placeholder="Ask about Ramayan, prayers, your feelings…"
              value={aiInput}
              onChange={e=>setAiInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&askAI()}
            />
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
                background:"white",border:"2px solid var(--border)",borderRadius:var(--r)??"16px",
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
            <button className="ai-send" onClick={sendChat}>Send 🙏</button>
          </div>
        </div>
      </div>
    );
  }

  function AboutPage() {
    return (
      <div className="page">
        <div className="sh"><h2>ℹ️ About Ananda Setu</h2></div>
        <p className="sh-sub">Bridging elderly devotees with spiritual peace and mental wellness through technology</p>
        <div className="divider"/>
        <div className="card" style={{marginBottom:22,background:"linear-gradient(135deg,#FFF8F0,#FFF3E0)"}}>
          <p style={{fontSize:15,lineHeight:1.9,color:"#3E2000"}}>
            <b>Ananda Setu</b> (Bridge of Bliss) was created after surveying 25–30 senior citizens across old age homes and neighbourhoods in India. Our research found that <b>45%</b> of elderly individuals strongly prefer spiritual content for emotional well-being, and that loneliness, grief, anxiety, and cognitive decline are among the most pressing daily challenges.
          </p>
          <p style={{fontSize:15,lineHeight:1.9,color:"#3E2000",marginTop:12}}>
            We built a simple, large-text, voice-friendly platform — combining Ramayan content, bhajans, expert therapy videos, and an AI spiritual guide — so that every senior can find peace, connection, and support.
          </p>
        </div>
        <div className="col">
          {[
            {emoji:"📖",title:"Full Ramayan Access",desc:"All 7 Kandas with simple explanations, chapter-wise navigation, and audio read-aloud."},
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
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="modal-video-screen">
            <button className="modal-close" onClick={onClose}>✕</button>
            <div className="modal-video-emoji">{v.emoji}</div>
            <div className="modal-playing-label">▶ Now Playing</div>
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
      case "home":      return <HomePage/>;
      case "ramayan":   return <RamayanPage/>;
      case "bhajans":   return <BhajansPage/>;
      case "therapy":   return <TherapyPage/>;
      case "prayers":   return <PrayersPage/>;
      case "wellness":  return <WellnessPage/>;
      case "guruji":    return <GurujiPage/>;
      case "community": return <CommunityPage/>;
      case "about":     return <AboutPage/>;
      default:          return <HomePage/>;
    }
  };

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
      <div className="header">
        <div className="brand">
          <div className="brand-icon">🕉️</div>
          <div className="brand-text">
            <h1>Ananda Setu</h1>
            <p>Spiritual Wellness for Senior Citizens</p>
          </div>
        </div>
        <div className="verse-pill" onClick={()=>readAloud(DAILY_VERSE.trans)}>
          {DAILY_VERSE.text}
          <small>Today's Verse — tap to hear 🔊</small>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-scroll">
          {NAV.map(n=>(
            <button key={n.id} className={`nav-tab ${page===n.id?"active":""}`} onClick={()=>{setPage(n.id);setKanda(null);setWellnessActive(null);}}>
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
        <b>Ananda Setu</b> · Spiritual & Mental Wellness for Senior Citizens · Made with 🙏 in India
      </div>

      {/* Video Modal */}
      {videoModal && <VideoModal v={videoModal} onClose={()=>setVideoModal(null)}/>}
    </div>
  );
}
