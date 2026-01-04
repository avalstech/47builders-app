
import { Project, Quote, Milestone, User, BuilderProfile } from '../types';
import { MOCK_USERS, MOCK_BUILDER_PROFILES } from '../constants';

class DatabaseService {
  private getStorage<T>(key: string): T[] {
    const data = localStorage.getItem(`47builders_${key}`);
    return data ? JSON.parse(data) : [];
  }

  private setStorage<T>(key: string, data: T[]): void {
    localStorage.setItem(`47builders_${key}`, JSON.stringify(data));
  }

  // Projects
  getProjects(): Project[] { return this.getStorage<Project>('projects'); }
  saveProject(project: Project) {
    const projects = this.getProjects();
    projects.push(project);
    this.setStorage('projects', projects);
  }
  updateProject(updated: Project) {
    const projects = this.getProjects().map(p => p.id === updated.id ? updated : p);
    this.setStorage('projects', projects);
  }

  // Quotes
  getQuotes(): Quote[] { return this.getStorage<Quote>('quotes'); }
  saveQuote(quote: Quote) {
    const quotes = this.getQuotes();
    quotes.push(quote);
    this.setStorage('quotes', quotes);
  }

  // Users & Profiles
  getUsers(): User[] {
    const stored = this.getStorage<User>('users');
    return stored.length > 0 ? stored : MOCK_USERS;
  }
  getBuilderProfiles(): BuilderProfile[] {
    const stored = this.getStorage<BuilderProfile>('builder_profiles');
    return stored.length > 0 ? stored : MOCK_BUILDER_PROFILES;
  }

  // Initialization (Seed data if empty)
  init() {
    if (this.getStorage('users').length === 0) {
      this.setStorage('users', MOCK_USERS);
      this.setStorage('builder_profiles', MOCK_BUILDER_PROFILES);
    }
  }
}

export const db = new DatabaseService();
