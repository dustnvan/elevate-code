import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { motion, animate, wrap } from 'framer-motion';
import { isMobile } from 'react-device-detect';

const images = import.meta.glob('../assets/images/services/*.png', {
  eager: true,
  import: 'default',
});

const services = [
  'Code Reviews',
  'Cloud & DevOps',
  'Prototyping',
  'Custom Software Development',
  'Technical Strategy',
  'UI/UX Design',
];

const Services = () => {
  const imageRef = useRef(null);
  const scrollRef = useRef(null);
  const imagesList = Object.values(images);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const CLONES = 4; // on one side

  const { events } = useDraggable(scrollRef, {
    decayRate: 0.95,
    safeDisplacement: 0,
  });
  const [imageLocations, setImageLocations] = useState([]);
  const indexRef = useRef(index);
  const scrollStopTimeout = useRef(null);
  const lastScroll = useRef(0);

  const refFlags = useRef({
    animatingSnap: false,
    mouseDragging: false,
    mobileDragging: false,
    navButtonCoolDown: false,
    scrolledMid: false,
  });

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const imageWidth = width / imagesList.length;

    const scroll = scrollRef.current.scrollLeft;

    const wrappedScroll = wrap(width * CLONES, width * CLONES + width, scroll);

    console.log(scroll, wrappedScroll);
    if (wrappedScroll !== scroll) {
      console.log('wrapped', scroll, wrappedScroll);
    }

    if (!refFlags.current.mobileDragging) {
      if (scroll < width || scroll > width * CLONES * 2) {
        scrollRef.current.scrollLeft = wrappedScroll;
      }
    }

    setIndex(Math.round(wrappedScroll / imageWidth));
  }, [width, scrollRef]);

  // keep ref in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const allImages = useMemo(
    () =>
      Array(CLONES * 2 + 1)
        .fill(imagesList)
        .flat(),
    [imagesList]
  );

  // getting image locations
  useEffect(() => {
    const imageWidth = width / imagesList.length;

    const imageLocs = allImages.map((_, i) => i * imageWidth);
    console.log(imageLocs);

    setImageLocations(imageLocs);
    scrollRef.current.scrollLeft = imageLocs[index];
  }, [width]);

  // image size changed
  useEffect(() => {
    scrollRef.current.scrollLeft = imageLocations[index];
  }, [imageLocations]);

  const customEvents = !isMobile
    ? {
        ...events,
        onMouseDown: (e) => {
          refFlags.current.mouseDragging = true;
          if (events.onMouseDown) events.onMouseDown(e);
        },
      }
    : {
        onTouchStart: (e) => {
          console.log('mobile drag start');
          refFlags.current.mobileDragging = true;
        },
      };

  //snap at the end of inertia from drag
  const handleMouseDragEnd = (e) => {
    if (!refFlags.current.mouseDragging) return;
    if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
    refFlags.current.mouseDragging = false;

    refFlags.current.animatingSnap = true;
    const checkIfScrollStopped = () => {
      const currentScroll = scrollRef.current.scrollLeft;
      let controls;
      if (Math.abs(currentScroll - lastScroll.current) < 1) {
        const target = imageLocations[indexRef.current];
        controls = animate(scrollRef.current.scrollLeft, target, {
          duration: 0.2,
          ease: 'easeInOut',
          onUpdate: (latest) => {
            scrollRef.current.scrollLeft = latest;
          },
        });
        controls.then(() => (refFlags.current.animatingSnap = false));
      } else {
        lastScroll.current = currentScroll;
        scrollStopTimeout.current = setTimeout(checkIfScrollStopped, 20);
      }
    };

    lastScroll.current = scrollRef.current.scrollLeft;
    scrollStopTimeout.current = setTimeout(checkIfScrollStopped, 20);
  };

  const handleMobileDragEnd = (e) => {
    console.log('mobile drag ended', e.type);
    if (!refFlags.current.mobileDragging) return;
    refFlags.current.mobileDragging = false;
    const scroll = scrollRef.current.scrollLeft;
    scrollRef.current.scrollLeft = wrap(
      width * CLONES,
      width * CLONES + width,
      scroll
    );
  };

  const handleTouchmove = (e) => {
    // console.log('touch move');
  };

  useEffect(() => {
    // scrollRef.mouseUp wouldn't trigger if mouse start on scroll and end off scroll
    if (refFlags.current.mouseDragging) {
      window.addEventListener('mouseup', handleMouseDragEnd);
    }

    window.addEventListener('touchend', handleMobileDragEnd);
    window.addEventListener('touchcancel', handleMobileDragEnd);
    scrollRef.current.addEventListener('touchmove', handleTouchmove, {
      passive: false,
    });

    return () => {
      window.removeEventListener('mouseup', handleMouseDragEnd);
      window.removeEventListener('touchend', handleMobileDragEnd);
      window.removeEventListener('touchcancel', handleMobileDragEnd);
      window.removeEventListener('touchmove', handleTouchmove);
    };
  }, [handleMouseDragEnd, handleMobileDragEnd]);

  useEffect(() => {
    if (!imageRef.current || !scrollRef.current) return;

    const observer = new ResizeObserver(() => {
      const contentWidth = imageRef.current.offsetWidth * imagesList.length;
      setWidth(contentWidth);
    });

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [imageRef]);

  // Initial scroll to mid
  useEffect(() => {
    if (!scrollRef.current || width === 0 || refFlags.current.scrolledMid)
      return;
    console.log('scroll mid', CLONES * width);
    scrollRef.current.scrollLeft = CLONES * width;

    refFlags.current.scrolledMid = true;
  }, [width]);

  const handleLeftScroll = () => {
    if (
      !scrollRef.current ||
      refFlags.current.animatingSnap ||
      !imageLocations.length ||
      refFlags.current.navButtonCoolDown
    )
      return;

    refFlags.current.navButtonCoolDown = true;
    const container = scrollRef.current;

    const target = imageLocations[indexRef.current - 1];

    const controls = animate(container.scrollLeft, target, {
      duration: 0.2,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = wrap(
          width * CLONES,
          width * CLONES + width,
          latest
        );
      },
    });

    controls.then(() => {
      refFlags.current.navButtonCoolDown = false;
    });
  };

  const handleRightScroll = () => {
    if (
      !scrollRef.current ||
      refFlags.current.animatingSnap ||
      !imageLocations.length ||
      refFlags.current.navButtonCoolDown
    )
      return;

    const container = scrollRef.current;
    refFlags.current.navButtonCoolDown = true;

    const target = imageLocations[indexRef.current + 1];

    const controls = animate(container.scrollLeft, target, {
      duration: 0.2,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = wrap(
          width * CLONES,
          width * CLONES + width,
          latest
        );
      },
    });

    controls.then(() => {
      refFlags.current.navButtonCoolDown = false;
    });
  };

  return (
    <div className=" bg-white dark-transition dark:bg-black text-black dark:text-white py-50">
      <div className="max-w-350 mx-auto px-5 xl:px-20">
        <header>
          <h1 className="text-5xl mb-5">Our main services</h1>
          <p className="text-xl mb-10">
            We help businesses evolve through purposeful design and smart
            technology. Whether launching something new or optimizing what's
            already working, our team delivers solutions that make a lasting
            impact.
          </p>
        </header>
        <section className="flex justify-between flex-col gap-10 xl:gap-50 lg:flex-row">
          <div className="flex flex-row lg:flex-col justify-start lg:justify-between gap-8 items-center">
            <div className="flex text-8xl hidden sm:flex select-none">
              <motion.h2>{wrap(0, services.length, index) + 1}</motion.h2>
              <h2>&nbsp;/&nbsp;{services.length}</h2>
            </div>
            <div className="flex gap-15 ">
              <div
                className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
                onClick={handleLeftScroll}
              >
                <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3"></div>
                <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3"></div>
                <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3"></div>
                <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3"></div>
                <FontAwesomeIcon icon={faArrowLeft} className="text-5xl" />
              </div>
              <div
                className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
                onClick={handleRightScroll}
              >
                <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3"></div>
                <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3"></div>
                <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3"></div>
                <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3"></div>
                <FontAwesomeIcon icon={faArrowRight} className="text-5xl" />
              </div>
            </div>
          </div>
          <div className="select-none max-w-250 order-first sm:order-last">
            <div
              className={`overflow-auto scrollbar-hide flex cursor-grab overscroll-none`}
              ref={scrollRef}
              onScroll={handleScroll}
              {...customEvents}
              style={{ WebkitOverflowScrolling: 'auto' }}
            >
              {allImages.map((src, i) => {
                const baseIndex = i % imagesList.length;
                const currentBaseIndex = index % imagesList.length;
                return (
                  <div className="relative flex-none" key={i}>
                    <div
                      className="absolute text-black bg-white top-5 left-10 p-2 whitespace-nowrap transition-opacity duration-700 z-10 text-lg font-medium rounded-lg"
                      style={{
                        opacity: baseIndex === currentBaseIndex ? 1 : 0,
                      }}
                      draggable="false"
                    >
                      ● {services[wrap(0, services.length, index)]}
                    </div>
                    <img
                      src={src}
                      draggable="false"
                      className="transition-opacity duration-300 w-[400px] sm:w-[720px] h-auto rounded-lg  px-2"
                      ref={i === allImages.length - 1 ? imageRef : null}
                      style={{
                        opacity: baseIndex === currentBaseIndex ? 1 : 0.2,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
