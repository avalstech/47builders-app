
import React from 'react';
// Added Activity to the imports from lucide-react
import { Search, MapPin, Star, Shield, ArrowRight, Activity } from 'lucide-react';
import { NIGERIAN_CITIES, TRADES, COLORS } from '../constants';
import { db } from '../services/db';

interface HomeProps {
  onSelectPro: (id: string) => void;
  onCreateProject: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectPro, onCreateProject }) => {
  const pros = db.getBuilderProfiles();
  const users = db.getUsers();

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-zinc-900 leading-tight">
          Build your <span className="text-[#D4AF37]">dream home</span> in Nigeria from anywhere.
        </h2>
        <p className="text-zinc-500 text-sm">
          Verified professionals, milestone payments, and real-time progress updates.
        </p>
        <button 
          onClick={onCreateProject}
          className="w-full py-4 bg-zinc-900 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-zinc-200"
        >
          <span>Start a Project</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for Architect, Plumber, Tiler..." 
          className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
        />
      </div>

      {/* Featured Cities */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-zinc-900">Popular Cities</h3>
          <button className="text-[#D4AF37] text-xs font-semibold">View All</button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {NIGERIAN_CITIES.map((city) => (
            <button key={city} className="flex-shrink-0 px-4 py-2 bg-zinc-100 rounded-full text-xs font-medium text-zinc-700 hover:bg-[#D4AF37] hover:text-white transition-colors">
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Professionals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-zinc-900">Verified Pros</h3>
          <button className="text-[#D4AF37] text-xs font-semibold">Browse All</button>
        </div>
        <div className="space-y-4">
          {pros.map((pro) => {
            const user = users.find(u => u.id === pro.userId);
            if (!user) return null;
            return (
              <div 
                key={pro.userId} 
                onClick={() => onSelectPro(pro.userId)}
                className="p-4 bg-white border border-gray-100 rounded-2xl flex space-x-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                  <img src={`https://picsum.photos/seed/${pro.userId}/200`} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-zinc-900 flex items-center">
                        {user.name}
                        {user.verified && <Shield size={14} className="ml-1 text-blue-500 fill-blue-500" />}
                      </h4>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                        {pro.trades.join(' • ')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="text-xs font-bold">{pro.ratingAvg}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-zinc-500 text-[11px] pt-1">
                    <MapPin size={10} className="mr-1" />
                    <span>Based in {user.city}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Icons */}
      <div className="grid grid-cols-4 gap-4">
        {TRADES.slice(0, 8).map((trade) => (
          <button key={trade} className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center group hover:bg-[#D4AF37] transition-colors">
               <Activity size={20} className="text-zinc-400 group-hover:text-white" />
            </div>
            <span className="text-[10px] text-zinc-500 font-medium">{trade}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
