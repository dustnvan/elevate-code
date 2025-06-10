import AnimatedButton from './AnimatedButton';
import reviews from '../assets/images/reviews.png';
import stevejobs from '../assets/images/founders/stevejobs.png';
import elonmusk from '../assets/images/founders/elonmusk.png';
import markzuckerburg from '../assets//images/founders/markzuckerburg.png';
import Founder from './Founder';
const Hero = () => {
  return (
    <div className="bg-black h-screen flex items-center">
      <div className="w-full max-w-400 mx-auto">
        <div className="px-4 lg:px-20 xl:px-40 flex text-white justify-between">
          <div className=" max-w-200">
            <h2 className="text-4xl lg:text-6xl/18">
              Helping startups go from <b className="font-weight-900">idea</b>{' '}
              to <b className="font-weight-900">impact</b>
            </h2>
            <div className="mt-10 flex sm:flex-row flex-col gap-10 items-start sm:items-center">
              <AnimatedButton text="Get In Touch" />
              <img
                src={reviews}
                width={150}
                height={80}
                className="h-12 xl:hidden"
              />
            </div>
          </div>
          <div className="hidden xl:block self-end max-w-100">
            <p className="text-base/8">
              We deliver software solutions and technical consulting to cut
              delays, reduce costs, and help startups launch faster with clean,
              scalable code.
            </p>
            <div className="mt-10 flex gap-5 items-center ">
              <div className="flex relative w-30 items-center">
                <div className="flex justify-center align-center absolute right-12">
                  <Founder
                    name="Elon Musk"
                    description="Founder of Tesla and SpaceX"
                    headshot={elonmusk}
                  />
                </div>
                <div className="flex justify-center align-center absolute right-6 z-10">
                  <Founder
                    name="Steve Jobs"
                    description="Co-founder of Apple"
                    headshot={stevejobs}
                  />
                </div>
                <div className="flex justify-center align-center absolute right-0 z-20">
                  <Founder
                    name="Mark Zuckerburg"
                    description="Co-founder of Meta"
                    headshot={markzuckerburg}
                  />
                </div>
              </div>
              <p className="text-xs">Loved by 500+ Founders</p>
              <img src={reviews} width={150} height={80} className="h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
