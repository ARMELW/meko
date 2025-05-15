import { Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative flex justify-between items-center bg-blue-900 mt-20 px-6 py-4 text-white">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Phone size={20} />
          <span>+33 14 685 00 10</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail size={20} />
          <span>contact@mekoacademy.fr</span>
        </div>
      </div>

      <div className="bottom-1/2 left-1/2 absolute -translate-x-1/2 transform">
        <img
          src="/logo-circle.svg"
          alt="Meko Academy"
          className="rounded-full w-16 h-16"
        />
      </div>

      <div className="flex items-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <Facebook size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <Instagram size={20} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
          <Youtube size={20} />
        </a>
      </div>
    </footer>
  );
}
