import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'Accommodations', path: '/accommodations' },
    { name: 'Dining', path: '/dining' },
    { name: 'Local Guide', path: '/local-guide' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className={`font-serif text-2xl font-bold tracking-widest ${isScrolled || mobileMenuOpen ? 'text-navy-900' : 'text-white'}`}>
            SERENITY<span className="text-gold-500">SANDS</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-bold tracking-widest uppercase hover:text-gold-500 transition-colors ${
                    isActive ? 'text-gold-500' : isScrolled ? 'text-navy-900' : 'text-white/90 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button className="bg-gold-500 text-white px-6 py-2 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-gold-600 transition-colors">
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className="text-navy-900" size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-navy-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-serif ${isActive ? 'text-gold-600' : 'text-navy-900'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-navy-900 text-stone-300 pt-20 pb-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-800 pb-12">
          <div>
            <h4 className="text-2xl font-serif font-bold text-white mb-6">SERENITY<span className="text-gold-500">SANDS</span></h4>
            <p className="leading-relaxed mb-6">Experience the pinnacle of luxury in our secluded paradise. Where timeless elegance meets modern comfort.</p>
            <div className="flex gap-4">
              <Instagram className="hover:text-gold-500 cursor-pointer transition-colors" />
              <Facebook className="hover:text-gold-500 cursor-pointer transition-colors" />
              <Twitter className="hover:text-gold-500 cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold-500">A.</span> Private Island, Maldives
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-500" /> +1 (555) 123-4567
              </li>
              <li>concierge@serenitysands.com</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Explore</h5>
            <ul className="space-y-3">
              <li><NavLink to="/accommodations" className="hover:text-gold-500 transition-colors">Villas & Suites</NavLink></li>
              <li><NavLink to="/dining" className="hover:text-gold-500 transition-colors">Dining & Bars</NavLink></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Spa & Wellness</a></li>
              <li><NavLink to="/local-guide" className="hover:text-gold-500 transition-colors">Experiences</NavLink></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Newsletter</h5>
            <p className="mb-4 text-sm">Subscribe for exclusive offers and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-stone-800 border-none text-white p-3 w-full focus:ring-1 focus:ring-gold-500 outline-none" />
              <button className="bg-gold-500 text-navy-900 px-4 font-bold hover:bg-gold-400 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-8 text-center text-sm text-stone-600">
          © 2024 Serenity Sands Resort. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
