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

const Services = () => {
  const services = [
    'Code Reviews',
    'Cloud & DevOps',
    'Prototyping',
    'Custom Software Development',
    'Technical Strategy',
    'UI/UX Design',
  ];

  const imageRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollingRef = useRef(false);
  const imagesList = Object.values(images);
  const [width, setWidth] = useState(0);
  const coolDownRef = useRef(false);
  const [index, setIndex] = useState(0);

  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const { events } = useDraggable(scrollRef, {
    decayRate: 0.95,
    safeDisplacement: 0,
  });
  const [imageLocations, setImageLocations] = useState([]);
  const scrolledMidRef = useRef(false);
  const indexRef = useRef(index);

  // Keep ref in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const allImages = useMemo(
    () => [...imagesList, ...imagesList, ...imagesList],
    [imagesList]
  );

  // getting image locations
  useEffect(() => {
    const imageWidth = width / imagesList.length;

    const imageLocs = allImages.map((_, i) => i * imageWidth);

    setImageLocations(imageLocs);
    scrollRef.current.scrollLeft = imageLocs[index];
    console.log('updated locs', imageLocs);
  }, [width]);

  // image size changed
  useEffect(() => {
    scrollRef.current.scrollLeft = imageLocations[index];
  }, [imageLocations]);

  //Snap at the end of inertia from drag
  const scrollStopTimeout = useRef(null);
  const lastScroll = useRef(0);
  const handleDragEnd = (e) => {
    if (!dragging) return;
    if (scrollStopTimeout.current) clearTimeout(scrollStopTimeout.current);
    setDragging(false);
    draggingRef.current = true;

    const checkIfScrollStopped = () => {
      const currentScroll = scrollRef.current.scrollLeft;
      let controls;
      if (Math.abs(currentScroll - lastScroll.current) < 1) {
        const target = imageLocations[indexRef.current];
        console.log(target);
        controls = animate(scrollRef.current.scrollLeft, target, {
          duration: 0.2,
          ease: 'easeInOut',
          onUpdate: (latest) => {
            scrollRef.current.scrollLeft = latest;
          },
        });
        controls.then(() => (draggingRef.current = false));
      } else {
        lastScroll.current = currentScroll;
        scrollStopTimeout.current = setTimeout(checkIfScrollStopped, 20);
      }
      // console.log(currentScroll, lastScroll.current);
    };

    lastScroll.current = scrollRef.current.scrollLeft;
    scrollStopTimeout.current = setTimeout(checkIfScrollStopped, 20);
  };

  const handleTouchEnd = (e) => {
    // if (!dragging) return;
    // console.log('touchend');
    // setDragging(false);
    // //snap
    // const target = imageLocations[index];
    // animate(scrollRef.current.scrollLeft, target, {
    //   duration: 0.2,
    //   ease: 'easeInOut',
    //   onUpdate: (latest) => {
    //     scrollRef.current.scrollLeft = wrap(width, width * 2, latest);
    //   },
    // });
  };

  const customEvents = !isMobile
    ? {
        ...events,
        onMouseDown: (e) => {
          setDragging(true);
          if (events.onMouseDown) events.onMouseDown(e);
        },
      }
    : {
        onTouchStart: () => {
          setDragging(true);
        },
      };

  useEffect(() => {
    if (!dragging) return;
    // scrollRef.mouseUp wouldn't trigger if mouse start on scroll and end off scroll
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('mouseup', handleTouchEnd);
    };
  }, [dragging, handleDragEnd, handleTouchEnd]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const imageWidth = width / imagesList.length;

    // infinite loop mechanic
    scrollRef.current.scrollLeft = wrap(
      width,
      width * 2,
      scrollRef.current.scrollLeft
    );
    console.log(Math.round(scrollRef.current.scrollLeft / imageWidth));
    setIndex(Math.round(scrollRef.current.scrollLeft / imageWidth));
  }, [width, scrollRef]);

  useEffect(() => {
    if (!imageRef.current || !scrollRef.current) return;

    const observer = new ResizeObserver(() => {
      const contentWidth = imageRef.current.offsetWidth * imagesList.length;
      console.log('setting new width', contentWidth);
      console.log('scroll width', scrollRef.current.scrollWidth);
      setWidth(contentWidth);
    });

    observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  }, [imageRef]);

  // Initial scroll to mid
  useEffect(() => {
    if (!scrollRef.current || width === 0 || scrolledMidRef.current) return;

    scrollRef.current.scrollLeft = width;

    scrolledMidRef.current = true;
  }, [width, scrollRef.current]);

  const handleLeftScroll = () => {
    if (
      !scrollRef.current ||
      draggingRef.current ||
      !imageLocations.length ||
      coolDownRef.current
    )
      return;
    console.log('pressed');

    coolDownRef.current = true;
    const container = scrollRef.current;

    const target = imageLocations[indexRef.current - 1];
    console.log(target);

    const controls = animate(container.scrollLeft, target, {
      duration: 0.2,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = wrap(width, width * 2, latest);
      },
    });

    controls.then(() => {
      coolDownRef.current = false;
    });
  };

  const handleRightScroll = () => {
    console.log(draggingRef.current);
    if (
      !scrollRef.current ||
      draggingRef.current ||
      !imageLocations.length ||
      coolDownRef.current
    )
      return;

    const container = scrollRef.current;
    coolDownRef.current = true;

    const target = imageLocations[indexRef.current + 1];

    const controls = animate(container.scrollLeft, target, {
      duration: 0.2,
      ease: 'easeInOut',
      onUpdate: (latest) => {
        container.scrollLeft = wrap(width, width * 2, latest);
      },
    });

    controls.then(() => {
      coolDownRef.current = false;
    });
  };

  return (
    <div className=" bg-white dark-transition dark:bg-black text-black dark:text-white pb-50">
      <div className="max-w-350 mx-auto">
        <header>
          <h1 className="text-5xl mb-5">Our main services</h1>
          <p className="text-xl mb-10">
            Discover the services we offer that help digitally transform our
            clients businesses. Our core agency service offering includes web
            development, branding, SEO and digital paid ads and some other
            additional services too.
          </p>
        </header>
        <section className="flex justify-between flex-col gap-10 lg:flex-row">
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
                <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
                <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
                <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
                <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
                <FontAwesomeIcon icon={faArrowLeft} className="text-5xl" />
              </div>
              <div
                className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
                onClick={handleRightScroll}
              >
                <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
                <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
                <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
                <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
                <FontAwesomeIcon icon={faArrowRight} className="text-5xl" />
              </div>
            </div>
          </div>
          <div className="select-none max-w-250 order-first sm:order-last">
            <div
              className={`overflow-auto scrollbar-hide flex cursor-grab`}
              ref={scrollRef}
              onScroll={handleScroll}
              {...customEvents}
            >
              {allImages.map((src, i) => {
                const baseIndex = i % imagesList.length;
                const currentBaseIndex = index % imagesList.length;
                return (
                  <div className="relative flex-none" key={i}>
                    <div
                      className="absolute text-black bg-white top-10 left-10 p-2 whitespace-nowrap transition-opacity duration-1000 z-10 text-lg font-medium rounded-lg"
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
                      className="transition-opacity duration-300 w-150 sm:w-[720px] h-auto rounded-lg  px-2"
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
