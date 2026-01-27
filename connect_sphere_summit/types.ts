import { LucideIcon } from "lucide-react";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
  bio?: string;
  sessionTitle?: string;
  sessionTime?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  type: string; // Conference, Workshop, etc.
  date: string;
  time: string;
  speaker: string;
  imageUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface AudienceType {
  id: string; // Added ID for selection
  label: string;
  icon: LucideIcon;
  description: string;
  image: string; // Moved image to type definition
}

export interface CategoryEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  imageUrl: string;
  organizer?: string;
}

export interface CategoryDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  events: CategoryEvent[];
}