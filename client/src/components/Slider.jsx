// 'use client';

// import { AnimatePresence, motion, usePresenceData, wrap } from 'motion/react';
// import { forwardRef, useState, useEffect } from 'react';

// const images = import.meta.glob('../assets/images/services/*.png', {
//   eager: true,
//   import: 'default',
// });

// export default function UsePresenceData() {
//   const items = [0, 1, 2, 3, 4, 5, 6];
//   const imagesList = Object.values(images);

//   const [selectedItem, setSelectedItem] = useState(0);
//   const [direction, setDirection] = useState(1); // initially 1

//   function setSlide(newDirection) {
//     console.log('s', selectedItem);
//     const nextItem = wrap(0, items.length - 1, selectedItem + newDirection);
//     console.log('n', nextItem);
//     setSelectedItem(nextItem);
//     setDirection(newDirection);
//   }

//   useEffect(() => {
//     imagesList.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => setLoadedCount((count) => count + 1);
//     });
//   }, []);

//   return (
//     <div style={container}>
//       <motion.button
//         initial={false}
//         aria-label="Previous"
//         style={button}
//         onClick={() => setSlide(-1)}
//         whileTap={{ scale: 0.9 }}
//       >
//         <ArrowLeft />
//       </motion.button>
//       <AnimatePresence custom={direction} initial={false} mode="popLayout">
//         <Slide key={selectedItem} src={imagesList[selectedItem]} />
//       </AnimatePresence>
//       <motion.button
//         initial={false}
//         aria-label="Next"
//         style={button}
//         onClick={() => setSlide(1)}
//         whileTap={{ scale: 0.9 }}
//       >
//         <ArrowRight />
//       </motion.button>
//     </div>
//   );
// }
// const Slide = forwardRef(({ src }, ref) => {
//   const direction = usePresenceData();
//   return (
//     <motion.img
//       src={src}
//       ref={ref}
//       initial={{ opacity: 0, x: direction * 50 }}
//       animate={{
//         opacity: 1,
//         x: 0,
//         transition: {
//           delay: 0.2,
//           type: 'spring',
//           visualDuration: 0.3,
//           bounce: 0.4,
//         },
//       }}
//       exit={{ opacity: 0, x: direction * -50 }}
//       className="max-w-100"
//     />
//   );
// });
// /**
//  * ==============   Icons   ================
//  */
// const iconsProps = {
//   xmlns: 'http://www.w3.org/2000/svg',
//   width: '24',
//   height: '24',
//   viewBox: '0 0 24 24',
//   fill: 'none',
//   stroke: 'currentColor',
//   strokeWidth: '2',
//   strokeLinecap: 'round',
//   strokeLinejoin: 'round',
// };

// function ArrowLeft() {
//   return (
//     <svg {...iconsProps}>
//       <path d="m12 19-7-7 7-7" />
//       <path d="M19 12H5" />
//     </svg>
//   );
// }

// function ArrowRight() {
//   return (
//     <svg {...iconsProps}>
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   );
// }

// /**
//  * ==============   Styles   ================
//  */

// const container = {
//   display: 'flex',
//   position: 'relative',
//   justifyContent: 'center',
//   alignItems: 'center',
//   gap: 10,
// };

// const box = {
//   width: 150,
//   height: 150,
//   backgroundColor: '#0cdcf7',
//   borderRadius: '10px',
// };

// const button = {
//   backgroundColor: '#0cdcf7',
//   width: 40,
//   height: 40,
//   borderRadius: '50%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   position: 'relative',
//   zIndex: 1,
//   outlineOffset: 2,
// };
