import LeftArrow from '../assets/icons/leftArrow.svg?react';
import RightArrow from '../assets/icons/rightArrow.svg?react';
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useVelocity,
  animate,
  useMotionValueEvent,
} from 'framer-motion';

const images = import.meta.glob('../assets/images/services/*.png', {
  eager: true,
  import: 'default',
});

const Services = () => {
  const imagesList = Object.values(images);
  const surroundingBackup = 2;
  const x = useMotionValue(0);
  // const xVelocity = useVelocity(x);
  // const drag = useRef(false);
  const contentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const imageCenterPts = useRef([]);

  const repeatedImagesBefore = [];
  const repeatedImagesAfter = [];

  // Repeat images before
  for (let i = 0; i < surroundingBackup; i++) {
    repeatedImagesBefore.push(...imagesList);
  }

  // Repeat images after
  for (let i = 0; i < surroundingBackup; i++) {
    repeatedImagesAfter.push(...imagesList);
  }

  const backupWidth = width * surroundingBackup;

  useEffect(() => {
    const unsubscribe = x.on('change', (latestX) => {
      if (width === 0) return; // Wait for width to be measured

      const backupWidth = width * surroundingBackup;

      if (latestX > -width || Math.abs(latestX) >= backupWidth + width) {
        const looped = -backupWidth - (Math.abs(latestX) % width);

        x.set(looped);
      }
    });

    return () => unsubscribe();
  }, [width, x]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
      console.log(contentRef.current.offsetWidth);

      requestAnimationFrame(() => {
        x.set(-backupWidth);
        // animate(x, -backupWidth, {
        //   duration: 1,
        //   ease: 'easeInOut',
        // });
      });
    }
  }, [surroundingBackup, contentRef, backupWidth]);

  useEffect(() => {
    if (
      !width ||
      !imagesList.length ||
      !repeatedImagesBefore.length ||
      !repeatedImagesAfter.length
    )
      return;

    const imageWidth = width / imagesList.length;
    imageCenterPts.current = [
      ...repeatedImagesBefore.map((_, i) => i * imageWidth + imageWidth / 2),
      ...imagesList.map(
        (_, i) => i * imageWidth + backupWidth + imageWidth / 2
      ),
      ...repeatedImagesAfter.map(
        (_, i) => i * imageWidth + backupWidth + width + imageWidth / 2
      ),
    ];
  }, [imagesList, width, repeatedImagesBefore, repeatedImagesAfter]);

  const handleDrag = () => {
    // console.log('true');
    // drag.current = true;
  };

  const handleDragEnd = () => {
    // console.log('false');
    // drag.current = false;
  };

  // // useMotionValueEvent(xVelocity, 'change', (latest) => {
  // //   if (latest < 100 && imageCenterPts.current.length && !drag.current) {
  // //     console.log('checking');
  // //     const closest = imageCenterPts.current.reduce((prev, curr) => {
  // //       return Math.abs(curr - Math.abs(x.get())) <
  // //         Math.abs(prev - Math.abs(x.get()))
  // //         ? curr
  // //         : prev;
  // //     });
  // //     console.log(closest);
  // //     x.set(closest);
  // //   }
  // // });

  return (
    <div className="px-30 bg-black text-white h-screen">
      <header>
        <h1 className="text-5xl mb-5">Our main services</h1>
        <p className="text-2xl mb-10">
          Discover the services we offer that help digitally transform our
          clients businesses. Our core agency service offering includes web
          development, branding, SEO and digital paid ads and some other
          additional services too.
        </p>
      </header>
      <section className="flex justify-center gap-40">
        <div className="flex flex-col justify-between">
          <div className="flex text-8xl">
            <h2>01</h2>
            <h2>&nbsp;/&nbsp;10</h2>
          </div>

          <div className="flex gap-15">
            <div className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer">
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <LeftArrow width={50} height={50} />
            </div>

            <div className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer">
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <RightArrow width={50} height={50} />
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex "
            drag="x"
            dragConstraints={{}}
            style={{ x }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <div className="flex">
              {repeatedImagesBefore.map((src, i) => (
                <div className="w-[720px] h-[504px] px-4" key={`before-${i}`}>
                  <img src={src} draggable="false" />
                </div>
              ))}
            </div>

            <div ref={contentRef} className="flex">
              {imagesList.map((src, i) => (
                <div className="w-[720px] h-[504px] px-4" key={`main-${i}`}>
                  <img src={src} draggable="false" />
                </div>
              ))}
            </div>

            <div className="flex">
              {repeatedImagesAfter.map((src, i) => (
                <div className="w-[720px] h-[504px] px-4" key={`after-${i}`}>
                  <img src={src} draggable="false" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
