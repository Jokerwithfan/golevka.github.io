import OnePageScroll from './one_page_scroll';

require('../scss/main.scss');

const opsObj = new OnePageScroll({
  wrapper: 'main',
  section: 'section',
});

opsObj.afterScroll(() => {
});

opsObj.beforeScroll(() => {
});

document.addEventListener('click', ({ target }) => {
  switch (target.getAttribute('role')) {
    case 'scroll-down':
      opsObj.scrollDown();
      break;
    case 'scroll-to-top':
      opsObj.scrollTo(0);
      break;
    default:
  }
});
