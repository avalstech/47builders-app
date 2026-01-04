
import React from 'react';
import { Home, ClipboardList, MessageSquare, CreditCard, User, Menu, Search, Briefcase, ShieldCheck, Activity } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role }) => {
  const isMobile = true; // In this context we treat everything as mobile-first app shell

  const clientTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: ClipboardList },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const builderTabs = [
    { id: 'jobs', label: 'Jobs', icon: Search },
    { id: 'milestones', label: 'Milestones', icon: ClipboardList },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'wallet', label: 'Wallet', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const adminTabs = [
    { id: 'dashboard', label: 'Overview', icon: Activity },
    { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
    { id: 'all-projects', label: 'Projects', icon: Briefcase },
    { id: 'users', label: 'Users', icon: User },
  ];

  const tabs = role === 'CLIENT' ? clientTabs : role === 'BUILDER' ? builderTabs : adminTabs;

  if (role === 'ADMIN') {
    return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-zinc-900 text-white flex flex-col">
          <div className="p-6 border-b border-zinc-800">
            <h1 className="brand-font text-2xl font-bold text-[#D4AF37]">47Builders</h1>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-[#D4AF37] text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {/* Main Admin Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-100">
      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-gray-50 bg-white sticky top-0 z-10">
        <h1 className="brand-font text-2xl font-bold text-zinc-900">47Builders</h1>
        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
          <Menu size={18} className="text-zinc-600" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === tab.id ? 'text-[#D4AF37]' : 'text-zinc-400'
            }`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
