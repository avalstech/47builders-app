
export type UserRole = 'CLIENT' | 'BUILDER' | 'ADMIN';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  verified: boolean;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NONE';
  createdAt: string;
}

export interface BuilderProfile {
  userId: string;
  trades: string[];
  bio: string;
  serviceCities: string[];
  portfolioMedia: string[];
  ratingAvg: number;
  ratingCount: number;
  pricingNote?: string;
  responseTime?: string;
}

export type ProjectStatus = 'DRAFT' | 'MATCHING' | 'IN_PROGRESS' | 'COMPLETED' | 'DISPUTED';

export interface Project {
  id: string;
  clientId: string;
  locationCity: string;
  locationState: string;
  projectType: 'NEW_BUILD' | 'RENOVATION' | 'EXTENSION' | 'INTERIOR' | 'COMMERCIAL';
  budgetRange: string;
  startDate: string;
  description: string;
  images: string[];
  status: ProjectStatus;
  createdAt: string;
}

export type MilestoneStatus = 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'PAID';

export interface Milestone {
  id: string;
  projectId: string;
  quoteId: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  proofMedia?: string[];
  proofNotes?: string;
  createdAt: string;
}

export interface Quote {
  id: string;
  projectId: string;
  builderId: string;
  amount: number;
  timelineText: string;
  milestones: Milestone[];
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  receiverId: string;
  text: string;
  media?: string[];
  createdAt: string;
}

export interface Payment {
  id: string;
  projectId: string;
  milestoneId: string;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  reference: string;
  createdAt: string;
}

export interface Review {
  id: string;
  projectId: string;
  clientId: string;
  builderId: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  projectId: string;
  openedById: string;
  reason: string;
  status: 'OPEN' | 'RESOLVED';
  adminNotes?: string;
  createdAt: string;
}
