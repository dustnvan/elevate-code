import { useState } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
};
export default HomePage;
