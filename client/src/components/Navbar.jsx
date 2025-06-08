import Moon from '../assets/icons/moon.svg?react';
import Sun from '../assets/icons/sun.svg?react';
import Time from './Time';
import AnimatedButton from './AnimatedButton';
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { scrollY } = useScroll();
  const [scrollTracker, setScrollTracker] = useState(0);
  const [hide, setHide] = useState(false);
  const maxWidth = useTransform(scrollY, [0, 100], ['100%', '70%']);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - scrollY.getPrevious();

    if (diff > 0) {
      // scrolling down
      if (Math.abs(scrollTracker - current) > 100) {
        setScrollTracker(current);
        setHide(true);
      }
    } else {
      if (Math.abs(scrollTracker - current) > 100) {
        setScrollTracker(current);
        setHide(false);
      }
    }
  });

  return (
    <div className="flex justify-center">
      <motion.div
        className={'mt-4 px-15 gap-5 z-100 fixed w-full justify-center flex'}
        animate={{ y: hide ? '-150%' : 0 }}
        style={{
          maxWidth,
          transition: 'all 0.2s linear',
        }}
      >
        <nav
          className={
            'flex items-center w-full dark:bg-black bg-white/90 p-3 rounded-lg dark-transition justify-between'
          }
        >
          <a href="/">
            <img src="https://placehold.co/180x40" />
          </a>
          <ul className="flex gap-4 [&>li]:rounded-lg dark-transition dark:text-white text-black text-base [&>li]:hover:cursor-pointer [&>li]:hover:bg-white [&>li]:p-1 [&>li]:dark:hover:bg-white/20">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Work</li>
            <li>FAQ</li>
            <li>Reviews</li>
          </ul>
          <AnimatedButton text="Contact Us" />
        </nav>
        <div className="flex flex-col gap-2 items-center">
          <div className="dark-transition dark:bg-black bg-white dark:text-white text-black text-xs p-1 rounded-md min-w-15 text-center">
            <Time />
          </div>
          <div
            className="cursor-pointer flex justify-center items-center w-full h-full rounded-lg
      transition-all dark-transition dark:bg-black bg-white text-white"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? (
              <Moon width={20} height={20} />
            ) : (
              <Sun width={20} height={20} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Navbar;
