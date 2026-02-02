import React from 'react';
import { ROOMS } from '../constants';
import { Check } from 'lucide-react';

export const AccommodationsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-navy-900 mb-6">Our Accommodations</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Each of our villas and suites is a masterpiece of design, blending contemporary luxury with indigenous elements. 
            Enjoy total privacy, breathtaking views, and bespoke amenities.
          </p>
        </div>

        <div className="space-y-24">
          {ROOMS.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
              <div className="lg:w-1/2 w-full">
                <div className="relative overflow-hidden rounded-sm shadow-xl aspect-[4/3]">
                   <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <span className="text-gold-600 font-bold tracking-widest uppercase text-sm mb-2 block">Sleeps {room.maxGuests} Guests</span>
                <h2 className="text-4xl font-serif text-navy-900 mb-6">{room.name}</h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-8">{room.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-stone-700">
                      <Check size={16} className="text-gold-500" />
                      <span className="text-sm uppercase tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-3xl font-serif text-navy-900 font-bold">${room.price}</span>
                    <span className="text-stone-500 ml-2">/ night</span>
                  </div>
                  <button className="bg-navy-900 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-colors">
                    Book This Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
