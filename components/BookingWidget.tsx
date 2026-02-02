import React, { useState } from 'react';
import { Calendar, Users, ChevronDown } from 'lucide-react';

export const BookingWidget: React.FC = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 md:p-6 lg:flex gap-4 items-end max-w-5xl mx-auto -mt-16 relative z-30 border border-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {/* Check In */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Check In</label>
          <div className="relative">
            <input type="date" className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-gold-500 text-stone-700 font-medium" />
          </div>
        </div>

        {/* Check Out */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Check Out</label>
          <div className="relative">
            <input type="date" className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-gold-500 text-stone-700 font-medium" />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Guests</label>
          <div className="relative">
            <select className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-gold-500 text-stone-700 font-medium appearance-none">
              <option>2 Adults, 0 Children</option>
              <option>2 Adults, 1 Child</option>
              <option>1 Adult</option>
              <option>Family (4+)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-stone-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Submit */}
        <button className="w-full bg-navy-900 hover:bg-navy-800 text-gold-400 font-serif font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2 h-[50px] self-end">
          Check Availability
        </button>
      </div>
    </div>
  );
};
