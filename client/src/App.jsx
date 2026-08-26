import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Mail,
  Menu,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import "./App.css";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Nest.js",
  "MongoDB",
];

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Complete web applications with modern interfaces, powerful APIs, authentication and reliable database architecture.",
  },
  {
    number: "02",
    title: "E-Commerce Development",
    description:
      "Modern online stores with product management, shopping carts, orders and responsive customer experiences.",
  },
  {
    number: "03",
    title: "Business Websites",
    description:
      "Professional websites designed to build trust, generate leads and give businesses a strong online presence.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  };

  try {
   const response = await fetch(
  "https://muhammad-abdul-rehman-api.vercel.app/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to send message."
      );
    }

    alert(
      "Thank you! Your message has been sent successfully."
    );

    form.reset();
  } catch (error) {
    console.error("Contact form error:", error);

    alert(
      error.message ||
        "Unable to send your message. Please try again."
    );
  }
};

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="container navbar-inner">
          <button
            className="brand"
            onClick={() => scrollToSection("home")}
          >
            <span className="brand-logo">AR</span>

            <span className="brand-name">
              Muhammad Abdul Rehman
            </span>
          </button>

          <nav
            className={
              menuOpen
                ? "navigation navigation-open"
                : "navigation"
            }
          >
            <button
              onClick={() => scrollToSection("about")}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("services")}
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>

            <button
              className="nav-cta"
              onClick={() => scrollToSection("contact")}
            >
              Hire Me
              <ArrowUpRight size={16} />
            </button>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main>
        {/* ================= HERO ================= */}

        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="availability">
                <span className="availability-dot"></span>

                Available for freelance work
              </div>

              <h1>
                Full-Stack Developer
                <span> building digital experiences.</span>
              </h1>

              <p>
                I'm Muhammad Abdul Rehman, a Full-Stack
                Developer from Pakistan. I build modern,
                responsive and scalable web applications
                that help businesses turn ideas into
                digital products.
              </p>

              <div className="hero-actions">
                <button
                  className="button button-primary"
                  onClick={() =>
                    scrollToSection("contact")
                  }
                >
                  Let's Work Together
                  <ArrowUpRight size={18} />
                </button>

                <button
                  className="button button-secondary"
                  onClick={() =>
                    scrollToSection("projects")
                  }
                >
                  View My Work
                </button>
              </div>

              <div className="hero-meta">
                <span>Pakistan</span>

                <span>
                  1+ Year Freelance Experience
                </span>
              </div>
            </div>

            {/* CODE CARD */}

            <div className="code-card">
              <div className="code-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="code-content">
                <div>
                  <span className="code-purple">
                    const
                  </span>{" "}
                  developer = {"{"}
                </div>

                <div className="code-indent">
                  name:{" "}
                  <span className="code-green">
                    "Muhammad Abdul Rehman"
                  </span>
                  ,
                </div>

                <div className="code-indent">
                  role:{" "}
                  <span className="code-green">
                    "Full-Stack Developer"
                  </span>
                  ,
                </div>

                <div className="code-indent">
                  location:{" "}
                  <span className="code-green">
                    "Pakistan"
                  </span>
                  ,
                </div>

                <div className="code-indent">
                  experience:{" "}
                  <span className="code-green">
                    "1+ year"
                  </span>
                  ,
                </div>

                <div className="code-indent">
                  stack: [
                </div>

                <div className="code-double-indent">
                  <span className="code-green">
                    "React.js"
                  </span>
                  ,
                </div>

                <div className="code-double-indent">
                  <span className="code-green">
                    "Node.js"
                  </span>
                  ,
                </div>

                <div className="code-double-indent">
                  <span className="code-green">
                    "MongoDB"
                  </span>
                </div>

                <div className="code-indent">
                  ]
                </div>

                <div>{"}"}</div>
              </div>

              <div className="code-badge">
                <Sparkles size={16} />
                Clean code. Real results.
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}

        <section className="stats">
          <div className="container stats-grid">
            <div className="stat">
              <strong>1+</strong>
              <span>Year Experience</span>
            </div>

            <div className="stat">
              <strong>9+</strong>
              <span>Technologies</span>
            </div>

            <div className="stat">
              <strong>01</strong>
              <span>Featured Project</span>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section id="about" className="section">
          <div className="container about-grid">
            <div>
              <div className="section-label">
                01 / ABOUT ME
              </div>

              <h2>
                A developer who thinks beyond the code.
              </h2>
            </div>

            <div className="about-text">
              <p>
                I'm Muhammad Abdul Rehman, a Full-Stack
                Developer from Pakistan with 1+ year of
                freelance experience.
              </p>

              <p>
                I enjoy building complete web solutions,
                from polished user interfaces to robust
                APIs and database systems.
              </p>

              <p>
                My focus is clean architecture,
                performance, great user experience and
                maintainable code.
              </p>

              <div className="skills">
                {skills.map((skill) => (
                  <span key={skill}>
                    <Code2 size={14} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}

        <section id="services" className="section">
          <div className="container">
            <div className="section-label">
              02 / SERVICES
            </div>

            <div className="section-heading">
              <h2>
                What I can build for you.
              </h2>

              <p>
                From your first idea to a
                production-ready application.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article
                  className="service-card"
                  key={service.number}
                >
                  <span className="service-number">
                    {service.number}
                  </span>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <ArrowUpRight className="service-icon" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROJECT ================= */}

        <section id="projects" className="section">
          <div className="container">
            <div className="section-label">
              03 / SELECTED WORK
            </div>

            <div className="section-heading">
              <h2>
                Projects that show how I work.
              </h2>
            </div>

            <article className="project-card">
              <div className="project-visual">
                <div className="project-grid"></div>

                <div className="shop-icon">
                  S
                </div>

                <div className="shop-name">
                  ShopEase
                </div>
              </div>

              <div className="project-info">
                <span className="project-type">
                  E-COMMERCE
                </span>

                <h3>ShopEase</h3>

                <p>
                  A full-stack e-commerce store designed
                  to provide customers with a smooth and
                  modern online shopping experience.
                </p>

                <div className="project-tags">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>MongoDB</span>
                </div>

                <div className="project-status">
                  Full-Stack Application
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="container cta">
          <div className="cta-content">
            <Sparkles size={22} />

            <h2>
              Have an idea worth building?
            </h2>

            <p>
              Tell me what you're working on. Let's turn
              your idea into something people can use.
            </p>
          </div>

          <button
            className="button button-primary"
            onClick={() =>
              scrollToSection("contact")
            }
          >
            Start a Conversation
            <ArrowUpRight size={18} />
          </button>
        </section>

        {/* ================= CONTACT ================= */}

        <section
          id="contact"
          className="section contact-section"
        >
          <div className="container contact-grid">
            <div>
              <div className="section-label">
                04 / CONTACT
              </div>

              <h2>
                Let's build something great.
              </h2>

              <p className="contact-description">
                Have a project, business idea or
                collaboration in mind? Send me a message
                and I'll get back to you.
              </p>

              <div className="contact-details">
                <a href="mailto:muhammad.abdulrehman.dev@gmail.com">
                  <Mail size={18} />

                  muhammad.abdulrehman.dev@gmail.com
                </a>

                <a href="tel:+923362130444">
                  <Phone size={18} />

                  +92 336 2130444
                </a>

                <a
                  href="#"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                >
                  GitHub
                </a>

                <a
                  href="#"
                  onClick={(event) =>
                    event.preventDefault()
                  }
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <label>
                  Name

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  Email

                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <label>
                Company

                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                />
              </label>

              <label>
                Project Budget

                <select name="budget">
                  <option value="">
                    Select budget
                  </option>

                  <option value="100-500">
                    $100 - $500
                  </option>

                  <option value="500-1000">
                    $500 - $1,000
                  </option>

                  <option value="1000-5000">
                    $1,000 - $5,000
                  </option>

                  <option value="5000-plus">
                    $5,000+
                  </option>
                </select>
              </label>

              <label>
                Tell me about your project

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me what you want to build..."
                  required
                ></textarea>
              </label>

              <button
                className="button button-primary"
                type="submit"
              >
                <Send size={17} />
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer>
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} Muhammad Abdul Rehman
          </span>

          <span>
            Full-Stack Developer · Pakistan
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;