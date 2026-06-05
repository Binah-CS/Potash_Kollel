function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('navbar__links--open');
}

document.addEventListener('click', (event) => {
  const nav = document.getElementById('navLinks');
  const hamburger = document.querySelector('.navbar__hamburger');
  if (!nav || !hamburger) return;
  if (hamburger.contains(event.target)) return;
  if (!nav.contains(event.target)) {
    nav.classList.remove('navbar__links--open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('navbar__link--active');
    }
  });
}

function openModal(contentHtml) {
  const backdrop = document.getElementById('modalBackdrop');
  const modalBody = document.getElementById('modalBody');
  if (!backdrop || !modalBody) return;
  modalBody.innerHTML = contentHtml;
  backdrop.classList.add('modal-backdrop--open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const backdrop = document.getElementById('modalBackdrop');
  if (!backdrop) return;
  backdrop.classList.remove('modal-backdrop--open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  const backdrop = document.getElementById('modalBackdrop');
  if (event.target === backdrop) {
    closeModal();
  }
});

function openPreview(src, titleKey) {
  const titleText = t(titleKey) || titleKey;
  const isPdf = src.toLowerCase().endsWith('.pdf');
  const content = isPdf
    ? `
      <h2 class="modal__title">${titleText}</h2>
      <p>${t('modal.pdfOpenText')}</p>
      <p><a href="${src}" target="_blank" rel="noopener">${t('modal.openPdf')}</a></p>
      <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
    `
    : `
      <h2 class="modal__title">${titleText}</h2>
      <img src="${src}" alt="${titleText}" style="max-width:100%; border-radius:16px; margin-bottom:1rem;" />
      <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
    `;
  openModal(content);
}

function openPayment(cardIndex) {
  if (typeof paymentLinks !== 'undefined' && paymentLinks[cardIndex]) {
    window.open(
      paymentLinks[cardIndex],
      t('modal.openPdf'),
      'width=600,height=700,scrollbars=yes,resizable=yes'
    );
    setTimeout(() => {
      const button = document.getElementById(`donate-btn-${cardIndex}`);
      if (button) {
        button.textContent = t('modal.dedicationSubmit');
        button.onclick = () => openDedicationModal(cardIndex);
        button.classList.add('btn--outline');
      }
    }, 1500);
    return;
  }
  openModal(`
    <h2 class="modal__title">${t('modal.paymentUnavailableTitle')}</h2>
    <p>${t('modal.paymentUnavailableText')}</p>
    <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
  `);
}

function openDedicationModal(cardIndex) {
  openModal(`
    <h2 class="modal__title">${t('modal.dedicationTitle')}</h2>
    <form class="form" onsubmit="submitDedication(event, ${cardIndex})">
      <div class="form__group">
        <label class="form__label">${t('modal.dedicationName')}</label>
        <input class="form__input" type="text" name="name" placeholder="${t('modal.dedicationName')}" required />
      </div>
      <div class="form__group">
        <label class="form__label">${t('modal.dedicationText')}</label>
        <textarea class="form__textarea" name="text" placeholder="${t('modal.dedicationText')}"></textarea>
      </div>
      <div class="form__group">
        <label class="form__label">${t('modal.dedicationDays')}</label>
        <select class="form__input" name="days">
          <option value="1">${t('modal.dedicationOption1')}</option>
          <option value="3">${t('modal.dedicationOption3')}</option>
          <option value="7">${t('modal.dedicationOption7')}</option>
        </select>
      </div>
      <button class="btn" type="submit">${t('modal.dedicationSubmit')}</button>
    </form>
  `);
}

function submitDedication(event, cardIndex) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]').value;
  const text = form.querySelector('[name="text"]').value;
  const days = form.querySelector('[name="days"]').value;
  openModal(`
    <h2 class="modal__title">${t('modal.dedicationReceivedTitle')}</h2>
    <p>${t('modal.dedicationReceivedName', { name })}</p>
    <p>${t('modal.dedicationReceivedDays', { days })}</p>
    <p>${text}</p>
    <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
  `);
}

function openKvitelModal() {
  openModal(`
    <h2 class="modal__title">${t('kvitel.button')}</h2>
    <form class="form" onsubmit="submitKvitel(event)">
      <div class="form__group">
        <label class="form__label">${t('kvitel.formNames')}</label>
        <textarea class="form__textarea" name="names" placeholder="${t('kvitel.formNames')}" required></textarea>
      </div>
      <div class="form__group">
        <label class="form__label">${t('kvitel.formNotes')}</label>
        <textarea class="form__textarea" name="notes" placeholder="${t('kvitel.formNotes')}"></textarea>
      </div>
      <div class="form__group">
        <label class="form__label">${t('kvitel.formRabbi')}</label>
        <select class="form__input" name="rabbi">
          <option value="neventzal">${t('kvitel.rabbi.neventzal')}</option>
          <option value="galai">${t('kvitel.rabbi.galai')}</option>
          <option value="rashbi">${t('kvitel.rabbi.rashbi')}</option>
          <option value="meir">${t('kvitel.rabbi.meir')}</option>
          <option value="isaiah">${t('kvitel.rabbi.isaiah')}</option>
        </select>
      </div>
      <button class="btn" type="submit">${t('kvitel.submit')}</button>
    </form>
  `);
}

function submitKvitel(event) {
  event.preventDefault();
  const form = event.target;
  const names = form.querySelector('[name="names"]').value;
  const rabbi = form.querySelector('[name="rabbi"]').value;
  openModal(`
    <h2 class="modal__title">${t('modal.kvitelReceivedTitle')}</h2>
    <p>${t('modal.kvitelReceivedText', { rabbi })}</p>
    <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
  `);
}

function submitContact(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]').value;
  openModal(`
    <h2 class="modal__title">${t('modal.contactSentTitle')}</h2>
    <p>${t('modal.contactSentText', { name })}</p>
    <button class="btn" onclick="closeModal()">${t('modal.close')}</button>
  `);
}
