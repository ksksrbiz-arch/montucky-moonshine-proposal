import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { LayoutDashboard, ShoppingBag, Share2, Zap, Search, Image, GraduationCap, Settings, ChevronRight, TrendingUp, TrendingDown, Eye, MousePointerClick, DollarSign, Users, Package, Star, ExternalLink, Check, AlertTriangle, Info, ArrowRight, ArrowLeft, Globe, Link2, Bot, Cpu, BookOpen, Lightbulb, Target, BarChart3, Activity, RefreshCw, Sparkles, Wand2, Camera, Palette, Type, Layers, ShieldCheck, Clock, Plug, MessageSquare, Hash, Heart, Play, Store, CircleDot, ChevronDown, X, Menu, Home } from "lucide-react";

// ============================================================
// DATA & CONSTANTS
// ============================================================
const COLORS = {
  amber: "#c8922a", amberLight: "#e6b04a", amberGlow: "rgba(200,146,42,0.15)",
  bg: "#0a0a08", bgDark: "#121210", bgCard: "#1a1a16", bgCardHover: "#222218",
  cream: "#f5f0e6", creamMuted: "#c4bfb2", textPrimary: "#eae5d8",
  textSecondary: "#9e9a8f", textDim: "#6b675e", border: "rgba(200,146,42,0.12)",
  green: "#4ade80", red: "#f87171", blue: "#60a5fa", purple: "#a78bfa",
  pink: "#f472b6", cyan: "#22d3ee", orange: "#fb923c"
};

const revenueData = [
  { month: "Oct", revenue: 1240, orders: 18 }, { month: "Nov", revenue: 2100, orders: 31 },
  { month: "Dec", revenue: 3420, orders: 48 }, { month: "Jan", revenue: 2800, orders: 39 },
  { month: "Feb", revenue: 3100, orders: 44 }, { month: "Mar", revenue: 4250, orders: 58 }
];

const trafficData = [
  { day: "Mon", organic: 120, social: 85, direct: 45 },
  { day: "Tue", organic: 145, social: 110, direct: 52 },
  { day: "Wed", organic: 135, social: 95, direct: 48 },
  { day: "Thu", organic: 160, social: 130, direct: 60 },
  { day: "Fri", organic: 190, social: 155, direct: 72 },
  { day: "Sat", organic: 210, social: 180, direct: 88 },
  { day: "Sun", organic: 175, social: 140, direct: 65 }
];

const seoKeywords = [
  { keyword: "montana moonshine merchandise", position: 4, change: 3, volume: 880, ctr: 12.4 },
  { keyword: "moonshine coffee mug", position: 8, change: -2, volume: 1200, ctr: 6.8 },
  { keyword: "montucky moonshine shop", position: 2, change: 1, volume: 590, ctr: 18.2 },
  { keyword: "moonshine themed gifts", position: 11, change: 5, volume: 2400, ctr: 3.1 },
  { keyword: "funny drinking t-shirts", position: 15, change: -1, volume: 6600, ctr: 1.4 },
  { keyword: "moonshine stein mug", position: 6, change: 2, volume: 720, ctr: 9.7 },
  { keyword: "montana bar merchandise", position: 9, change: 4, volume: 440, ctr: 5.2 },
  { keyword: "custom moonshine flask", position: 7, change: 0, volume: 1100, ctr: 7.8 }
];

const seoScores = [
  { subject: "Technical", A: 82, fullMark: 100 }, { subject: "Content", A: 65, fullMark: 100 },
  { subject: "Authority", A: 45, fullMark: 100 }, { subject: "Speed", A: 91, fullMark: 100 },
  { subject: "Mobile", A: 88, fullMark: 100 }, { subject: "UX", A: 72, fullMark: 100 }
];

const products = [
  { name: "Montucky Moonshine Spirits E-Book", price: "$10.00", img: "https://montuckymoonshine.com/cdn/shop/products/bookcover_1024x.png?v=1642360814", url: "https://montuckymoonshine.com/products/montucky-moonshine-spirits-e-book", category: "merchandise", seoScore: 72, tag: "Digital" },
  { name: "Wall Clock", price: "$35.00", img: "https://montuckymoonshine.com/cdn/shop/files/2096947309553618432_2048_1024x.jpg?v=1688013525", url: "https://montuckymoonshine.com/products/wall-clock", category: "merchandise", seoScore: 58, tag: "Home" },
  { name: "Moonshine Stein", price: "$25.00", img: "https://montuckymoonshine.com/cdn/shop/products/pns73k8a6h07stpkhj1y3d2g_1024x.png?v=1547450598", url: "https://montuckymoonshine.com/products/moonshine-stein", category: "mugs", seoScore: 81, tag: "Drinkware" },
  { name: "Sexy Coffee Mug", price: "$19.99", img: "https://montuckymoonshine.com/cdn/shop/files/12123678348230688733_2048_custom_1024x.jpg?v=1728695733", url: "https://montuckymoonshine.com/products/accent-coffee-mug-11-15oz-1", category: "mugs", seoScore: 67, tag: "Drinkware" },
  { name: "Stainless Steel Flask", price: "$21.88", img: "https://montuckymoonshine.com/cdn/shop/files/13314165464068572653_2048_1024x.jpg?v=1737535598", url: "https://montuckymoonshine.com/products/stainless-steel-flask-6oz", category: "mugs", seoScore: 74, tag: "Drinkware" },
  { name: "Distressed Dad Hat", price: "$22.00", img: "https://montuckymoonshine.com/cdn/shop/products/mockup-b7a59b9d_1024x.jpg?v=1589435140", url: "https://montuckymoonshine.com/products/distressed-dad-hat", category: "merchandise", seoScore: 55, tag: "Accessories" },
  { name: "Drink Drank Drunk Tee", price: "$21.69", img: "https://montuckymoonshine.com/cdn/shop/files/15211927451420024901_2048_1024x.jpg?v=1738121468", url: "https://montuckymoonshine.com/products/funny-drink-drank-drunk-t-shirt", category: "tees", seoScore: 63, tag: "Apparel" },
  { name: "Hobby Carpenter Tee", price: "$29.27", img: "https://montuckymoonshine.com/cdn/shop/files/12475718121083323152_2048_1024x.jpg?v=1774545601", url: "https://montuckymoonshine.com/products/hobby-carpenter-t-shirt", category: "tees", seoScore: 49, tag: "Apparel" },
  { name: "Bold Graphic Tee", price: "$33.32", img: "https://montuckymoonshine.com/cdn/shop/files/8382319889231594197_2048_1024x.jpg?v=1774642794", url: "https://montuckymoonshine.com/products/t-shirt-found-out-already", category: "tees", seoScore: 44, tag: "Apparel" },
  { name: "Heavyweight Hoodie", price: "$87.77", img: "https://montuckymoonshine.com/cdn/shop/files/6909327151717644564_2048_1024x.jpg?v=1774545469", url: "https://montuckymoonshine.com/products/unisex-heavyweight-hooded-sweatshirt", category: "tees", seoScore: 51, tag: "Apparel" },
  { name: "Jersey Short Sleeve Tee", price: "$18.82", img: "https://montuckymoonshine.com/cdn/shop/files/8732487188133167477_2048_1024x.jpg?v=1774545435", url: "https://montuckymoonshine.com/products/unisex-jersey-short-sleeve-tee", category: "tees", seoScore: 46, tag: "Apparel" },
  { name: "Velveteen Minky Blanket", price: "$32.15", img: "https://montuckymoonshine.com/cdn/shop/products/09193d3b46d306ced28add4a23b3e67e_1024x.jpg?v=1666326356", url: "https://montuckymoonshine.com/products/velveteen-minky-blanket", category: "merchandise", seoScore: 60, tag: "Home" }
];

const automations = [
  { name: "New Order → Instagram Story", trigger: "Shopify Order", action: "Post to IG Stories", status: "active", runs: 142 },
  { name: "Low Stock Alert → Reorder", trigger: "Inventory < 5", action: "Email + Slack Alert", status: "active", runs: 23 },
  { name: "New Review → Social Proof", trigger: "5-Star Review", action: "Share on Meta + TikTok", status: "active", runs: 67 },
  { name: "Abandoned Cart → Recovery", trigger: "Cart Abandoned 1hr", action: "Email Sequence", status: "paused", runs: 89 },
  { name: "Weekly SEO Audit", trigger: "Every Monday 6am", action: "Full Site Crawl + Report", status: "active", runs: 14 },
  { name: "Product Photo Optimize", trigger: "New Product Added", action: "AI Enhance + Compress", status: "active", runs: 31 }
];

// ============================================================
// REUSABLE COMPONENTS
// ============================================================
const Card = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`rounded-sm border transition-all duration-300 ${className}`}
    style={{ background: COLORS.bgCard, borderColor: COLORS.border }}>
    {children}
  </div>
);

const KPI = ({ icon: Icon, label, value, change, positive }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between mb-2">
      <div className="p-2 rounded-sm" style={{ background: COLORS.amberGlow }}>
        <Icon size={18} style={{ color: COLORS.amber }} />
      </div>
      {change && (
        <span className="text-xs font-semibold flex items-center gap-1"
          style={{ color: positive ? COLORS.green : COLORS.red }}>
          {positive ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
          {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold" style={{ color: COLORS.cream, fontFamily: "'Playfair Display', serif" }}>{value}</div>
    <div className="text-xs mt-1 uppercase tracking-widest" style={{ color: COLORS.textDim }}>{label}</div>
  </Card>
);

const StatusBadge = ({ status }) => {
  const colors = { active: COLORS.green, paused: COLORS.amber, error: COLORS.red, connected: COLORS.green, disconnected: COLORS.textDim, pending: COLORS.amber };
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
      style={{ background: `${colors[status]}20`, color: colors[status] }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors[status] }}/>
      {status}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={20} style={{ color: COLORS.amber }}/>}
        <h2 className="text-xl font-bold" style={{ color: COLORS.cream, fontFamily: "'Playfair Display', serif" }}>{title}</h2>
      </div>
      {subtitle && <p className="text-sm" style={{ color: COLORS.textDim }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

const WizardStep = ({ step, current, title, desc }) => (
  <div className={`flex items-start gap-3 p-3 rounded-sm border transition-all ${current === step ? 'scale-[1.02]' : ''}`}
    style={{ borderColor: current >= step ? COLORS.amber : COLORS.border, background: current === step ? COLORS.amberGlow : 'transparent', opacity: current >= step ? 1 : 0.4 }}>
    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
      style={{ background: current > step ? COLORS.amber : 'transparent', color: current > step ? COLORS.bg : COLORS.amber, border: `1.5px solid ${COLORS.amber}` }}>
      {current > step ? <Check size={14}/> : step}
    </div>
    <div>
      <div className="text-sm font-semibold" style={{ color: COLORS.cream }}>{title}</div>
      <div className="text-xs mt-0.5" style={{ color: COLORS.textDim }}>{desc}</div>
    </div>
  </div>
);

const ProgressBar = ({ value, max = 100, color = COLORS.amber }) => (
  <div className="w-full h-1.5 rounded-full" style={{ background: `${color}20` }}>
    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(value/max)*100}%`, background: color }}/>
  </div>
);

const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex gap-1 p-1 rounded-sm mb-6" style={{ background: COLORS.bgDark, border: `1px solid ${COLORS.border}` }}>
    {tabs.map(t => (
      <button key={t.id} onClick={() => onChange(t.id)}
        className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
        style={{ background: active === t.id ? COLORS.amberGlow : 'transparent', color: active === t.id ? COLORS.amber : COLORS.textDim, border: active === t.id ? `1px solid ${COLORS.amber}` : '1px solid transparent' }}>
        {t.label}
      </button>
    ))}
  </div>
);

// ============================================================
// MAIN SECTIONS
// ============================================================

// --- DASHBOARD ---
const Dashboard = () => (
  <div className="space-y-6">
    <SectionHeader icon={LayoutDashboard} title="Command Center" subtitle="Real-time overview of your Montucky empire"/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KPI icon={DollarSign} label="Revenue (30d)" value="$4,250" change="+37%" positive/>
      <KPI icon={ShoppingBag} label="Orders (30d)" value="58" change="+22%" positive/>
      <KPI icon={Eye} label="Site Visitors" value="1,847" change="+18%" positive/>
      <KPI icon={Users} label="Customers" value="312" change="+9%" positive/>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <Card className="p-4 md:col-span-2">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Revenue & Orders</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.amber} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={COLORS.amber} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 2, color: COLORS.cream, fontSize: 12 }}/>
            <Area type="monotone" dataKey="revenue" stroke={COLORS.amber} fill="url(#revGrad)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Traffic Sources</div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={[{ name:'Organic', value:42 },{ name:'Social', value:33 },{ name:'Direct', value:18 },{ name:'Referral', value:7 }]}
              cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
              {[COLORS.amber, COLORS.purple, COLORS.blue, COLORS.green].map((c,i) => <Cell key={i} fill={c}/>)}
            </Pie>
            <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 2, color: COLORS.cream, fontSize: 12 }}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 justify-center">
          {[{l:'Organic',c:COLORS.amber},{l:'Social',c:COLORS.purple},{l:'Direct',c:COLORS.blue},{l:'Referral',c:COLORS.green}].map(i=>
            <span key={i.l} className="flex items-center gap-1 text-xs" style={{color:COLORS.textDim}}>
              <span className="w-2 h-2 rounded-full" style={{background:i.c}}/>{i.l}
            </span>
          )}
        </div>
      </Card>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="p-4">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Quick Actions</div>
        {[{icon:Package,label:"Add New Product",desc:"List on Shopify + all socials"},{icon:Sparkles,label:"Generate Product Photos",desc:"AI-powered studio"},{icon:Search,label:"Run SEO Audit",desc:"Full site analysis"},{icon:Zap,label:"Create Automation",desc:"Build a new workflow"}].map((a,i)=>
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-sm cursor-pointer transition-all hover:translate-x-1" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
            <div className="p-2 rounded-sm" style={{background:COLORS.amberGlow}}><a.icon size={16} style={{color:COLORS.amber}}/></div>
            <div className="flex-1">
              <div className="text-sm font-semibold" style={{color:COLORS.cream}}>{a.label}</div>
              <div className="text-xs" style={{color:COLORS.textDim}}>{a.desc}</div>
            </div>
            <ChevronRight size={14} style={{color:COLORS.textDim}}/>
          </div>
        )}
      </Card>
      <Card className="p-4">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Active Automations</div>
        {automations.slice(0,4).map((a,i)=>
          <div key={i} className="flex items-center justify-between p-2.5" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
            <div>
              <div className="text-sm font-medium" style={{color:COLORS.cream}}>{a.name}</div>
              <div className="text-xs" style={{color:COLORS.textDim}}>{a.runs} runs</div>
            </div>
            <StatusBadge status={a.status}/>
          </div>
        )}
      </Card>
    </div>
  </div>
);

// --- SOCIAL HUB ---
const SocialHub = () => {
  const [tab, setTab] = useState("overview");
  const platforms = [
    { name: "Meta Business", icon: Globe, status: "connected", followers: "2.4K", posts: 48, engagement: "3.2%", color: COLORS.blue },
    { name: "Instagram", icon: Camera, status: "connected", followers: "1.8K", posts: 124, engagement: "4.7%", color: COLORS.pink },
    { name: "TikTok Shop", icon: Play, status: "pending", followers: "890", posts: 32, engagement: "8.1%", color: COLORS.cyan },
    { name: "TikTok Account", icon: Hash, status: "connected", followers: "890", posts: 32, engagement: "8.1%", color: COLORS.cyan }
  ];
  return (
    <div className="space-y-6">
      <SectionHeader icon={Share2} title="Social Command Center" subtitle="Manage Meta, Instagram, TikTok Shop & accounts from one place"/>
      <TabBar tabs={[{id:"overview",label:"Overview"},{id:"meta",label:"Meta / IG"},{id:"tiktok",label:"TikTok Shop"},{id:"schedule",label:"Content Calendar"}]} active={tab} onChange={setTab}/>
      {tab === "overview" && <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platforms.map(p => (
            <Card key={p.name} className="p-4 cursor-pointer hover:border-amber-500/40">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-sm" style={{ background: `${p.color}20` }}><p.icon size={18} style={{ color: p.color }}/></div>
                <StatusBadge status={p.status}/>
              </div>
              <div className="text-lg font-bold" style={{ color: COLORS.cream }}>{p.followers}</div>
              <div className="text-xs" style={{ color: COLORS.textDim }}>{p.name} followers</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: COLORS.green }}>{p.engagement} engagement</span>
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-4">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Cross-Platform Engagement (7 days)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trafficData}>
              <XAxis dataKey="day" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 2, color: COLORS.cream, fontSize: 12 }}/>
              <Bar dataKey="organic" fill={COLORS.amber} radius={[2,2,0,0]}/>
              <Bar dataKey="social" fill={COLORS.purple} radius={[2,2,0,0]}/>
              <Bar dataKey="direct" fill={COLORS.blue} radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </>}
      {tab === "meta" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-sm" style={{background:`${COLORS.blue}20`}}><Globe size={24} style={{color:COLORS.blue}}/></div>
              <div>
                <div className="text-lg font-bold" style={{color:COLORS.cream}}>Meta Business Suite</div>
                <div className="text-sm" style={{color:COLORS.textDim}}>Manage Facebook Page, Instagram, Messenger & Meta Ads</div>
              </div>
              <StatusBadge status="connected"/>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[{l:"Page Reach",v:"12.4K",c:"+28%"},{l:"Post Engagement",v:"3.2%",c:"+0.4%"},{l:"Ad Spend",v:"$0",c:"No active campaigns"}].map(s=>
                <div key={s.l} className="p-3 rounded-sm" style={{background:COLORS.bgDark, border:`1px solid ${COLORS.border}`}}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{color:COLORS.textDim}}>{s.l}</div>
                  <div className="text-xl font-bold" style={{color:COLORS.cream}}>{s.v}</div>
                  <div className="text-xs" style={{color:COLORS.green}}>{s.c}</div>
                </div>
              )}
            </div>
            <div className="p-3 rounded-sm" style={{background:`${COLORS.amber}08`, border:`1px solid ${COLORS.border}`}}>
              <div className="flex items-center gap-2 mb-2"><Lightbulb size={14} style={{color:COLORS.amber}}/><span className="text-xs font-semibold uppercase tracking-wider" style={{color:COLORS.amber}}>AI Recommendation</span></div>
              <p className="text-sm" style={{color:COLORS.textSecondary}}>Your engagement peaks Thursday–Saturday. Schedule 3 posts per week during these days. Your mug photos generate 2.4x more engagement than apparel — consider a "Mug Monday" series to drive consistent traffic.</p>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-sm" style={{background:`${COLORS.pink}20`}}><Camera size={24} style={{color:COLORS.pink}}/></div>
              <div>
                <div className="text-lg font-bold" style={{color:COLORS.cream}}>Instagram Management</div>
                <div className="text-sm" style={{color:COLORS.textDim}}>Feed, Stories, Reels, Shopping tags</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {products.slice(0,4).map((p,i)=>
                <div key={i} className="relative group cursor-pointer">
                  <img src={p.img} alt={p.name} className="w-full aspect-square object-cover rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"/>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'rgba(0,0,0,0.6)'}}>
                    <Heart size={20} style={{color:COLORS.pink}}/>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
      {tab === "tiktok" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-sm" style={{background:`${COLORS.cyan}20`}}><Store size={24} style={{color:COLORS.cyan}}/></div>
              <div>
                <div className="text-lg font-bold" style={{color:COLORS.cream}}>TikTok Shop Integration</div>
                <div className="text-sm" style={{color:COLORS.textDim}}>Sync products, manage orders, track TikTok-driven revenue</div>
              </div>
              <StatusBadge status="pending"/>
            </div>
            <div className="p-4 rounded-sm text-center" style={{background:COLORS.bgDark, border:`1px dashed ${COLORS.amber}`}}>
              <Plug size={32} style={{color:COLORS.amber}} className="mx-auto mb-2"/>
              <div className="text-sm font-semibold mb-1" style={{color:COLORS.cream}}>TikTok Shop Setup Required</div>
              <p className="text-xs mb-3" style={{color:COLORS.textDim}}>Connect your TikTok Business account to sync products from Shopify and enable in-app purchases.</p>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{background:COLORS.amber, color:COLORS.bg}}>Launch Setup Wizard →</button>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-semibold mb-3" style={{color:COLORS.cream}}>What TikTok Shop enables:</div>
            {[
              {title:"Product Sync",desc:"Auto-sync all Shopify products to TikTok Shop catalog"},
              {title:"Shoppable Videos",desc:"Tag products directly in TikTok videos for 1-tap purchase"},
              {title:"Live Shopping",desc:"Sell products during TikTok LIVE sessions with real-time checkout"},
              {title:"Affiliate Marketing",desc:"Let TikTok creators promote your products for commission"},
              {title:"Order Sync",desc:"All TikTok orders flow back to Shopify for unified fulfillment"}
            ].map((f,i) =>
              <div key={i} className="flex items-start gap-3 py-2" style={{borderBottom: i < 4 ? `1px solid ${COLORS.border}` : 'none'}}>
                <Check size={14} style={{color:COLORS.green}} className="mt-0.5 shrink-0"/>
                <div>
                  <div className="text-sm font-medium" style={{color:COLORS.cream}}>{f.title}</div>
                  <div className="text-xs" style={{color:COLORS.textDim}}>{f.desc}</div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
      {tab === "schedule" && (
        <Card className="p-5">
          <div className="text-sm font-semibold mb-4" style={{color:COLORS.cream}}>Content Calendar — This Week</div>
          <div className="grid grid-cols-7 gap-1">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>
              <div key={d} className="text-center text-xs font-semibold py-1 uppercase tracking-wider" style={{color:COLORS.textDim}}>{d}</div>
            )}
            {[
              {posts:1,platform:"IG"},null,{posts:1,platform:"Meta"},{posts:2,platform:"IG + TT"},null,
              {posts:1,platform:"TikTok"},{posts:1,platform:"IG"}
            ].map((d,i)=>
              <div key={i} className="aspect-square rounded-sm flex flex-col items-center justify-center p-1"
                style={{background: d ? COLORS.amberGlow : COLORS.bgDark, border:`1px solid ${d ? COLORS.amber : COLORS.border}`}}>
                {d ? <>
                  <div className="text-lg font-bold" style={{color:COLORS.amber}}>{d.posts}</div>
                  <div className="text-[9px] uppercase" style={{color:COLORS.textDim}}>{d.platform}</div>
                </> : <span className="text-xs" style={{color:COLORS.textDim}}>—</span>}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

// --- SHOPIFY SYNC ---
const ShopifySync = () => {
  const [tab, setTab] = useState("products");
  return (
    <div className="space-y-6">
      <SectionHeader icon={ShoppingBag} title="Shopify Integration" subtitle="Unified product, order, and inventory management"/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI icon={Package} label="Total Products" value="15" change="+3 new"/>
        <KPI icon={ShoppingBag} label="Pending Orders" value="4"/>
        <KPI icon={DollarSign} label="Avg Order Value" value="$38.40" change="+12%" positive/>
        <KPI icon={Star} label="Avg Rating" value="4.6"/>
      </div>
      <TabBar tabs={[{id:"products",label:"Products"},{id:"orders",label:"Orders"},{id:"inventory",label:"Inventory"}]} active={tab} onChange={setTab}/>
      {tab === "products" && (
        <div className="space-y-2">
          {products.map((p,i)=>
            <Card key={i} className="p-3 flex items-center gap-3 hover:border-amber-500/30 cursor-pointer">
              <img src={p.img} alt={p.name} className="w-12 h-12 rounded-sm object-cover"/>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{color:COLORS.cream}}>{p.name}</div>
                <div className="text-xs" style={{color:COLORS.textDim}}>{p.tag} · {p.price}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs" style={{color:COLORS.textDim}}>SEO Score</div>
                  <div className="text-sm font-bold" style={{color: p.seoScore > 70 ? COLORS.green : p.seoScore > 50 ? COLORS.amber : COLORS.red}}>{p.seoScore}/100</div>
                </div>
                <ProgressBar value={p.seoScore} color={p.seoScore > 70 ? COLORS.green : p.seoScore > 50 ? COLORS.amber : COLORS.red}/>
              </div>
            </Card>
          )}
        </div>
      )}
      {tab === "orders" && (
        <Card className="p-4">
          <div className="text-sm mb-3" style={{color:COLORS.textDim}}>Recent Orders</div>
          {[
            {id:"#1058",customer:"Mike T.",total:"$87.77",items:"Heavyweight Hoodie",status:"Shipped"},
            {id:"#1057",customer:"Sarah L.",total:"$45.87",items:"Stein + Flask",status:"Processing"},
            {id:"#1056",customer:"Jake R.",total:"$21.69",items:"Drink Drank Drunk Tee",status:"Delivered"},
            {id:"#1055",customer:"Amy K.",total:"$19.99",items:"Sexy Coffee Mug",status:"Delivered"}
          ].map((o,i)=>
            <div key={i} className="flex items-center justify-between py-3" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
              <div>
                <span className="text-sm font-bold mr-2" style={{color:COLORS.amber}}>{o.id}</span>
                <span className="text-sm" style={{color:COLORS.cream}}>{o.customer}</span>
                <div className="text-xs mt-0.5" style={{color:COLORS.textDim}}>{o.items}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold" style={{color:COLORS.cream}}>{o.total}</div>
                <StatusBadge status={o.status === "Shipped" ? "pending" : o.status === "Processing" ? "pending" : "active"}/>
              </div>
            </div>
          )}
        </Card>
      )}
      {tab === "inventory" && (
        <Card className="p-4">
          <div className="text-sm mb-3" style={{color:COLORS.textDim}}>Inventory Alerts</div>
          {[
            {name:"Moonshine Stein",stock:3,status:"Low Stock"},
            {name:"Distressed Dad Hat",stock:8,status:"OK"},
            {name:"E-Book (Digital)",stock:"∞",status:"Digital"},
            {name:"Wall Clock",stock:5,status:"Low Stock"}
          ].map((item,i)=>
            <div key={i} className="flex items-center justify-between py-3" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
              <div className="text-sm" style={{color:COLORS.cream}}>{item.name}</div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold" style={{color: item.status==="Low Stock" ? COLORS.red : COLORS.green}}>{item.stock} units</span>
                {item.status === "Low Stock" && <AlertTriangle size={14} style={{color:COLORS.red}}/>}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

// --- AUTOMATION MATRIX ---
const AutomationMatrix = () => (
  <div className="space-y-6">
    <SectionHeader icon={Zap} title="Automation Matrix" subtitle="Workflows that scale your brand while you sleep"
      action={<button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm" style={{background:COLORS.amber, color:COLORS.bg}}>+ New Workflow</button>}/>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <KPI icon={Zap} label="Active Workflows" value="5"/>
      <KPI icon={RefreshCw} label="Total Runs (30d)" value="366"/>
      <KPI icon={Clock} label="Time Saved" value="~47 hrs"/>
    </div>
    <div className="space-y-2">
      {automations.map((a,i)=>
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold" style={{color:COLORS.cream}}>{a.name}</div>
            <StatusBadge status={a.status}/>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{color:COLORS.textDim}}>
            <span className="px-2 py-0.5 rounded-sm" style={{background:COLORS.bgDark, border:`1px solid ${COLORS.border}`}}>{a.trigger}</span>
            <ArrowRight size={12} style={{color:COLORS.amber}}/>
            <span className="px-2 py-0.5 rounded-sm" style={{background:COLORS.bgDark, border:`1px solid ${COLORS.border}`}}>{a.action}</span>
            <span className="ml-auto">{a.runs} runs</span>
          </div>
        </Card>
      )}
    </div>
    <Card className="p-5">
      <div className="text-sm font-bold mb-3" style={{color:COLORS.cream}}>Suggested Automations</div>
      {[
        {name:"Price Drop Alert → Email Blast",desc:"When you reduce a product price, auto-notify all past purchasers"},
        {name:"UGC Collector → Social Proof Wall",desc:"Auto-collect tagged photos from IG/TikTok and display on site"},
        {name:"Seasonal Collection Launcher",desc:"Auto-publish seasonal products across all channels on scheduled dates"}
      ].map((s,i)=>
        <div key={i} className="flex items-center gap-3 py-3 cursor-pointer" style={{borderBottom: i < 2 ? `1px solid ${COLORS.border}` : 'none'}}>
          <Sparkles size={16} style={{color:COLORS.amber}}/>
          <div className="flex-1">
            <div className="text-sm font-medium" style={{color:COLORS.cream}}>{s.name}</div>
            <div className="text-xs" style={{color:COLORS.textDim}}>{s.desc}</div>
          </div>
          <button className="text-xs font-semibold uppercase tracking-wider" style={{color:COLORS.amber}}>Enable</button>
        </div>
      )}
    </Card>
  </div>
);

// --- SEO & ANALYTICS ---
const SEOAnalytics = () => {
  const [tab, setTab] = useState("keywords");
  return (
    <div className="space-y-6">
      <SectionHeader icon={Search} title="SEO & Analytics Command" subtitle="Deep intelligence on what's working, what needs culled, and where to attack"/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI icon={Eye} label="Impressions (30d)" value="24.6K" change="+42%" positive/>
        <KPI icon={MousePointerClick} label="Clicks (30d)" value="847" change="+28%" positive/>
        <KPI icon={Target} label="Avg Position" value="7.2" change="-2.1" positive/>
        <KPI icon={BarChart3} label="Avg CTR" value="3.4%" change="+0.6%" positive/>
      </div>
      <TabBar tabs={[{id:"keywords",label:"Keywords"},{id:"health",label:"Site Health"},{id:"actions",label:"AI Actions"},{id:"cull",label:"Cull Report"}]} active={tab} onChange={setTab}/>
      {tab === "keywords" && (
        <Card className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:`1px solid ${COLORS.border}`}}>
                {["Keyword","Position","Change","Volume","CTR","Action"].map(h=>
                  <th key={h} className="text-left py-2 px-2 text-xs uppercase tracking-wider font-semibold" style={{color:COLORS.textDim}}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {seoKeywords.map((k,i) => (
                <tr key={i} style={{borderBottom:`1px solid ${COLORS.border}`}} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-2 font-medium" style={{color:COLORS.cream}}>{k.keyword}</td>
                  <td className="py-2.5 px-2">
                    <span className="font-bold" style={{color: k.position <= 5 ? COLORS.green : k.position <= 10 ? COLORS.amber : COLORS.red}}>#{k.position}</span>
                  </td>
                  <td className="py-2.5 px-2">
                    <span className="flex items-center gap-1" style={{color: k.change > 0 ? COLORS.green : k.change < 0 ? COLORS.red : COLORS.textDim}}>
                      {k.change > 0 ? <TrendingUp size={12}/> : k.change < 0 ? <TrendingDown size={12}/> : null}
                      {k.change > 0 ? '+' : ''}{k.change}
                    </span>
                  </td>
                  <td className="py-2.5 px-2" style={{color:COLORS.textSecondary}}>{k.volume.toLocaleString()}/mo</td>
                  <td className="py-2.5 px-2" style={{color:COLORS.textSecondary}}>{k.ctr}%</td>
                  <td className="py-2.5 px-2">
                    {k.position >= 7 && k.position <= 12 ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:`${COLORS.amber}20`, color:COLORS.amber}}>Striking Distance</span>
                    ) : k.position <= 3 ? (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background:`${COLORS.green}20`, color:COLORS.green}}>Defend</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "health" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-xs uppercase tracking-widest mb-3" style={{color:COLORS.textDim}}>SEO Health Radar</div>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={seoScores}>
                <PolarGrid stroke={COLORS.border}/>
                <PolarAngleAxis dataKey="subject" tick={{fill:COLORS.textDim, fontSize:11}}/>
                <PolarRadiusAxis tick={false} axisLine={false}/>
                <Radar dataKey="A" stroke={COLORS.amber} fill={COLORS.amber} fillOpacity={0.2}/>
              </RadarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <div className="text-xs uppercase tracking-widest mb-3" style={{color:COLORS.textDim}}>Core Web Vitals</div>
            {[
              {metric:"Largest Contentful Paint",value:"1.8s",target:"< 2.5s",score:92,status:"pass"},
              {metric:"First Input Delay",value:"12ms",target:"< 100ms",score:98,status:"pass"},
              {metric:"Cumulative Layout Shift",value:"0.04",target:"< 0.1",score:96,status:"pass"},
              {metric:"Time to First Byte",value:"0.6s",target:"< 0.8s",score:88,status:"pass"},
              {metric:"Lighthouse Score",value:"96",target:"> 90",score:96,status:"pass"}
            ].map((v,i) =>
              <div key={i} className="py-2.5" style={{borderBottom: i < 4 ? `1px solid ${COLORS.border}` : 'none'}}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm" style={{color:COLORS.cream}}>{v.metric}</span>
                  <span className="text-sm font-bold" style={{color:COLORS.green}}>{v.value}</span>
                </div>
                <ProgressBar value={v.score} color={COLORS.green}/>
              </div>
            )}
          </Card>
        </div>
      )}
      {tab === "actions" && (
        <div className="space-y-3">
          <Card className="p-4" style={{borderColor:`${COLORS.amber}40`}}>
            <div className="flex items-center gap-2 mb-2"><Sparkles size={16} style={{color:COLORS.amber}}/><span className="text-sm font-bold" style={{color:COLORS.amber}}>AI SEO Agent — Automated Actions</span></div>
            <p className="text-sm mb-4" style={{color:COLORS.textSecondary}}>The agent continuously monitors your search performance and executes optimizations without manual intervention.</p>
            {[
              {action:"Generated optimized meta descriptions for 6 product pages",time:"2 hours ago",status:"completed"},
              {action:"Identified 3 'striking distance' keywords — content brief created",time:"6 hours ago",status:"completed"},
              {action:"Compressed 12 product images (avg 68% reduction, no quality loss)",time:"Yesterday",status:"completed"},
              {action:"Schema markup (Product, Organization, LocalBusiness) added to all pages",time:"2 days ago",status:"completed"},
              {action:"Internal linking audit — 8 orphan pages connected",time:"3 days ago",status:"completed"}
            ].map((a,i) =>
              <div key={i} className="flex items-start gap-3 py-2" style={{borderBottom: i < 4 ? `1px solid ${COLORS.border}` : 'none'}}>
                <Check size={14} style={{color:COLORS.green}} className="mt-0.5 shrink-0"/>
                <div className="flex-1">
                  <div className="text-sm" style={{color:COLORS.cream}}>{a.action}</div>
                  <div className="text-xs" style={{color:COLORS.textDim}}>{a.time}</div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
      {tab === "cull" && (
        <div className="space-y-3">
          <Card className="p-4" style={{borderColor:`${COLORS.red}30`}}>
            <div className="flex items-center gap-2 mb-3"><AlertTriangle size={16} style={{color:COLORS.red}}/><span className="text-sm font-bold" style={{color:COLORS.red}}>Underperforming — Consider Culling</span></div>
            {products.filter(p=>p.seoScore < 55).map((p,i)=>
              <div key={i} className="flex items-center gap-3 py-2.5" style={{borderBottom:`1px solid ${COLORS.border}`}}>
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-sm object-cover"/>
                <div className="flex-1">
                  <div className="text-sm" style={{color:COLORS.cream}}>{p.name}</div>
                  <div className="text-xs" style={{color:COLORS.textDim}}>SEO: {p.seoScore}/100 · Low traffic · Low conversion</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 rounded-sm" style={{background:`${COLORS.amber}20`, color:COLORS.amber}}>Optimize</button>
                  <button className="text-xs px-2 py-1 rounded-sm" style={{background:`${COLORS.red}20`, color:COLORS.red}}>Archive</button>
                </div>
              </div>
            )}
          </Card>
          <Card className="p-4" style={{borderColor:`${COLORS.green}30`}}>
            <div className="flex items-center gap-2 mb-3"><TrendingUp size={16} style={{color:COLORS.green}}/><span className="text-sm font-bold" style={{color:COLORS.green}}>Top Performers — Double Down</span></div>
            {products.filter(p=>p.seoScore > 70).map((p,i)=>
              <div key={i} className="flex items-center gap-3 py-2.5" style={{borderBottom:`1px solid ${COLORS.border}`}}>
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-sm object-cover"/>
                <div className="flex-1">
                  <div className="text-sm" style={{color:COLORS.cream}}>{p.name}</div>
                  <div className="text-xs" style={{color:COLORS.textDim}}>SEO: {p.seoScore}/100 · Strong traffic · Good conversion</div>
                </div>
                <button className="text-xs px-2 py-1 rounded-sm" style={{background:`${COLORS.green}20`, color:COLORS.green}}>Amplify</button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

// --- PRODUCT STUDIO ---
const ProductStudio = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div className="space-y-6">
      <SectionHeader icon={Image} title="AI Product Studio" subtitle="Generate photos, optimize listings, and enhance product presentation"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4"><Wand2 size={18} style={{color:COLORS.amber}}/><span className="text-sm font-bold" style={{color:COLORS.cream}}>AI Photo Generator</span></div>
          <div className="space-y-3">
            <div>
              <label className="text-xs uppercase tracking-wider block mb-1" style={{color:COLORS.textDim}}>Select Product</label>
              <select className="w-full p-2 rounded-sm text-sm" style={{background:COLORS.bgDark, color:COLORS.cream, border:`1px solid ${COLORS.border}`}}
                onChange={e => setSelectedProduct(products[e.target.value])} defaultValue="">
                <option value="" disabled>Choose a product...</option>
                {products.map((p,i)=><option key={i} value={i}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider block mb-1" style={{color:COLORS.textDim}}>Scene / Style</label>
              <div className="grid grid-cols-3 gap-2">
                {["Rustic Wood","Bar Counter","White Studio","Outdoor Montana","Lifestyle Shot","Flat Lay"].map(s=>
                  <button key={s} className="p-2 text-xs rounded-sm text-center transition-all hover:border-amber-500/40"
                    style={{background:COLORS.bgDark, border:`1px solid ${COLORS.border}`, color:COLORS.textSecondary}}>
                    {s}
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider block mb-1" style={{color:COLORS.textDim}}>Custom Prompt</label>
              <textarea className="w-full p-2 rounded-sm text-sm h-16 resize-none" placeholder="e.g., Product on rustic wooden bar with warm amber lighting, Montana mountains visible through window..."
                style={{background:COLORS.bgDark, color:COLORS.cream, border:`1px solid ${COLORS.border}`}}/>
            </div>
            <button className="w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
              style={{background:COLORS.amber, color:COLORS.bg}}>
              <Sparkles size={14}/> Generate Photos
            </button>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4"><Palette size={18} style={{color:COLORS.amber}}/><span className="text-sm font-bold" style={{color:COLORS.cream}}>Listing Optimizer</span></div>
          {selectedProduct ? (
            <div>
              <div className="flex items-center gap-3 mb-4 p-3 rounded-sm" style={{background:COLORS.bgDark}}>
                <img src={selectedProduct.img} alt={selectedProduct.name} className="w-16 h-16 rounded-sm object-cover"/>
                <div>
                  <div className="text-sm font-bold" style={{color:COLORS.cream}}>{selectedProduct.name}</div>
                  <div className="text-xs" style={{color:COLORS.textDim}}>{selectedProduct.price}</div>
                </div>
              </div>
              {[
                {label:"Title Optimization",score:selectedProduct.seoScore > 60 ? 78 : 42, suggestion: selectedProduct.seoScore > 60 ? "Strong — includes key search terms" : "Needs work — add primary keyword"},
                {label:"Description Quality",score:45, suggestion:"Too short. Add 150+ words with benefits, materials, and use cases"},
                {label:"Image Quality",score:62, suggestion:"Good resolution but missing lifestyle context shots"},
                {label:"Tags & Categories",score:selectedProduct.seoScore > 60 ? 85 : 55, suggestion: selectedProduct.seoScore > 60 ? "Well-tagged" : "Add more specific tags"}
              ].map((o,i)=>
                <div key={i} className="py-2.5" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold" style={{color:COLORS.cream}}>{o.label}</span>
                    <span className="text-xs font-bold" style={{color: o.score > 70 ? COLORS.green : o.score > 50 ? COLORS.amber : COLORS.red}}>{o.score}%</span>
                  </div>
                  <ProgressBar value={o.score} color={o.score > 70 ? COLORS.green : o.score > 50 ? COLORS.amber : COLORS.red}/>
                  <div className="text-xs mt-1" style={{color:COLORS.textDim}}>{o.suggestion}</div>
                </div>
              )}
              <button className="w-full mt-3 py-2 text-xs font-bold uppercase tracking-wider rounded-sm"
                style={{background:`${COLORS.amber}20`, color:COLORS.amber, border:`1px solid ${COLORS.amber}`}}>
                Auto-Optimize This Listing
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <Image size={32} style={{color:COLORS.textDim}} className="mb-2"/>
              <p className="text-sm" style={{color:COLORS.textDim}}>Select a product to see optimization recommendations</p>
            </div>
          )}
        </Card>
      </div>
      <Card className="p-4">
        <div className="text-sm font-semibold mb-3" style={{color:COLORS.cream}}>Bar & Location Optimization</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {title:"Google Business Profile",desc:"Optimize photos, hours, menu items, and respond to reviews automatically",score:68},
            {title:"Local SEO",desc:"Montana-specific keywords, Google Maps visibility, local backlink strategy",score:52},
            {title:"Location Content",desc:"Auto-generate event announcements, happy hour posts, and seasonal specials",score:41}
          ].map((l,i)=>
            <div key={i} className="p-3 rounded-sm" style={{background:COLORS.bgDark, border:`1px solid ${COLORS.border}`}}>
              <div className="text-sm font-semibold mb-1" style={{color:COLORS.cream}}>{l.title}</div>
              <div className="text-xs mb-2" style={{color:COLORS.textDim}}>{l.desc}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{color:COLORS.textDim}}>Score</span>
                <span className="text-sm font-bold" style={{color: l.score > 60 ? COLORS.amber : COLORS.red}}>{l.score}/100</span>
              </div>
              <ProgressBar value={l.score} color={l.score > 60 ? COLORS.amber : COLORS.red}/>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// --- LEARNING CENTER ---
const LearningCenter = () => {
  const [expanded, setExpanded] = useState(null);
  const topics = [
    {
      id: "llm", icon: Bot, title: "Advanced Reasoning LLMs", subtitle: "What powers this entire platform",
      content: `Large Language Models (LLMs) like Claude are neural networks trained on vast text datasets. They don't just autocomplete — they reason, plan, and execute multi-step workflows.\n\n**Why this matters for your business:**\n• An LLM can analyze your entire product catalog, identify SEO gaps, draft optimized descriptions, and publish them — in minutes, not days\n• It understands context: "improve my moonshine stein listing" triggers product analysis, competitor research, keyword extraction, and copywriting in one shot\n• Advanced reasoning means it catches things humans miss: keyword cannibalization, schema markup errors, inconsistent pricing across platforms\n\n**What "agentic" means:** Instead of just answering questions, agentic AI takes ACTION. It reads your analytics, decides what needs fixing, writes the fix, and deploys it. Your automations page? That's agentic AI in action.`
    },
    {
      id: "api", icon: Plug, title: "APIs — The Pipes Between Your Tools", subtitle: "How Shopify, Meta, TikTok, and your site all talk to each other",
      content: `An API (Application Programming Interface) is a structured way for two systems to exchange data. Think of it as a waiter in a restaurant — you (the client) don't go into the kitchen (the server). You give your order to the waiter (the API), who brings back exactly what you asked for.\n\n**Real examples in YOUR system:**\n• Shopify REST API: When someone buys a mug, this API sends order data to your dashboard in real-time\n• Meta Graph API: Lets this platform post to your Facebook page and read Instagram analytics without you logging into Meta\n• TikTok Commerce API: Syncs your Shopify products to TikTok Shop so they appear in your videos\n• Google Search Console API: Feeds live SEO data into your analytics dashboard\n\n**Authentication:** APIs use tokens (like passwords) so only YOUR platform can access YOUR data. OAuth 2.0 is the standard — it's why you see "Login with Google" buttons. The token expires, so even if intercepted, it's useless quickly.`
    },
    {
      id: "mcp", icon: Cpu, title: "MCP — The Universal AI Connector", subtitle: "Model Context Protocol: how AI agents securely access your tools",
      content: `The Model Context Protocol (MCP) is an open standard created by Anthropic. Think of it as USB-C for AI — one standardized port that connects any AI model to any external tool.\n\n**Before MCP:** Every AI integration was custom-built. Want Claude to check your Shopify orders? Custom code. Want it to post to Meta? More custom code. Each connection was fragile and expensive.\n\n**With MCP:** You deploy an MCP Server (a small program that exposes specific capabilities). The AI connects to it through a standardized protocol. Now Claude can:\n• Read your Google Search Console data (GSC MCP Server)\n• Manage your Shopify products (Shopify MCP Server)\n• Post to social media (Meta MCP Server)\n• Deploy your website (Netlify MCP Server)\n\n**The Architecture:**\n→ MCP Host: Where the AI runs (Claude Code terminal)\n→ MCP Client: Translates AI intent into structured requests\n→ MCP Server: Exposes tools the AI can use\n→ Transport: How they communicate (stdio locally, SSE remotely)\n\n**Why it matters:** MCP means you can add NEW integrations without rebuilding anything. Want to add Etsy? Deploy an Etsy MCP server. The AI immediately knows how to use it.`
    },
    {
      id: "auto", icon: Zap, title: "Automation & Webhooks", subtitle: "How events trigger actions without you lifting a finger",
      content: `Automation replaces repetitive human tasks with event-driven workflows. The core pattern:\n\n**TRIGGER** → **CONDITION** → **ACTION**\n\n**Webhooks** are the trigger mechanism. When something happens in Shopify (new order, stock change), Shopify sends an HTTP POST request to a URL you specify — that's a webhook. Your system receives it and decides what to do.\n\n**Example automation in YOUR system:**\n1. Customer buys a Moonshine Stein (Shopify webhook fires)\n2. System receives the order data\n3. Checks if stock is now below 5 units → sends you a Slack alert\n4. Auto-generates an Instagram Story: "Another Stein leaving the shelf!"\n5. Updates your analytics dashboard in real-time\n6. If it's their first purchase, triggers a welcome email sequence\n\nAll of that happens in under 3 seconds, with zero manual input.\n\n**n8n** is the self-hosted automation engine in your stack. Unlike Zapier ($50+/mo), n8n runs on your own server for $0–$25/mo with UNLIMITED workflows.`
    }
  ];
  return (
    <div className="space-y-6">
      <SectionHeader icon={GraduationCap} title="Learning Center" subtitle="Understand the technology powering your brand's growth"/>
      <div className="space-y-3">
        {topics.map(t => (
          <Card key={t.id} className={`overflow-hidden cursor-pointer transition-all ${expanded === t.id ? '' : 'hover:border-amber-500/30'}`}
            style={{borderColor: expanded === t.id ? `${COLORS.amber}60` : undefined}}
            onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
            <div className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-sm shrink-0" style={{background:COLORS.amberGlow}}><t.icon size={20} style={{color:COLORS.amber}}/></div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{color:COLORS.cream}}>{t.title}</div>
                <div className="text-xs" style={{color:COLORS.textDim}}>{t.subtitle}</div>
              </div>
              <ChevronDown size={16} style={{color:COLORS.textDim, transform: expanded === t.id ? 'rotate(180deg)' : 'none', transition:'transform 0.3s'}}/>
            </div>
            {expanded === t.id && (
              <div className="px-4 pb-4 pt-0">
                <div className="p-4 rounded-sm text-sm leading-relaxed whitespace-pre-line" style={{background:COLORS.bgDark, color:COLORS.textSecondary, border:`1px solid ${COLORS.border}`}}>
                  {t.content}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      <Card className="p-5" style={{borderColor:`${COLORS.amber}30`}}>
        <div className="flex items-center gap-2 mb-3"><BookOpen size={18} style={{color:COLORS.amber}}/><span className="text-sm font-bold" style={{color:COLORS.cream}}>Recommended Next Steps</span></div>
        {[
          {step:"1",title:"Complete TikTok Shop Setup",desc:"Biggest untapped revenue channel for your demographic",priority:"high"},
          {step:"2",title:"Enable Automated SEO Agent",desc:"Let AI continuously optimize your product listings",priority:"high"},
          {step:"3",title:"Set Up Meta Ads Manager",desc:"Retarget site visitors with dynamic product ads",priority:"medium"},
          {step:"4",title:"Build Email Automation Flow",desc:"Welcome series + abandoned cart recovery",priority:"medium"}
        ].map((s,i)=>
          <div key={i} className="flex items-start gap-3 py-2.5" style={{borderBottom: i < 3 ? `1px solid ${COLORS.border}` : 'none'}}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{background:COLORS.amberGlow, color:COLORS.amber, border:`1px solid ${COLORS.amber}`}}>{s.step}</div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{color:COLORS.cream}}>{s.title}</div>
              <div className="text-xs" style={{color:COLORS.textDim}}>{s.desc}</div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{background: s.priority === "high" ? `${COLORS.red}20` : `${COLORS.amber}20`, color: s.priority === "high" ? COLORS.red : COLORS.amber}}>
              {s.priority}
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};

// --- SETUP WIZARDS ---
const SetupWizards = () => {
  const [activeWizard, setActiveWizard] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const wizards = [
    { id: "shopify", icon: ShoppingBag, title: "Shopify Storefront API", status: "connected", desc: "Product sync, orders, inventory", steps: ["Create Private App", "Generate Storefront Token", "Configure Permissions", "Test Connection"] },
    { id: "meta", icon: Globe, title: "Meta Business Suite", status: "connected", desc: "Facebook Page, Instagram, Messenger", steps: ["Create Meta App", "Configure Permissions", "Connect Facebook Page", "Link Instagram"] },
    { id: "tiktok", icon: Play, title: "TikTok Shop + Account", status: "disconnected", desc: "Product catalog, shoppable videos, analytics", steps: ["Create TikTok Business Account", "Apply for TikTok Shop", "Install Shopify Connector", "Sync Product Catalog", "Enable Shoppable Videos"] },
    { id: "gsc", icon: Search, title: "Google Search Console", status: "connected", desc: "SEO data, keyword tracking, indexing", steps: ["Verify Domain Ownership", "Create Service Account", "Generate JSON Key", "Configure MCP Server"] },
    { id: "analytics", icon: BarChart3, title: "Google Analytics 4", status: "disconnected", desc: "Traffic, conversions, audience insights", steps: ["Create GA4 Property", "Install Tracking Code", "Configure Events", "Link to Search Console"] },
    { id: "email", icon: MessageSquare, title: "Email Marketing (Mailchimp/Klaviyo)", status: "disconnected", desc: "Campaigns, automations, segmentation", steps: ["Create Account", "Import Subscribers", "Design Templates", "Build Welcome Flow"] },
    { id: "n8n", icon: Zap, title: "n8n Workflow Engine", status: "connected", desc: "Self-hosted automation ($0-$25/mo)", steps: ["Deploy on Cloud Run", "Configure Webhook URLs", "Connect Shopify Trigger", "Build First Workflow"] },
    { id: "gbp", icon: Target, title: "Google Business Profile", status: "disconnected", desc: "Local SEO, reviews, bar location", steps: ["Claim Business Listing", "Verify Location", "Add Photos & Menu", "Enable Review Alerts"] }
  ];

  if (activeWizard) {
    const w = wizards.find(x => x.id === activeWizard);
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => { setActiveWizard(null); setWizardStep(1); }} className="p-2 rounded-sm" style={{border:`1px solid ${COLORS.border}`}}>
            <ArrowLeft size={16} style={{color:COLORS.textDim}}/>
          </button>
          <div>
            <div className="text-lg font-bold" style={{color:COLORS.cream, fontFamily:"'Playfair Display', serif"}}>{w.title} Setup</div>
            <div className="text-xs" style={{color:COLORS.textDim}}>Step {wizardStep} of {w.steps.length}</div>
          </div>
        </div>
        <ProgressBar value={wizardStep} max={w.steps.length}/>
        <div className="space-y-2">
          {w.steps.map((s,i) => <WizardStep key={i} step={i+1} current={wizardStep} title={`Step ${i+1}: ${s}`} desc={
            i+1 < wizardStep ? "Completed" : i+1 === wizardStep ? "Current step — follow the instructions below" : "Upcoming"
          }/>)}
        </div>
        <Card className="p-5" style={{borderColor:`${COLORS.amber}40`}}>
          <div className="text-sm font-bold mb-2" style={{color:COLORS.cream}}>Instructions for: {w.steps[wizardStep-1]}</div>
          <div className="text-sm leading-relaxed" style={{color:COLORS.textSecondary}}>
            {wizardStep === 1 && `Navigate to the ${w.title.split(' ')[0]} developer portal and create a new application. Select the appropriate account type (Business) and provide your Montucky Moonshine business details.`}
            {wizardStep === 2 && `Configure the required API permissions. For read operations, enable product catalog and analytics access. For write operations, enable content publishing and order management.`}
            {wizardStep >= 3 && `Follow the platform-specific authentication flow. You'll receive an access token that this dashboard stores securely and uses for all automated operations.`}
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm"
              style={{background:'transparent', color:COLORS.textDim, border:`1px solid ${COLORS.border}`}}>Back</button>
            <button onClick={() => wizardStep < w.steps.length ? setWizardStep(wizardStep + 1) : setActiveWizard(null)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm"
              style={{background:COLORS.amber, color:COLORS.bg}}>
              {wizardStep === w.steps.length ? "Complete Setup" : "Next Step →"}
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader icon={Settings} title="Setup Wizards" subtitle="Connect every platform with guided step-by-step walkthroughs"/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wizards.map(w => (
          <Card key={w.id} className="p-4 cursor-pointer hover:border-amber-500/30" onClick={() => setActiveWizard(w.id)}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm" style={{background:COLORS.amberGlow}}><w.icon size={20} style={{color:COLORS.amber}}/></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{color:COLORS.cream}}>{w.title}</span>
                  <StatusBadge status={w.status}/>
                </div>
                <div className="text-xs" style={{color:COLORS.textDim}}>{w.desc}</div>
              </div>
              <ChevronRight size={16} style={{color:COLORS.textDim}}/>
            </div>
            <div className="mt-2">
              <ProgressBar value={w.status === "connected" ? 100 : w.status === "pending" ? 50 : 0}
                color={w.status === "connected" ? COLORS.green : w.status === "pending" ? COLORS.amber : COLORS.textDim}/>
              <div className="text-xs mt-1" style={{color:COLORS.textDim}}>{w.steps.length} steps · {w.status === "connected" ? "Completed" : w.status === "pending" ? "In progress" : "Not started"}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Command Center" },
  { id: "social", icon: Share2, label: "Social Hub" },
  { id: "shopify", icon: ShoppingBag, label: "Shopify Sync" },
  { id: "automation", icon: Zap, label: "Automations" },
  { id: "seo", icon: Search, label: "SEO & Analytics" },
  { id: "studio", icon: Image, label: "Product Studio" },
  { id: "learn", icon: GraduationCap, label: "Learning Center" },
  { id: "setup", icon: Settings, label: "Setup Wizards" }
];

export default function App() {
  const [view, setView] = useState("storefront");
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "social": return <SocialHub />;
      case "shopify": return <ShopifySync />;
      case "automation": return <AutomationMatrix />;
      case "seo": return <SEOAnalytics />;
      case "studio": return <ProductStudio />;
      case "learn": return <LearningCenter />;
      case "setup": return <SetupWizards />;
      default: return <Dashboard />;
    }
  };

  // ===== STOREFRONT VIEW =====
  if (view === "storefront") {
    return (
      <div style={{ background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Barlow', sans-serif", minHeight: '100vh' }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet"/>

        {/* NAV */}
        <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(10,10,8,0.9)', borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="https://montuckymoonshine.com/cdn/shop/files/hat1-6_180x.png?v=1614732107" alt="Logo" className="h-10" style={{ filter: 'drop-shadow(0 0 8px rgba(200,146,42,0.3))' }}/>
              <div>
                <div className="text-base font-bold" style={{ color: COLORS.amber, fontFamily: "'Playfair Display', serif" }}>Montucky Moonshine</div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ color: COLORS.textDim }}>Est. Montana</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://montuckymoonshine.com/collections/all" target="_blank" className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5"
                style={{ color: COLORS.textSecondary }}>Shop</a>
              <button onClick={() => setView("admin")} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm"
                style={{ background: COLORS.amber, color: COLORS.bg }}>Admin →</button>
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1408 50%, ${COLORS.bg} 100%)` }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(200,146,42,0.06) 0%, transparent 50%)` }}/>
          <div className="relative z-10 text-center px-4" style={{ animation: 'fadeIn 1s ease-out' }}>
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.35em] px-4 py-2 mb-8" style={{ color: COLORS.amber, border: `1px solid ${COLORS.amber}`, fontFamily: "'Barlow Condensed', sans-serif" }}>
              Great Ideas — Fantastic Products
            </div>
            <h1 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem,8vw,6rem)', fontWeight: 900, lineHeight: 0.95, color: COLORS.cream }}>
              Montucky<br/><em style={{ color: COLORS.amber, fontWeight: 400 }}>Moonshine</em>
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] mb-8" style={{ color: COLORS.textSecondary, fontFamily: "'Barlow Condensed', sans-serif" }}>
              Handcrafted goods from the heart of Montana
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://montuckymoonshine.com/collections/all" target="_blank"
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider inline-block"
                style={{ background: COLORS.amber, color: COLORS.bg, fontFamily: "'Barlow Condensed', sans-serif" }}>
                Shop Collection →
              </a>
              <button onClick={() => setView("admin")}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider"
                style={{ background: 'transparent', color: COLORS.cream, border: `1px solid ${COLORS.border}`, fontFamily: "'Barlow Condensed', sans-serif" }}>
                Owner Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-[0.35em] font-semibold mb-2" style={{ color: COLORS.amber }}>The Collection</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: COLORS.cream }}>Shop <em style={{ color: COLORS.amber, fontWeight: 400 }}>Montucky</em></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.slice(0,8).map((p,i) => (
              <a key={i} href={p.url} target="_blank" className="group block rounded-sm overflow-hidden transition-all hover:-translate-y-1"
                style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}>
                <div className="aspect-square overflow-hidden"><img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div>
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: COLORS.amber }}>{p.tag}</div>
                  <div className="text-sm font-semibold truncate" style={{ color: COLORS.cream }}>{p.name}</div>
                  <div className="text-sm font-bold mt-1" style={{ color: COLORS.amberLight }}>{p.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  // ===== ADMIN VIEW =====
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Barlow', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 w-56 h-full flex flex-col transition-transform duration-300`}
        style={{ background: COLORS.bgDark, borderRight: `1px solid ${COLORS.border}` }}>
        <div className="p-4 flex items-center gap-2" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          <img src="https://montuckymoonshine.com/cdn/shop/files/hat1-6_180x.png?v=1614732107" alt="Logo" className="h-8"/>
          <div>
            <div className="text-sm font-bold" style={{ color: COLORS.amber, fontFamily: "'Playfair Display', serif" }}>Montucky</div>
            <div className="text-[8px] uppercase tracking-[0.2em]" style={{ color: COLORS.textDim }}>Commerce Platform</div>
          </div>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all text-sm"
              style={{ color: page === item.id ? COLORS.amber : COLORS.textDim, background: page === item.id ? COLORS.amberGlow : 'transparent', borderRight: page === item.id ? `2px solid ${COLORS.amber}` : '2px solid transparent' }}>
              <item.icon size={16}/> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <button onClick={() => setView("storefront")} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-sm"
            style={{ color: COLORS.textDim, border: `1px solid ${COLORS.border}` }}>
            <Home size={14}/> View Storefront
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)}/>}

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 md:px-6" style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bgDark }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1" onClick={() => setSidebarOpen(true)}><Menu size={20} style={{ color: COLORS.cream }}/></button>
            <div className="text-sm font-bold" style={{ color: COLORS.cream }}>{navItems.find(n => n.id === page)?.label}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: COLORS.green }}/>
            <span className="text-xs" style={{ color: COLORS.textDim }}>All systems operational</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
