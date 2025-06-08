import AnimatedButton from './AnimatedButton';
import reviews from '../assets/images/reviews.png';
import Copy from '../assets/icons/copy.svg?react';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

const Footer = () => {
  return (
    <div className="p-20 space-y-20 dark:bg-black dark-transition text-black dark:text-white">
      <header className="flex flex-col items-center bg-black text-white gap-10 max-w-250 mx-auto px-20 rounded-xl py-20">
        <h1 className="text-7xl font-bold">Have an idea?</h1>
        <p className="text-xl max-w-150">
          If you feel like we're a good fit, please reach out so we can get to
          know each other and discuss your upcoming project.
        </p>
        <AnimatedButton text="Contact Us" />
      </header>

      <footer>
        <div className="flex gap-30 items-center justify-between">
          <div className="flex flex-col gap-5 max-w-100">
            <h1>
              <img src="https://placehold.co/180x40" />
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis facilis deleniti, sint delectus,repudiandae
              voluptatibus doloribus odio labore commodi ut.
            </p>
            <form className="flex gap-5 flex-col">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-black text-white p-5 inline-block rounded-lg w-full"
              ></input>
              <AnimatedButton text="Subscribe for updates" effectSize={110} />
            </form>
            <div className="flex gap-5">
              <a
                href="mailto:"
                className="underline p-1 hover:bg-purple text-lg rounded-sm bg-black/5"
              >
                hello@gmail.com
              </a>
              <button
                onClick={() => {
                  copyToClipboard('hello@gmail.com');
                }}
                className="cursor-pointer hover:text-purple"
              >
                <span className="flex items-center text-sm">
                  <Copy width={40} height={40} />
                  Copy
                </span>
              </button>
            </div>
            <p className="text-lg">
              or give us a call:{' '}
              <a
                href="tel:"
                className="underline p-1 hover:bg-purple rounded-sm bg-black/5"
              >
                1234567890
              </a>
            </p>
            <img src={reviews} width={30} height={20} />
          </div>
          <nav className="grid grid-cols-3 gap-x-20">
            <div className="">
              <h2 className="font-semibold text-lg mb-5">Services</h2>
              <ul className="space-y-5 *:hover:underline">
                <li>
                  <a href="">Code Reviews & Security Audits</a>
                </li>
                <li>
                  <a href="">Cloud & DevOps</a>
                </li>
                <li>
                  <a href="">Prototyping & MVP Validation</a>
                </li>
                <li>
                  <a href="">Custom Software Development</a>
                </li>
                <li>
                  <a href="">Technical Strategy & Architecture</a>
                </li>
                <li>
                  <a href="">UI/UX Design</a>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg mb-5">Company</h2>
              <ul className="space-y-5 *:hover:underline">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Services</a>
                </li>
                <li>
                  <a href="">Work</a>
                </li>
                <li>
                  <a href="">Insights</a>
                </li>
                <li>
                  <a href="">FAQs</a>
                </li>
                <li>
                  <a href="">Reviews</a>
                </li>
                <li>
                  <a href="">Pay Monthly</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Start your project</a>
                </li>
              </ul>
            </div>
            <div className="">
              <h2 className="font-semibold text-lg mb-5">Policies</h2>
              <ul className="space-y-5 *:hover:underline">
                <li>
                  <a href="">Cookies</a>
                </li>
                <li>
                  <a href="">Privacy</a>
                </li>
                <li>
                  <a href="">GDPR</a>
                </li>
                <li>
                  <a href="">Terms & Conditions</a>
                </li>
                <li>
                  <a href="">Accessibility</a>
                </li>
                <li>
                  <a href="">Modern Slavery Act</a>
                </li>
                <li>
                  <a href="">Recruitment Policy</a>
                </li>
                <li>
                  <a href="">Sitemap</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
