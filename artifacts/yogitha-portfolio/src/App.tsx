import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Database,
  Github,
  Globe2,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['certifications', 'Certificates'],
  ['education', 'Education'],
  ['contact', 'Contact'],
] as const;

const skills = [
  { group: 'Frontend', icon: Code2, items: ['HTML', 'CSS', 'JavaScript'] },
  { group: 'Programming', icon: Sparkles, items: ['Python', 'C'] },
  { group: 'Development', icon: Globe2, items: ['NativeScript', 'TypeScript', 'XML'] },
  { group: 'Data & tools', icon: Database, items: ['MySQL', 'Git', 'GitHub', 'VS Code'] },
  { group: 'Work style', icon: Heart, items: ['Problem Solving', 'Team Collaboration', 'Communication', 'Quick Learning'] },
];

const projects = [
  {
    number: '01',
    title: 'Login Page UI Design',
    description: 'A responsive authentication experience with crisp input states, clear hierarchy, flexible layout, and a calm visual rhythm.',
    tags: ['HTML', 'CSS'],
    kind: 'login',
  },
  {
    number: '02',
    title: 'Modern Landing Page UI',
    description: 'A dark, editorial landing page study built around navigation, feature cards, strong typography, and responsive composition.',
    tags: ['HTML', 'CSS'],
    kind: 'landing',
  },
  {
    number: '03',
    title: 'RMA Mobile App',
    description: 'Contributed to an Android and iOS app during internship, shaping UI, themes, authentication, notifications, testing, and bug fixes.',
    tags: ['NativeScript', 'TypeScript', 'Git/GitHub'],
    kind: 'mobile',
  },
];

const certificates = [
  {
    title: 'NxtWave Intensive AI Bootcamp',
    issuer: 'NxtWave',
    year: '2026',
  },
  {
    title: 'SkillQuest — Generative AI Literacy',
    issuer: 'Simplilearn SkillUp',
    year: '2026',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte · Forage',
    year: '2026',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5" data-testid="site-header">
      <div className="section-wrap">
        <div className="glass flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <button className="focus-ring flex items-center gap-2" onClick={() => scrollTo('home')} data-testid="button-logo">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--foreground))] font-display text-lg text-[hsl(var(--background))]">Y</span>
            <span className="hidden font-semibold tracking-tight sm:block">Yogitha Challa</span>
          </button>
          <nav className={`${open ? 'absolute left-0 right-0 top-[4.6rem] flex' : 'hidden'} glass flex-col gap-1 rounded-3xl p-3 md:static md:flex md:flex-row md:items-center md:gap-0 md:border-0 md:bg-transparent md:p-0 md:shadow-none`} aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`focus-ring rounded-full px-3 py-2 text-left text-xs font-semibold transition-colors md:text-center ${activeSection === id ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
                data-testid={`nav-${id}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <button className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-[hsl(var(--secondary))] md:hidden" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ label, title, accent }: { label: string; title: string; accent: string }) {
  return (
    <div className="reveal max-w-3xl">
      <span className="eyebrow">{label}</span>
      <h2 className="section-title">{title} <em>{accent}</em></h2>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[780px] items-center overflow-hidden pb-16 pt-32 sm:min-h-[850px]">
      <div className="pointer-events-none absolute -right-36 top-20 h-[34rem] w-[34rem] rounded-full bg-[hsl(var(--secondary))] blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -left-36 bottom-4 h-72 w-72 rounded-full bg-[#ded3ff] blur-3xl opacity-70" />
      <div className="section-wrap relative grid items-center gap-12 lg:grid-cols-[1fr_.88fr]">
        <div className="reveal">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/55 px-4 py-2 font-mono-ui text-[.68rem] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">
            <span className="h-2 w-2 rounded-full bg-[#77b98f]" /> Available for opportunities
          </div>
          <p className="mb-5 font-mono-ui text-xs uppercase tracking-[.2em] text-[hsl(var(--primary))]">Hello, I&apos;m Yogitha</p>
          <h1 className="max-w-3xl font-display text-[clamp(4.2rem,9vw,8.3rem)] font-bold leading-[.84] tracking-[-.06em]">
            Building with <span className="text-[hsl(var(--primary))]">curiosity.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))] sm:text-xl">
            Computer Science Engineering student and Software Development Intern turning thoughtful ideas into clear, useful digital experiences.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="button-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-view-work">View my work <ArrowDown size={16} /></button>
            <button className="button-ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} data-testid="button-contact-me">Let&apos;s connect <ArrowUpRight size={16} /></button>
          </div>
          <div className="mt-12 flex items-center gap-4 text-[hsl(var(--muted-foreground))]">
            <a className="focus-ring transition-colors hover:text-[hsl(var(--foreground))]" href="https://github.com/challayogitha8-debug" target="_blank" rel="noreferrer" aria-label="GitHub profile" data-testid="link-github-hero"><Github size={19} /></a>
            <a className="focus-ring transition-colors hover:text-[hsl(var(--foreground))]" href="https://www.linkedin.com/in/yogitha-challa" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" data-testid="link-linkedin-hero"><Linkedin size={19} /></a>
            <span className="h-px w-12 bg-[hsl(var(--border))]" />
            <span className="font-mono-ui text-[.65rem] uppercase tracking-wider">Tirupati · India</span>
          </div>
        </div>
        <div className="reveal relative mx-auto w-full max-w-[510px] lg:justify-self-end">
          <div className="absolute -inset-4 rounded-[42%_58%_52%_48%/48%_42%_58%_52%] bg-[#e6dcff] opacity-80" />
          <div className="absolute -right-2 top-8 rounded-2xl bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md">
            <div className="font-mono-ui text-[.62rem] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">currently learning</div>
            <div className="mt-1 font-semibold">One commit at a time</div>
          </div>
          <img className="floaty relative z-10 w-full rounded-[2.5rem] object-cover mix-blend-multiply" src={`${import.meta.env.BASE_URL}assets/characters/yogitha-home.png`} alt="Illustrated Yogitha seated beside a laptop" data-testid="img-character-home" />
          <div className="absolute -bottom-4 left-4 z-20 rounded-2xl bg-[hsl(var(--foreground))] px-4 py-3 text-[hsl(var(--background))] shadow-xl">
            <div className="font-mono-ui text-[.6rem] uppercase tracking-wider opacity-60">focus</div>
            <div className="font-display text-xl">Human-first UI</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[hsl(var(--muted-foreground))] md:flex">
        <span className="font-mono-ui text-[.6rem] uppercase tracking-[.2em]">Scroll to explore</span><ChevronDown size={15} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad relative bg-[#f4f0ff]">
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.72fr_1fr]">
        <div className="reveal relative order-2 mx-auto max-w-[350px] lg:order-1">
          <div className="absolute -inset-5 rounded-[45%] bg-white/75" />
          <img className="floaty delay-1 relative w-full rounded-[2rem] mix-blend-multiply" src={`${import.meta.env.BASE_URL}assets/characters/yogitha-about.png`} alt="Illustrated Yogitha standing with a backpack" data-testid="img-character-about" />
          <div className="absolute bottom-4 -right-4 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl">
            <div className="font-mono-ui text-[.6rem] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">based in</div>
            <div className="font-semibold">Tirupati, India</div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading label="A little about me" title="A learner with a" accent="builder's heart." />
          <p className="reveal mt-7 max-w-2xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
            I&apos;m pursuing a B.Tech in Computer Science and Engineering at Annamacharya Institute of Science and Technology. I enjoy the space where visual clarity meets practical engineering: writing clean interfaces, understanding how they work, and improving them one detail at a time.
          </p>
          <p className="reveal mt-5 max-w-2xl leading-relaxed text-[hsl(var(--muted-foreground))]">
            My internship experience has taken me into mobile UI development with NativeScript and TypeScript, while my projects keep me close to the fundamentals of HTML, CSS, JavaScript, Python, and C. I bring a curious mindset, steady collaboration, and a genuine appetite for continuous learning.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-2">
            {['UI development', 'Problem solving', 'Continuous learning'].map(item => <span key={item} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="section-wrap">
        <SectionHeading label="The toolkit" title="Tools I use to" accent="make things." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map(({ group, icon: Icon, items }, index) => (
            <article className={`reveal rounded-[1.6rem] border border-[hsl(var(--border))] bg-white/62 p-6 ${index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`} key={group} style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="mb-10 flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={20} /></span>
                <span className="font-mono-ui text-xs text-[hsl(var(--muted-foreground))]">0{index + 1}</span>
              </div>
              <h3 className="font-display text-2xl">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map(item => <span key={item} className="rounded-full border border-[hsl(var(--border))] px-3 py-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]">{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
      <div className="section-wrap">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow !text-[#c0a9ff]">Experience</span>
            <h2 className="section-title">Learning in the <em className="!text-[#c0a9ff]">real world.</em></h2>
          </div>
          <span className="font-mono-ui text-xs uppercase tracking-widest opacity-50">01 / 01</span>
        </div>
        <article className="reveal mt-14 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[.7fr_1.5fr_.5fr]">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c0a9ff] text-[hsl(var(--foreground))]"><BriefcaseBusiness size={21} /></div>
            <p className="font-mono-ui text-xs uppercase tracking-wider text-[#c0a9ff]">Software Development Intern</p>
            <h3 className="mt-2 font-display text-3xl">Cloud Data Networks /<br />Alcheminds Solutions</h3>
          </div>
          <div className="max-w-xl">
            <p className="leading-relaxed opacity-70">Worked on the RMA Mobile App across Android and iOS, contributing to UI development, theme customization, authentication, notifications, debugging, testing, and feature implementation.</p>
            <p className="mt-5 leading-relaxed opacity-70">Practiced collaborative engineering through Git and GitHub branches, commits, pull requests, code reviews, and focused bug fixing.</p>
            <div className="mt-6 flex flex-wrap gap-2">{['NativeScript', 'TypeScript', 'XML', 'CSS', 'JavaScript', 'Git / GitHub'].map(tag => <span key={tag} className="rounded-full border border-white/20 px-3 py-1.5 font-mono-ui text-[.65rem] opacity-80">{tag}</span>)}</div>
          </div>
          <div className="font-mono-ui text-xs uppercase tracking-wider opacity-50 md:text-right">23 Jul 2026<br />— 23 Jan 2027</div>
        </article>
      </div>
    </section>
  );
}

function ProjectArt({ kind }: { kind: string }) {
  if (kind === 'mobile') {
    return <div className="project-art flex h-full items-center justify-center bg-[#dcd3ff] p-8"><div className="h-64 w-32 rounded-[1.5rem] border-[7px] border-[#272234] bg-[#f9f7ff] p-2 shadow-2xl"><div className="mb-3 h-2 w-12 rounded-full bg-[#272234] mx-auto" /><div className="rounded-xl bg-[#bca8ff] p-3"><div className="h-3 w-16 rounded-full bg-white/90" /><div className="mt-2 h-2 w-10 rounded-full bg-white/60" /></div><div className="mt-3 space-y-2"><div className="h-12 rounded-xl bg-[#eeeaff]" /><div className="h-12 rounded-xl bg-[#eeeaff]" /><div className="h-9 rounded-full bg-[#272234]" /></div></div></div>;
  }
  if (kind === 'landing') {
    return <div className="project-art h-full bg-[#1c1b22] p-5 text-white"><div className="flex items-center justify-between font-mono-ui text-[.45rem] uppercase tracking-widest opacity-60"><span>arc / studio</span><span>menu +</span></div><div className="mt-10 max-w-[13rem] font-display text-3xl leading-none">Ideas with a little more <span className="text-[#d2bfff]">room.</span></div><div className="mt-8 h-px bg-white/20" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="h-20 rounded-xl bg-[#35313f]" /><div className="h-20 rounded-xl bg-[#d2bfff]" /></div></div>;
  }
  return <div className="project-art flex h-full items-center justify-center bg-[#ffe4d9] p-7"><div className="w-full max-w-[255px] rounded-2xl bg-white p-5 shadow-xl"><div className="mb-7 h-2 w-16 rounded-full bg-[#292235]" /><div className="font-display text-2xl">Welcome<br /><span className="text-[#8a65de]">back.</span></div><div className="mt-6 space-y-3"><div className="h-9 rounded-lg bg-[#f5f2f9]" /><div className="h-9 rounded-lg bg-[#f5f2f9]" /><div className="h-10 rounded-full bg-[#292235]" /></div><div className="mt-4 text-center font-mono-ui text-[.5rem] text-[#948b9c]">or continue with another account</div></div></div>;
}

function Projects() {
  return (
    <section id="projects" className="section-pad bg-[#fff9f5]">
      <div className="section-wrap">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.36fr]">
          <SectionHeading label="Selected work" title="Small projects, " accent="carefully made." />
          <div className="reveal relative mx-auto w-44 lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-3 rounded-[42%] bg-[#e5dcff]" />
            <img className="relative w-full rounded-[1.4rem] mix-blend-multiply" src={`${import.meta.env.BASE_URL}assets/characters/yogitha-projects.png`} alt="Illustrated Yogitha working at a desk" data-testid="img-character-projects" />
          </div>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article className={`project-card reveal overflow-hidden rounded-[1.8rem] border border-[hsl(var(--border))] bg-white ${index === 1 ? 'lg:translate-y-12' : ''}`} key={project.number}>
              <div className="h-72 overflow-hidden"><ProjectArt kind={project.kind} /></div>
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between"><span className="font-mono-ui text-xs text-[hsl(var(--primary))]">{project.number}</span><span className="h-px w-10 bg-[hsl(var(--border))]" /></div>
                <h3 className="font-display text-3xl leading-none">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full bg-[hsl(var(--muted))] px-3 py-1.5 font-mono-ui text-[.62rem]">{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="section-wrap grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div><SectionHeading label="Proof of practice" title="Always room to" accent="learn more." /><p className="reveal mt-7 max-w-sm leading-relaxed text-[hsl(var(--muted-foreground))]">A few learning milestones that reflect my interest in technology, AI literacy, and data-led thinking.</p></div>
        <div className="space-y-3">
          {certificates.map((certificate, index) => (
            <article className="reveal group flex flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white/65 p-5 transition-colors hover:border-[hsl(var(--primary))] sm:flex-row sm:items-center sm:justify-between" key={certificate.title} style={{ transitionDelay: `${index * 90}ms` }}>
              <div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[hsl(var(--secondary))] font-mono-ui text-xs text-[hsl(var(--primary))]">0{index + 1}</span><div><h3 className="font-semibold">{certificate.title}</h3><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{certificate.issuer} · {certificate.year}</p></div></div>
              <span className="font-mono-ui text-[.65rem] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Credential listed on resume</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-pad bg-[#eee9ff]">
      <div className="section-wrap grid items-center gap-10 lg:grid-cols-[1fr_.75fr]">
        <div><SectionHeading label="The foundation" title="Growing from a" accent="strong base." /><div className="reveal mt-9 flex gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[hsl(var(--primary))]"><GraduationCap size={23} /></div><div><h3 className="font-display text-2xl">B.Tech — Computer Science and Engineering</h3><p className="mt-2 text-[hsl(var(--muted-foreground))]">Annamacharya Institute of Science and Technology, Tirupati</p><p className="mt-3 font-mono-ui text-xs uppercase tracking-wider text-[hsl(var(--primary))]">2024 — 2028</p></div></div></div>
        <div className="reveal relative"><div className="rounded-[2rem] bg-white p-8 shadow-[0_24px_60px_rgba(82,50,140,.12)]"><span className="font-mono-ui text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))]">current marker</span><div className="mt-2 font-display text-[5.6rem] leading-none text-[hsl(var(--primary))]">8.0</div><p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">CGPA / 10 till 2-2</p><div className="mt-7 h-2 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="h-full w-[80%] rounded-full bg-[hsl(var(--primary))]" /></div></div></div>
      </div>
    </section>
  );
}

type FormState = { name: string; email: string; subject: string; message: string };
const initialForm: FormState = { name: '', email: '', subject: '', message: '' };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const setField = (key: keyof FormState, value: string) => setForm(current => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setError('');
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim()) { setStatus('error'); setError('Please complete every field before sending.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setStatus('error'); setError('Please enter a valid email address.'); return; }
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) { setStatus('error'); setError('Contact delivery is not configured yet. Please email Yogitha directly instead.'); return; }
    setStatus('sending');
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: { from_name: form.name, reply_to: form.email, subject: form.subject, message: form.message, to_email: 'challayogitha8@gmail.com' } }) });
      if (!response.ok) throw new Error('Email delivery failed.');
      setStatus('success');
      setForm(initialForm);
    } catch { setStatus('error'); setError('That message could not be sent right now. Please try again or use the email link.'); }
  };
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-[#f4f0ff]">
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
      <div className="section-wrap relative">
        <div className="grid items-end gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading label="Say hello" title="Let&apos;s make the next" accent="thing better." />
            <p className="reveal mt-7 max-w-md text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">Interested in internships, software development opportunities, collaborations, or a thoughtful project? I&apos;d love to hear from you.</p>
            <div className="reveal mt-8 max-w-[330px]"><img className="floaty delay-2 w-full mix-blend-multiply" src={`${import.meta.env.BASE_URL}assets/characters/yogitha-contact.png`} alt="Illustrated Yogitha waving hello" data-testid="img-character-contact" /></div>
          </div>
          <div className="glass rounded-[2rem] p-5 sm:p-8">
            <form onSubmit={submit} noValidate className="space-y-5" aria-label="Contact Yogitha">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold">Name<input className="focus-ring mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-white/75 px-4 py-3 font-normal outline-none transition-colors focus:border-[hsl(var(--primary))]" name="name" value={form.name} onChange={event => setField('name', event.target.value)} placeholder="Your name" data-testid="input-name" /></label>
                <label className="space-y-2 text-sm font-semibold">Email<input className="focus-ring mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-white/75 px-4 py-3 font-normal outline-none transition-colors focus:border-[hsl(var(--primary))]" type="email" name="email" value={form.email} onChange={event => setField('email', event.target.value)} placeholder="you@example.com" data-testid="input-email" /></label>
              </div>
              <label className="block space-y-2 text-sm font-semibold">Subject<input className="focus-ring mt-1 w-full rounded-xl border border-[hsl(var(--border))] bg-white/75 px-4 py-3 font-normal outline-none transition-colors focus:border-[hsl(var(--primary))]" name="subject" value={form.subject} onChange={event => setField('subject', event.target.value)} placeholder="What shall we talk about?" data-testid="input-subject" /></label>
              <label className="block space-y-2 text-sm font-semibold">Message<textarea className="focus-ring mt-1 min-h-36 w-full resize-y rounded-xl border border-[hsl(var(--border))] bg-white/75 px-4 py-3 font-normal outline-none transition-colors focus:border-[hsl(var(--primary))]" name="message" value={form.message} onChange={event => setField('message', event.target.value)} placeholder="Tell me a little about it..." data-testid="input-message" /></label>
              {status === 'success' && <div className="flex items-center gap-2 rounded-xl bg-[#e4f5e9] px-4 py-3 text-sm font-semibold text-[#2f7244]" role="status" data-testid="status-success"><Check size={17} /> Message sent. Thank you for reaching out.</div>}
              {status === 'error' && <div className="rounded-xl bg-[#fff0ec] px-4 py-3 text-sm font-semibold text-[#a64b3e]" role="alert" data-testid="status-error">{error}</div>}
              <button type="submit" disabled={status === 'sending'} className="button-primary w-full disabled:cursor-wait disabled:opacity-60" data-testid="button-send-message">{status === 'sending' ? 'Sending message...' : <>Send message <Send size={16} /></>}</button>
            </form>
          </div>
        </div>
        <div className="reveal mt-16 grid gap-6 border-t border-[hsl(var(--border))] pt-8 sm:grid-cols-3">
          <div><span className="font-mono-ui text-[.65rem] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Name</span><p className="mt-2 font-semibold">Yogitha Challa</p></div>
          <div><span className="font-mono-ui text-[.65rem] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Profiles</span><div className="mt-2 flex gap-4"><a className="focus-ring font-semibold hover:text-[hsl(var(--primary))]" href="https://www.linkedin.com/in/yogitha-challa" target="_blank" rel="noreferrer" data-testid="link-linkedin-contact">LinkedIn</a><a className="focus-ring font-semibold hover:text-[hsl(var(--primary))]" href="https://github.com/challayogitha8-debug" target="_blank" rel="noreferrer" data-testid="link-github-contact">GitHub</a></div></div>
          <div><span className="font-mono-ui text-[.65rem] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Email</span><a className="focus-ring mt-2 block font-semibold hover:text-[hsl(var(--primary))]" href="mailto:challayogitha8@gmail.com" data-testid="link-email-contact">challayogitha8@gmail.com</a></div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [activeSection, setActiveSection] = useState('home');
  useReveal();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)), { rootMargin: '-30% 0px -60% 0px' });
    navItems.forEach(([id]) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="site-shell noise">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <footer className="bg-[hsl(var(--foreground))] px-6 py-7 text-[hsl(var(--background))]">
        <div className="section-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="font-display text-xl">Yogitha Challa<span className="text-[#c0a9ff]">.</span></p>
          <p className="font-mono-ui text-[.62rem] uppercase tracking-widest opacity-50">Designed with care · 2026</p>
          <a className="focus-ring inline-flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100" href="mailto:challayogitha8@gmail.com" data-testid="link-email-footer">Say hello <Mail size={15} /></a>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ErrorBoundary><Router /></ErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
