import React from 'react';
import { BookingWidget } from '../components/BookingWidget';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROOMS, DINING } from '../constants';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-navy-900">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Resort Aerial View" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-16">
          <p className="text-gold-400 font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">Welcome to Paradise</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-8 leading-tight">
            Escape to <br/><span className="italic text-gold-200">Serenity</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10 font-light">
            Discover a sanctuary of peace and luxury where the ocean meets the sky. 
            Experience world-class service, exquisite dining, and unforgettable moments.
          </p>
          <Link to="/accommodations" className="inline-block border border-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-navy-900 transition-all duration-300">
            Explore Villas
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-6 relative z-20 mb-20">
        <BookingWidget />
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="md:w-1/2">
              <div className="relative">
                <img src="https://picsum.photos/600/800?random=10" alt="Relaxation" className="w-full h-[600px] object-cover rounded-sm shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 bg-gold-100 p-8 shadow-lg max-w-xs hidden lg:block">
                  <p className="font-serif text-2xl text-navy-900 italic">"The most relaxing vacation of our lives. Pure magic."</p>
                  <div className="flex gap-1 text-gold-500 mt-4">
                    <Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <span className="text-gold-600 font-bold tracking-widest uppercase text-sm">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mt-4 mb-6">A Sanctuary for the Senses</h2>
              <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                At Serenity Sands, we believe luxury lies in the details. From the moment you arrive, 
                you are enveloped in an atmosphere of tranquility. Our dedicated team ensures every 
                preference is met with a smile, crafting a personalized experience that lingers in 
                memory long after you depart.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-3xl font-serif text-gold-600 mb-2">5-Star</h3>
                  <p className="text-sm text-stone-500 uppercase tracking-wide">Accommodations</p>
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-gold-600 mb-2">3</h3>
                  <p className="text-sm text-stone-500 uppercase tracking-wide">Signature Restaurants</p>
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-gold-600 mb-2">24/7</h3>
                  <p className="text-sm text-stone-500 uppercase tracking-wide">Butler Service</p>
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-gold-600 mb-2">Private</h3>
                  <p className="text-sm text-stone-500 uppercase tracking-wide">Island Access</p>
                </div>
              </div>
              <Link to="/local-guide" className="inline-flex items-center gap-2 mt-10 text-navy-900 font-bold border-b border-gold-500 pb-1 hover:text-gold-600 transition-colors">
                Discover Local Experiences <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-bold tracking-widest uppercase text-sm">Accommodations</span>
            <h2 className="text-4xl md:text-5xl font-serif text-navy-900 mt-3">Stay in Luxury</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROOMS.slice(0,3).map((room) => (
              <div key={room.id} className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-sm overflow-hidden">
                <div className="relative overflow-hidden h-64">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-navy-900 mb-2">{room.name}</h3>
                  <p className="text-stone-500 mb-6 text-sm line-clamp-2">{room.description}</p>
                  <div className="flex justify-between items-center border-t border-stone-100 pt-6">
                    <span className="text-gold-600 font-bold font-serif text-xl">${room.price} <span className="text-xs text-stone-400 font-sans font-normal uppercase">/ Night</span></span>
                    <Link to="/accommodations" className="text-navy-900 hover:text-gold-500 text-sm font-bold uppercase tracking-wider">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
