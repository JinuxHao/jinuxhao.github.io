(() => {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('#theme-toggle');
  const languageButton = document.querySelector('#language-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } }
  };
  let theme = storage.get('jh-theme');
  let language = storage.get('jh-language') === 'en' ? 'en' : 'zh';
  let filter = 'all';
  if (!['light', 'dark'].includes(theme)) theme = null;

  function updateTheme() {
    const dark = theme ? theme === 'dark' : media.matches;
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
    themeButton.dataset.dark = String(dark);
    const label = language === 'en'
      ? `Switch to ${dark ? 'light' : 'dark'} theme`
      : `切换到${dark ? '浅色' : '深色'}主题`;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    document.querySelector('meta[name="theme-color"]').content = dark ? '#191d1a' : '#f7f6f3';
  }

  const translatedNodes = Array.from(document.querySelectorAll('[data-en]'), element => ({
    element, original: element.innerHTML, english: element.dataset.en
  }));
  const ariaNodes = Array.from(document.querySelectorAll('[data-en-aria-label]'), element => ({
    element, original: element.getAttribute('aria-label'), english: element.dataset.enAriaLabel
  }));
  const cards = [...document.querySelectorAll('.project-card')];
  function updateCount() {
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('#project-count').textContent = language === 'en' ? `${count} projects` : `${count} 个项目`;
  }
  function updateLanguage() {
    root.lang = language === 'en' ? 'en' : 'zh-CN';
    translatedNodes.forEach(({ element, original, english }) => {
      if (language === 'en') element.textContent = english;
      else element.innerHTML = original;
    });
    ariaNodes.forEach(({ element, original, english }) => element.setAttribute('aria-label', language === 'en' ? english : original));
    document.title = language === 'en' ? 'Jinux Hao · Remote Sensing / Computing / Visualization' : 'Jinux Hao · 遥感 / 计算 / 可视化';
    document.querySelector('#terrain-title').textContent = language === 'en' ? 'Terrain contours and an observation grid' : '地形等高线与观测网格';
    document.querySelector('#terrain-desc').textContent = language === 'en' ? 'Abstract contours and a sampling grid connect remote sensing, computing and visualization. This is an illustration, not geographic data.' : '抽象等高线穿过采样网格，连接遥感观测、计算和可视化三个主题，不代表实际地理数据。';
    languageButton.textContent = language === 'en' ? '中文' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    updateTheme();
    updateCount();
  }

  themeButton.hidden = false;
  languageButton.hidden = false;
  document.querySelector('.project-toolbar').hidden = false;
  themeButton.addEventListener('click', () => {
    theme = (theme ? theme === 'dark' : media.matches) ? 'light' : 'dark';
    storage.set('jh-theme', theme);
    updateTheme();
  });
  media.addEventListener('change', updateTheme);
  languageButton.addEventListener('click', () => {
    language = language === 'en' ? 'zh' : 'en';
    storage.set('jh-language', language);
    updateLanguage();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item.dataset.filter === filter;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
    updateCount();
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
  updateLanguage();

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('.editorial-section, .project-card, .contact-section').forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  }
})();
