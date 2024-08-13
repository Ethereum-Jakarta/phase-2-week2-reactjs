import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { twMerge } from 'tailwind-merge';

function FloatingButton() {
  const [isShow, setIsShow] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= window.innerHeight) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const toggleHome = () => {
    animateScroll.scrollToTop();
  };
  return (
    <div
      className={twMerge('z-50 bottom-20 right-20 fixed', isShow ? '' : 'hidden')}
      onClick={toggleHome}>
      FloatingButton
    </div>
  );
}

export default FloatingButton;
