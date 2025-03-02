import { useEffect } from 'react';
import './InfiniteVerticalScroll.css';
import postsImages from '../../assets/images/event-placeholder.png';

const InfiniteVerticalScroll = () => {
  const cards = Array.from({ length: 30 }, (_, i) => i);

  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller-inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className="infinite-vertical-scroll">
      {/* Scroller that scrolls upward */}
      <div className="scroller" data-speed="slow" data-direction="top">
        <div className="scroller-inner">
          {cards.map((_, index) => (
            <img key={index} src={postsImages} alt="" />
          ))}
        </div>
      </div>
      {/* Scroller that scrolls downward */}
      <div
        className="scroller scroller-mobile-version"
        data-speed="slow"
        data-direction="bottom"
      >
        <div className="scroller-inner">
          {cards.map((_, index) => (
            <img key={index} src={postsImages} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteVerticalScroll;
