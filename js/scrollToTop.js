const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

/* ******************** */
const showButton = () => {
  if (window.pageYOffset > 500) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

/* ******************** */
window.addEventListener('scroll', showButton);

scrollToTopBtn.addEventListener('click', scrollToTop);
