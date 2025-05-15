import { Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer className={`relative ${isMobile ? 'flex-col space-y-6 py-12' : ''} flex justify-between items-center bg-blue-900 mt-20 px-6 py-4 text-white`}>

      <div className={`${isMobile ? 'flex-col space-y-3' : ''} flex items-center space-x-6 ${isMobile ? 'space-x-0' : ''}`}>
        <div className="flex items-center space-x-2">
          <Phone size={20} />
          <span>+33 14 685 00 10</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail size={20} />
          <span>contact@mekoacademy.fr</span>
        </div>
      </div>

      <div className={`${isMobile ? 'relative mb-4 mt-4' : 'absolute bottom-1/2 left-1/2 -translate-x-1/2 transform'}`}>
        <img
          src="/logo-circle.svg"
          alt="Meko Academy"
          className={`rounded-full ${isMobile ? 'w-20 h-20' : 'w-16 h-16'}`}
        />
      </div>

      <div className="flex items-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <img src='/assets/facebook.svg' width={24} alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <img src='/assets/instagram.svg' width={24} alt="Instagram" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
          <img src='/assets/youtube.svg' width={24} alt="YouTube" />
        </a>
      </div>
    </footer>
  );
}
