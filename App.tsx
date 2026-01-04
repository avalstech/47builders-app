
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './screens/Home';
import Projects from './screens/Projects';
import CreateProject from './screens/CreateProject';
import AdminDashboard from './screens/AdminDashboard';
import { db } from './services/db';
import { UserRole, Project } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CLIENT');
  const [activeTab, setActiveTab] = useState('home');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [selectedProId, setSelectedProId] = useState<string | null>(null);

  useEffect(() => {
    db.init();
  }, []);

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'clientId' | 'status' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      clientId: 'c1',
      status: 'MATCHING',
      locationState: 'Nigeria',
      createdAt: new Date().toISOString()
    };
    db.saveProject(newProject);
    setIsCreatingProject(false);
    setActiveTab('projects');
  };

  const renderContent = () => {
    if (role === 'ADMIN') {
      switch(activeTab) {
        case 'dashboard': return <AdminDashboard />;
        default: return <div className="p-10 bg-white rounded-2xl border border-gray-100 text-zinc-400">Section coming soon...</div>;
      }
    }

    if (isCreatingProject) {
      return <CreateProject onBack={() => setIsCreatingProject(false)} onSubmit={handleCreateProject} />;
    }

    switch(activeTab) {
      case 'home': 
        return <Home 
          onSelectPro={(id) => setSelectedProId(id)} 
          onCreateProject={() => setIsCreatingProject(true)} 
        />;
      case 'projects': return <Projects />;
      default: 
        return (
          <div className="flex flex-col items-center justify-center p-20 text-zinc-400 space-y-4">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center">
              <span className="text-2xl opacity-50">🏗️</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-center">{activeTab.replace('-', ' ')} coming soon</p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Role Switcher (For Prototype) */}
      <div className="fixed top-2 right-2 z-50 flex space-x-2">
        <select 
          value={role} 
          onChange={(e) => {
            const r = e.target.value as UserRole;
            setRole(r);
            setActiveTab(r === 'ADMIN' ? 'dashboard' : 'home');
          }}
          className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold shadow-xl focus:outline-none"
        >
          <option value="CLIENT">Client View</option>
          <option value="BUILDER">Builder View</option>
          <option value="ADMIN">Admin View</option>
        </select>
      </div>

      <Layout role={role} activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </>
  );
};

export default App;
