import { Tooltip } from 'react-tooltip';

const Founder = ({ headshot, name, description }) => {
  return (
    <div className="group">
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-html={`<strong>${name}</strong><br/>${description}`}
        data-tooltip-place="top"
      >
        <img
          src={headshot}
          className="rounded-full w-11 h-10 border border-white transition-transform duration-300 group-hover:-translate-x-1"
        />
      </a>
      <Tooltip
        id="my-tooltip"
        style={{ backgroundColor: 'rgb(255, 255, 255)', color: '#000' }}
      />
    </div>
  );
};
export default Founder;
