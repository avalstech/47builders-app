
import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Upload, MapPin, Calendar, CreditCard } from 'lucide-react';
import { NIGERIAN_CITIES, COLORS } from '../constants';
import { Project } from '../types';

interface CreateProjectProps {
  onBack: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'clientId' | 'status' | 'createdAt'>) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    locationCity: '',
    locationState: '',
    projectType: 'NEW_BUILD' as any,
    budgetRange: '',
    startDate: '',
    description: '',
    images: [] as string[]
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const stepTitles = [
    'Location & Type',
    'Budget & Timeline',
    'Details & Media'
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-50 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 hover:text-zinc-900">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-bold text-zinc-900">New Project</h2>
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Step {step} of 3 • {stepTitles[step-1]}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase flex items-center">
                <MapPin size={12} className="mr-1" />
                Where is the project?
              </label>
              <select 
                value={formData.locationCity}
                onChange={(e) => setFormData({...formData, locationCity: e.target.value})}
                className="w-full p-4 bg-zinc-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm appearance-none"
              >
                <option value="">Select City</option>
                {NIGERIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase">Project Type</label>
              <div className="grid grid-cols-2 gap-3">
                {['NEW_BUILD', 'RENOVATION', 'EXTENSION', 'INTERIOR', 'COMMERCIAL'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, projectType: type as any})}
                    className={`p-4 text-xs font-bold rounded-xl border transition-all text-left ${
                      formData.projectType === type 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-zinc-900' 
                        : 'border-gray-100 text-zinc-400'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase flex items-center">
                <CreditCard size={12} className="mr-1" />
                Budget Range (USD/GBP equivalent)
              </label>
              <div className="space-y-3">
                {['$5k - $15k', '$15k - $50k', '$50k - $100k', '$100k+'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setFormData({...formData, budgetRange: range})}
                    className={`w-full p-4 text-sm font-semibold rounded-xl border text-left flex justify-between items-center ${
                      formData.budgetRange === range ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-100'
                    }`}
                  >
                    {range}
                    {formData.budgetRange === range && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase flex items-center">
                <Calendar size={12} className="mr-1" />
                Target Start Date
              </label>
              <input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full p-4 bg-zinc-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
              <textarea 
                placeholder="Briefly describe what you want to build..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={5}
                className="w-full p-4 bg-zinc-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase">Reference Images (Optional)</label>
              <div className="w-full h-32 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center space-y-2 text-zinc-400 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer relative">
                <Upload size={24} />
                <span className="text-xs font-medium">Click to upload images</span>
                <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-50 bg-white flex space-x-4">
        {step > 1 && (
          <button 
            onClick={prevStep}
            className="flex-1 py-4 bg-zinc-100 text-zinc-600 rounded-xl font-bold"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button 
            onClick={nextStep}
            disabled={step === 1 && !formData.locationCity}
            className="flex-[2] py-4 bg-zinc-900 text-white rounded-xl font-bold flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>Continue</span>
            <ChevronRight size={18} />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="flex-[2] py-4 bg-[#D4AF37] text-zinc-900 rounded-xl font-bold shadow-lg shadow-[#D4AF37]/20"
          >
            Create Project
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
