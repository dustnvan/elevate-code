import DiagonalArrow from '../assets/icons/diagonalArrow.svg?react';

const AnimatedButton = ({ text, effectSize = 50 }) => {
  return (
    <button className="bg-purple py-1 pl-5 pr-1 rounded-lg text-white group cursor-pointer relative overflow-hidden">
      <span
        className={`w-${effectSize}  h-${effectSize} absolute bg-black/90 group-hover:-translate-y-1/2 top-0 left-1/2 -translate-x-1/2 -translate-y-1/1 rounded-full transition duration-1000 ease-[cubic-bezier(1,-0.1,.35,.85)] `}
      ></span>
      <span className="flex justify-center items-center gap-3 z-10 relative">
        {text}
        <div className="text-white group-hover:text-black bg-white/20 rounded-lg group-hover:bg-white transition duration-700 flex w-11 h-11 justify-center items-center ease-out">
          <DiagonalArrow className="group-hover:rotate-45 group-hover:w-8 transition duration-700 h-full w-full ease-out " />
        </div>
      </span>
    </button>
  );
};
export default AnimatedButton;
