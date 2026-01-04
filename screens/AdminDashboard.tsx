
import React from 'react';
import { Users, Briefcase, AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { db } from '../services/db';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AdminDashboard: React.FC = () => {
  const users = db.getUsers();
  const projects = db.getProjects();
  const builders = users.filter(u => u.role === 'BUILDER');
  const clients = users.filter(u => u.role === 'CLIENT');
  
  const stats = [
    { label: 'Total Projects', value: projects.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Builders', value: builders.length, icon: Users, color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
    { label: 'Pending Verification', value: builders.filter(b => b.verificationStatus === 'PENDING').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Open Disputes', value: 0, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const projectData = [
    { name: 'Completed', value: projects.filter(p => p.status === 'COMPLETED').length + 1 },
    { name: 'In Progress', value: projects.filter(p => p.status === 'IN_PROGRESS').length + 3 },
    { name: 'Matching', value: projects.filter(p => p.status === 'MATCHING').length + 2 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Platform Overview</h1>
        <p className="text-zinc-500">Real-time stats and platform health metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
          <h3 className="font-bold text-lg text-zinc-900">Project Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Verification Queue */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-zinc-900">Verification Queue</h3>
            <button className="text-xs font-bold text-[#D4AF37] hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {builders.slice(0, 3).map((builder) => (
              <div key={builder.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200" />
                  <div>
                    <p className="font-bold text-sm text-zinc-900">{builder.name}</p>
                    <p className="text-xs text-zinc-500">Registered {new Date(builder.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
