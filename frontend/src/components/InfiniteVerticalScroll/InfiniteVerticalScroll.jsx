import { useEffect } from 'react';
import './InfiniteVerticalScroll.css';
import postsImages from '../../assets/images/event-placeholder.png';

const InfiniteVerticalScroll = ({ socialFeed }) => {
  console.log(socialFeed);
  // const instagram = Array.from({ length: 30 }, (_, i) => i); //Uncomment once data is here
  const { instagram, youtube } = socialFeed;

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
          {instagram.map((instaImg, index) => (
            <a key={index} href={instaImg.url}>
              <img src={instaImg.image || postsImages} alt="" />
            </a>
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
          {youtube.map((vid, index) => (
            <a key={index} href={vid.url}>
              <img key={index} src={vid.thumbnail || postsImages} alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteVerticalScroll;
