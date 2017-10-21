require('../scss/one_page_scroll.scss');

class OnePageScroll {
  constructor(opts) {
    const mousewheelHandler = ({ wheelDelta, detail }) => {
      if (!this.debounceFlag) {
        const delta = wheelDelta || -detail;

        if (delta < 0) {
          this.scrollDown();
        } else {
          this.scrollUp();
        }

        this.debounceFlag = true;
        setTimeout(() => {
          this.debounceFlag = false;
        }, 1500);
      }
    };
    const currentHash = window.location.hash.replace('#', '');
    let isHashScroll = false;

    this.current = 0;
    this.debounceFlag = false;
    this.wrapper = document.querySelector(opts.wrapper);
    this.sections = this.wrapper.querySelectorAll(opts.section);
    this.wrapper.classList.add('ops-wrapper');
    this.beforeHookCb = null;
    this.afterHookCb = null;

    Array.prototype.forEach.call(this.sections, (section, index) => {
      section.classList.add('ops-section');

      // scroll to specific section if hash matches
      if (currentHash && (section.getAttribute('hash') === currentHash || `${index + 1}` === currentHash)) {
        this.scrollTo(index);
        isHashScroll = true;
      }
    });

    document.addEventListener('mousewheel', mousewheelHandler);
    document.addEventListener('DOMMouseScroll', mousewheelHandler);

    if (!isHashScroll) {
      this.scrollTo(0);
    }
  }
  scrollDown() {
    if (this.current < this.sections.length - 1) {
      this.scrollTo(this.current + 1);
    }
  }
  scrollTo(index) {
    if (typeof this.beforeHookCb === 'function') {
      this.beforeHookCb(this.current);
    }

    this.sections[this.current].classList.remove('active');
    this.sections[index].classList.add('active');
    this.current = index;
    window.location.hash = this.sections[this.current].getAttribute('hash') || (this.current + 1);
    this.wrapper.style.transform = `translateY(-${100 * this.current}%)`;
    this.wrapper.style.webkitTransform = this.wrapper.style.transform;
    this.wrapper.style.mozTransform = this.wrapper.style.transform;
    this.wrapper.style.msTransform = this.wrapper.style.transform;
    this.wrapper.style.oTransform = this.wrapper.style.transform;

    if (typeof this.afterHookCb === 'function') {
      setTimeout(() => {
        this.afterHookCb(this.current);
      }, 1000);
    }
  }
  scrollUp() {
    if (this.current > 0) {
      this.scrollTo(this.current - 1);
    }
  }
  beforeScroll(cb) {
    if (this.beforeHookCb) {
      const originalCb = this.beforeHookCb;
      this.beforeHookCb = (arg) => {
        originalCb(arg);
        cb(arg);
      };
    } else {
      this.beforeHookCb = cb;
    }
  }
  afterScroll(cb) {
    if (this.afterHookCb) {
      const originalCb = this.afterHookCb;
      this.afterHookCb = (arg) => {
        originalCb(arg);
        cb(arg);
      };
    } else {
      this.afterHookCb = cb;
    }
  }
}

export default OnePageScroll;
