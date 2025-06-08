import LeftArrow from '../assets/icons/leftArrow.svg?react';
import RightArrow from '../assets/icons/rightArrow.svg?react';
import { useState, useRef, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

const images = import.meta.glob('../assets/images/services/*.png', {
  eager: true,
  import: 'default',
});

const Services = () => {
  const scrollRef = useRef();
  const imagesList = Object.values(images);
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const imageRef = useRef();
  const [scope, animate] = useAnimate();

  const setSlide = (newDirection) => {
    const nextItem = wrap(1, items.length, selectedItem + newDirection);
    setSelectedItem(nextItem);
    setDirection(newDirection);
  };

  const handleClickNext = () => setSlide(1);
  const handleClickPrev = () => setSlide(-1);

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
            <div
              className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
              onClick={handleClickPrev}
            >
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <LeftArrow width={50} height={50} />
            </div>

            <div
              className="relative border border-white/20 p-3 rounded-lg rounded-lg cursor-pointer"
              onClick={handleClickNext}
            >
              <div className="border-t border-l border-white absolute top-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-t border-r border-white absolute top-0 right-0 w-3 h-3 absolute"></div>
              <div className="border-b border-l border-white absolute bottom-0 left-0 w-3 h-3 absolute"></div>
              <div className="border-b border-r border-white absolute bottom-0 right-0 w-3 h-3 absolute"></div>
              <RightArrow width={50} height={50} />
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden w-full " ref={scrollRef}>
          <motion.div
            className="flex"
            drag="x"
            dragConstraints={scrollRef}
            ref={scope}
            // style={{ x }}
          >
            {imagesList.map((src, i) => (
              <motion.div
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ amount: 0.6 }}
                key={i}
                className="px-5"
                ref={imageRef}
              >
                <img
                  src={src}
                  draggable={false}
                  className="max-w-180 rounded-lg"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default Services;
