import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { twMerge } from 'tailwind-merge';
import evaHead from '@/assets/eva-head.png';

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
      className={twMerge('z-50 bottom-20 right-20 fixed cursor-pointer', isShow ? '' : 'hidden')}
      onClick={toggleHome}>
      <img src={evaHead} width={80} className="hover:rotate-45 duration-300" alt="eva-head" />
    </div>
  );
}

export default FloatingButton;
