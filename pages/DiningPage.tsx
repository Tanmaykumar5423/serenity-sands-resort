import React from 'react';
import { DINING } from '../constants';

export const DiningPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <h1 className="text-5xl md:text-6xl font-serif text-navy-900 mb-6">Culinary Journeys</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Savor the flavors of the world. Our chefs use only the freshest locally sourced ingredients 
            to create culinary masterpieces that delight the palate and the soul.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {DINING.map((venue) => (
            <div key={venue.id} className="bg-white p-4 md:p-8 rounded-sm shadow-sm flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-1/2 h-80 overflow-hidden rounded-sm">
                 <img src={venue.image} alt={venue.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="w-full md:w-1/2 text-center md:text-left">
                  <span className="text-gold-600 font-bold tracking-widest uppercase text-xs mb-2 block">{venue.type} • {venue.cuisine}</span>
                  <h2 className="text-3xl font-serif text-navy-900 mb-4">{venue.name}</h2>
                  <p className="text-stone-600 mb-6 leading-relaxed">{venue.description}</p>
                  <button className="border-b border-navy-900 text-navy-900 pb-1 font-bold uppercase tracking-widest text-sm hover:text-gold-600 hover:border-gold-600 transition-colors">
                    View Menu
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
