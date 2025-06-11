"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Project, ProjectSortBy, ProjectFilterBy } from "@/types";
import { localStorageKeys } from "./useLocalStorage";
import { useFolders } from "./useFolders";

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Portfolio Website",
    description: "Personal portfolio with modern design",
    thumbnail: undefined,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    lastViewedAt: new Date("2024-01-21"),
    status: "published",
    plan: "free",
    tags: ["portfolio", "personal"],
    collaborators: [],
  },
  {
    id: "2",
    name: "E-commerce App",
    description: "Modern shopping experience",
    thumbnail: undefined,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    lastViewedAt: new Date("2024-01-19"),
    status: "draft",
    plan: "pro",
    tags: ["ecommerce", "react"],
    collaborators: [],
  },
  {
    id: "3",
    name: "Landing Page",
    description: "Product landing page design",
    thumbnail: undefined,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-15"),
    lastViewedAt: new Date("2024-01-16"),
    status: "published",
    plan: "free",
    tags: ["landing", "marketing"],
    collaborators: [],
  },
  {
    id: "4",
    name: "Dashboard UI",
    description: "Analytics dashboard interface",
    thumbnail: undefined,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-12"),
    lastViewedAt: new Date("2024-01-13"),
    status: "draft",
    plan: "team",
    tags: ["dashboard", "analytics"],
    collaborators: [],
  },
  {
    id: "5",
    name: "Old Website",
    description: "Previous company website",
    thumbnail: undefined,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-15"),
    lastViewedAt: new Date("2023-12-20"),
    status: "archived",
    plan: "free",
    tags: ["website", "old"],
    collaborators: [],
  },
  {
    id: "6",
    name: "Mobile App Prototype",
    description: "Early mobile app concepts",
    thumbnail: undefined,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-30"),
    lastViewedAt: new Date("2023-12-05"),
    status: "archived",
    plan: "pro",
    tags: ["mobile", "prototype"],
    collaborators: [],
  },
];

interface ProjectsContextType {
  projects: Project[];
  filteredProjects: Project[];
  archivedProjects: Project[];
  isLoading: boolean;
  sortBy: ProjectSortBy;
  filterBy: ProjectFilterBy;
  searchQuery: string;
  viewMode: "grid" | "list";
  openMenuId: string | null;
  setSortBy: (sort: ProjectSortBy) => void;
  setFilterBy: (filter: ProjectFilterBy) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setOpenMenuId: (id: string | null) => void;
  createProject: (name: string, description?: string) => void;
  duplicateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
  unarchiveProject: (id: string) => void;
  moveProjectToFolder: (projectId: string, folderId: string | null) => void;
  getProjectsByFolder: (folderId: string) => Project[];
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<ProjectSortBy>("lastViewed");
  const [filterBy, setFilterBy] = useState<ProjectFilterBy>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const { addActivity } = useFolders();

  // Load data from localStorage on mount
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);

      try {
        // Load projects from localStorage
        const savedProjects = localStorage.getItem(localStorageKeys.PROJECTS);
        const savedSortBy = localStorage.getItem(localStorageKeys.SORT_BY);
        const savedFilterBy = localStorage.getItem(localStorageKeys.FILTER_BY);
        const savedViewMode = localStorage.getItem(localStorageKeys.VIEW_MODE);

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);
          // Convert date strings back to Date objects
          const projectsWithDates = parsedProjects.map((project: any) => ({
            ...project,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
            lastViewedAt: project.lastViewedAt
              ? new Date(project.lastViewedAt)
              : null,
          }));
          setProjects(projectsWithDates);
        } else {
          // First time loading - use mock data
          setProjects(mockProjects);
        }

        if (savedSortBy) {
          setSortBy(savedSortBy as ProjectSortBy);
        }

        if (savedFilterBy) {
          setFilterBy(savedFilterBy as ProjectFilterBy);
        }

        if (savedViewMode) {
          setViewMode(savedViewMode as "grid" | "list");
        }
      } catch (error) {
        setProjects(mockProjects);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0 && !isLoading) {
      localStorage.setItem(localStorageKeys.PROJECTS, JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKeys.SORT_BY, sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.FILTER_BY, filterBy);
  }, [filterBy]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.VIEW_MODE, viewMode);
  }, [viewMode]);

  const filteredProjects = useCallback(() => {
    let filtered = projects;

    // Filter by status or folder
    if (filterBy !== "all") {
      if (
        filterBy === "archived" ||
        filterBy === "draft" ||
        filterBy === "published"
      ) {
        filtered = filtered.filter((project) => project.status === filterBy);
      } else {
        // Filter by folder ID
        filtered = filtered.filter((project) => project.folder === filterBy);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "lastViewed":
          return (
            (b.lastViewedAt?.getTime() || 0) - (a.lastViewedAt?.getTime() || 0)
          );
        case "created":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "updated":
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, filterBy, searchQuery, sortBy]);

  const archivedProjects = useCallback(() => {
    return projects.filter((project) => project.status === "archived");
  }, [projects]);

  const createProject = useCallback(
    (name: string, description = "") => {
      const newProject: Project = {
        id: Date.now().toString(),
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastViewedAt: new Date(),
        status: "draft",
        plan: "free",
        tags: [],
        collaborators: [],
      };
      setProjects((prev) => [newProject, ...prev]);

      addActivity({
        type: "created",
        projectId: newProject.id,
        projectName: newProject.name,
        description: `Created project "${newProject.name}"`,
      });
    },
    [addActivity]
  );

  const duplicateProject = useCallback((project: Project) => {
    const duplicatedProject: Project = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} Copy`,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastViewedAt: new Date(),
    };
    setProjects((prev) => [duplicatedProject, ...prev]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      )
    );
  }, []);

  const archiveProject = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, status: "archived", updatedAt: new Date() }
          : project
      )
    );
  }, []);

  const unarchiveProject = useCallback((id: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, status: "draft", updatedAt: new Date() }
          : project
      )
    );
  }, []);

  const moveProjectToFolder = useCallback(
    (projectId: string, folderId: string | null) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, folder: folderId || undefined, updatedAt: new Date() }
            : p
        )
      );

      addActivity({
        type: "moved",
        projectId,
        projectName: project.name,
        description: folderId
          ? `Moved "${project.name}" to folder`
          : `Moved "${project.name}" out of folder`,
        folder: folderId || undefined,
      });
    },
    [projects, addActivity]
  );

  const getProjectsByFolder = useCallback(
    (folderId: string) => {
      return projects.filter((project) => project.folder === folderId);
    },
    [projects]
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        filteredProjects: filteredProjects(),
        archivedProjects: archivedProjects(),
        isLoading,
        sortBy,
        filterBy,
        searchQuery,
        viewMode,
        openMenuId,
        setSortBy,
        setFilterBy,
        setSearchQuery,
        setViewMode,
        setOpenMenuId,
        createProject,
        duplicateProject,
        deleteProject,
        updateProject,
        archiveProject,
        unarchiveProject,
        moveProjectToFolder,
        getProjectsByFolder,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
}
