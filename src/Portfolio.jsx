import { useState,useEffect } from "react";
import emailjs from "@emailjs/browser";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0e0e0e;
    --surface: #161616;
    --card: #1c1c1c;
    --border: rgba(255,255,255,0.08);
    --accent: #c8f53e;
    --accent2: #3eaff5;
    --text: #f0ede6;
    --muted: #888880;
    --serif: 'DM Serif Display', serif;
    --sans: 'DM Sans', sans-serif;
  }
    
    .cursor {
  display: inline-block;
  margin-left: 4px;
  color: var(--accent);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}


    

  body { background: var(--bg); color: var(--text); font-family: var(--sans); font-weight: 300; line-height: 1.6; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25rem 3rem;
    background: rgba(14,14,14,0.85); backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--border);
  }
  .nav-logo { font-family: var(--serif); font-size: 1.4rem; color: var(--accent); letter-spacing: -0.5px; }
  .nav-links { display: flex; gap: 2rem; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
  .nav-links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--text); }

  .section { padding: 7rem 3rem; max-width: 1100px; margin: 0 auto; }

  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding-top: 6rem; padding-bottom: 4rem;
    position: relative; max-width: 1100px; margin: 0 auto; padding-left: 3rem; padding-right: 3rem;
  }
  .hero-inner { display: flex; flex-direction: column; gap: 1.5rem; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted);
    border: 0.5px solid var(--border); padding: 6px 14px; border-radius: 2rem; width: fit-content;
  }
  .hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); display: inline-block; }
  .hero-name { font-family: var(--serif); font-size: clamp(3.5rem, 8vw, 7rem); line-height: 1.0; letter-spacing: -2px; color: var(--text); }
  .hero-name em { color: var(--accent); font-style: italic; }
  .hero-sub { font-size: 1.05rem; color: var(--muted); max-width: 520px; font-weight: 300; }
  .hero-cta { display: flex; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .btn { padding: 0.75rem 1.75rem; border-radius: 2px; font-family: var(--sans); font-size: 0.85rem; letter-spacing: 0.06em; cursor: pointer; border: none; transition: all 0.2s; }
  .btn-primary { background: var(--accent); color: #0e0e0e; font-weight: 500; }
  .btn-primary:hover { background: #d6ff55; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: var(--text); border: 0.5px solid var(--border); }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.3); }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 3rem;
    display: flex; align-items: center; gap: 8px;
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
  }
  .scroll-line { width: 32px; height: 0.5px; background: var(--muted); }

  .sec-label { font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
  .sec-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); line-height: 1.1; letter-spacing: -1px; margin-bottom: 3rem; }

  .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1px; border: 1px solid var(--border); }
  .skill-cell { background: var(--card); padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; transition: background 0.2s; }
  .skill-cell:hover { background: #222; }
  .skill-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(200,245,62,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
  .skill-name { font-size: 0.95rem; font-weight: 500; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 0.25rem; }
  .tag { font-size: 0.7rem; letter-spacing: 0.04em; padding: 3px 10px; border-radius: 2rem; background: rgba(255,255,255,0.06); color: var(--muted); border: 0.5px solid var(--border); }

  .exp-list { display: flex; flex-direction: column; }
  .exp-item { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; padding: 2rem 0; border-bottom: 0.5px solid var(--border); }
  .exp-item:first-child { border-top: 0.5px solid var(--border); }
  .exp-date { font-size: 0.78rem; color: var(--muted); letter-spacing: 0.06em; }
  .exp-company { font-size: 1rem; font-weight: 500; margin-top: 4px; }
  .exp-role { font-size: 0.82rem; color: var(--accent2); margin-top: 2px; }
  .exp-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.7; margin-top: 0.25rem; }
  .exp-skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 1rem; }

  .proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; border: 1px solid var(--border); }
  .proj-card {
    background: var(--card); padding: 2rem; display: flex; flex-direction: column; gap: 1rem;
    transition: background 0.2s; cursor: pointer; text-decoration: none; color: inherit;
  }
  .proj-card:hover { background: #212121; }
  .proj-num { font-size: 0.7rem; letter-spacing: 0.1em; color: var(--muted); }
  .proj-title { font-family: var(--serif); font-size: 1.4rem; line-height: 1.2; color: var(--text); }
  .proj-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; flex: 1; }
  .proj-stack { display: flex; flex-wrap: wrap; gap: 6px; }
  .proj-link { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); display: flex; align-items: center; gap: 6px; margin-top: auto; }
  .proj-arrow { transition: transform 0.2s; display: inline-block; }
  .proj-card:hover .proj-arrow { transform: translateX(4px); }

  .contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .contact-left { display: flex; flex-direction: column; gap: 2rem; }
  .contact-info { display: flex; flex-direction: column; gap: 1rem; }
  .contact-item { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; color: var(--muted); }
  .contact-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(200,245,62,0.08); border: 0.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  .contact-item a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .contact-item a:hover { color: var(--accent); }
  .social-row { display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap; }
  .social-btn { padding: 0.6rem 1.2rem; border-radius: 2px; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; background: transparent; color: var(--muted); border: 0.5px solid var(--border); cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .social-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.3); }

  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .form-input, .form-textarea {
    background: var(--card); border: 0.5px solid var(--border);
    color: var(--text); font-family: var(--sans); font-size: 0.9rem; font-weight: 300;
    padding: 0.85rem 1rem; border-radius: 2px; outline: none; transition: border-color 0.2s; width: 100%;
  }
  .form-input:focus, .form-textarea:focus { border-color: rgba(200,245,62,0.4); }
  .form-textarea { resize: vertical; min-height: 130px; }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
  .submit-btn {
    background: var(--accent); color: #0e0e0e; font-weight: 500;
    padding: 0.85rem 2rem; border-radius: 2px; font-family: var(--sans);
    font-size: 0.85rem; letter-spacing: 0.06em; cursor: pointer; border: none;
    transition: all 0.2s; align-self: flex-start;
  }
  .submit-btn:hover { background: #d6ff55; transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .form-success { color: var(--accent); font-size: 0.9rem; padding: 1rem; border: 0.5px solid rgba(200,245,62,0.3); border-radius: 2px; background: rgba(200,245,62,0.05); }

  .footer {
    border-top: 0.5px solid var(--border); padding: 3rem; max-width: 1100px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--muted);
  }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--text); }

  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1.25rem; }
    .hero { padding-left: 1.5rem; padding-right: 1.5rem; }
    .hero-scroll { left: 1.5rem; }
    .section { padding: 5rem 1.5rem; }
    .exp-item { grid-template-columns: 1fr; gap: 0.75rem; }
    .contact-wrapper { grid-template-columns: 1fr; gap: 3rem; }
    .footer { flex-direction: column; gap: 1rem; text-align: center; }
  }
`;


const skills = [
  { icon: "🟨", name: "Languages", tags: ["cpp", "java", "python"] },
  { icon: "⚛", name: "Frontend", tags: ["React", "TypeScript", "Next.js", "Tailwind"] },
  { icon: "🛠", name: "Backend", tags: ["Node.js", "Express", "REST APIs", "GraphQL"] },
  { icon: "🗄", name: "Databases", tags: ["PostgreSQL", "MongoDB", "Redis"] },
  { icon: "☁", name: "Cloud & DevOps", tags: ["AWS", "Docker", "CI/CD", "Git"] },
];

const experience = [
  {
    date: "2025 — Present",
    project: "Property.AI",
    role: " Full-Stack Developer",
    desc: "Developed an AI-powered property recommendation system using Flask and NLP techniques",
    tags: ["React", "Node.js", "WebSockets", "Flask", "spaCy (NLP)" ,"python"],
  },
  {
    date: " sept-2024 —  dec-2024",
    project: "Blog App",
    role: "Full-Stack Developer",
    desc: "Built a full-stack blog application with user authentication, image uploads, and real-time engagement features like likes and comments.",
    tags: ["React", "Node.js", "MongoDB", "Express", "JWT", "Mongoose"],
  },
  {
    date: "April 2025 — May 2025",
    project: "I am bot",
    role: "Frontend Developer",
    desc: "Built an intelligent chatbot that understands user queries using NLP and provides automated, real-time responses through a web-based interface.",
    tags: ["React", "Node.js", "WebSockets", "Flask", "spaCy (NLP)"],
  },
];

const projects = [
  {
    num: "01",
    title: "Property.AI",
    desc: "Property.AI is an AI-powered real estate web application that enables smart property search, recommendations, and insights using React, Flask, and NLP.",
    stack: ["React", "Node.js", "WebSockets", "Flask", "spaCy (NLP)"],
    link: "https://property-ai-project.vercel.app",
  },
  {
    num: "02",
    title: "Blog",
    desc: "A full-stack blog application that allows users to create, read, update, and delete posts. Includes user authentication, image uploads, and real-time engagement features like likes and comments.",
    stack: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "WebSockets"],
    link: "https://blog-frontend-chi-neon.vercel.app",

  },
  {
    num: "03",
    title: "I Am Bot",
    desc: "An intelligent chatbot that understands user queries using NLP and provides automated, real-time responses through a web-based interface.",
    stack: ["Python", "Flask", "NLP", "REST API", "JavaScript", "React"],
    link: "#",
  },
];

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Portfolio() {
  ///1
  const fullName = "Md Amaan.";
   const [typedName, setTypedName] = useState("");
   ///
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }


  ////2
  useEffect(() => {
  let i = 0;

  const typing = setInterval(() => {
    setTypedName(fullName.slice(0, i + 1));
    i++;

    if (i === fullName.length) {
      clearInterval(typing);
    }
  }, 120); // speed

  return () => clearInterval(typing);
}, []);


  ///
 function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  // emailjs.send(
  //   "service_lfj5gch",
  //   "template_z0k8a7z",   // 👈 use ONLY ONE (active one)
  //   {
  //     from_name: form.name,
  //     from_email: form.email,
  //     message: form.message,
  //   },
  //   "KamB4ek7rWSp1oUNS"
  // )
  emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE,
  import.meta.env.VITE_EMAILJS_TEMPLATE,
  {
    from_name: form.name,
    from_email: form.email,
    message: form.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC
)


  .then(() => {
    setLoading(false);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  })
  .catch((error) => {
    console.error(error);
    setLoading(false);
    alert("Failed to send message");
  });
}
 

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">AR</div>
        <div className="nav-links">
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Available for opportunities
          </div>
          {/* /////2 */}
        <h1 className="hero-name">
  {typedName.includes(" ") ? (
    <>
      {typedName.split(" ")[0]}<br />
      <em>{typedName.split(" ")[1] || ""}</em>
    </>
  ) : (
    typedName
  )}
  <span className="cursor">|</span>
</h1>

          {/* ///// */}
          <p className="hero-sub">
            Full-stack developer crafting thoughtful digital experiences — from pixel-perfect interfaces to scalable back-end systems.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>View my work</button>
            <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>Get in touch</button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll to explore
        </div>
      </div>

      {/* SKILLS */}
      <section className="section" id="skills">
        <p className="sec-label">What I know</p>
        <h2 className="sec-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill-cell" key={s.name}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-tags">
                {s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <p className="sec-label">Where I've been</p>
        <h2 className="sec-title">Experience</h2>
        <div className="exp-list">
          {experience.map((e) => (
            <div className="exp-item" key={e.company}>
              <div>
                <div className="exp-date">{e.date}</div>
                <div className="exp-company">{e.company}</div>
                <div className="exp-role">{e.role}</div>
              </div>
              <div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-skills">
                  {e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS — fixed: using <a> tags so links are clickable */}
      <section className="section" id="projects">
        <p className="sec-label">What I've built</p>
        <h2 className="sec-title">Projects</h2>
        <div className="proj-grid">
          {projects.map((p) => (
            <a
              key={p.num}
              className="proj-card"
              href={p.link}
              target={p.link !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
            >
              <div className="proj-num">{p.num}</div>
              <div className="proj-title">{p.title}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="proj-link">
                {p.link !== "#" ? "View project" : "Coming soon"}
                <span className="proj-arrow">{p.link !== "#" ? "→" : ""}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <p className="sec-label">Let's talk</p>
        <h2 className="sec-title">Contact</h2>
        <div className="contact-wrapper">
          <div className="contact-left">
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: 380 }}>
              Have a project in mind or just want to say hello? My inbox is always open — I'll get back to you within 24 hours.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">✉</div>
                {/* Fixed: added mailto: prefix */}
                <a href="mailto:amaanmd622@gmail.com">amaanmd622@gmail.com</a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <span>Bengaluru, India</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <span>IST (UTC+5:30) — usually reply same day</span>
              </div>
            </div>
            <div className="social-row">
              <a className="social-btn" href="https://github.com/Amaan622" target="_blank" rel="noreferrer">GitHub</a>
              <a className="social-btn" href="https://www.linkedin.com/in/mdamaanrahman/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="social-btn" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success">
                Thanks for reaching out! I'll get back to you soon.
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    className="form-input" id="name" name="name" type="text"
                    placeholder="Your full name" value={form.name}
                    onChange={handleChange} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    className="form-input" id="email" name="email" type="email"
                    placeholder="you@example.com" value={form.email}
                    onChange={handleChange} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    className="form-textarea" id="message" name="message"
                    placeholder="Tell me about your project or just say hi..."
                    value={form.message} onChange={handleChange} required
                  />
                </div>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send message →"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2026 Md Amaan Rahman</span>
        <div className="footer-links">
          <a href="https://github.com/Amaan622" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/mdamaanrahman/" target="_blank" rel="noreferrer">LinkedIn</a>
          {/* Fixed: added mailto: prefix */}
          <a href="mailto:amaanmd622@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}
