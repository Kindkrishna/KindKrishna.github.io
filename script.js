/* ─────────────────────────────────────────
   KISHOR KUMAR KRISHNA — Portfolio JS
   script.js
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: scroll shadow + active link ── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    const scrollY = window.scrollY + 110;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE NAV TOGGLE ── */
  const navToggle  = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── INTERSECTION OBSERVER: fade-in + skill bars ── */
  const fadeEls = document.querySelectorAll(
    '.section-title, .section-copy, .about-text, .about-stats, .awards-strip, .skill-group, .project-card, .resume-block, .resume-timeline, .contact-grid, .stat-card, .award-item'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const skillFills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.dataset.w;
        if (w) entry.target.style.width = w + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(bar => barObserver.observe(bar));

  /* ── CONTACT FORM ── */
  const form       = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      const subject = encodeURIComponent(form.subject.value.trim() || 'Portfolio Contact');
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:kishorkrishna123@gmail.com?subject=${subject}&body=${body}`;

      showStatus('✓ Opening your email client…', 'success');
      form.reset();
    });
  }

  function showStatus (msg, type) {
    formStatus.textContent = msg;
    formStatus.className   = 'form-note ' + type;
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className   = 'form-note';
    }, 5000);
  }

  /* ── SMOOTH SCROLL POLYFILL for older Safari ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── DARK MODE TOGGLE ── */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme  = localStorage.getItem('portfolioTheme');

  if (savedTheme === 'dark') document.documentElement.classList.add('dark');
  themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀' : '🌙';

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('portfolioTheme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀' : '🌙';
  });

  /* ── PROJECTS FROM GITHUB ── */
  function addProject (project) {
    const grid = document.getElementById('projectsGrid');
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      ${project.thumbnail ? `<img class="project-thumbnail" src="${project.thumbnail}" alt="${project.title} project preview" loading="lazy">` : ''}
      <div class="project-tag">${project.tag}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.desc}</p>
      <div class="project-tech">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="project-links">
        <a href="${project.link}" target="_blank" rel="noopener" class="project-link">GitHub →</a>
      </div>
    `;
    grid.appendChild(card);
  }

  function getReadmeThumbnail (repo) {
    const readmeUrl = `https://api.github.com/repos/${repo.full_name}/readme`;

    return fetch(readmeUrl, { headers: { Accept: 'application/vnd.github+json' } })
      .then(response => response.ok ? response.json() : null)
      .then(readme => {
        if (!readme || !readme.download_url) return null;
        return fetch(readme.download_url)
          .then(response => response.ok ? response.text() : '')
          .then(markdown => {
            const imageMatches = [
              ...markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+['"][^'"]*['"])?\)/g),
              ...markdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)
            ];
            const image = imageMatches
              .map(match => match[1])
              .find(url => !/shields\.io|badge|travis-ci|codecov/i.test(url));

            return image ? new URL(image, readme.download_url).href : null;
          });
      })
      .catch(() => null);
  }

  function loadGitHubProjects () {
    const username = 'Kindkrishna';
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`;
    const grid = document.getElementById('projectsGrid');
    const loading = grid.querySelector('.project-loading');

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('GitHub API error');
        return response.json();
      })
      .then(repos => {
        if (loading) loading.remove();
        if (!repos || repos.length === 0) {
          grid.innerHTML = '<p class="project-empty">No public repositories found.</p>';
          return;
        }

        repos.forEach(repo => {
          const techStack = [];
          if (repo.language) techStack.push(repo.language);
          techStack.push('GitHub');
          if (Array.isArray(repo.topics) && repo.topics.length) {
            repo.topics.slice(0, 2).forEach(topic => techStack.push(topic));
          }

          getReadmeThumbnail(repo).then(thumbnail => addProject({
              tag: repo.private ? 'Private' : 'Open Source',
              title: repo.name,
              desc: repo.description || 'No repository description provided.',
              tech: techStack,
              link: repo.html_url,
              thumbnail
            }));
        });
      })
      .catch(() => {
        if (loading) loading.textContent = 'Unable to load repositories. Please check your network or GitHub username.';
      });
  }

  const extraProjects = [
    // Add project objects here if you want to pin additional work locally.
  ];

  extraProjects.forEach(p => addProject(p));
  loadGitHubProjects();

});
