import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Link, Router as WouterRouter } from 'wouter';
import {
  LayoutDashboard, UsersRound, BookOpen, LibraryBig, MessagesSquare, Bell,
  Search, ArrowLeft, CirclePlay, Headphones,
  Image as ImageIcon, Clock3, Check, LockKeyhole, Sparkles, ChevronLeft,
  ChartNoAxesColumnIncreasing, CircleHelp, Plus, Send, MessageCircle,
  CircleCheck, Play, Menu, BookMarked,
} from 'lucide-react';

const queryClient = new QueryClient();

const adminNav = [
  { href: '/admin', label: 'نظرة عامة', icon: LayoutDashboard },
  { href: '/admin/students', label: 'الطلاب', icon: UsersRound },
  { href: '/admin/courses', label: 'هيكل الدورة', icon: BookOpen },
  { href: '/admin/content', label: 'مكتبة المحتوى', icon: LibraryBig },
  { href: '/admin/community', label: 'مساحة المجموعة', icon: MessagesSquare },
];
const learnerNav = [
  { href: '/learn', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/learn/course', label: 'دورتي', icon: BookOpen },
  { href: '/learn/community', label: 'المجتمع', icon: MessagesSquare },
];

function Logo() {
  return <div className="brand"><span className="brand-mark">L.</span><span>لُغتي <span style={{color:'#21816a'}}>بثقة</span></span></div>;
}
function NavItems({ items, current }: { items: typeof adminNav; current: string }) {
  return <nav className="nav-list">{items.map(({href,label,icon:Icon})=><Link key={href} href={href} data-testid={`link-${href.replaceAll('/','-').slice(1)}`} className={`nav-link ${current===href?'active':''}`}><Icon/><span>{label}</span></Link>)}</nav>;
}
function SideNav({ current, learner=false }: { current:string; learner?:boolean }) {
  const items = learner ? learnerNav : adminNav;
  return <aside className="sidebar"><Logo/><NavItems items={items} current={current}/><div className="side-bottom"><div style={{display:'flex',alignItems:'center',gap:8,fontWeight:700,color:'#52645c'}}><CircleHelp size={17}/> تحتاج إلى مساعدة؟</div><div>هذه مساحة تجريبية لعرض تجربة الدورة.</div></div></aside>;
}
function Topbar({ title }: {title:string}) {
  return <header className="topbar"><div><div className="eyebrow">مساحة الإدارة · نسخة استعراضية</div><div style={{fontWeight:700,fontSize:15,marginTop:3}}>{title}</div></div><div className="top-actions"><button className="icon-button" aria-label="بحث" data-testid="button-search"><Search size={18}/></button><button className="icon-button" aria-label="الإشعارات" data-testid="button-notifications"><Bell size={18}/></button><div className="avatar" data-testid="text-admin-avatar">م</div></div></header>;
}
function Shell({ children, title, learner=false }: {children:ReactNode;title:string;learner?:boolean}) {
  const [location] = useLocation();
  const nav = learner ? learnerNav : adminNav;
  return <div className="app-shell admin-layout"><SideNav current={location} learner={learner}/><div className="main-area"><Topbar title={title}/><main className="content-wrap animate-in">{children}</main></div><nav className="mobile-nav">{nav.map(({href,label,icon:Icon})=><Link key={href} href={href} className={`nav-link ${location===href?'active':''}`} data-testid={`mobile-link-${href.replaceAll('/','-').slice(1)}`}><Icon/><span>{label}</span></Link>)}</nav></div>;
}
function Heading({ eyebrow, title, subtitle, children }: {eyebrow?:string;title:string;subtitle?:string;children?:ReactNode}) {
 return <div className="section-head" style={{marginTop:0,alignItems:'flex-end'}}><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1 className="page-title">{title}</h1>{subtitle&&<p className="subtitle">{subtitle}</p>}</div>{children}</div>;
}
function Stat({label,value,note,icon:Icon,color='#e9f3ec'}:{label:string;value:string;note:string;icon:typeof UsersRound;color?:string}) {
 return <article className="panel stat-card" data-testid={`stat-${label}`}><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div><div className="stat-icon" style={{background:color,color:'#207d68'}}><Icon size={17}/></div></article>;
}
function PreviewTag() { return <span className="badge amber">بيانات توضيحية</span>; }
function AdminOverview() {
 return <Shell title="نظرة عامة"><Heading eyebrow="الثلاثاء، ١٤ مايو ٢٠٢4" title="صباح الخير، مريم" subtitle="نظرة سريعة على رحلة التعلّم في «لُغتي بثقة»."><PreviewTag/></Heading>
  <div className="stat-grid"><Stat label="الطلاب النشطون" value="١٢٨" note="ضمن الدورة الحالية" icon={UsersRound}/><Stat label="معدل الإنجاز" value="٦٨٪" note="متوسط تقدّم الطلاب" icon={ChartNoAxesColumnIncreasing} color="#fff1d9"/><Stat label="الدروس المنشورة" value="٢٤" note="عبر ٤ مستويات" icon={BookOpen} color="#fdeae4"/><Stat label="رسائل المجموعة" value="٣٦" note="مشاركة توضيحية" icon={MessagesSquare} color="#e8eef9"/></div>
  <div className="section-head"><h2 className="section-title">متابعة الطلاب</h2><Link className="button-soft" href="/admin/students" data-testid="link-all-students">عرض كل الطلاب <ArrowLeft size={15}/></Link></div>
  <section className="panel table-wrap"><table className="data-table"><thead><tr><th>الطالب</th><th>الحالة</th><th>التقدّم</th><th>آخر نشاط</th><th>رمز الدخول</th></tr></thead><tbody>{students.slice(0,4).map((s,i)=><StudentRow key={s.name} student={s} index={i}/>)}</tbody></table></section>
  <div className="section-head"><h2 className="section-title">محتوى الدورة</h2><Link className="button-soft" href="/admin/courses" data-testid="link-course-structure">استعراض الهيكل <ArrowLeft size={15}/></Link></div>
  <section className="course-hero"><div className="hero-copy"><div className="eyebrow" style={{color:'#c8e5d8'}}>الدورة الرئيسية · ٤ مستويات</div><h2 style={{fontSize:25,margin:'8px 0'}}>English, one step at a time</h2><p style={{margin:'0',color:'#d8eee5'}}>رحلة عملية للحديث بثقة، من أول كلمة إلى محادثة كاملة.</p></div><div style={{textAlign:'center',position:'relative',zIndex:1}}><div style={{font:'700 38px DM Sans'}}>24</div><div style={{fontSize:12,color:'#d8eee5'}}>درسًا توضيحيًا</div></div></section>
 </Shell>;
}
const students=[
 {name:'سارة العتيبي',email:'sara.o@example.com',progress:82,status:'نشط',code:'مفعّل',color:'#f7e4c3'},
 {name:'نواف الحربي',email:'n.alharbi@example.com',progress:64,status:'نشط',code:'مفعّل',color:'#dcebe0'},
 {name:'ريم القحطاني',email:'reem.q@example.com',progress:38,status:'بانتظار البدء',code:'مستخدم',color:'#f4deda'},
 {name:'فيصل المطيري',email:'faisal.m@example.com',progress:91,status:'نشط',code:'مفعّل',color:'#e7e2f2'},
 {name:'ليان الغامدي',email:'layan.g@example.com',progress:17,status:'نشط',code:'مفعّل',color:'#dceaf1'},
];
function StudentRow({student:s,index}:{student:typeof students[number];index:number}) {
 return <tr data-testid={`row-student-${index}`}><td><div className="person"><span className="person-avatar" style={{background:s.color}}>{s.name.slice(0,1)}</span><span><span style={{display:'block',color:'#34413f'}}>{s.name}</span><small className="ltr" style={{display:'block',fontSize:11,color:'#909894'}}>{s.email}</small></span></div></td><td><span className={`badge ${s.status==='نشط'?'':'amber'}`}>{s.status}</span></td><td style={{minWidth:125}}><div style={{display:'flex',alignItems:'center',gap:8}}><div className="progress-track" style={{height:6,flex:1}}><div className="progress-fill" style={{width:`${s.progress}%`,background:'#25836d'}}/></div><span className="ltr" style={{fontSize:11}}>{s.progress}%</span></div></td><td>منذ يومين</td><td><span className="badge">{s.code}</span></td></tr>;
}
function StudentsPage() {
 return <Shell title="الطلاب"><Heading eyebrow="إدارة التعلّم" title="طلاب الدورة" subtitle="قائمة توضيحية للمتعلمين وحالة تقدّمهم ورموز الوصول."><button className="button-primary" data-testid="button-add-student" disabled style={{opacity:.64,cursor:'not-allowed'}}><Plus size={16}/> إضافة طالب · معاينة</button></Heading>
 <section className="stat-grid"><Stat label="إجمالي الطلاب" value="١٢٨" note="بيانات توضيحية" icon={UsersRound}/><Stat label="رموز مفعّلة" value="١١٤" note="من أصل ١٢٨" icon={LockKeyhole} color="#fff1d9"/><Stat label="متوسط التقدّم" value="٦٨٪" note="على مستوى الدورة" icon={ChartNoAxesColumnIncreasing} color="#fdeae4"/><Stat label="قيد البدء" value="١٤" note="لم يبدأوا بعد" icon={Clock3} color="#e8eef9"/></section>
 <div className="panel table-wrap"><table className="data-table"><thead><tr><th>الطالب</th><th>حالة التعلّم</th><th>التقدّم</th><th>آخر نشاط</th><th>رمز الوصول</th></tr></thead><tbody>{students.map((s,i)=><StudentRow key={s.name} student={s} index={i}/>)}</tbody></table></div>
 <p className="preview-note">المعلومات المعروضة أمثلة توضيحية وليست سجلات حقيقية.</p></Shell>;
}
const courseLevels=[
 {title:'المستوى الأول',en:'Getting started',color:'#e7f3eb',section:'الأساسيات اليومية',lessons:[['Introductions & greetings','فيديو','08:24'],['Everyday expressions','صوت','05:10'],['Your first conversation','تمرين','12:00']]},
 {title:'المستوى الثاني',en:'Finding your voice',color:'#fff0d8',section:'في المدينة',lessons:[['Asking for directions','فيديو','09:15'],['At the café','صوت','06:32']]},
 {title:'المستوى الثالث',en:'Beyond the basics',color:'#fce9e3',section:'العمل والدراسة',lessons:[['A confident introduction','فيديو','11:08'],['Sharing your ideas','صورة','04:40']]},
];
function CoursesPage() {
 return <Shell title="هيكل الدورة"><Heading eyebrow="المحتوى التعليمي" title="رحلة التعلّم" subtitle="مستويات، أقسام ودروس من الدورة الرئيسية."><button className="button-primary" data-testid="button-add-level" disabled style={{opacity:.64,cursor:'not-allowed'}}><Plus size={16}/> إضافة مستوى · معاينة</button></Heading>
 <section className="course-hero" style={{marginBottom:23}}><div className="hero-copy"><div className="eyebrow" style={{color:'#c8e5d8'}}>الدورة الرئيسية</div><h2 style={{fontSize:24,margin:'8px 0'}}>English, one step at a time</h2><p style={{margin:0,color:'#d8eee5'}}>٤ مستويات · ٨ أقسام · ٢٤ درسًا <span style={{opacity:.75}}>— بيانات توضيحية</span></p></div><BookMarked size={47} style={{position:'relative',zIndex:1,opacity:.85}}/></section>
 {courseLevels.map((level,i)=><section className="panel level-card" key={level.title} data-testid={`card-level-${i+1}`}><div style={{display:'flex',alignItems:'center',gap:13}}><div style={{width:45,height:45,borderRadius:15,display:'grid',placeItems:'center',background:level.color,color:'#327965',fontWeight:700}}>{String(i+1).padStart(2,'0')}</div><div><h2 style={{margin:0,fontSize:16}}>{level.title}</h2><span className="ltr" style={{color:'#87918c',fontSize:12}}>{level.en}</span></div><span className="badge" style={{marginRight:'auto'}}>قسم: {level.section}</span></div><div style={{paddingRight:58,marginTop:9}}>{level.lessons.map((lesson,j)=><div className="lesson-row" key={lesson[0]}><div className="lesson-icon">{lesson[1]==='فيديو'?<CirclePlay size={19}/>:lesson[1]==='صوت'?<Headphones size={19}/>:<ImageIcon size={19}/>}</div><div><div className="ltr" style={{fontWeight:600,fontSize:14,color:'#384440'}}>{lesson[0]}</div><div style={{fontSize:12,color:'#87918c',marginTop:4}}>{lesson[1]} · {lesson[2]}</div></div><button className="icon-button" aria-label="معاينة الدرس" data-testid={`button-preview-lesson-${i}-${j}`}><ChevronLeft size={17}/></button></div>)}</div></section>)}
 <p className="preview-note">أدوات الإضافة والتحرير معروضة كمعاينة فقط.</p></Shell>;
}
function ContentLibrary() {
 const rows=[['Introductions & greetings','المستوى الأول · الأساسيات اليومية','فيديو','08:24',CirclePlay],['Everyday expressions','المستوى الأول · الأساسيات اليومية','صوت','05:10',Headphones],['Useful phrases','المستوى الثاني · في المدينة','صورة','—',ImageIcon],['At the café','المستوى الثاني · في المدينة','صوت','06:32',Headphones],['A confident introduction','المستوى الثالث · العمل والدراسة','فيديو','11:08',CirclePlay]] as const;
 return <Shell title="مكتبة المحتوى"><Heading eyebrow="إدارة المحتوى" title="مكتبة الدروس" subtitle="استعراض مواد الدورة ومواقعها داخل الهيكل."><button className="button-primary" data-testid="button-upload-content" disabled style={{opacity:.64,cursor:'not-allowed'}}><Plus size={16}/> إضافة محتوى · معاينة</button></Heading>
 <div className="stat-grid" style={{gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}><Stat label="فيديو" value="١٠" note="ضمن الدورة" icon={CirclePlay}/><Stat label="صوت" value="٨" note="ضمن الدورة" icon={Headphones} color="#fff1d9"/><Stat label="صور ومواد" value="٦" note="ضمن الدورة" icon={ImageIcon} color="#fdeae4"/></div>
 <div className="section-head"><h2 className="section-title">كل المواد</h2><span className="badge amber">عرض توضيحي</span></div><section className="panel table-wrap"><table className="data-table"><thead><tr><th>اسم الدرس</th><th>الموقع في الدورة</th><th>النوع</th><th>المدة</th><th></th></tr></thead><tbody>{rows.map(([name,location,type,duration,Icon],i)=><tr key={name} data-testid={`row-content-${i}`}><td><div className="person"><span className="lesson-icon" style={{width:35,height:35,flexBasis:35}}><Icon size={17}/></span><span className="ltr">{name}</span></div></td><td>{location}</td><td>{type}</td><td className="ltr">{duration}</td><td><button className="button-soft" data-testid={`button-place-content-${i}`} disabled style={{opacity:.65}}>تعديل المكان</button></td></tr>)}</tbody></table></section><p className="preview-note">رفع الملفات وتغيير مواضع المحتوى غير متاحين في هذه المعاينة.</p></Shell>;
}
function CommunityAdmin() {
 return <Shell title="مساحة المجموعة"><Heading eyebrow="تواصل المتعلمين" title="مساحة المجموعة" subtitle="تصوّر لمساحة النقاش وحالة المراسلة."><span className="badge amber">معاينة فقط</span></Heading>
 <div style={{display:'grid',gridTemplateColumns:'minmax(0,1.5fr) minmax(240px,.8fr)',gap:17}}><section className="panel" style={{padding:20}}><div className="section-head" style={{marginTop:0}}><h2 className="section-title">نقاشات المجموعة</h2><span className="badge">٣٦ مشاركة</span></div>{posts.map((p,i)=><article className="panel community-post" key={p.name} data-testid={`post-admin-${i}`}><div className="person"><span className="person-avatar">{p.name.slice(0,1)}</span><div><div>{p.name}</div><small style={{color:'#8b9590'}}>{p.time}</small></div></div><p style={{lineHeight:1.8,color:'#59645f',marginBottom:0}}>{p.text}</p>{p.media&&<div style={{marginTop:12,padding:12,borderRadius:12,background:'#f7f4eb',display:'flex',alignItems:'center',gap:8,color:'#65736c',fontSize:12}}><Headphones size={16}/>{p.media}</div>}</article>)}<div className="panel community-composer"><MessageCircle size={18}/>المشاركة في المجموعة غير متاحة في هذه المعاينة</div></section>
 <aside className="panel" style={{padding:22,height:'fit-content'}}><div className="eyebrow">حالة المراسلة</div><h2 style={{fontSize:19,margin:'8px 0 12px'}}>رسالة مباشرة</h2><div className="badge amber"><LockKeyhole size={13} style={{marginLeft:5}}/> غير متاحة في المعاينة</div><p style={{fontSize:13,lineHeight:1.8,color:'#79827d'}}>يمكن للمشرفين متابعة نقاشات المتعلمين. إرسال الرسائل غير مفعّل في هذه النسخة.</p><div style={{borderTop:'1px solid #f0ede6',paddingTop:15,display:'flex',alignItems:'center',gap:9}}><span className="person-avatar">س</span><div><b style={{fontSize:13}}>سارة العتيبي</b><div style={{fontSize:11,color:'#939a96'}}>آخر ظهور: منذ ساعة</div></div></div><button className="button-primary" style={{width:'100%',marginTop:17,opacity:.55,cursor:'not-allowed'}} disabled data-testid="button-send-admin-message"><Send size={15}/> إرسال رسالة · معاينة</button></aside></div></Shell>;
}
const posts=[
 {name:'سارة العتيبي',time:'منذ ١٥ دقيقة',text:'اليوم قدرت أعرّف عن نفسي بالإنجليزي بدون ما أوقف كثير. تمرين المحادثة ساعدني أرتب أفكاري.',media:''},
 {name:'نواف الحربي',time:'منذ ساعة',text:'مشاركة قصيرة للتدريب على النطق. كيف كان وضوح الجملة؟',media:'تسجيل صوتي · 00:18'},
 {name:'ريم القحطاني',time:'أمس',text:'كلمة الأسبوع عندي: curious. حبيت كيف دخلناها في جملة بسيطة.',media:''},
];
function LearnerHome() {
 return <Shell title="رحلتي التعليمية" learner><Heading eyebrow="أهلًا بعودتك" title="مرحبًا، سارة!" subtitle="خطوة صغيرة اليوم، ثقة أكبر غدًا."><PreviewTag/></Heading>
 <section className="course-hero"><div className="hero-copy"><span className="eyebrow" style={{color:'#c8e5d8'}}>دورتك الحالية</span><h2 style={{fontSize:25,margin:'8px 0'}}>English, one step at a time</h2><p style={{margin:'0 0 19px',color:'#d8eee5'}}>تابعي رحلتك، كل درس يقربك من محادثة جديدة.</p><Link href="/learn/course" className="button-primary" style={{background:'#f2bd68',color:'#37413c'}} data-testid="link-continue-course">متابعة التعلّم <ArrowLeft size={16}/></Link></div><div style={{position:'relative',zIndex:1,textAlign:'center'}}><div style={{font:'700 42px DM Sans'}}>٤٢٪</div><div style={{fontSize:12,color:'#d8eee5'}}>من الرحلة أُنجزت</div></div></section>
 <div className="stat-grid"><Stat label="الدروس المكتملة" value="١٠ / ٢٤" note="أحسنتِ، استمري!" icon={CircleCheck}/><Stat label="وقت التعلّم" value="٣ س ٤٠ د" note="مجموع وقتك" icon={Clock3} color="#fff1d9"/><Stat label="المستوى الحالي" value="الأول" note="الأساسيات اليومية" icon={BookOpen} color="#fdeae4"/><Stat label="حالة الوصول" value="مفعّل" note="الدخول متاح" icon={LockKeyhole} color="#e8eef9"/></div>
 <div className="section-head"><h2 className="section-title">خطوتك التالية</h2><Link className="button-soft" href="/learn/course" data-testid="link-view-course">كل الدروس <ArrowLeft size={15}/></Link></div>
 <section className="panel" style={{padding:'12px 22px'}}><div className="lesson-row"><div className="lesson-icon"><CirclePlay size={19}/></div><div><div className="ltr" style={{fontWeight:600}}>Your first conversation</div><div style={{fontSize:12,color:'#87918c',marginTop:4}}>المستوى الأول · فيديو · ١٢ دقيقة</div></div><Link href="/learn/content" className="button-primary" data-testid="link-next-lesson"><Play size={15}/> ابدئي الدرس</Link></div></section>
 <div className="section-head"><h2 className="section-title">من مساحة المجموعة</h2><Link className="button-soft" href="/learn/community" data-testid="link-open-community">زيارة المجتمع <ArrowLeft size={15}/></Link></div><article className="panel community-post"><div className="person"><span className="person-avatar">ن</span><div><b>نواف الحربي</b><div style={{fontSize:11,color:'#8b9590'}}>منذ ساعة</div></div></div><p style={{color:'#58645f',lineHeight:1.8,marginBottom:0}}>مشاركة قصيرة للتدريب على النطق. كيف كان وضوح الجملة؟</p></article>
 </Shell>;
}
function LearnerCourse() {
 return <Shell title="دورتي" learner><Heading eyebrow="دليلك الدراسي" title="المستويات والدروس" subtitle="تقدّمك محفوظ هنا في هذه المعاينة بصريًا فقط."/><div className="course-hero" style={{marginBottom:20}}><div className="hero-copy"><div className="eyebrow" style={{color:'#c8e5d8'}}>المستوى الأول · ٤٢٪ مكتمل</div><h2 className="ltr" style={{fontSize:24,margin:'8px 0'}}>Getting started</h2><div className="progress-track" style={{maxWidth:330,background:'rgba(255,255,255,.25)'}}><div className="progress-fill" style={{width:'42%',background:'#f5c26d'}}/></div></div><Sparkles size={42} style={{position:'relative',zIndex:1,color:'#f6cc7a'}}/></div>
 {courseLevels.slice(0,2).map((level,i)=><section className="panel level-card" key={level.title}><div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:44,height:44,borderRadius:15,display:'grid',placeItems:'center',background:level.color,color:'#327965',fontWeight:700}}>{i===0?<Check size={20}/>:String(i+1).padStart(2,'0')}</div><div><h2 style={{margin:0,fontSize:16}}>{level.title}</h2><span className="ltr" style={{fontSize:12,color:'#86918b'}}>{level.en}</span></div><span className="badge" style={{marginRight:'auto'}}>{i===0?'٤٢٪ مكتمل':'قادم'}</span></div><div style={{paddingRight:55}}><div style={{fontSize:12,fontWeight:700,color:'#617069',marginTop:15,marginBottom:4}}>{level.section}</div>{level.lessons.map((l,j)=><div className="lesson-row" key={l[0]}><div className="lesson-icon">{l[1]==='فيديو'?<CirclePlay size={19}/>:l[1]==='صوت'?<Headphones size={19}/>:<ImageIcon size={19}/>}</div><div style={{flex:1}}><div className="ltr" style={{fontWeight:600,fontSize:13}}>{l[0]}</div><div style={{fontSize:12,color:'#87918c',marginTop:3}}>{l[1]} · {l[2]}</div></div>{i===0&&j<1?<span className="badge"><Check size={12} style={{marginLeft:4}}/>مكتمل</span>:<Link href="/learn/content" className="icon-button" data-testid={`link-open-lesson-${i}-${j}`} aria-label="فتح الدرس"><ChevronLeft size={16}/></Link>}</div>)}</div></section>)}
 </Shell>;
}
function ContentPage() {
 return <Shell title="الدرس الحالي" learner><Heading eyebrow="المستوى الأول · الأساسيات اليومية" title="Your first conversation" subtitle="درس تجريبي · ١٢ دقيقة"><Link className="button-soft" href="/learn/course" data-testid="link-back-course"><ArrowLeft size={15}/> قائمة الدروس</Link></Heading>
 <section className="media-stage panel" data-testid="media-player-placeholder"><div style={{textAlign:'center'}}><div style={{width:76,height:76,borderRadius:27,background:'#fffdf8',display:'grid',placeItems:'center',margin:'0 auto 14px',boxShadow:'0 10px 26px #506c551a'}}><Play size={29} fill="currentColor"/></div><div style={{fontWeight:700,fontSize:17}}>معاينة مشغّل الفيديو</div><div style={{fontSize:13,color:'#78867e',marginTop:6}}>لا يوجد ملف وسائط في هذه النسخة</div></div></section>
 <section className="panel" style={{padding:22,marginTop:18}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}><div><div className="eyebrow">عن الدرس</div><h2 style={{fontSize:18,margin:'5px 0'}}>ابدئي محادثتك الأولى</h2></div><span className="badge amber">فيديو · ١٢:٠٠</span></div><p style={{fontSize:14,color:'#76817b',lineHeight:1.9}}>تدرّبي على التحية والتعريف بنفسك باستخدام عبارات بسيطة. استمعي، ثم جرّبي قولها بصوتك.</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><button className="button-soft" data-testid="button-view-audio"><Headphones size={16}/> حالة الصوت</button><button className="button-soft" data-testid="button-view-image"><ImageIcon size={16}/> حالة الصورة</button></div><div style={{marginTop:16,borderTop:'1px solid #f0ede6',paddingTop:15,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:12,color:'#87918c'}}>حالة التقدّم: لم يتم تسجيل مشاهدة</span><button className="button-primary" disabled style={{opacity:.58,cursor:'not-allowed'}} data-testid="button-mark-complete"><Check size={15}/> إكمال الدرس · معاينة</button></div></section>
 </Shell>;
}
function CommunityLearner() {
 return <Shell title="مساحة المجموعة" learner><Heading eyebrow="نتعلّم معًا" title="مجتمع المتعلمين" subtitle="أفكار وتجارب صغيرة من زملائك في الرحلة."><span className="badge amber">مساحة تجريبية</span></Heading>
 <div className="panel community-composer" style={{marginBottom:18,borderRadius:18}}><div className="avatar">س</div><span style={{flex:1}}>شاركي فكرة أو سؤالًا…</span><button className="button-primary" disabled style={{opacity:.55,cursor:'not-allowed'}} data-testid="button-create-post"><Plus size={15}/> مشاركة · معاينة</button></div>
 {posts.map((p,i)=><article className="panel community-post" key={p.name} data-testid={`post-community-${i}`}><div style={{display:'flex',alignItems:'center',gap:10}}><span className="person-avatar">{p.name.slice(0,1)}</span><div style={{flex:1}}><b style={{fontSize:13}}>{p.name}</b><div style={{fontSize:11,color:'#929b96',marginTop:2}}>{p.time}</div></div><button className="icon-button" aria-label="خيارات المشاركة" data-testid={`button-post-options-${i}`}><Menu size={17}/></button></div><p style={{fontSize:14,color:'#53605a',lineHeight:1.85,margin:'14px 0 8px'}}>{p.text}</p>{p.media&&<div style={{padding:14,borderRadius:13,background:'#f6f4eb',display:'flex',alignItems:'center',gap:10,color:'#586d62'}}><Headphones size={19}/><span>{p.media}</span><button className="icon-button" style={{marginRight:'auto'}} aria-label="تشغيل الصوت" data-testid={`button-play-audio-${i}`}><Play size={15}/></button></div>}<div style={{borderTop:'1px solid #f2efe8',paddingTop:12,marginTop:13,color:'#87918c',fontSize:12,display:'flex',gap:16}}><span><MessageCircle size={14} style={{verticalAlign:'middle',marginLeft:5}}/>٤ ردود</span><span>إعجاب</span></div></article>)}
 <p className="preview-note">إضافة المشاركات والردود أو الرسائل غير مفعّلة.</p></Shell>;
}
function LearnerEntry() {
 return <div className="auth-page"><section className="auth-visual"><Logo/><div style={{position:'relative',zIndex:1,maxWidth:500}}><div className="eyebrow" style={{color:'#c9e5d9'}}>مساحتك لتتعلّمي بطريقتك</div><h1 style={{fontSize:42,lineHeight:1.35,margin:'16px 0'}}>كل كلمة جديدة،<br/>تفتح لك بابًا.</h1><p style={{fontSize:16,lineHeight:1.9,color:'#d8eee5',maxWidth:430}}>رحلة ممتعة وعملية تساعدك تتحدثين الإنجليزية بثقة، خطوة بخطوة.</p><div style={{display:'flex',gap:10,marginTop:24,flexWrap:'wrap'}}><span className="badge" style={{background:'rgba(255,255,255,.18)',color:'white'}}>دروس قصيرة</span><span className="badge" style={{background:'rgba(255,255,255,.18)',color:'white'}}>تقدّم واضح</span><span className="badge" style={{background:'rgba(255,255,255,.18)',color:'white'}}>تعلّم مع المجموعة</span></div></div><div style={{position:'relative',zIndex:1,color:'#c9e5d9',fontSize:12}}>لُغتي بثقة · English, one step at a time</div></section><section className="auth-form-area"><div className="panel auth-card"><div className="eyebrow">مساحة المتعلّم</div><h2 style={{fontSize:25,margin:'7px 0'}}>أهلًا بكِ في رحلتك</h2><p style={{fontSize:13,color:'#7e8881',lineHeight:1.8}}>اكتبي بريدك الإلكتروني ثم استخدمي رمز الدخول المخصص لك.</p><label className="field">البريد الإلكتروني<input type="email" placeholder="name@example.com" className="ltr" data-testid="input-learner-email" disabled/></label><button className="button-primary" style={{width:'100%',opacity:.58,cursor:'not-allowed'}} disabled data-testid="button-request-code">متابعة إلى رمز الدخول <ArrowLeft size={16}/></button><div style={{textAlign:'center',margin:'20px 0',fontSize:12,color:'#9aa19b'}}>ثم</div><label className="field">رمز الدخول لمرة واحدة<input type="text" placeholder="أدخلي الرمز المكوّن من ٦ أرقام" data-testid="input-access-code" disabled/></label><button className="button-soft" style={{width:'100%',opacity:.55,cursor:'not-allowed'}} disabled data-testid="button-preview-login"><LockKeyhole size={15}/> تسجيل الدخول غير متاح</button><p className="preview-note">هذه شاشة عرض فقط. لن يتم إرسال بريد أو التحقق من الرمز.</p><div style={{textAlign:'center',marginTop:17}}><Link href="/learn" style={{color:'#207d68',fontSize:13,fontWeight:600}} data-testid="link-preview-learner">استعراض مساحة المتعلّم <ArrowLeft size={14} style={{verticalAlign:'middle'}}/></Link></div></div></section></div>;
}
function AdminSignIn() {
 return <div className="auth-page"><section className="auth-visual"><Logo/><div style={{position:'relative',zIndex:1}}><div className="eyebrow" style={{color:'#c9e5d9'}}>مساحة فريق الدورة</div><h1 style={{fontSize:40,lineHeight:1.35,margin:'15px 0'}}>تجربة تعلّم<br/>تنمو كل يوم.</h1><p style={{color:'#d8eee5',lineHeight:1.9,maxWidth:430}}>تابعي رحلة المتعلمين، نظّمي محتوى الدورة، وامنحي كل خطوة مساحة لتكبر.</p></div><div style={{position:'relative',zIndex:1,fontSize:12,color:'#c9e5d9'}}>لوحة إدارة الدورة · معاينة</div></section><section className="auth-form-area"><div className="panel auth-card"><div className="eyebrow">الإدارة</div><h2 style={{fontSize:25,margin:'7px 0'}}>تسجيل دخول المشرف</h2><p style={{color:'#7e8881',fontSize:13,lineHeight:1.8}}>هذه الشاشة تعرض بنية الدخول فقط؛ لا يتم التحقق من الحسابات.</p><label className="field">البريد الإلكتروني<input type="email" placeholder="admin@example.com" className="ltr" data-testid="input-admin-email" disabled/></label><label className="field">كلمة المرور<input type="password" placeholder="••••••••••" data-testid="input-admin-password" disabled/></label><button className="button-primary" style={{width:'100%',opacity:.58,cursor:'not-allowed'}} disabled data-testid="button-admin-signin">الدخول غير متاح في المعاينة <ArrowLeft size={15}/></button><p className="preview-note">لن يتم تسجيل الدخول أو حفظ أي بيانات.</p><div style={{textAlign:'center',marginTop:18}}><Link href="/admin" style={{color:'#207d68',fontSize:13,fontWeight:600}} data-testid="link-preview-admin">استعراض لوحة الإدارة <ArrowLeft size={14} style={{verticalAlign:'middle'}}/></Link></div></div></section></div>;
}
function Router() {
 return <RoutedErrorBoundary><Switch>
  <Route path="/" component={LearnerEntry}/><Route path="/learn" component={LearnerHome}/><Route path="/learn/course" component={LearnerCourse}/><Route path="/learn/content" component={ContentPage}/><Route path="/learn/community" component={CommunityLearner}/>
  <Route path="/admin/sign-in" component={AdminSignIn}/><Route path="/admin" component={AdminOverview}/><Route path="/admin/students" component={StudentsPage}/><Route path="/admin/courses" component={CoursesPage}/><Route path="/admin/content" component={ContentLibrary}/><Route path="/admin/community" component={CommunityAdmin}/>
  <Route component={NotFound}/>
 </Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
 const [location] = useLocation();
 return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
 return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;
}
export default App;
