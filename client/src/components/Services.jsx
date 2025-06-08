import LeftArrow from '../assets/icons/leftArrow.svg?react';
import RightArrow from '../assets/icons/rightArrow.svg?react';
import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import {
  motion,
  animate,
  useInView,
  wrap,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  useScroll,
} from 'framer-motion';
const images = import.meta.glob('../assets/images/services/*.png', {
  eager: true,
  import: 'default',
});

const Services = () => {
  const imageRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollingRef = useRef(false);
  const imagesList = Object.values(images);
  const surroundingBackup = 1;
  const [width, setWidth] = useState(0);
  const scrollInView = useInView(scrollRef, { once: true, amount: 0.4 });
  const imageIndex = useMotionValue(0);
  const wrappedImage = useTransform(imageIndex, (val) => wrap(1, 7, val + 1));

  const imageCountDisplay = useMotionTemplate`${wrappedImage}`;
  const { events } = useDraggable(scrollRef);
  const backupWidth = width * surroundingBackup;

  const repeatedImagesBefore = useMemo(
    () =>
      Array.from(
        { length: surroundingBackup * imagesList.length },
        (_, i) => imagesList[i % imagesList.length]
      ),
    [imagesList, surroundingBackup]
  );

  const repeatedImagesAfter = useMemo(
    () =>
      Array.from(
        { length: surroundingBackup * imagesList.length },
        (_, i) => imagesList[i % imagesList.length]
      ),
    [imagesList, surroundingBackup]
  );

  const allImages = useMemo(
    () => [...repeatedImagesBefore, ...imagesList, ...repeatedImagesAfter],
    [repeatedImagesBefore, imagesList, repeatedImagesAfter]
  );

  const imageLocations = useMemo(() => {
    if (
      !backupWidth ||
      !imagesList.length ||
      !repeatedImagesAfter.length ||
      !repeatedImagesBefore.length
    )
      return;
    const imageWidth = width / imagesList.length;

    const before = repeatedImagesBefore.map((_, i) => i * imageWidth);
    const main = imagesList.map((_, i) => i * imageWidth + backupWidth);
    const after = repeatedImagesAfter.map(
      (_, i) => i * imageWidth + backupWidth + width
    );

    const imageLocs = [...before, ...main, ...after];
    console.log(imageLocs);
    return imageLocs;
  }, [imagesList, repeatedImagesAfter, repeatedImagesBefore, backupWidth]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      // getting the image index
      const imageWidth = width / imagesList.length;
      imageIndex.set(Math.floor(scrollRef.current.scrollLeft / imageWidth));

      //getting the current image displayed

      // infinite loop mechanic
      const scroll = scrollRef.current.scrollLeft;
      const backupWidth = width * surroundingBackup;
      if (scroll < backupWidth || scroll >= backupWidth + width) {
        scrollRef.current.scrollLeft = backupWidth + (scroll % width);
      }
    }
  }, [width]);

  useEffect(() => {
    if (
      !scrollInView ||
      !scrollRef.current ||
      !repeatedImagesAfter ||
      !repeatedImagesAfter ||
      !surroundingBackup ||
      !imageRef.current
    )
      return;

    const contentWidth = imageRef.current.offsetWidth * imagesList.length;
    setWidth(contentWidth);
    const controls = animate(scrollRef.current.scrollLeft, backupWidth, {
      duration: 3,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = latest;
        }
      },
    });

    scrollingRef.current = true;
    controls.then(() => (scrollingRef.current = false));
    return () => controls.stop();
  }, [
    backupWidth,
    scrollRef,
    scrollInView,
    repeatedImagesAfter,
    repeatedImagesBefore,
    surroundingBackup,
    imageRef,
  ]);

  const handleLeftScroll = () => {
    if (!scrollRef.current || scrollingRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;

    const target = [...imageLocations].reverse().find((el) => el < scrollLeft);

    animate(container.scrollLeft, target, {
      duration: 0.5,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = latest;
      },
    });
  };

  const handleRightScroll = () => {
    if (!scrollRef.current || scrollingRef.current || !imageLocations.length)
      return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;

    const target = imageLocations.find((el) => el > scrollLeft);

    animate(container.scrollLeft, target, {
      duration: 0.5,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = latest;
      },
    });
  };

  return (
    <div className="px-30 bg-white dark-transition dark:bg-black text-black dark:text-white">
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
            <motion.h2>{imageCountDisplay}</motion.h2>
            <h2>&nbsp;/&nbsp;{imagesList.length}</h2>
          </div>

          <div className="flex gap-15">
            <div
              className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
              onClick={handleLeftScroll}
            >
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <LeftArrow width={50} height={50} />
            </div>

            <div
              className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
              onClick={handleRightScroll}
            >
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <RightArrow width={50} height={50} />
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden flex cursor-grab "
          {...events}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {allImages.map((src, i) => (
            <img
              key={i}
              src={src}
              width={800}
              height={500}
              draggable="false"
              className={`px-4 transition-opacity duration-300 w-[800px] h-[500px]`}
              ref={i === allImages.length - 1 ? imageRef : null}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
