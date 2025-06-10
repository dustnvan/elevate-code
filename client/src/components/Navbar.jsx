import Moon from '../assets/icons/moon.svg?react';
import Sun from '../assets/icons/sun.svg?react';
import Time from './Time';
import AnimatedButton from './AnimatedButton';
import Logo from '../assets/icons/logo.svg?react';
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from 'framer-motion';
import { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { scrollY } = useScroll();
  const [scrollTracker, setScrollTracker] = useState(0);
  const [hide, setHide] = useState(false);
  const [expand, setExpand] = useState(true);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const diff = current - scrollY.getPrevious();
    if (current > 100) {
      setExpand(false);
    } else {
      setExpand(true);
    }
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
      <div
        className={`mt-4 px-4 md:px-10 gap-5 z-100 fixed w-full justify-center flex ${
          hide ? '-translate-y-4/3' : ''
        } ${expand ? 'max-w-full' : 'max-w-300'}`}
        style={{
          transition: 'translate 300ms ease 100ms, max-width 400ms ease',
        }}
      >
        <nav
          className={
            'flex items-center w-full dark:bg-white bg-black p-3 rounded-lg dark-transition justify-between relative'
          }
        >
          <AnimatePresence>
            {dropDownOpen && (
              <motion.div
                className="absolute left-0 top-[120%] flex flex-col z-100 dark:bg-white bg-black dark:text-black text-white rounded-lg dark-transition p-8 px-12 w-full animate-slide-down origin-top text-lg "
                initial={{ opacity: 0, scaleY: 0, y: 0, translateY: '-10%' }}
                animate={{ opacity: 1, scaleY: '100%', translateY: 0 }}
                exit={{ opacity: 0, scaleY: 0, translateY: '-10%' }}
                transition={{ duration: 0.2 }}
              >
                <ul className="text-lg font-semibold flex flex-col [&>li]dark:hover:bg-white [&>li]:hover:bg-black/5 [&>li]:p-3 [&>li]:rounded-lg [&>li]:hover:cursor-pointer">
                  <a href="">
                    <li>Home</li>
                  </a>
                  <a href="">
                    <li>About</li>
                  </a>
                  <a href="">
                    <li>Services</li>
                  </a>
                  <a href="">
                    <li>Work</li>
                  </a>
                  <a href="">
                    <li>FAQ</li>
                  </a>
                  <a href="">
                    <li>Reviews</li>
                  </a>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href="/"
            className="flex items-center gap-1 dark:text-black text-white dark-transition font-bold text-2xl "
          >
            <Logo width={50} height={50} />
            <div className="w-40">ElevateCode</div>
          </a>
          <ul className="gap-4  dark-transition dark:text-black text-white text-base [&>li]:hover:cursor-pointer [&>li]dark:hover:bg-white [&>li]:p-1 [&>li]:rounded-lg [&>li]:hover:bg-black/5 hidden lg:flex">
            <a href="">
              <li>Home</li>
            </a>
            <a href="">
              <li>About</li>
            </a>
            <a href="">
              <li>Services</li>
            </a>
            <a href="">
              <li>Work</li>
            </a>
            <a href="">
              <li>FAQ</li>
            </a>
            <a href="">
              <li>Reviews</li>
            </a>
          </ul>
          <div className="flex items-center gap-5 ">
            <span className="hidden sm:inline-block">
              <AnimatedButton text="Contact Us" />
            </span>
            <button
              className="bg-black/5 rounded-lg p-4 lg:hidden"
              onClick={() => setDropDownOpen((prev) => !prev)}
            >
              <div className="flex flex-col space-y-[3px] justify-center relative w-6 h-6">
                <span
                  className={`bg-black h-[3px] w-full transition duration-300 ${
                    dropDownOpen
                      ? 'absolute top-1/2 translate-y-1/2 rotate-45 '
                      : ''
                  }`}
                ></span>
                <span
                  className={`bg-black h-[3px] w-full transition duration-300 ${
                    dropDownOpen ? 'hidden' : ''
                  }`}
                ></span>
                <span
                  className={`bg-black h-[3px] w-full transition duration-300 ${
                    dropDownOpen
                      ? 'absolute top-1/2 translate-y-1/2 -rotate-45'
                      : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </nav>
        <div className="flex flex-col gap-2 items-center">
          <div className="dark-transition dark:bg-white bg-black dark:text-black text-white text-xs p-1 rounded-md min-w-15 text-center">
            <Time />
          </div>
          <div
            className="cursor-pointer flex justify-center items-center w-full h-full rounded-lg
      transition-all dark-transition dark:bg-white bg-black dark:text-black text-white"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? (
              <Sun width={20} height={20} />
            ) : (
              <Moon width={20} height={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
