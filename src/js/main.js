import onePageScroll from 'onepage-scroll/onepagescroll.min'; // eslint-disable-line import/no-extraneous-dependencies

require('../scss/main.scss');

onePageScroll('main', {
  sectionContainer: 'section',
  updateURL: true,
  pagination: false,
});
