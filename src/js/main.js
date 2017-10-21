import OnePageScroll from './one_page_scroll';

require('../scss/main.scss');

const opsObj = new OnePageScroll({
  wrapper: 'main',
  section: 'section',
});

function updateNavAnchor(i) {
  const previous = document.querySelector('.primary-navbar .active');
  const target = document.querySelector(`.primary-navbar a:nth-child(${i + 1})`);
  const iconWidth = (target.querySelector('i') || { offsetWidth: 0 }).offsetWidth;
  const anchor = document.querySelector('.primary-navbar .anchor');
  const offsetLeft = (target.offsetLeft + ((target.offsetWidth - iconWidth) / 2) + iconWidth)
    - (anchor.offsetWidth / 2);

  anchor.style.transform = `translateX(${offsetLeft}px)`;
  anchor.style.webkitTransform = anchor.style.transform;
  anchor.style.mozTransform = anchor.style.transform;
  anchor.style.msTransform = anchor.style.transform;
  anchor.style.oTransform = anchor.style.transform;

  if (previous) {
    previous.classList.remove('active');
  }
  target.classList.add('active');
}

opsObj.beforeScroll((i) => {
  updateNavAnchor(i);
});

document.addEventListener('click', ({ target }) => {
  switch (target.getAttribute('role')) {
    case 'scroll-down':
      opsObj.scrollDown();
      break;
    case 'scroll-to-top':
      opsObj.scrollTo(0);
      break;
    case 'scroll-to-page':
      opsObj.scrollTo(target.getAttribute('ops-index') * 1);
      break;
    default:
  }
});
