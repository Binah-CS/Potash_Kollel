const i18n = {
  strings: {},
  ready: false,
  async init() {
    try {
      const response = await fetch('assets/texts.json');
      this.strings = await response.json();
      this.apply();
      this.ready = true;
      document.dispatchEvent(new Event('i18nLoaded'));
    } catch (error) {
      console.error('i18n load failed:', error);
    }
  },
  t(key, replacements) {
    const value = key.split('.').reduce((obj, part) => obj?.[part], this.strings);
    if (value == null) return '';
    let text = String(value);
    if (replacements && typeof replacements === 'object') {
      Object.entries(replacements).forEach(([name, replacement]) => {
        text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), replacement);
      });
    }
    return text;
  },
  apply() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = this.t(el.dataset.i18n);
      if (text) el.textContent = text;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const text = this.t(el.dataset.i18nHtml);
      if (text) el.innerHTML = text;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const text = this.t(el.dataset.i18nPlaceholder);
      if (text) el.placeholder = text;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const text = this.t(el.dataset.i18nAlt);
      if (text) el.alt = text;
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const text = this.t(el.dataset.i18nAriaLabel);
      if (text) el.setAttribute('aria-label', text);
    });
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      const text = this.t(titleEl.dataset.i18n);
      if (text) titleEl.textContent = text;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
});

function t(key, replacements) {
  return i18n.t(key, replacements);
}
