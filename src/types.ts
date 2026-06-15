export interface Contact {
  address: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface Profile {
  name: string;
  contact: Contact;
  summary: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

export interface Project {
  title: string;
  url: string;
  subtitle: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  location: string;
  gpa: number;
  honors?: string;
}
