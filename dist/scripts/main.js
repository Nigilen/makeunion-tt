const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 0) {
    logo.style.transform = 'translateY(-100px)';
  } else {
    logo.style.transform = 'translateY(0)';
  }
});

if (window.location.pathname === '/') logo.removeAttribute('href');

const menuItems = document.querySelectorAll('.nav-link ');

menuItems.forEach((i) => {
  if (window.location.pathname === i.getAttribute('href')) {
    i.removeAttribute('href');
    i.style.cursor = 'default';
    i.style.fontWeight = '600';
    i.querySelector('.nav-link-icon').setAttribute('stroke-width', '3px');
  }
});
