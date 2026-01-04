
import React from 'react';
import { db } from '../services/db';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { ProjectStatus } from '../types';

const Projects: React.FC = () => {
  const projects = db.getProjects();

  const getStatusColor = (status: ProjectStatus) => {
    switch(status) {
      case 'IN_PROGRESS': return 'bg-blue-50 text-blue-600';
      case 'COMPLETED': return 'bg-green-50 text-green-600';
      case 'MATCHING': return 'bg-amber-50 text-amber-600';
      case 'DISPUTED': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (projects.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-4">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center">
          <Clock size={32} className="text-zinc-300" />
        </div>
        <h3 className="font-bold text-lg">No projects yet</h3>
        <p className="text-sm text-zinc-500">When you start a project, it will appear here to help you track progress and payments.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-zinc-900">Your Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-4">
            <div className="flex justify-between items-start">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ')}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium">Created {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-bold text-zinc-900 text-lg">{project.projectType.replace('_', ' ')}</h4>
              <div className="flex items-center text-zinc-500 text-xs">
                <MapPin size={12} className="mr-1" />
                {project.locationCity}, {project.locationState}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-400 uppercase font-bold">Budget</p>
                <p className="text-sm font-bold text-zinc-900">{project.budgetRange}</p>
              </div>
              <button className="p-2 bg-zinc-900 text-white rounded-lg">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
