import { useState } from "react";

// ═══════════════════════════════════════════════════════
// UNIDOR LIGHT BRAND PALETTE
// bg: #FFFFF1 warm cream, surfaces white, navy primary
// ═══════════════════════════════════════════════════════
const C = {
  bg:"#FFFFF1",
  surface:"#FFFFFF",
  surfaceHigh:"#F7F7F0",
  surfaceMid:"#EFF0E8",
  border:"#E2E3DA",
  borderStrong:"#C8CABD",

  navy:"#1A2B4A",
  navySoft:"rgba(26,43,74,0.07)",
  navyMid:"rgba(26,43,74,0.12)",

  orange:"#E8621A",
  orangeSoft:"#FDF0E8",
  orangeMid:"rgba(232,98,26,0.15)",

  green:"#1A8A5A",
  greenSoft:"#E8F5EE",
  amber:"#C27A10",
  amberSoft:"#FEF3DC",
  red:"#C0392B",
  redSoft:"#FDEDED",
  teal:"#0E7C8A",
  tealSoft:"#E5F5F7",
  purple:"#6B4FA0",
  purpleSoft:"#F0EBF9",

  textPrimary:"#1A2B4A",
  textSecondary:"#4A5568",
  textMuted:"#8A95A3",
  textLight:"#B4BCC6",
};

const pill=(color,bg,label)=>(
  <span style={{background:bg,color,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,letterSpacing:.3,whiteSpace:"nowrap",border:`1px solid ${color}22`}}>{label}</span>
);

const Btn=({onClick,variant="primary",children,style={}})=>(
  <button onClick={onClick} style={{
    padding:"8px 18px",borderRadius:7,border:variant==="outline"?`1.5px solid ${C.navy}`:"none",
    cursor:"pointer",fontWeight:700,fontSize:13,display:"inline-flex",alignItems:"center",gap:6,
    background:variant==="primary"?C.navy:variant==="danger"?C.red:variant==="outline"?"transparent":C.surfaceHigh,
    color:variant==="primary"?"#FFFFFF":variant==="danger"?"#FFFFFF":variant==="ghost"?C.textSecondary:C.textPrimary,
    transition:"all .15s",flexShrink:0,...style
  }}
  onMouseEnter={e=>{e.currentTarget.style.opacity=".82";}}
  onMouseLeave={e=>{e.currentTarget.style.opacity="1";}}>{children}</button>
);

const OrangeBtn=({onClick,children,style={}})=>(
  <button onClick={onClick} style={{padding:"8px 20px",borderRadius:7,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,display:"inline-flex",alignItems:"center",gap:6,background:C.orange,color:"#fff",transition:"all .15s",flexShrink:0,...style}} onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{children}</button>
);

const Inp=({placeholder,value,onChange,type="text",style={}})=>(
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:7,padding:"8px 14px",color:C.textPrimary,fontSize:13,outline:"none",fontFamily:"inherit",...style}}
  onFocus={e=>e.target.style.borderColor=C.navy} onBlur={e=>e.target.style.borderColor=C.border}/>
);

const Sel=({value,onChange,children,style={},disabled})=>(
  <select value={value} onChange={onChange} disabled={disabled} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:7,padding:"8px 14px",color:C.textPrimary,fontSize:13,outline:"none",fontFamily:"inherit",...style}}>{children}</select>
);

const Toggle=({on,onChange,label})=>(
  <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div onClick={()=>onChange(!on)} style={{width:38,height:22,borderRadius:11,background:on?C.navy:C.border,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
      <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:on?19:3,transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
    </div>
    {label&&<span style={{color:C.textSecondary,fontSize:12}}>{label}</span>}
  </div>
);

const Card=({children,style={},onClick,onMouseEnter,onMouseLeave})=>(
  <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:12,boxShadow:"0 1px 4px rgba(26,43,74,0.06)",...style}} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>
);

const StatCard=({label,value,sub,color=C.navy,icon})=>(
  <Card style={{padding:"22px 24px",flex:1,minWidth:150,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,right:0,width:80,height:80,borderRadius:"0 12px 0 80px",background:`${color}08`}}/>
    <div style={{color:C.textMuted,fontSize:10,letterSpacing:1.2,marginBottom:10,fontWeight:700,textTransform:"uppercase"}}>{label}</div>
    <div style={{color,fontSize:30,fontWeight:800,letterSpacing:-1,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{value}</div>
    {sub&&<div style={{color:C.textMuted,fontSize:11,marginTop:5}}>{sub}</div>}
  </Card>
);

const TopBar=({title,crumbs=[],children})=>(
  <div style={{padding:"20px 32px 16px",borderBottom:`1.5px solid ${C.border}`,background:C.surface,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,flexShrink:0}}>
    <div>
      {crumbs.length>0&&<div style={{color:C.textMuted,fontSize:11,marginBottom:4,letterSpacing:.3}}>{crumbs.map((c,i)=><span key={i}>{i>0&&<span style={{margin:"0 6px",color:C.border}}>›</span>}{c}</span>)}</div>}
      <h1 style={{margin:0,color:C.textPrimary,fontSize:20,fontWeight:700,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{title}</h1>
    </div>
    <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>{children}</div>
  </div>
);

const InfoRow=({label,value})=>(
  <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,padding:"11px 0"}}>
    <div style={{width:240,color:C.textMuted,fontSize:12,flexShrink:0,paddingRight:16}}>{label}</div>
    <div style={{color:C.textPrimary,fontSize:13,fontWeight:500}}>{value||"—"}</div>
  </div>
);

const SecTitle=({t})=><div style={{color:C.orange,fontSize:10,fontWeight:800,letterSpacing:1.5,marginBottom:10,marginTop:28,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8}}><div style={{height:1,width:16,background:C.orange}}/>{t}<div style={{flex:1,height:1,background:C.border}}/></div>;

// ═══ DATA ═══════════════════════════════════════════════
const ALL_REGIONS=["North America","South America","Europe","Middle East","Africa","South Asia","Southeast Asia","East Asia","Oceania","Global"];
const TENANTS_LIST=[
  {id:1,name:"Acme Corp",status:"Active",employees:142,industry:"Technology",country:"United States"},
  {id:2,name:"NovaTech Ltd",status:"Active",employees:87,industry:"Finance",country:"United Kingdom"},
  {id:3,name:"BlueSky Inc",status:"Pending Activation",employees:0,industry:"Healthcare",country:"Australia"},
  {id:4,name:"Meridian Group",status:"Active",employees:310,industry:"Manufacturing",country:"Germany"},
  {id:5,name:"Starfield Solutions",status:"Suspended",employees:24,industry:"Logistics",country:"India"},
  {id:6,name:"Pinnacle Works",status:"Active",employees:56,industry:"Retail",country:"Canada"},
];
const CDATA=[{country:"United States",state:"California",county:"Los Angeles",tenants:18,updated:"2025-06-10"},{country:"United States",state:"New York",county:"Manhattan",tenants:12,updated:"2025-05-28"},{country:"Germany",state:"Bavaria",county:"—",tenants:7,updated:"2025-06-01"},{country:"United Kingdom",state:"England",county:"Greater London",tenants:14,updated:"2025-05-20"},{country:"India",state:"Maharashtra",county:"—",tenants:21,updated:"2025-06-08"}];
const INIT_MANAGERS=[
  {id:1,name:"Sarah Chen",email:"s.chen@unidor.ai",regions:["North America","Europe"],tenants:[1,2]},
  {id:2,name:"James Okafor",email:"j.okafor@unidor.ai",regions:["Africa","Middle East"],tenants:[4]},
  {id:3,name:"Priya Nair",email:"p.nair@unidor.ai",regions:["South Asia","Southeast Asia"],tenants:[3,5,6]},
];
const CAL=(()=>{const d=[];for(let i=1;i<=31;i++){const dow=(i+1)%7;if(dow===0||dow===6){d.push({d:i,type:"weekend"});continue;}if(i===10){d.push({d:i,type:"leave",lbl:"Annual Leave"});continue;}if(i===18){d.push({d:i,type:"holiday",lbl:"Holiday"});continue;}const h=7+(i%3);d.push({d:i,type:"work",h,pay:(h*45.5).toFixed(2)});}return d;})();
const EMPS=[{name:"Alice Merritt",country:"United States",status:"Active"},{name:"Ben Osei",country:"United Kingdom",status:"Active"},{name:"Clara Zhou",country:"Germany",status:"On Leave"},{name:"David Park",country:"Canada",status:"Active"}];
const INIT_FT_POLICIES=[{id:1,name:"Standard Full-Time Leave",country:"United States",effectiveDate:"2025-01-01",annualDays:20,sickDays:10,casualDays:5,accrual:"yearly",carryForward:true,maxCarryDays:10,minUnit:"half day",maxPerRequest:15,noticeDays:2,approvalRequired:true,approverRole:"reporting manager",inTimesheet:true,reducesHours:true,unpaidDeducts:true,deductMethod:"daily deduction"},{id:2,name:"Senior Staff Leave Policy",country:"United Kingdom",effectiveDate:"2025-01-01",annualDays:25,sickDays:10,casualDays:5,accrual:"monthly",carryForward:true,maxCarryDays:5,minUnit:"full day",maxPerRequest:10,noticeDays:3,approvalRequired:true,approverRole:"hr / tenant admin",inTimesheet:true,reducesHours:true,unpaidDeducts:true,deductMethod:"hourly deduction"}];
const INIT_CONTRACT_POLICIES=[{id:1,employee:"Ben Osei",contractStart:"2025-01-01",contractEnd:"2025-12-31",name:"Contract Leave – Ben Osei",leaveTypes:["paid leave","sick leave"],totalDays:12,accrual:"monthly accrual",maxAtOnce:5,minUnit:"half day",reducesBillable:true,reducesInvoice:false,unpaidDeducts:true,deductMethod:"daily deduction",approvalRequired:true,approver:"Mark Tan",inTimesheet:true}];
const INIT_PROJECTS=[{id:1,name:"Phoenix Platform",client:"Acme Corp",owner:"Karen Liu",status:"active",start:"Jan 1, 2025",end:"Dec 31, 2025",team:["Alice Merritt","Ben Osei","Clara Zhou","David Park"],description:"End-to-end platform rebuild for core product suite.",period:"weekly",entryMode:"total",approver:"Manager",approvalType:"single"},{id:2,name:"DataBridge API",client:"Internal – Engineering",owner:"Sam Reeves",status:"active",start:"Mar 1, 2025",end:"Sep 30, 2025",team:["Alice Merritt","David Park"],description:"Internal data pipeline API connecting all reporting modules.",period:"monthly",entryMode:"start-end",approver:"HR",approvalType:"multi"}];
const AUDIT=[{date:"2025-06-10",cat:"Tenant",action:"Tenant Created",actor:"Global Admin",detail:"Tenant account created and registration link sent.",emp:null},{date:"2025-06-11",cat:"Tenant",action:"Country Rules Applied",actor:"Global Admin",detail:"Tax rules applied for US → California → Los Angeles.",emp:null},{date:"2025-06-12",cat:"Employee",action:"Employee Onboarded",actor:"Tenant Admin",detail:"Alice Merritt onboarded as Full-time Senior Engineer.",emp:"Alice Merritt"},{date:"2025-06-15",cat:"Project",action:"Project Assigned",actor:"Tenant Admin",detail:"Alice Merritt assigned to Phoenix Platform.",emp:"Alice Merritt"},{date:"2025-06-20",cat:"Timesheet",action:"Timesheet Submitted",actor:"Alice Merritt",detail:"Week June 16–20, 2025 (40 hrs).",emp:"Alice Merritt"},{date:"2025-06-21",cat:"Timesheet",action:"Timesheet Approved",actor:"Mark Tan",detail:"Alice Merritt — Week June 16–20 approved.",emp:"Alice Merritt"},{date:"2025-06-28",cat:"Payroll",action:"Payroll Generated",actor:"System",detail:"June 2025 payroll. Total: $34,200.",emp:null},{date:"2025-06-30",cat:"Payroll",action:"Payroll Finalized",actor:"Payroll Approver",detail:"June 2025 payroll finalized, payslips issued.",emp:null}];
const NOTIFS=[{id:1,title:"Payroll Generated — June 2025",type:"payroll",time:"Jun 30, 2025 · 09:12 AM",read:true,body:"Payroll for June 2025 has been generated. Total: $34,200. Awaiting final approval."},{id:2,title:"Timesheet Approved — Alice Merritt",type:"timesheet",time:"Jun 21, 2025 · 02:48 PM",read:true,body:"Timesheet for week Jun 16–20, 2025 approved by Mark Tan."},{id:3,title:"New Employee Onboarded — Ben Osei",type:"employee",time:"Jun 13, 2025 · 10:05 AM",read:false,body:"Ben Osei successfully onboarded as Contract Developer."},{id:4,title:"Country Tax Rules Applied",type:"compliance",time:"Jun 11, 2025 · 03:30 PM",read:false,body:"Tax and compliance rules applied for US → California → Los Angeles."},{id:5,title:"Tenant Account Created",type:"tenant",time:"Jun 10, 2025 · 11:00 AM",read:true,body:"Tenant account created. Registration link sent to primary contact."}];

// ═══ SIDEBAR ════════════════════════════════════════════
function Sidebar({nav,setNav}){
  const{section,subSection,tenantTab}=nav;
  const pBtn=(id,icon,label,cb)=>{
    const a=section===id;
    return(
      <button onClick={cb||(()=>setNav({section:id}))} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 14px",borderRadius:8,border:"none",cursor:"pointer",marginBottom:1,background:a?"#FFFFFF":section===id?"#fff":"transparent",color:a?C.navy:C.textSecondary,fontWeight:a?700:500,fontSize:13,transition:"all .15s",borderLeft:a?`3px solid ${C.orange}`:"3px solid transparent",boxShadow:a?"0 1px 4px rgba(26,43,74,0.1)":"none"}}>
        <span style={{fontSize:15,opacity:a?1:.7}}>{icon}</span>{label}
      </button>
    );
  };
  const gLbl=l=>(<div style={{padding:"14px 14px 5px",color:C.textLight,fontSize:9,fontWeight:800,letterSpacing:2,textTransform:"uppercase"}}>{l}</div>);
  const sBtn=(id,label,cb,active)=>(
    <button key={id} onClick={cb} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"6px 14px 6px 28px",borderRadius:6,border:"none",cursor:"pointer",marginBottom:1,background:active?C.navySoft:"transparent",color:active?C.navy:C.textMuted,fontWeight:active?600:400,fontSize:12,transition:"all .15s",borderLeft:active?`2px solid ${C.orange}`:"2px solid transparent"}}>
      <span style={{width:4,height:4,borderRadius:"50%",background:active?C.orange:C.borderStrong,flexShrink:0,display:"inline-block"}}/>
      {label}
    </button>
  );
  const adminSubs=[{id:"managers",label:"Account Managers"},{id:"permissions",label:"Permission Matrix"},{id:"notifications",label:"Notification Rules"},{id:"approvals",label:"Approval Hierarchy"}];
  const tenantSubs=[{id:"overview",label:"Tenant Overview"},{id:"employees",label:"Employees"},{id:"roles",label:"Roles & Permissions"},{id:"projects",label:"Projects"},{id:"leave-policy",label:"Leave Policy"},{id:"audit",label:"Audit & Reports"},{id:"notifications",label:"Notifications"}];
  return(
    <aside style={{width:240,background:C.surfaceHigh,borderRight:`1.5px solid ${C.border}`,display:"flex",flexDirection:"column",minHeight:"100vh",flexShrink:0,overflowY:"auto"}}>
      {/* Logo */}
      <div style={{padding:"20px 18px 18px",borderBottom:`1.5px solid ${C.border}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:8,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#FFFFF1" strokeWidth="1.5"/><path d="M6 9h6M9 6v6" stroke={C.orange} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div style={{color:C.navy,fontWeight:800,fontSize:15,letterSpacing:-.3,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Unidor</div>
            <div style={{color:C.textMuted,fontSize:9,letterSpacing:1.5,fontWeight:700,textTransform:"uppercase"}}>Global Admin</div>
          </div>
        </div>
      </div>
      <nav style={{padding:"10px 8px",flex:1}}>
        {pBtn("dashboard","⊞","Dashboard")}
        {pBtn("countries","🌐","Countries",()=>setNav({section:"countries",cScreen:"list"}))}
        <div style={{marginTop:8}}>
          {gLbl("Admin Settings")}
          {pBtn("admin-settings","⚙","Admin Settings",()=>setNav({section:"admin-settings",subSection:"managers"}))}
          <div style={{marginTop:2}}>{adminSubs.map(s=>sBtn(s.id,s.label,()=>setNav({section:"admin-settings",subSection:s.id}),section==="admin-settings"&&subSection===s.id))}</div>
        </div>
        <div style={{marginTop:10}}>
          {gLbl("Tenants")}
          {pBtn("tenants","🏢","Tenants",()=>setNav({section:"tenants"}))}
          <div style={{marginTop:2}}>{tenantSubs.map(s=>sBtn(s.id,s.label,()=>setNav({section:"tenants",tenantTab:s.id,selectedTenantId:TENANTS_LIST[0].id}),section==="tenants"&&tenantTab===s.id))}</div>
        </div>
      </nav>
      <div style={{padding:"14px 18px",borderTop:`1.5px solid ${C.border}`,flexShrink:0,background:C.surface}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:700,fontSize:11}}>GA</div>
          <div><div style={{color:C.navy,fontSize:12,fontWeight:700}}>Global Admin</div><div style={{color:C.textMuted,fontSize:10}}>admin@unidor.ai</div></div>
        </div>
      </div>
    </aside>
  );
}

// ═══ DASHBOARD HOME ══════════════════════════════════════
function DashboardHome({setNav}){
  return(
    <div style={{padding:32,overflowY:"auto",height:"100%",background:C.bg}}>
      <div style={{marginBottom:28}}>
        <div style={{color:C.orange,fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>Global Admin Console</div>
        <h2 style={{color:C.navy,margin:"0 0 4px",fontSize:24,fontWeight:700,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Good morning, Admin</h2>
        <p style={{color:C.textSecondary,margin:0,fontSize:13}}>Platform overview across all active regions and tenants.</p>
      </div>
      <div style={{display:"flex",gap:16,marginBottom:28,flexWrap:"wrap"}}>
        <StatCard label="Active Countries" value="34" sub="4 updated this week" color={C.navy}/>
        <StatCard label="Total Tenants" value="128" sub="12 pending activation" color={C.orange}/>
        <StatCard label="Active Employees" value="4,821" sub="Across all tenants" color={C.green}/>
        <StatCard label="Account Managers" value="9" sub="3 roles unassigned" color={C.purple}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:20,marginBottom:28}}>
        {[
          {section:"countries",icon:"🌐",title:"Countries",desc:"Manage tax and compliance rules by geographic jurisdiction.",badge:"34 Active",bc:C.green,bb:C.greenSoft},
          {section:"admin-settings",subSection:"managers",icon:"⚙",title:"Admin Settings",desc:"Configure platform governance, permissions, and notification rules.",badge:"9 Managers",bc:C.amber,bb:C.amberSoft},
          {section:"tenants",icon:"🏢",title:"Tenants",desc:"Manage companies, employees, projects, payroll and reports.",badge:"128 Tenants",bc:C.orange,bb:C.orangeSoft}
        ].map(m=>(
          <Card key={m.section} style={{padding:24,cursor:"pointer",transition:"all .2s"}} onClick={()=>setNav({section:m.section,subSection:m.subSection,cScreen:"list"})} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(26,43,74,0.12)";e.currentTarget.style.borderColor=C.navy;}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(26,43,74,0.06)";e.currentTarget.style.borderColor=C.border;}}>
            <div style={{width:40,height:40,borderRadius:10,background:C.navySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{m.icon}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{color:C.navy,fontWeight:700,fontSize:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{m.title}</span>{pill(m.bc,m.bb,m.badge)}</div>
            <p style={{color:C.textSecondary,fontSize:13,margin:"0 0 16px",lineHeight:1.6}}>{m.desc}</p>
            <span style={{color:C.orange,fontSize:12,fontWeight:700}}>Open →</span>
          </Card>
        ))}
      </div>
      <Card style={{padding:"22px 26px"}}>
        <div style={{color:C.navy,fontWeight:700,marginBottom:18,fontSize:14,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Recent Activity</div>
        {[{a:"Payroll generated",t:"Acme Corp",when:"2 min ago",dot:C.green},{a:"New tenant activated",t:"NovaTech Ltd",when:"1 hr ago",dot:C.navy},{a:"Tax rules updated",t:"Germany › Bavaria",when:"3 hr ago",dot:C.amber},{a:"Timesheet approved",t:"BlueSky Inc",when:"5 hr ago",dot:C.purple}].map((x,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"11px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:x.dot,flexShrink:0}}/>
            <div style={{flex:1}}><span style={{color:C.textPrimary,fontSize:13}}>{x.a}</span><span style={{color:C.textMuted,fontSize:12,marginLeft:8}}>· {x.t}</span></div>
            <span style={{color:C.textMuted,fontSize:11}}>{x.when}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ═══ COUNTRIES ════════════════════════════════════════════
function CountriesScreen({setNav}){
  const[search,setSearch]=useState("");const[sort,setSort]=useState("az");const[exp,setExp]=useState({});
  const toggle=k=>setExp(e=>({...e,[k]:!e[k]}));
  const grouped={};CDATA.forEach(r=>{if(!grouped[r.country])grouped[r.country]={};if(!grouped[r.country][r.state])grouped[r.country][r.state]=[];grouped[r.country][r.state].push(r);});
  let fl=Object.keys(grouped).filter(c=>c.toLowerCase().includes(search.toLowerCase()));
  if(sort==="az")fl.sort();else if(sort==="za")fl.sort().reverse();
  const gc="2fr 2fr 2fr 130px 150px 120px";
  const thStyle={padding:"10px 16px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:"uppercase"};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title="Countries" crumbs={["Dashboard","Countries"]}><OrangeBtn onClick={()=>setNav({section:"countries",cScreen:"add"})}>＋ Add Country</OrangeBtn></TopBar>
      <div style={{padding:"14px 32px",display:"flex",gap:12,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
        <Inp placeholder="Search country…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:220}}/><Sel value={sort} onChange={e=>setSort(e.target.value)}><option value="az">A → Z</option><option value="za">Z → A</option></Sel>
      </div>
      <div style={{padding:"16px 32px 4px"}}>
        <div style={{display:"grid",gridTemplateColumns:gc,background:C.surfaceHigh,borderRadius:"10px 10px 0 0",border:`1.5px solid ${C.border}`}}>
          {["Country","State","County","Active Tenants","Last Updated","Actions"].map(h=><div key={h} style={thStyle}>{h}</div>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 32px 32px"}}>
        {fl.map(country=>(
          <div key={country}>
            <div onClick={()=>toggle(country)} style={{display:"grid",gridTemplateColumns:gc,background:C.surface,border:`1.5px solid ${C.border}`,borderTop:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceHigh} onMouseLeave={e=>e.currentTarget.style.background=C.surface}>
              <div style={{padding:"13px 16px",color:C.navy,fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:8}}><span style={{color:C.textMuted,fontSize:10}}>{exp[country]?"▼":"▶"}</span>🌐 {country}</div>
              <div style={{padding:"13px 16px",color:C.textMuted,fontSize:12}}>—</div><div style={{padding:"13px 16px",color:C.textMuted,fontSize:12}}>—</div>
              <div style={{padding:"13px 16px",color:C.navy,fontSize:13,fontWeight:600}}>{Object.values(grouped[country]).flat().reduce((s,r)=>s+r.tenants,0)}</div>
              <div style={{padding:"13px 16px",color:C.textMuted,fontSize:12}}>{new Date(Math.max(...Object.values(grouped[country]).flat().map(r=>new Date(r.updated)))).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}</div>
              <div style={{padding:"13px 16px"}}><button onClick={e=>{e.stopPropagation();setNav({section:"countries",cScreen:{type:"rules",country}});}} style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:700}}>View Rules</button></div>
            </div>
            {exp[country]&&Object.keys(grouped[country]).map(state=>(
              <div key={state}>
                <div onClick={()=>toggle(`${country}-${state}`)} style={{display:"grid",gridTemplateColumns:gc,background:"#F9FAF4",border:`1.5px solid ${C.border}`,borderTop:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceHigh} onMouseLeave={e=>e.currentTarget.style.background="#F9FAF4"}>
                  <div style={{padding:"10px 16px",color:C.textMuted}}>—</div>
                  <div style={{padding:"10px 16px",color:C.navy,fontSize:13,fontWeight:600,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:10,color:C.textMuted}}>{exp[`${country}-${state}`]?"▼":"▶"}</span>{state}</div>
                  <div style={{padding:"10px 16px",color:C.textMuted}}>—</div>
                  <div style={{padding:"10px 16px",color:C.navy,fontSize:12,fontWeight:600}}>{grouped[country][state].reduce((s,r)=>s+r.tenants,0)}</div>
                  <div style={{padding:"10px 16px",color:C.textMuted,fontSize:12}}>{new Date(Math.max(...grouped[country][state].map(r=>new Date(r.updated)))).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}</div>
                  <div style={{padding:"10px 16px"}}><button onClick={e=>{e.stopPropagation();setNav({section:"countries",cScreen:{type:"rules",country,state}});}} style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:700}}>View Rules</button></div>
                </div>
                {exp[`${country}-${state}`]&&grouped[country][state].filter(r=>r.county!=="—").map((row,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:gc,background:"#F4F5EF",border:`1.5px solid ${C.border}`,borderTop:"none"}}>
                    <div style={{padding:"10px 16px"}}/><div style={{padding:"10px 16px",color:C.textMuted}}>—</div>
                    <div onClick={()=>setNav({section:"countries",cScreen:{type:"rules",country,state,county:row.county}})} style={{padding:"10px 16px",color:C.purple,fontSize:12,fontWeight:700,cursor:"pointer"}}>📍 {row.county}</div>
                    <div style={{padding:"10px 16px",color:C.navy,fontSize:12,fontWeight:600}}>{row.tenants}</div>
                    <div style={{padding:"10px 16px",color:C.textMuted,fontSize:12}}>{new Date(row.updated).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}</div>
                    <div style={{padding:"10px 16px"}}><button onClick={()=>setNav({section:"countries",cScreen:{type:"rules",country,state,county:row.county}})} style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:700}}>View</button></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCountryScreen({setNav}){
  const[country,setCountry]=useState("");const[state,setState]=useState("");const[county,setCounty]=useState("");const[loaded,setLoaded]=useState(false);const[done,setDone]=useState(false);const[vals,setVals]=useState({});
  const cs=["United States","Germany","United Kingdom","India","Canada"];
  const sts={"United States":["California","New York","Texas"],"Germany":["Bavaria","Berlin"],"United Kingdom":["England","Scotland"],"India":["Maharashtra","Karnataka"],"Canada":["Ontario","British Columbia"]};
  const ctys={California:["Los Angeles","San Francisco"],"New York":["Manhattan","Brooklyn"],England:["Greater London"]};
  const fields=["Income Tax Rate (%)","Corporate Tax Rate (%)","VAT / GST Rate (%)","Social Security (%)","Payroll Tax Rate (%)","Minimum Wage","Overtime Threshold (hrs/wk)","Mandatory Leave Days","Tax Year Start Month","Pension Contribution (%)"];
  if(done)return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:20,background:C.bg}}><div style={{width:64,height:64,borderRadius:"50%",background:C.greenSoft,border:`2px solid ${C.green}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:C.green}}>✓</div><div style={{color:C.navy,fontWeight:700,fontSize:20,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Rules Saved!</div><Btn onClick={()=>setNav({section:"countries",cScreen:"list"})}>← Back to Countries</Btn></div>);
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title="Add New Country" crumbs={["Countries","Add New"]}><Btn variant="ghost" onClick={()=>setNav({section:"countries",cScreen:"list"})}>← Back</Btn></TopBar>
      <div style={{flex:1,overflowY:"auto",padding:32}}>
        <Card style={{maxWidth:680,padding:32}}>
          <div style={{color:C.navy,fontWeight:700,fontSize:16,marginBottom:6,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Jurisdiction Selection</div>
          <div style={{color:C.textMuted,fontSize:12,marginBottom:20}}>Select the country, state and county to load the relevant tax fields.</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24}}>
            {[["COUNTRY",country,v=>{setCountry(v);setState("");setCounty("");setLoaded(false);},cs],["STATE",state,v=>{setState(v);setCounty("");setLoaded(false);},country?(sts[country]||[]):[]],["COUNTY",county,setCounty,state?(ctys[state]||[]):[]]].map(([l,v,fn,opts])=>(
              <div key={l}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:6}}>{l}</div>
                <Sel value={v} onChange={e=>fn(e.target.value)} style={{width:"100%"}} disabled={l!=="COUNTRY"&&(!country||(l==="COUNTY"&&!state))}><option value="">Select…</option>{opts.map(o=><option key={o}>{o}</option>)}</Sel></div>
            ))}
          </div>
          {!loaded&&<OrangeBtn onClick={()=>{if(country&&state)setLoaded(true);}} style={{opacity:country&&state?1:.4}}>Load Tax Fields →</OrangeBtn>}
          {loaded&&(<div style={{borderTop:`1.5px solid ${C.border}`,paddingTop:24}}>
            <div style={{display:"flex",gap:8,marginBottom:20}}>{pill(C.navy,C.navySoft,country)}{pill(C.green,C.greenSoft,state)}{county&&pill(C.purple,C.purpleSoft,county)}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>{fields.map(f=><div key={f}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>{f.toUpperCase()}</div><Inp placeholder={f} value={vals[f]||""} onChange={e=>setVals(v=>({...v,[f]:e.target.value}))} style={{width:"100%",boxSizing:"border-box"}}/></div>)}</div>
            <div style={{display:"flex",gap:12}}><OrangeBtn onClick={()=>setDone(true)}>Save Rules ✓</OrangeBtn><Btn variant="ghost" onClick={()=>setLoaded(false)}>Reset</Btn></div>
          </div>)}
        </Card>
      </div>
    </div>
  );
}

function CountryRulesScreen({params,setNav}){
  const{country,state,county}=params;
  const rules=[{l:"Income Tax Rate",v:"37%",c:"Tax"},{l:"Corporate Tax Rate",v:"21%",c:"Tax"},{l:"VAT / GST Rate",v:"10%",c:"Tax"},{l:"Social Security",v:"6.2%",c:"Payroll"},{l:"Minimum Wage",v:"$15.50/hr",c:"Labor"},{l:"Overtime Threshold",v:"40 hrs/wk",c:"Labor"},{l:"Mandatory Leave",v:"14 days",c:"Labor"},{l:"Tax Year Start",v:"January",c:"Compliance"},{l:"Pension",v:"3%",c:"Payroll"}];
  const catColor={Tax:C.navy,Payroll:C.orange,Labor:C.green,Compliance:C.purple};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title="Tax & Compliance Rules" crumbs={["Countries",country,state,county].filter(Boolean)}><Btn variant="ghost" onClick={()=>setNav({section:"countries",cScreen:"list"})}>← Back</Btn><OrangeBtn>Edit Rules</OrangeBtn></TopBar>
      <div style={{flex:1,overflowY:"auto",padding:32}}>
        <div style={{display:"flex",gap:8,marginBottom:24}}>{[country,state,county].filter(Boolean).map((b,i)=>pill(i===0?C.navy:i===1?C.green:C.purple,i===0?C.navySoft:i===1?C.greenSoft:C.purpleSoft,b))}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:16}}>
          {rules.map((r,i)=>(
            <Card key={i} style={{padding:"18px 22px",borderTop:`3px solid ${catColor[r.c]||C.navy}`}}>
              <div style={{color:catColor[r.c]||C.navy,fontSize:9,fontWeight:800,letterSpacing:1.5,marginBottom:6,textTransform:"uppercase"}}>{r.c}</div>
              <div style={{color:C.textSecondary,fontSize:12,marginBottom:6}}>{r.l}</div>
              <div style={{color:C.navy,fontWeight:800,fontSize:22,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{r.v}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══ ASSIGN TENANT MODAL ════════════════════════════════
function AssignTenantModal({manager,onClose,onAssign,setNav}){
  const[sel,setSel]=useState(new Set(manager.tenants));
  const toggle=id=>setSel(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  const sc=s=>s==="Active"?[C.green,C.greenSoft]:s==="Pending Activation"?[C.amber,C.amberSoft]:[C.red,C.redSoft];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,43,74,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20}}>
      <Card style={{width:"100%",maxWidth:560,maxHeight:"80vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"20px 24px",borderBottom:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div><div style={{color:C.navy,fontWeight:700,fontSize:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Assign Tenants</div><div style={{color:C.textMuted,fontSize:12,marginTop:2}}>Manager: {manager.name}</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textMuted,fontSize:20,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          <div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:12}}>CLICK TENANT NAME TO OPEN · CHECKBOX TO ASSIGN</div>
          {TENANTS_LIST.map(t=>{const[c,b]=sc(t.status);return(
            <div key={t.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
              <div onClick={()=>toggle(t.id)} style={{width:18,height:18,borderRadius:4,border:`2px solid ${sel.has(t.id)?C.navy:C.borderStrong}`,background:sel.has(t.id)?C.navy:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel.has(t.id)&&<span style={{color:"#fff",fontSize:11,fontWeight:900}}>✓</span>}</div>
              <div style={{width:30,height:30,borderRadius:7,background:C.navySoft,display:"flex",alignItems:"center",justifyContent:"center",color:C.navy,fontWeight:800,fontSize:12,flexShrink:0}}>{t.name[0]}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>{onAssign([...sel]);onClose();setNav({section:"tenants",tenantTab:"overview",selectedTenantId:t.id});}} style={{background:"none",border:"none",color:C.navy,fontWeight:700,fontSize:13,cursor:"pointer",padding:0,textDecoration:"underline",textDecorationColor:C.border}}>{t.name}</button>
                  {pill(c,b,t.status)}
                </div>
                <div style={{color:C.textMuted,fontSize:11,marginTop:2}}>{t.industry} · {t.country}</div>
              </div>
              <div style={{color:C.textSecondary,fontSize:12}}>{t.employees} emps</div>
            </div>
          );})}
        </div>
        <div style={{padding:"16px 24px",borderTop:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",flexShrink:0}}>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <OrangeBtn onClick={()=>{onAssign([...sel]);onClose();}}>Save Assignment ({sel.size})</OrangeBtn>
        </div>
      </Card>
    </div>
  );
}

// ═══ ACCOUNT MANAGERS TAB ════════════════════════════════
function AccountManagersTab({setNav}){
  const[managers,setManagers]=useState(INIT_MANAGERS);const[showAdd,setShowAdd]=useState(false);const[assignTarget,setAssignTarget]=useState(null);const[form,setForm]=useState({name:"",email:"",phone:"",regions:[]});const[regionInput,setRegionInput]=useState("");
  const addRegion=r=>{if(r&&!form.regions.includes(r))setForm(f=>({...f,regions:[...f.regions,r]}));setRegionInput("");};
  const removeRegion=r=>setForm(f=>({...f,regions:f.regions.filter(x=>x!==r)}));
  const saveManager=()=>{if(!form.name)return;setManagers(m=>[...m,{id:Date.now(),name:form.name,email:form.email,regions:form.regions,tenants:[]}]);setForm({name:"",email:"",phone:"",regions:[]});setShowAdd(false);};
  const thStyle={padding:"10px 16px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:"uppercase"};
  return(<>
    {assignTarget&&<AssignTenantModal manager={assignTarget} onClose={()=>setAssignTarget(null)} onAssign={ids=>setManagers(ms=>ms.map(m=>m.id===assignTarget.id?{...m,tenants:ids}:m))} setNav={setNav}/>}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Account Managers ({managers.length})</span>
      <OrangeBtn onClick={()=>setShowAdd(true)}>＋ Add Manager</OrangeBtn>
    </div>
    {showAdd&&(
      <Card style={{padding:24,marginBottom:24,borderColor:C.orange}}>
        <div style={{color:C.navy,fontWeight:700,marginBottom:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>New Account Manager</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          {[["Full Name","name"],["Work Email","email"],["Phone","phone"]].map(([l,k])=>(
            <div key={k}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>{l.toUpperCase()}</div><Inp placeholder={l} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} style={{width:"100%",boxSizing:"border-box"}}/></div>
          ))}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:8}}>REGIONS</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,minHeight:28}}>
            {form.regions.map(r=><div key={r} style={{display:"flex",alignItems:"center",gap:6,background:C.purpleSoft,color:C.purple,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600}}>{r}<button onClick={()=>removeRegion(r)} style={{background:"none",border:"none",color:C.purple,cursor:"pointer",fontSize:14,lineHeight:1,padding:0}}>×</button></div>)}
            {form.regions.length===0&&<span style={{color:C.textMuted,fontSize:12}}>No regions added</span>}
          </div>
          <div style={{display:"flex",gap:8}}><Sel value={regionInput} onChange={e=>setRegionInput(e.target.value)} style={{flex:1}}><option value="">Select region…</option>{ALL_REGIONS.filter(r=>!form.regions.includes(r)).map(r=><option key={r}>{r}</option>)}</Sel><Btn onClick={()=>addRegion(regionInput)} variant="outline">+ Add</Btn></div>
        </div>
        <div style={{display:"flex",gap:10}}><OrangeBtn onClick={saveManager}>Save Manager</OrangeBtn><Btn variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
      </Card>
    )}
    <Card>
      <div style={{display:"grid",gridTemplateColumns:"1.6fr 1.8fr 2fr 110px 180px",background:C.surfaceHigh,borderRadius:"12px 12px 0 0",borderBottom:`1.5px solid ${C.border}`}}>
        {["Name","Email","Regions","Tenants","Actions"].map(h=><div key={h} style={thStyle}>{h}</div>)}
      </div>
      {managers.map((m,i)=>(
        <div key={m.id} style={{display:"grid",gridTemplateColumns:"1.6fr 1.8fr 2fr 110px 180px",borderBottom:i<managers.length-1?`1px solid ${C.border}`:"none"}}>
          <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:700,fontSize:11}}>{m.name.split(" ").map(n=>n[0]).join("")}</div><span style={{color:C.navy,fontSize:13,fontWeight:600}}>{m.name}</span></div>
          <div style={{padding:"14px 16px",color:C.textSecondary,fontSize:12,display:"flex",alignItems:"center"}}>{m.email}</div>
          <div style={{padding:"10px 16px",display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>{m.regions.slice(0,2).map(r=>pill(C.purple,C.purpleSoft,r))}{m.regions.length>2&&<span style={{color:C.textMuted,fontSize:11}}>+{m.regions.length-2}</span>}{m.regions.length===0&&<span style={{color:C.textMuted,fontSize:11}}>—</span>}</div>
          <div style={{padding:"14px 16px",display:"flex",alignItems:"center"}}><span style={{color:C.navy,fontSize:13,fontWeight:700}}>{m.tenants.length}</span><span style={{color:C.textMuted,fontSize:11,marginLeft:4}}>tenants</span></div>
          <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:6}}>
            <button style={{background:"none",border:"none",color:C.navy,fontSize:12,cursor:"pointer",fontWeight:700}}>Edit</button><span style={{color:C.border}}>|</span>
            <button onClick={()=>setAssignTarget(m)} style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:700}}>Assign</button><span style={{color:C.border}}>|</span>
            <button style={{background:"none",border:"none",color:C.red,fontSize:12,cursor:"pointer",fontWeight:600}}>Remove</button>
          </div>
        </div>
      ))}
    </Card>
  </>);
}

// ═══ ADMIN SETTINGS ══════════════════════════════════════
function AdminSettingsScreen({subSection,setNav}){
  const[perms,setPerms]=useState([{r:"Account Manager",ta:true,pv:true,re:false,pe:false},{r:"Tenant Admin",ta:true,pv:true,re:true,pe:true},{r:"Reporting Manager",ta:true,pv:false,re:false,pe:false},{r:"Payroll Approver",ta:false,pv:true,re:true,pe:false}]);
  const[permNotif,setPermNotif]=useState(null);
  const notifRules=[{event:"Payroll Generated",rec:["Tenant Admin","Payroll Approver"],ch:"Email + In-app"},{event:"Timesheet Submitted",rec:["Reporting Manager"],ch:"In-app"},{event:"Policy Updated",rec:["Tenant Admin","Account Manager"],ch:"Email"},{event:"Employee Onboarded",rec:["Tenant Admin"],ch:"Email + In-app"}];
  const LABELS={managers:"Account Managers",permissions:"Permission Matrix",notifications:"Notification Rules",approvals:"Approval Hierarchy"};
  const permCols=["Timesheet Approval","Payroll View","Report Export","Policy Edit"];const permKeys=["ta","pv","re","pe"];
  const togglePerm=(ri,ki)=>{setPerms(perms.map((p,i)=>i===ri?{...p,[permKeys[ki]]:!p[permKeys[ki]]}:p));setPermNotif(`"${permCols[ki]}" for ${perms[ri].r} → ${!perms[ri][permKeys[ki]]?"Enabled":"Disabled"}. Notifications sent.`);setTimeout(()=>setPermNotif(null),3500);};
  const thStyle={padding:"11px 16px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:"uppercase"};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title={LABELS[subSection]||"Admin Settings"} crumbs={["Dashboard","Admin Settings",LABELS[subSection]].filter(Boolean)}/>
      <div style={{flex:1,overflowY:"auto",padding:32}}>
        {permNotif&&<div style={{background:C.greenSoft,border:`1.5px solid ${C.green}`,borderRadius:8,padding:"12px 16px",marginBottom:20,color:C.green,fontSize:13,display:"flex",alignItems:"center",gap:10}}>✓ {permNotif}</div>}
        {subSection==="managers"&&<AccountManagersTab setNav={setNav}/>}
        {subSection==="permissions"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Role Permission Matrix</span>
            <span style={{color:C.textMuted,fontSize:12}}>Click any cell to toggle</span>
          </div>
          <Card><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.surfaceHigh}}><th style={{...thStyle,textAlign:"left",minWidth:160}}>Role</th>{permCols.map(h=><th key={h} style={{...thStyle,textAlign:"center"}}>{h}</th>)}</tr></thead>
            <tbody>{perms.map((row,ri)=>(
              <tr key={ri} style={{borderTop:`1px solid ${C.border}`}}>
                <td style={{padding:"14px 16px",color:C.navy,fontWeight:600,fontSize:13}}>{row.r}</td>
                {permKeys.map((k,ki)=>(
                  <td key={ki} style={{padding:"12px 16px",textAlign:"center"}}>
                    <button onClick={()=>togglePerm(ri,ki)} style={{background:row[k]?C.greenSoft:C.redSoft,border:`1.5px solid ${row[k]?C.green:C.red}`,borderRadius:6,padding:"4px 14px",cursor:"pointer",color:row[k]?C.green:C.red,fontSize:12,fontWeight:700,transition:"all .2s"}}>{row[k]?"✓ Yes":"✗ No"}</button>
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table></Card>
        </>)}
        {subSection==="notifications"&&(<>
          <div style={{color:C.navy,fontWeight:700,marginBottom:20,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Notification Rules</div>
          <Card>
            <div style={{display:"grid",gridTemplateColumns:"2fr 2fr 1fr",background:C.surfaceHigh,borderRadius:"12px 12px 0 0",borderBottom:`1.5px solid ${C.border}`}}>{["Event","Recipients","Channel"].map(h=><div key={h} style={thStyle}>{h}</div>)}</div>
            {notifRules.map((n,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"2fr 2fr 1fr",borderBottom:i<notifRules.length-1?`1px solid ${C.border}`:"none"}}>
              <div style={{padding:"14px 16px",color:C.navy,fontSize:13,fontWeight:600}}>{n.event}</div>
              <div style={{padding:"14px 16px",display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>{n.rec.map(r=>pill(C.navy,C.navySoft,r))}</div>
              <div style={{padding:"14px 16px",color:C.textSecondary,fontSize:12,display:"flex",alignItems:"center"}}>{n.ch}</div>
            </div>)}
          </Card>
        </>)}
        {subSection==="approvals"&&(<>
          <div style={{color:C.navy,fontWeight:700,marginBottom:20,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Approval Hierarchy</div>
          <div style={{display:"flex",flexDirection:"column",gap:16,maxWidth:560}}>
            {[{l:1,role:"Reporting Manager",action:"Approves timesheet",esc:"48 hrs"},{l:2,role:"Payroll Approver",action:"Finalizes payroll",esc:"72 hrs"},{l:3,role:"Tenant Admin",action:"Override capability",esc:"—"}].map((a,i,arr)=>(
              <div key={i} style={{display:"flex",gap:16}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:800,fontSize:14}}>{a.l}</div>
                  {i<arr.length-1&&<div style={{width:2,height:36,background:C.border,marginTop:4}}/>}
                </div>
                <Card style={{flex:1,padding:"16px 20px",borderLeft:`3px solid ${C.orange}`}}>
                  <div style={{color:C.navy,fontWeight:700,fontSize:14,marginBottom:4}}>{a.role}</div>
                  <div style={{color:C.textSecondary,fontSize:12,marginBottom:6}}>{a.action}</div>
                  {a.esc!=="—"&&<div style={{color:C.textMuted,fontSize:11}}>Auto-escalate: <span style={{color:C.amber,fontWeight:600}}>{a.esc}</span></div>}
                </Card>
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}

// ═══ TENANTS LIST ════════════════════════════════════════
function TenantsListScreen({setNav}){
  const[search,setSearch]=useState("");
  const sc=s=>s==="Active"?[C.green,C.greenSoft]:s==="Pending Activation"?[C.amber,C.amberSoft]:[C.red,C.redSoft];
  const fl=TENANTS_LIST.filter(t=>t.name.toLowerCase().includes(search.toLowerCase()));
  const thStyle={padding:"10px 16px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:"uppercase"};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title="Tenants" crumbs={["Dashboard","Tenants"]}><Inp placeholder="Search tenants…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:220}}/><OrangeBtn>＋ Add Tenant</OrangeBtn></TopBar>
      <div style={{flex:1,overflowY:"auto",padding:32}}>
        <div style={{display:"flex",gap:16,marginBottom:28,flexWrap:"wrap"}}>
          <StatCard label="Total" value={TENANTS_LIST.length} color={C.navy}/>
          <StatCard label="Active" value={TENANTS_LIST.filter(t=>t.status==="Active").length} color={C.green}/>
          <StatCard label="Pending" value={TENANTS_LIST.filter(t=>t.status==="Pending Activation").length} color={C.amber}/>
          <StatCard label="Suspended" value={TENANTS_LIST.filter(t=>t.status==="Suspended").length} color={C.red}/>
        </div>
        <Card>
          <div style={{display:"grid",gridTemplateColumns:"2fr 140px 130px 150px 100px",background:C.surfaceHigh,borderRadius:"12px 12px 0 0",borderBottom:`1.5px solid ${C.border}`}}>{["Tenant Name","Status","Active Employees","Industry","Actions"].map(h=><div key={h} style={thStyle}>{h}</div>)}</div>
          {fl.map((t,i)=>{const[c,b]=sc(t.status);return(
            <div key={t.id} style={{display:"grid",gridTemplateColumns:"2fr 140px 130px 150px 100px",borderBottom:i<fl.length-1?`1px solid ${C.border}`:"none",cursor:"pointer",transition:"background .1s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceHigh} onMouseLeave={e=>e.currentTarget.style.background="transparent"} onClick={()=>setNav({section:"tenants",tenantTab:"overview",selectedTenantId:t.id})}>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:34,height:34,borderRadius:8,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:800,fontSize:13}}>{t.name[0]}</div>
                <div><div style={{color:C.navy,fontWeight:700,fontSize:13}}>{t.name}</div><div style={{color:C.textMuted,fontSize:11}}>{t.country}</div></div>
              </div>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center"}}>{pill(c,b,t.status)}</div>
              <div style={{padding:"14px 16px",color:C.navy,fontSize:13,fontWeight:600,display:"flex",alignItems:"center"}}>{t.employees}</div>
              <div style={{padding:"14px 16px",color:C.textSecondary,fontSize:12,display:"flex",alignItems:"center"}}>{t.industry}</div>
              <div style={{padding:"14px 16px",display:"flex",alignItems:"center"}}><button style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:700}}>View →</button></div>
            </div>
          );})}
        </Card>
      </div>
    </div>
  );
}

// ═══ TIMESHEET CALENDAR ══════════════════════════════════
function TimesheetCalendar(){
  const[sel,setSel]=useState(null);
  const tc={work:C.navy,leave:C.amber,holiday:C.purple,weekend:C.borderStrong};
  const tbg={work:C.navySoft,leave:C.amberSoft,holiday:C.purpleSoft,weekend:C.surfaceHigh};
  const sd=sel?CAL.find(x=>x.d===sel):null;
  return(<div>
    <div style={{display:"flex",gap:16,marginBottom:14,flexWrap:"wrap"}}>{[["work","Work"],["leave","Leave"],["holiday","Holiday"],["weekend","Weekend"]].map(([t,l])=><div key={t} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:tc[t]}}/><span style={{color:C.textMuted,fontSize:11}}>{l}</span></div>)}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
      {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{textAlign:"center",color:C.textMuted,fontSize:10,padding:"3px 0",fontWeight:700}}>{d}</div>)}
      {[0,1].map(i=><div key={`p${i}`}/>)}
      {CAL.map(day=>(
        <div key={day.d} onClick={()=>day.type==="work"&&setSel(sel===day.d?null:day.d)} style={{border:`1.5px solid ${sel===day.d?tc[day.type]:C.border}`,borderRadius:5,padding:"4px 2px",background:tbg[day.type],cursor:day.type==="work"?"pointer":"default",minHeight:42,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
          <div style={{color:tc[day.type],fontSize:9,fontWeight:700}}>{day.d}</div>
          {day.type==="work"&&<div style={{color:C.navy,fontSize:9,fontWeight:700}}>{day.h}h</div>}
          {(day.type==="leave"||day.type==="holiday")&&<div style={{color:tc[day.type],fontSize:7,textAlign:"center",lineHeight:1.2}}>{day.lbl?.split(" ")[0]}</div>}
        </div>
      ))}
    </div>
    {sd&&sd.type==="work"&&(<Card style={{marginTop:12,padding:14}}><div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
      <div><div style={{color:C.textMuted,fontSize:10,marginBottom:3,fontWeight:700,letterSpacing:.8}}>DATE</div><div style={{color:C.navy,fontWeight:700,fontSize:13}}>Jan {sd.d}, 2025</div></div>
      <div><div style={{color:C.textMuted,fontSize:10,marginBottom:3,fontWeight:700,letterSpacing:.8}}>HOURS</div><div style={{color:C.navy,fontWeight:700,fontSize:13}}>{sd.h}h</div></div>
      <div><div style={{color:C.textMuted,fontSize:10,marginBottom:3,fontWeight:700,letterSpacing:.8}}>PAYROLL VALUE</div><div style={{color:C.green,fontWeight:700,fontSize:13}}>${sd.pay}</div></div>
      <div><div style={{color:C.textMuted,fontSize:10,marginBottom:3,fontWeight:700,letterSpacing:.8}}>STATUS</div>{pill(C.green,C.greenSoft,"Approved")}</div>
    </div></Card>)}
    <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`,display:"flex",gap:24,flexWrap:"wrap"}}>{[["Working Days","22"],["Present","20"],["Leave","1"],["Total Hours","162h"],["Payroll","$7,371"],["Status","Completed"]].map(([l,v])=><div key={l}><div style={{color:C.textMuted,fontSize:10,marginBottom:3,fontWeight:700,letterSpacing:.8}}>{l.toUpperCase()}</div><div style={{color:l==="Payroll"?C.green:C.navy,fontWeight:700,fontSize:13}}>{v}</div></div>)}</div>
  </div>);
}

// ═══ EMPLOYEE DETAIL ════════════════════════════════════
function EmployeeDetailScreen({emp,onBack}){
  const[tab,setTab]=useState("details");const[selProj,setSelProj]=useState(null);
  const proj={name:"Phoenix Platform",client:"Acme Corp",status:"Active",start:"Jan 1, 2025",end:"Dec 31, 2025",owner:"Karen Liu",approver:"Mark Tan"};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      <TopBar title={emp.name} crumbs={["Tenants","Employees",emp.name]}><Btn variant="ghost" onClick={onBack}>← Back</Btn></TopBar>
      <div style={{display:"flex",padding:"0 32px",background:C.surface,borderBottom:`1.5px solid ${C.border}`,flexShrink:0}}>
        {[["details","Employee Details"],["project","Project & Timesheets"]].map(([k,v])=><button key={k} onClick={()=>setTab(k)} style={{padding:"12px 18px",border:"none",background:"none",cursor:"pointer",color:tab===k?C.navy:C.textSecondary,fontWeight:tab===k?700:500,fontSize:13,borderBottom:tab===k?`2px solid ${C.orange}`:"2px solid transparent",marginBottom:-1}}>{v}</button>)}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:32}}>
        {tab==="details"&&(<div style={{maxWidth:680}}>
          <SecTitle t="Basic Identity"/><InfoRow label="Full Legal Name" value={emp.name}/><InfoRow label="Work Email" value={`${emp.name.split(" ")[0].toLowerCase()}@tenant.com`}/><InfoRow label="Date of Birth" value="March 14, 1991"/><InfoRow label="Nationality" value={emp.country}/><InfoRow label="Phone" value="+1 (555) 204-8821"/>
          <SecTitle t="Employment Setup"/><InfoRow label="Employment Type" value="Full-time"/><InfoRow label="Job Title" value="Senior Engineer"/><InfoRow label="Department" value="Engineering"/><InfoRow label="Start Date" value="February 1, 2023"/><InfoRow label="Work Mode" value="Hybrid"/>
          <SecTitle t="Payroll"/><InfoRow label="Salary Type" value="Fixed Monthly"/><InfoRow label="Gross Salary" value="$8,500 / month"/><InfoRow label="Payroll Frequency" value="Bi-weekly"/>
        </div>)}
        {tab==="project"&&(!selProj?(
          <><div style={{color:C.navy,fontWeight:700,marginBottom:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Assigned Project</div>
          <Card style={{padding:20,cursor:"pointer",maxWidth:480,transition:"all .2s"}} onClick={()=>setSelProj(proj)} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.navy;e.currentTarget.style.boxShadow="0 4px 16px rgba(26,43,74,0.1)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="0 1px 4px rgba(26,43,74,0.06)";}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div><div style={{color:C.navy,fontWeight:700,fontSize:15}}>{proj.name}</div><div style={{color:C.textMuted,fontSize:12,marginTop:2}}>{proj.client}</div></div>{pill(C.green,C.greenSoft,"Active")}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>{[["Owner",proj.owner],["Approver",proj.approver],["Start",proj.start],["End",proj.end]].map(([l,v])=><div key={l}><span style={{color:C.textMuted,fontSize:11}}>{l}: </span><span style={{color:C.textSecondary,fontSize:11}}>{v}</span></div>)}</div>
            <div style={{marginTop:12,color:C.orange,fontSize:12,fontWeight:700}}>View Timesheets →</div>
          </Card></>
        ):(
          <><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><button onClick={()=>setSelProj(null)} style={{background:"none",border:"none",color:C.orange,cursor:"pointer",fontWeight:700,fontSize:13}}>← Back</button><span style={{color:C.navy,fontWeight:700,fontSize:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{selProj.name}</span>{pill(C.green,C.greenSoft,"Active")}</div>
          <div style={{display:"flex",gap:10,marginBottom:20}}>{[["Jan 2025",true],["Feb 2025",false],["Mar 2025",false]].map(([m,a])=><button key={m} style={{padding:"5px 14px",borderRadius:20,border:`1.5px solid ${a?C.navy:C.border}`,background:a?C.navy:"transparent",color:a?"#FFFFF1":C.textMuted,fontSize:12,cursor:"pointer",fontWeight:a?700:400}}>{m}</button>)}</div>
          <Card style={{padding:24}}><div style={{color:C.navy,fontWeight:700,marginBottom:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>January 2025 — Timesheet</div><TimesheetCalendar/></Card></>
        ))}
      </div>
    </div>
  );
}

// ═══ PROJECT MODAL ════════════════════════════════════════
function ProjectModal({project,onClose,onSave}){
  const def={name:"",client:"",owner:"",status:"active",startDate:"",endDate:"",description:"",period:"weekly",entryMode:"total",expectedHrs:"",maxHrs:"",overtime:false,requireNotes:true,preventOverlap:true,approver:"",approvalType:"single",autoApproval:"",lockAfter:true,allowCorrection:true};
  const[form,setForm]=useState(project?{...def,...project}:def);const[step,setStep]=useState(0);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const STEPS=["Project Basics","Timesheet Settings","Approval Workflow","Team Assignment"];
  const team=[{name:"Alice Merritt",role:"Contributor",billable:true,canSubmit:true,canEdit:false},{name:"Ben Osei",role:"Manager",billable:true,canSubmit:true,canEdit:true}];
  const fl={display:"grid",gridTemplateColumns:"1fr 1fr",gap:16};
  const FL=({label,k,type="text"})=><div><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>{label.toUpperCase()}</div><Inp value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={label} type={type} style={{width:"100%",boxSizing:"border-box"}}/></div>;
  const SL=({label,k,opts})=><div><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>{label.toUpperCase()}</div><Sel value={form[k]} onChange={e=>set(k,e.target.value)} style={{width:"100%"}}>{opts.map(o=><option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}</Sel></div>;
  const TR=({label,k})=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surfaceHigh,borderRadius:8,gridColumn:"1/-1"}}><span style={{color:C.textPrimary,fontSize:13}}>{label}</span><Toggle on={form[k]} onChange={v=>set(k,v)}/></div>;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,43,74,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20}}>
      <Card style={{width:"100%",maxWidth:680,maxHeight:"90vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"20px 24px",borderBottom:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <span style={{color:C.navy,fontWeight:700,fontSize:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{project?"Edit Project":"Create New Project"}</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textMuted,fontSize:20,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{display:"flex",padding:"0 24px",borderBottom:`1.5px solid ${C.border}`,flexShrink:0,overflowX:"auto"}}>
          {STEPS.map((s,i)=><button key={i} onClick={()=>setStep(i)} style={{padding:"11px 14px",border:"none",background:"none",cursor:"pointer",color:step===i?C.navy:C.textMuted,fontWeight:step===i?700:400,fontSize:12,borderBottom:step===i?`2px solid ${C.orange}`:"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>{i+1}. {s}</button>)}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:24}}>
          {step===0&&(<div style={fl}>
            <div style={{gridColumn:"1/-1"}}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>PROJECT NAME</div><Inp value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Project Name" style={{width:"100%",boxSizing:"border-box"}}/></div>
            <FL label="Client / Department" k="client"/><FL label="Project Owner" k="owner"/>
            <SL label="Status" k="status" opts={[{v:"draft",l:"Draft"},{v:"active",l:"Active"},{v:"archived",l:"Archived"}]}/><div/>
            <FL label="Start Date" k="startDate" type="date"/><FL label="End Date" k="endDate" type="date"/>
            <div style={{gridColumn:"1/-1"}}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>DESCRIPTION</div><textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={3} style={{width:"100%",boxSizing:"border-box",background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:7,padding:"8px 14px",color:C.textPrimary,fontSize:13,outline:"none",resize:"vertical",fontFamily:"inherit"}}/></div>
          </div>)}
          {step===1&&(<div style={fl}>
            <SL label="Timesheet Period" k="period" opts={["weekly","monthly"]}/>
            <SL label="Entry Mode" k="entryMode" opts={[{v:"start-end",l:"Start–End"},{v:"total",l:"Total Hours"},{v:"timer",l:"Timer"}]}/>
            <FL label="Expected hrs/day" k="expectedHrs"/><FL label="Max hrs/day" k="maxHrs"/>
            <TR label="Allow Overtime" k="overtime"/><TR label="Require Notes on Entries" k="requireNotes"/><TR label="Prevent Overlapping Entries" k="preventOverlap"/>
          </div>)}
          {step===2&&(<div style={fl}>
            <SL label="Approver" k="approver" opts={[{v:"",l:"Select…"},{v:"Manager",l:"Manager"},{v:"HR",l:"HR"},{v:"Client",l:"Client"}]}/>
            <SL label="Approval Type" k="approvalType" opts={[{v:"single",l:"Single Level"},{v:"multi",l:"Multi-level"}]}/>
            <div style={{gridColumn:"1/-1"}}><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>AUTO APPROVAL RULES</div><Inp value={form.autoApproval} onChange={e=>set("autoApproval",e.target.value)} placeholder="e.g. Auto-approve if ≤ 8hrs/day" style={{width:"100%",boxSizing:"border-box"}}/></div>
            <TR label="Lock Entries After Approval" k="lockAfter"/><TR label="Allow Correction Requests" k="allowCorrection"/>
          </div>)}
          {step===3&&(<><div style={{color:C.navy,fontWeight:600,marginBottom:16}}>Team Members</div>
            <Card><div style={{display:"grid",gridTemplateColumns:"2fr 1fr 70px 90px 80px",background:C.surfaceHigh,borderRadius:"12px 12px 0 0",borderBottom:`1.5px solid ${C.border}`}}>{["Employee","Role","Billable","Submit","Edit"].map(h=><div key={h} style={{padding:"10px 12px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8}}>{h.toUpperCase()}</div>)}</div>
              {team.map((m,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 70px 90px 80px",borderBottom:i<team.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{padding:"12px",display:"flex",alignItems:"center",gap:8}}><div style={{width:24,height:24,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontSize:10,fontWeight:700}}>{m.name[0]}</div><span style={{color:C.navy,fontSize:12}}>{m.name}</span></div>
                <div style={{padding:"12px",display:"flex",alignItems:"center"}}>{pill(m.role==="Manager"?C.amber:C.navy,m.role==="Manager"?C.amberSoft:C.navySoft,m.role)}</div>
                {[m.billable,m.canSubmit,m.canEdit].map((v,j)=><div key={j} style={{padding:"12px",display:"flex",alignItems:"center"}}><span style={{color:v?C.green:C.textLight,fontSize:14,fontWeight:700}}>{v?"✓":"✗"}</span></div>)}
              </div>)}</Card>
            <OrangeBtn style={{marginTop:16}}>＋ Add Employee</OrangeBtn>
          </>)}
        </div>
        <div style={{padding:"16px 24px",borderTop:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",flexShrink:0}}>
          <Btn variant="ghost" onClick={()=>step>0?setStep(step-1):onClose()}>{step>0?"← Previous":"Cancel"}</Btn>
          {step<3?<OrangeBtn onClick={()=>setStep(step+1)}>Next →</OrangeBtn>:<OrangeBtn onClick={()=>{onSave(form);onClose();}}>Save Project ✓</OrangeBtn>}
        </div>
      </Card>
    </div>
  );
}

// ═══ LEAVE POLICY ════════════════════════════════════════
function LeavePolicyScreen(){
  const[pTab,setPTab]=useState("fulltime");
  const[ftPolicies,setFtPolicies]=useState(INIT_FT_POLICIES);
  const[ctPolicies,setCtPolicies]=useState(INIT_CONTRACT_POLICIES);
  const[editFT,setEditFT]=useState(null);const[editCT,setEditCT]=useState(null);
  const defFT={name:"",country:"",effectiveDate:"",annualDays:"",sickDays:"",casualDays:"",accrual:"yearly allocation",carryForward:false,maxCarryDays:"",minUnit:"full day",maxPerRequest:"",noticeDays:"",approvalRequired:true,approverRole:"reporting manager",inTimesheet:true,reducesHours:true,unpaidDeducts:false,deductMethod:"daily deduction"};
  const defCT={employee:"",contractStart:"",contractEnd:"",name:"",leaveTypes:[],totalDays:"",accrual:"monthly accrual",maxAtOnce:"",minUnit:"full day",reducesBillable:false,reducesInvoice:false,unpaidDeducts:false,deductMethod:"daily deduction",approvalRequired:true,approver:"",inTimesheet:true};
  const[ftForm,setFtForm]=useState(defFT);const[ctForm,setCtForm]=useState(defCT);
  const setFt=(k,v)=>setFtForm(f=>({...f,[k]:v}));const setCt=(k,v)=>setCtForm(f=>({...f,[k]:v}));
  const toggleCTLeave=t=>setCtForm(f=>({...f,leaveTypes:f.leaveTypes.includes(t)?f.leaveTypes.filter(x=>x!==t):[...f.leaveTypes,t]}));
  const gs={display:"grid",gridTemplateColumns:"1fr 1fr",gap:16};
  const lbl=s=><div style={{color:C.textMuted,fontSize:10,fontWeight:700,letterSpacing:.8,marginBottom:6}}>{s.toUpperCase()}</div>;
  const TF=({label,k,form,setF,type="text"})=><div>{lbl(label)}<Inp value={form[k]||""} onChange={e=>setF(k,e.target.value)} placeholder={label} type={type} style={{width:"100%",boxSizing:"border-box"}}/></div>;
  const SF=({label,k,form,setF,opts})=><div>{lbl(label)}<Sel value={form[k]||""} onChange={e=>setF(k,e.target.value)} style={{width:"100%"}}>{opts.map(o=><option key={o}>{o}</option>)}</Sel></div>;
  const TR=({label,k,form,setF})=><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surfaceHigh,borderRadius:8,gridColumn:"1/-1"}}><span style={{color:C.textPrimary,fontSize:13}}>{label}</span><Toggle on={!!form[k]} onChange={v=>setF(k,v)}/></div>;
  const SH=l=><div style={{gridColumn:"1/-1",color:C.orange,fontSize:9,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",marginTop:12,paddingBottom:6,borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8}}><div style={{height:1,width:12,background:C.orange}}/>{l}</div>;
  const addBtn=pTab==="fulltime"&&!editFT?<OrangeBtn onClick={()=>{setFtForm(defFT);setEditFT("new");}}>＋ Add Policy</OrangeBtn>:pTab==="contractual"&&!editCT?<OrangeBtn onClick={()=>{setCtForm(defCT);setEditCT("new");}}>＋ Add Contract Policy</OrangeBtn>:null;
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Leave Policy</span>{addBtn}</div>
    <div style={{display:"flex",gap:0,borderBottom:`1.5px solid ${C.border}`,marginBottom:24}}>
      {[["fulltime","Full-Time Employees"],["contractual","Contractual Employees"]].map(([k,v])=>(
        <button key={k} onClick={()=>{setPTab(k);setEditFT(null);setEditCT(null);}} style={{padding:"10px 18px",border:"none",background:"none",cursor:"pointer",color:pTab===k?C.navy:C.textSecondary,fontWeight:pTab===k?700:500,fontSize:13,borderBottom:pTab===k?`2px solid ${C.orange}`:"2px solid transparent",marginBottom:-1}}>{v}</button>
      ))}
    </div>
    {pTab==="fulltime"&&(!editFT?(
      <div style={{display:"flex",flexDirection:"column",gap:14}}>{ftPolicies.map(p=>(
        <Card key={p.id} style={{padding:24,borderLeft:`4px solid ${C.navy}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div><div style={{color:C.navy,fontWeight:700,fontSize:15,marginBottom:4,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{p.name}</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{pill(C.navy,C.navySoft,p.country)}{pill(C.green,C.greenSoft,"Full-Time")}{pill(C.teal,C.tealSoft,`Eff. ${p.effectiveDate}`)}</div></div>
            <Btn variant="outline" style={{fontSize:12,padding:"6px 14px"}} onClick={()=>{setFtForm({...p});setEditFT(p);}}>Edit</Btn>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
            {[["Annual Leave",`${p.annualDays} days`],["Sick Leave",`${p.sickDays} days`],["Casual Leave",`${p.casualDays} days`],["Accrual",p.accrual],["Min Unit",p.minUnit],["Max/Request",`${p.maxPerRequest} days`],["Notice",`${p.noticeDays} days`],["Carry Fwd",p.carryForward?`Yes, max ${p.maxCarryDays}d`:"No"],["Approval",p.approvalRequired?"Required":"Not Req."],["Approver",p.approverRole]].map(([l,v])=>(<div key={l}><div style={{color:C.textMuted,fontSize:9,fontWeight:700,letterSpacing:.8,marginBottom:3,textTransform:"uppercase"}}>{l}</div><div style={{color:C.navy,fontSize:12,fontWeight:600}}>{v}</div></div>))}
          </div>
          <div style={{display:"flex",gap:16,marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`,flexWrap:"wrap"}}>{[[p.inTimesheet,"Auto-appears in timesheet"],[p.reducesHours,"Reduces working hours"],[p.unpaidDeducts,"Unpaid leave deducts salary"]].map(([v,l])=>(<div key={l} style={{display:"flex",alignItems:"center",gap:6}}><span style={{color:v?C.green:C.textLight,fontSize:13,fontWeight:700}}>{v?"✓":"✗"}</span><span style={{color:C.textSecondary,fontSize:12}}>{l}</span></div>))}</div>
        </Card>
      ))}</div>
    ):(
      <Card style={{maxWidth:740,padding:32}}>
        <div style={{color:C.navy,fontWeight:700,fontSize:16,marginBottom:24,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{editFT==="new"?"New Full-Time Leave Policy":"Edit: "+ftForm.name}</div>
        <div style={gs}>
          {SH("Policy Basics")}<TF label="Policy Name" k="name" form={ftForm} setF={setFt}/><TF label="Country / Work Location" k="country" form={ftForm} setF={setFt}/><TF label="Effective Start Date" k="effectiveDate" form={ftForm} setF={setFt} type="date"/><div/>
          {SH("Leave Days")}<TF label="Annual Leave Days / Year" k="annualDays" form={ftForm} setF={setFt} type="number"/><TF label="Sick Leave Days / Year" k="sickDays" form={ftForm} setF={setFt} type="number"/><TF label="Casual Leave Days / Year" k="casualDays" form={ftForm} setF={setFt} type="number"/><div/>
          {SH("Rules")}<SF label="Accrual Method" k="accrual" form={ftForm} setF={setFt} opts={["yearly allocation","monthly accrual"]}/><SF label="Min Leave Unit" k="minUnit" form={ftForm} setF={setFt} opts={["half day","full day"]}/><TF label="Max Per Request" k="maxPerRequest" form={ftForm} setF={setFt} type="number"/><TF label="Notice Period (days)" k="noticeDays" form={ftForm} setF={setFt} type="number"/>
          <TR label="Leave Carry Forward Allowed" k="carryForward" form={ftForm} setF={setFt}/>
          {ftForm.carryForward&&<TF label="Max Carry Forward Days" k="maxCarryDays" form={ftForm} setF={setFt} type="number"/>}
          {SH("Approval")}<TR label="Leave Approval Required" k="approvalRequired" form={ftForm} setF={setFt}/>
          {ftForm.approvalRequired&&<SF label="Approver Role" k="approverRole" form={ftForm} setF={setFt} opts={["reporting manager","hr / tenant admin"]}/>}
          {SH("Timesheet & Payroll")}<TR label="Auto-appears in Timesheet" k="inTimesheet" form={ftForm} setF={setFt}/><TR label="Reduces Required Working Hours" k="reducesHours" form={ftForm} setF={setFt}/><TR label="Unpaid Leave Deducts Salary" k="unpaidDeducts" form={ftForm} setF={setFt}/>
          {ftForm.unpaidDeducts&&<SF label="Deduction Method" k="deductMethod" form={ftForm} setF={setFt} opts={["daily deduction","hourly deduction"]}/>}
        </div>
        <div style={{display:"flex",gap:12,marginTop:28}}><OrangeBtn onClick={()=>{if(editFT==="new")setFtPolicies(p=>[...p,{...ftForm,id:Date.now()}]);else setFtPolicies(p=>p.map(x=>x.id===editFT.id?{...ftForm}:x));setEditFT(null);}}>Save Policy ✓</OrangeBtn><Btn variant="ghost" onClick={()=>setEditFT(null)}>Cancel</Btn></div>
      </Card>
    ))}
    {pTab==="contractual"&&(!editCT?(
      <div style={{display:"flex",flexDirection:"column",gap:14}}>{ctPolicies.map(p=>(
        <Card key={p.id} style={{padding:24,borderLeft:`4px solid ${C.orange}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div><div style={{color:C.navy,fontWeight:700,fontSize:15,marginBottom:4,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{p.name}</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{pill(C.orange,C.orangeSoft,"Contractual")}{pill(C.purple,C.purpleSoft,p.employee)}{pill(C.teal,C.tealSoft,`${p.contractStart} → ${p.contractEnd}`)}</div></div>
            <Btn variant="outline" style={{fontSize:12,padding:"6px 14px"}} onClick={()=>{setCtForm({...p});setEditCT(p);}}>Edit</Btn>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14}}>
            {[["Total Days",`${p.totalDays} days`],["Accrual",p.accrual],["Max at Once",`${p.maxAtOnce} days`],["Min Unit",p.minUnit],["Leave Types",p.leaveTypes.join(", ")],["Approval",p.approvalRequired?"Required":"Not Req."]].map(([l,v])=>(<div key={l}><div style={{color:C.textMuted,fontSize:9,fontWeight:700,letterSpacing:.8,marginBottom:3,textTransform:"uppercase"}}>{l}</div><div style={{color:C.navy,fontSize:12,fontWeight:600}}>{v}</div></div>))}
          </div>
        </Card>
      ))}</div>
    ):(
      <Card style={{maxWidth:740,padding:32}}>
        <div style={{color:C.navy,fontWeight:700,fontSize:16,marginBottom:24,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{editCT==="new"?"New Contract Leave Policy":"Edit: "+ctForm.name}</div>
        <div style={gs}>
          {SH("Employee & Contract")}
          <div style={{gridColumn:"1/-1"}}>{lbl("Employee Selection")}<Sel value={ctForm.employee} onChange={e=>setCt("employee",e.target.value)} style={{width:"100%"}}><option value="">Select contract employee…</option>{EMPS.map(e=><option key={e.name}>{e.name}</option>)}</Sel></div>
          <TF label="Contract Start Date" k="contractStart" form={ctForm} setF={setCt} type="date"/><TF label="Contract End Date" k="contractEnd" form={ctForm} setF={setCt} type="date"/>
          <TF label="Leave Policy Name" k="name" form={ctForm} setF={setCt}/><div/>
          {SH("Allowed Leave Types")}
          <div style={{gridColumn:"1/-1",display:"flex",gap:12,flexWrap:"wrap"}}>{["paid leave","sick leave","unpaid leave"].map(t=>(<div key={t} onClick={()=>toggleCTLeave(t)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:8,border:`1.5px solid ${ctForm.leaveTypes.includes(t)?C.navy:C.border}`,background:ctForm.leaveTypes.includes(t)?C.navy:"transparent",cursor:"pointer"}}><span style={{color:ctForm.leaveTypes.includes(t)?"#FFFFF1":C.textMuted,fontSize:13}}>{ctForm.leaveTypes.includes(t)?"✓ ":""}{t.charAt(0).toUpperCase()+t.slice(1)}</span></div>))}</div>
          {SH("Leave Rules")}<TF label="Total Days (Contract Period)" k="totalDays" form={ctForm} setF={setCt} type="number"/><SF label="Accrual Method" k="accrual" form={ctForm} setF={setCt} opts={["monthly accrual","fixed allocation for contract"]}/><TF label="Max Days at One Time" k="maxAtOnce" form={ctForm} setF={setCt} type="number"/><SF label="Min Leave Unit" k="minUnit" form={ctForm} setF={setCt} opts={["hourly","half day","full day"]}/>
          {SH("Billing Impact")}<TR label="Leave Reduces Billable Hours" k="reducesBillable" form={ctForm} setF={setCt}/><TR label="Leave Reduces Invoice Hours" k="reducesInvoice" form={ctForm} setF={setCt}/><TR label="Unpaid Leave Deducts Payment" k="unpaidDeducts" form={ctForm} setF={setCt}/>
          {ctForm.unpaidDeducts&&<SF label="Deduction Method" k="deductMethod" form={ctForm} setF={setCt} opts={["hourly deduction","daily deduction"]}/>}
          {SH("Approval & Timesheet")}<TR label="Leave Approval Required" k="approvalRequired" form={ctForm} setF={setCt}/>
          {ctForm.approvalRequired&&<TF label="Reporting Manager" k="approver" form={ctForm} setF={setCt}/>}
          <TR label="Auto-appear in Timesheets" k="inTimesheet" form={ctForm} setF={setCt}/>
        </div>
        <div style={{display:"flex",gap:12,marginTop:28}}><OrangeBtn onClick={()=>{if(editCT==="new")setCtPolicies(p=>[...p,{...ctForm,id:Date.now()}]);else setCtPolicies(p=>p.map(x=>x.id===editCT.id?{...ctForm}:x));setEditCT(null);}}>Save Policy ✓</OrangeBtn><Btn variant="ghost" onClick={()=>setEditCT(null)}>Cancel</Btn></div>
      </Card>
    ))}
  </div>);
}

// ═══ TENANT DETAIL ════════════════════════════════════════
function TenantDetailScreen({tenant,tenantTab,setNav}){
  const[selEmp,setSelEmp]=useState(null);const[projModal,setProjModal]=useState(null);const[projects,setProjects]=useState(INIT_PROJECTS);const[selProject,setSelProject]=useState(null);
  const[auditExp,setAuditExp]=useState({});const[auditFilter,setAuditFilter]=useState("all");const[selNotif,setSelNotif]=useState(null);const[permNotif,setPermNotif]=useState(null);
  const[perms,setPerms]=useState([{r:"Tenant Admin",ta:true,pv:true,re:true,pe:true},{r:"Reporting Manager",ta:true,pv:false,re:false,pe:false},{r:"Payroll Approver",ta:false,pv:true,re:true,pe:false},{r:"Employee",ta:false,pv:false,re:false,pe:false}]);
  const[sc,sb]=tenant.status==="Active"?[C.green,C.greenSoft]:tenant.status==="Pending Activation"?[C.amber,C.amberSoft]:[C.red,C.redSoft];
  const catColor=c=>({Tenant:C.navy,Employee:C.green,Project:C.purple,Timesheet:C.amber,Payroll:C.orange}[c]||C.textMuted);
  const catIcon=c=>({Tenant:"🏢",Employee:"👤",Project:"📋",Timesheet:"🕐",Payroll:"💰"}[c]||"📌");
  const notifIcon=t=>({payroll:"💰",timesheet:"🕐",employee:"👤",compliance:"📜",tenant:"🏢"}[t]||"🔔");
  const permKeys=["ta","pv","re","pe"];const permCols=["Timesheet Approval","Payroll View","Report Export","Policy Edit"];
  if(selEmp)return<EmployeeDetailScreen emp={selEmp} onBack={()=>setSelEmp(null)}/>;
  const auditGroups={};const filtAudit=auditFilter==="all"?AUDIT:AUDIT.filter(a=>a.cat===auditFilter);
  filtAudit.forEach(a=>{const k=a.emp||"_tenant";if(!auditGroups[k])auditGroups[k]=[];auditGroups[k].push(a);});
  const togglePerm=(ri,ki)=>{setPerms(perms.map((p,i)=>i===ri?{...p,[permKeys[ki]]:!p[permKeys[ki]]}:p));setPermNotif(`"${permCols[ki]}" for ${perms[ri].r} → ${!perms[ri][permKeys[ki]]?"Enabled":"Disabled"}. Notifications sent.`);setTimeout(()=>setPermNotif(null),3500);};
  const TABS=[["overview","Overview"],["employees","Employees"],["roles","Roles & Perms"],["projects","Projects"],["leave-policy","Leave Policy"],["audit","Audit"],["notifications","Notifications"]];
  const thStyle={padding:"10px 16px",color:C.textMuted,fontSize:10,fontWeight:800,letterSpacing:.8,textTransform:"uppercase"};
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden",background:C.bg}}>
      {projModal!==null&&<ProjectModal project={projModal==="new"?null:projModal} onClose={()=>setProjModal(null)} onSave={form=>{if(projModal==="new")setProjects(p=>[...p,{...form,id:Date.now(),team:[]}]);else setProjects(p=>p.map(pr=>pr.id===projModal.id?{...pr,...form}:pr));}}/>}
      <TopBar title={tenant.name} crumbs={["Dashboard","Tenants",tenant.name]}><Btn variant="ghost" onClick={()=>setNav({section:"tenants"})}>← Back</Btn><OrangeBtn>Edit Tenant</OrangeBtn></TopBar>
      <div style={{padding:"14px 32px 0",background:C.surface,borderBottom:`1.5px solid ${C.border}`,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
          <div style={{width:44,height:44,borderRadius:10,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:800,fontSize:18,flexShrink:0}}>{tenant.name[0]}</div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}><span style={{color:C.navy,fontWeight:700,fontSize:17,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{tenant.name}</span>{pill(sc,sb,tenant.status)}</div>
            <div style={{color:C.textMuted,fontSize:12}}>{tenant.industry} · {tenant.country} · {tenant.employees} employees</div>
          </div>
        </div>
        <div style={{display:"flex",gap:0,overflowX:"auto"}}>
          {TABS.map(([k,v])=><button key={k} onClick={()=>setNav({section:"tenants",tenantTab:k,selectedTenantId:tenant.id})} style={{padding:"11px 15px",border:"none",background:"none",cursor:"pointer",color:tenantTab===k?C.navy:C.textSecondary,fontWeight:tenantTab===k?700:500,fontSize:12,borderBottom:tenantTab===k?`2px solid ${C.orange}`:"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap"}}>{v}</button>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:32}}>

        {tenantTab==="overview"&&(<div style={{maxWidth:740}}>
          <SecTitle t="Basic Company Details"/>
          <InfoRow label="Company Legal Name" value={`${tenant.name} Holdings Inc.`}/><InfoRow label="Industry" value={tenant.industry}/><InfoRow label="Country" value={tenant.country}/><InfoRow label="Timezone" value="UTC−5 (EST)"/><InfoRow label="Currency" value="USD"/>
          <SecTitle t="Primary Contact"/>
          <InfoRow label="Full Name" value="Jonathan Mercer"/><InfoRow label="Work Email" value={`j.mercer@${tenant.name.toLowerCase().replace(/\s/g,"")}.com`}/><InfoRow label="Role" value="Chief Operating Officer"/>
          <SecTitle t="Legal Entity"/>
          <InfoRow label="Entity Type" value="Private Limited Company"/><InfoRow label="Registration No." value="REG-2019-04821"/><InfoRow label="Tax ID" value="TIN-874-001-432"/><InfoRow label="Authorized Signatory" value="Margaret Holloway"/>
          <SecTitle t="Compliance Acknowledgements"/>
          {["Data Processing Agreement","Payroll Liability Acknowledgement","Labor Compliance Responsibility","Audit Acceptance"].map(a=>(<div key={a} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}><span style={{color:C.green,fontSize:16}}>✓</span><span style={{color:C.textPrimary,fontSize:13,flex:1}}>{a}</span>{pill(C.green,C.greenSoft,"Accepted")}</div>))}
          <SecTitle t="Workforce Intent"/>
          <InfoRow label="Countries for Hiring" value="US, UK, Germany, India"/><InfoRow label="Employment Types" value="Full-time, Contract"/><InfoRow label="Payroll Frequency" value="Bi-weekly"/>
        </div>)}

        {tenantTab==="employees"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Employees ({EMPS.length})</span><OrangeBtn>＋ Add Employee</OrangeBtn></div>
          <Card>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 110px 160px",background:C.surfaceHigh,borderRadius:"12px 12px 0 0",borderBottom:`1.5px solid ${C.border}`}}>{["Employee Name","Assigned Country","Status","Actions"].map(h=><div key={h} style={thStyle}>{h}</div>)}</div>
            {EMPS.map((emp,i)=>{const[ec,eb]=emp.status==="Active"?[C.green,C.greenSoft]:[C.amber,C.amberSoft];return(
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1.5fr 110px 160px",borderBottom:i<EMPS.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:28,height:28,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontSize:10,fontWeight:700}}>{emp.name.split(" ").map(n=>n[0]).join("")}</div><span style={{color:C.navy,fontSize:13,fontWeight:600}}>{emp.name}</span></div>
                <div style={{padding:"14px 16px",color:C.textSecondary,fontSize:12,display:"flex",alignItems:"center"}}>{emp.country}</div>
                <div style={{padding:"14px 16px",display:"flex",alignItems:"center"}}>{pill(ec,eb,emp.status)}</div>
                <div style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>setSelEmp(emp)} style={{background:"none",border:"none",color:C.navy,fontSize:12,cursor:"pointer",fontWeight:700}}>View</button>
                  <span style={{color:C.border}}>|</span>
                  <button style={{background:"none",border:"none",color:C.orange,fontSize:12,cursor:"pointer",fontWeight:600}}>Edit</button>
                </div>
              </div>
            );})}
          </Card>
        </>)}

        {tenantTab==="roles"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Roles & Permissions</span><span style={{color:C.textMuted,fontSize:12}}>Click any cell to toggle</span></div>
          {permNotif&&<div style={{background:C.greenSoft,border:`1.5px solid ${C.green}`,borderRadius:8,padding:"12px 16px",marginBottom:20,color:C.green,fontSize:13}}>✓ {permNotif}</div>}
          <Card><table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:C.surfaceHigh}}><th style={{...thStyle,textAlign:"left",minWidth:160}}>Role</th>{permCols.map(h=><th key={h} style={{...thStyle,textAlign:"center"}}>{h}</th>)}</tr></thead>
            <tbody>{perms.map((row,ri)=>(<tr key={ri} style={{borderTop:`1px solid ${C.border}`}}>
              <td style={{padding:"14px 16px",color:C.navy,fontWeight:600,fontSize:13}}>{row.r}</td>
              {permKeys.map((k,ki)=>(<td key={ki} style={{padding:"10px 16px",textAlign:"center"}}><button onClick={()=>togglePerm(ri,ki)} style={{background:row[k]?C.greenSoft:C.redSoft,border:`1.5px solid ${row[k]?C.green:C.red}`,borderRadius:6,padding:"4px 14px",cursor:"pointer",color:row[k]?C.green:C.red,fontSize:12,fontWeight:700,transition:"all .2s"}}>{row[k]?"✓ Yes":"✗ No"}</button></td>))}
            </tr>))}</tbody>
          </table></Card>
        </>)}

        {tenantTab==="projects"&&(selProject===null?(
          <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}><span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Projects ({projects.length})</span><OrangeBtn onClick={()=>setProjModal("new")}>＋ Create Project</OrangeBtn></div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>{projects.map(p=>{const[pc,pb]=p.status==="active"?[C.green,C.greenSoft]:p.status==="draft"?[C.amber,C.amberSoft]:[C.textMuted,C.surfaceHigh];return(
            <Card key={p.id} style={{padding:20,cursor:"pointer",transition:"all .2s",borderLeft:`4px solid ${pc}`}} onClick={()=>setSelProject(p)} onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 16px rgba(26,43,74,0.1)";}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(26,43,74,0.06)";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                <div><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{p.name}</span>{pill(pc,pb,p.status.charAt(0).toUpperCase()+p.status.slice(1))}</div><div style={{color:C.textMuted,fontSize:12,marginBottom:6}}>{p.client}</div><div style={{color:C.textSecondary,fontSize:12}}>{p.description}</div></div>
                <div onClick={e=>e.stopPropagation()}><Btn variant="outline" style={{fontSize:12,padding:"6px 14px"}} onClick={()=>setProjModal(p)}>Edit</Btn></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:12,marginTop:16}}>{[["Owner",p.owner],["Team",`${p.team.length} members`],["Start",p.start],["End",p.end]].map(([l,v])=>(<div key={l}><div style={{color:C.textMuted,fontSize:9,fontWeight:700,letterSpacing:.8,textTransform:"uppercase",marginBottom:3}}>{l}</div><div style={{color:C.navy,fontSize:12,fontWeight:600}}>{v}</div></div>))}</div>
              <div style={{marginTop:12,color:C.orange,fontSize:12,fontWeight:700}}>View details →</div>
            </Card>);})}</div></>
        ):(
          <><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}><button onClick={()=>setSelProject(null)} style={{background:"none",border:"none",color:C.orange,cursor:"pointer",fontWeight:700,fontSize:13}}>← All Projects</button><span style={{color:C.navy,fontWeight:700,fontSize:18,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{selProject.name}</span>{pill(C.green,C.greenSoft,selProject.status)}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <Card style={{padding:24}}><SecTitle t="Project Details"/><InfoRow label="Client" value={selProject.client}/><InfoRow label="Owner" value={selProject.owner}/><InfoRow label="Start Date" value={selProject.start}/><InfoRow label="End Date" value={selProject.end}/><InfoRow label="Approval Type" value={selProject.approvalType}/><InfoRow label="Approver" value={selProject.approver}/>{selProject.description&&<div style={{marginTop:16,padding:14,background:C.surfaceHigh,borderRadius:8,color:C.textSecondary,fontSize:13,lineHeight:1.6,fontStyle:"italic"}}>{selProject.description}</div>}</Card>
            <Card style={{padding:24}}><SecTitle t="Team Members"/><div style={{display:"flex",flexDirection:"column",gap:8,marginTop:4}}>{(selProject.team||[]).map(empName=>{const emp=EMPS.find(e=>e.name===empName)||{name:empName,country:"—",status:"Active"};const[ec,eb]=emp.status==="Active"?[C.green,C.greenSoft]:[C.amber,C.amberSoft];return(<div key={empName} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:C.surfaceHigh,borderRadius:8,cursor:"pointer",transition:"background .1s"}} onClick={()=>setSelEmp(emp)} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceMid} onMouseLeave={e=>e.currentTarget.style.background=C.surfaceHigh}><div style={{width:30,height:30,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFF1",fontWeight:700,fontSize:11,flexShrink:0}}>{empName.split(" ").map(n=>n[0]).join("")}</div><div style={{flex:1}}><div style={{color:C.navy,fontSize:13,fontWeight:600}}>{empName}</div><div style={{color:C.textMuted,fontSize:11,marginTop:1}}>{emp.country}</div></div>{pill(ec,eb,emp.status)}<span style={{color:C.orange,fontSize:11,fontWeight:700}}>→</span></div>);})}</div></Card>
          </div></>
        ))}

        {tenantTab==="leave-policy"&&<LeavePolicyScreen/>}

        {tenantTab==="audit"&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <span style={{color:C.navy,fontWeight:700,fontSize:15,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Audit Trail</span>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["all","Tenant","Employee","Project","Timesheet","Payroll"].map(f=><button key={f} onClick={()=>setAuditFilter(f)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${auditFilter===f?C.navy:C.border}`,background:auditFilter===f?C.navy:"transparent",color:auditFilter===f?"#FFFFF1":C.textMuted,fontSize:11,cursor:"pointer",fontWeight:auditFilter===f?700:400}}>{f==="all"?"All Events":f}</button>)}</div>
          </div>
          {Object.entries(auditGroups).map(([empKey,logs])=>{const isTenant=empKey==="_tenant";return(
            <div key={empKey} style={{marginBottom:32}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div style={{width:32,height:32,borderRadius:"50%",background:isTenant?C.navy:C.greenSoft,border:`1.5px solid ${isTenant?C.navy:C.green}`,display:"flex",alignItems:"center",justifyContent:"center",color:isTenant?"#FFFFF1":C.green,fontWeight:700,fontSize:13}}>{isTenant?"🏢":empKey.split(" ").map(n=>n[0]).join("")}</div><span style={{color:C.navy,fontWeight:700,fontSize:14}}>{isTenant?"Tenant-level Events":empKey}</span><span style={{color:C.textMuted,fontSize:11}}>({logs.length} events)</span></div>
              <div style={{position:"relative",paddingLeft:24}}><div style={{position:"absolute",left:10,top:0,bottom:0,width:1,background:C.border}}/>
                {logs.map((log,i)=>(<div key={i} style={{position:"relative",marginBottom:10}}>
                  <div style={{position:"absolute",left:-20,top:16,width:10,height:10,borderRadius:"50%",background:catColor(log.cat),border:`2px solid ${C.bg}`}}/>
                  <Card style={{padding:"14px 18px",cursor:"pointer"}} onClick={()=>setAuditExp(e=>({...e,[`${empKey}-${i}`]:!e[`${empKey}-${i}`]}))}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14}}>{catIcon(log.cat)}</span><span style={{color:C.navy,fontWeight:600,fontSize:13}}>{log.action}</span>{pill(catColor(log.cat),"transparent",log.cat)}</div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{color:C.textMuted,fontSize:11}}>{log.date}</span><span style={{color:C.textMuted,fontSize:10}}>{auditExp[`${empKey}-${i}`]?"▲":"▼"}</span></div>
                    </div>
                    {auditExp[`${empKey}-${i}`]&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}><div style={{color:C.textSecondary,fontSize:12,lineHeight:1.7,marginBottom:8}}>{log.detail}</div><div style={{color:C.textMuted,fontSize:11}}>By: <span style={{color:C.textSecondary}}>{log.actor}</span></div></div>}
                  </Card>
                </div>))}
              </div>
            </div>
          );})}
        </>)}

        {tenantTab==="notifications"&&(
          <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
            <div style={{flex:"0 0 330px"}}><div style={{color:C.navy,fontWeight:700,fontSize:15,marginBottom:16,fontFamily:"'Libre Baskerville',Georgia,serif"}}>Notifications</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>{NOTIFS.map(n=>(<Card key={n.id} style={{padding:"14px 16px",cursor:"pointer",borderColor:selNotif?.id===n.id?C.navy:C.border,transition:"border-color .2s",borderLeft:!n.read?`3px solid ${C.orange}`:"1.5px solid "+C.border}} onClick={()=>setSelNotif(n)}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}><div style={{width:32,height:32,borderRadius:8,background:C.surfaceHigh,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{notifIcon(n.type)}</div>
                  <div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}><span style={{color:n.read?C.textSecondary:C.navy,fontWeight:n.read?500:700,fontSize:12,lineHeight:1.4}}>{n.title}</span>{!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:C.orange,flexShrink:0,marginTop:2}}/>}</div><div style={{color:C.textMuted,fontSize:10,marginTop:4}}>{n.time}</div></div>
                </div>
              </Card>))}</div>
            </div>
            {selNotif?(<Card style={{flex:1,padding:28}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:20}}><div style={{width:40,height:40,borderRadius:10,background:C.navySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{notifIcon(selNotif.type)}</div><div><div style={{color:C.navy,fontWeight:700,fontSize:15,marginBottom:4,fontFamily:"'Libre Baskerville',Georgia,serif"}}>{selNotif.title}</div><div style={{color:C.textMuted,fontSize:11}}>{selNotif.time}</div></div></div>
              <div style={{color:C.textSecondary,fontSize:13,lineHeight:1.8,borderTop:`1px solid ${C.border}`,paddingTop:20}}>{selNotif.body}</div>
            </Card>):(<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",minHeight:200}}><span style={{color:C.textMuted,fontSize:13}}>Select a notification to read</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ ROOT ════════════════════════════════════════════════
export default function App(){
  const[nav,setNav]=useState({section:"dashboard"});
  const[cScreen,setCScreen]=useState("list");
  const handleSetNav=(n)=>{if(n.section==="countries"&&n.cScreen)setCScreen(n.cScreen);else if(n.section!=="countries")setCScreen("list");setNav(n);};
  const{section,subSection,tenantTab,selectedTenantId}=nav;
  const selectedTenant=TENANTS_LIST.find(t=>t.id===selectedTenantId)||TENANTS_LIST[0];
  const renderMain=()=>{
    if(section==="dashboard")return<DashboardHome setNav={handleSetNav}/>;
    if(section==="countries"){
      if(cScreen==="list")return<CountriesScreen setNav={n=>{setCScreen(n.cScreen||"list");handleSetNav(n);}}/>;
      if(cScreen==="add")return<AddCountryScreen setNav={()=>{setCScreen("list");handleSetNav({section:"countries",cScreen:"list"});}}/>;
      if(typeof cScreen==="object")return<CountryRulesScreen params={cScreen} setNav={()=>{setCScreen("list");handleSetNav({section:"countries",cScreen:"list"});}}/>;
    }
    if(section==="admin-settings")return<AdminSettingsScreen subSection={subSection||"managers"} setNav={handleSetNav}/>;
    if(section==="tenants"){
      if(tenantTab&&selectedTenantId)return<TenantDetailScreen tenant={selectedTenant} tenantTab={tenantTab} setNav={handleSetNav}/>;
      if(tenantTab)return<TenantDetailScreen tenant={TENANTS_LIST[0]} tenantTab={tenantTab} setNav={handleSetNav}/>;
      return<TenantsListScreen setNav={handleSetNav}/>;
    }
    return null;
  };
  const handleSidebarNav=(n)=>{if(n.section==="tenants"&&n.tenantTab&&!selectedTenantId)handleSetNav({...n,selectedTenantId:TENANTS_LIST[0].id});else handleSetNav(n);};
  return(
    <div style={{display:"flex",height:"100vh",background:C.bg,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",color:C.textPrimary,overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap');`}</style>
      <Sidebar nav={{section,subSection,tenantTab}} setNav={handleSidebarNav}/>
      <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>{renderMain()}</main>
    </div>
  );
}
