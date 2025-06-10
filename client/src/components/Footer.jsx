import AnimatedButton from './AnimatedButton';
import Copy from '../assets/icons/copy.svg?react';
import Logo from '../assets/icons/logo.svg?react';
import { useState } from 'react';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

const Footer = () => {
  const EMAIL = 'elevatecode@code.com';
  const [copyMsg, setCopyMsg] = useState('Copy');

  const handleCopy = () => {
    if (copyMsg === 'Copied!') return;
    copyToClipboard(EMAIL);
    setCopyMsg('Copied!');
    setTimeout(() => {
      setCopyMsg('Copy');
    }, 3000);
  };

  return (
    <div className="p-5 sm:p-20 space-y-20 dark-transition dark:bg-white dark:text-black bg-black text-white max-w-400 mx-auto">
      <header className="flex flex-col items-center bg-black gap-8 sm:gap-10 max-w-250 mx-auto p-5 py-10 sm:p-20 rounded-xl bg-white dark:bg-black dark-transition text-black dark:text-white">
        <h1 className="text-5xl sm:text-7xl font-bold">Have an idea?</h1>
        <p className="text-lg sm:text-xl max-w-180 text-center">
          Let's bring your ideas to life! If you are interested in discussing
          your upcoming project and how our software consulting services can
          help, contact us today.
        </p>
        <AnimatedButton text="Contact Us" />
      </header>

      <footer>
        <div className="flex lg:flex-row flex-col gap-20 items-center justify-between">
          <div className="flex flex-col gap-5 max-w-100">
            <span
              href="/"
              className="flex items-center gap-1 dark:text-black text-white dark-transition font-bold text-2xl"
            >
              <Logo width={50} height={50} />
              ElevateCode
            </span>
            <p>
              Empower your business with innovative software solutions that
              drive growth and efficiency.
            </p>
            <form className="flex gap-5 flex-col">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-black text-white p-5 inline-block rounded-lg w-full"
              ></input>
              <AnimatedButton text="Subscribe for updates" />
            </form>
            <div className="flex gap-5">
              <a
                href="mailto:"
                className="underline p-1 hover-supported:hover:bg-purple text-lg rounded-sm bg-black/5"
              >
                {EMAIL}
              </a>
              <button
                onClick={handleCopy}
                className="cursor-pointer hover:text-purple"
              >
                <span className="flex items-center text-sm">
                  <Copy width={40} height={40} />
                  {copyMsg}
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
          </div>
          <nav className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-20 self-start [&_a]:hover:underline">
            <div>
              <h2 className="font-semibold text-xl mb-5 ">SERVICES</h2>
              <ul className="space-y-5 ">
                <li>
                  <a href="/">Code Reviews </a>
                </li>
                <li>
                  <a href="/">Cloud & DevOps</a>
                </li>
                <li>
                  <a href="/">Prototyping </a>
                </li>
                <li>
                  <a href="/">Custom Software Development</a>
                </li>
                <li>
                  <a href="/">Technical Strategy </a>
                </li>
                <li>
                  <a href="/">UI/UX Design</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-xl mb-5">COMPANY</h2>
              <ul className="space-y-5">
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
                <li>
                  <a href="/">Team</a>
                </li>
                <li>
                  <a href="/">Mission & Vision</a>
                </li>
                <li>
                  <a href="/">Sustainability & Impact</a>
                </li>
                <li>
                  <a href="/">Partners & Affiliates</a>
                </li>
                <li>
                  <a href="/">Events & Webinars</a>
                </li>

                <li>
                  <a href="/">Investor Relations</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-xl mb-5">POLICIES</h2>
              <ul className="space-y-5">
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Terms of Service</a>
                </li>
                <li>
                  <a href="/">Cookie Policy</a>
                </li>
                <li>
                  <a href="/">Accessibility Policy</a>
                </li>
                <li>
                  <a href="/">Refund Policy</a>
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
