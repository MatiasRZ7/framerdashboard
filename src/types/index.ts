export interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  lastViewedAt?: Date;
  status: "draft" | "published" | "archived";
  plan: "free" | "pro" | "team";
  folder?: string;
  tags: string[];
  collaborators: Collaborator[];
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "editor" | "viewer";
}

export interface ProjectFolder {
  id: string;
  name: string;
  icon: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  totalProjects: number;
  projectsThisMonth: number;
  projectsThisWeek: number;
  mostUsedTags: { tag: string; count: number }[];
  projectsByStatus: { status: string; count: number }[];
  projectsByFolder: { folder: string; count: number }[];
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: "created" | "updated" | "archived" | "moved" | "deleted";
  projectId: string;
  projectName: string;
  timestamp: Date;
  description: string;
  folder?: string;
}

export type ProjectSortBy = "lastViewed" | "created" | "updated" | "name";
export type ProjectFilterBy =
  | "all"
  | "draft"
  | "published"
  | "archived"
  | string; // string for folder IDs

export interface Workspace {
  id: string;
  name: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
