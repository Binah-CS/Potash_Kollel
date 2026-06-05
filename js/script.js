const navLinks = document.querySelectorAll('.primary-nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const section = document.querySelector(targetId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('load', () => {
  const mediaImages = document.querySelectorAll('img');
  mediaImages.forEach((img) => {
    img.loading = 'lazy';
  });
});
