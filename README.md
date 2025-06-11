# Framer Dashboard Clone

A modern, feature-rich dashboard application inspired by Framer's interface, built with Next.js, TypeScript, and Framer Motion. This project demonstrates advanced React patterns, smooth animations, and professional UI/UX design.

## 🎯 Project Overview

This is a comprehensive dashboard clone that recreates the core functionality and design patterns found in Framer's project management interface. The application features project management, drag & drop functionality, a command palette system, and a sophisticated folder organization system.

## ✨ Key Features

### 🎨 **User Interface**

- **Modern Dark Theme**: Professional dark interface with carefully crafted color schemes
- **Responsive Design**: Fully responsive layout that works across all device sizes
- **Smooth Animations**: Powered by Framer Motion for fluid, professional interactions
- **Micro-interactions**: Detailed hover states, loading animations, and visual feedback

### 📁 **Project Management**

- **Project CRUD Operations**: Create, read, update, and delete projects
- **Project Status Tracking**: Draft, Published, Archived states with visual indicators
- **Project Metadata**: Thumbnails, descriptions, tags, and last viewed timestamps

### 🗂️ **Folder System**

- **Hierarchical Organization**: Organize projects into custom folders
- **Drag & Drop**: Intuitive drag and drop to move projects between folders
- **Smart Filtering**: Filter projects by folder, status, and custom criteria
- **Folder Management**: Create, rename, and manage project folders

### ⌨️ **Command Palette**

- **Global Search**: Cmd+K/Ctrl+K shortcut for quick access
- **Fuzzy Search**: Intelligent search across all actions and projects
- **Keyboard Navigation**: Full keyboard support with arrow key navigation
- **Action System**: Quick access to common actions and project operations

### 📊 **Dashboard Analytics**

- **Project Statistics**: Real-time metrics and project counts
- **Activity Timeline**: Track recent project activities and changes
- **Visual Charts**: Progress indicators and status distributions
- **Performance Metrics**: Project engagement and usage analytics

### 🎛️ **Advanced Features**

- **Modal System**: Comprehensive modal architecture for project editing
- **Toast Notifications**: Real-time feedback system for user actions
- **Local Storage Persistence**: Data persistence across browser sessions
- **Theme System**: Consistent design system with theme management
- **Type Safety**: Full TypeScript implementation with strict type checking

## 🛠️ Tech Stack

### **Core Framework**

- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & Animation**

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.16.0](https://www.framer.com/motion/)** - Production-ready motion library

### **Drag & Drop**

- **[@dnd-kit/core 6.3.1](https://dndkit.com/)** - Modern drag and drop toolkit
- **[@dnd-kit/sortable 10.0.0](https://dndkit.com/)** - Sortable drag and drop utilities
- **[@dnd-kit/utilities 3.2.2](https://dndkit.com/)** - Additional DnD utilities

### **Data Validation**

- **[Zod 3.25.56](https://zod.dev/)** - TypeScript-first schema validation

### **Development Tools**

- **[ESLint 9](https://eslint.org/)** - Code linting and formatting
- **[@eslint/eslintrc 3](https://eslint.org/)** - ESLint configuration utilities

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout component
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── modals/            # Modal components
│   │   ├── AccountModal.tsx
│   │   ├── ContactModal.tsx
│   │   ├── SettingsModal.tsx
│   │   └── UpdatesModal.tsx
│   ├── CommandPalette.tsx      # Command palette component
│   ├── CommandPaletteProvider.tsx # Command palette context
│   ├── CreateProjectCard.tsx   # New project creation
│   ├── Dashboard.tsx           # Analytics dashboard
│   ├── DragDropZone.tsx       # Drop zone component
│   ├── DraggableProject.tsx   # Draggable project wrapper
│   ├── EditProjectModal.tsx   # Project editing modal
│   ├── Header.tsx             # Application header
│   ├── InviteMemberModal.tsx  # Team invitation modal
│   ├── Modal.tsx              # Base modal component
│   ├── NewProjectModal.tsx    # New project modal
│   ├── ProjectCard.tsx        # Project card component
│   ├── ProjectListItem.tsx    # List view project item
│   ├── ProjectsHeader.tsx     # Projects section header
│   ├── Sidebar.tsx            # Navigation sidebar
│   └── Toast.tsx              # Toast notification system
├── hooks/                  # Custom React hooks
│   ├── useCommandPalette.tsx  # Command palette logic
│   ├── useDashboard.tsx       # Dashboard state management
│   ├── useFolders.tsx         # Folder management
│   ├── useLocalStorage.tsx    # Local storage utilities
│   ├── useProjects.tsx        # Project state management
│   ├── useTheme.tsx           # Theme management
│   └── useToast.tsx           # Toast notifications
└── types/                  # TypeScript type definitions
    └── index.ts           # Project type definitions
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm**, **yarn**, **pnpm**, or **bun** - Package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd framer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server
- **`npm run lint`** - Run ESLint for code quality checks

## 🎮 Usage Guide

### Basic Navigation

- **Sidebar**: Navigate between different folder views and access settings
- **Command Palette**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) for quick actions
- **Project Cards**: Click on any project to view details and edit properties

### Project Management

1. **Create Project**: Click the "+" card or use the command palette
2. **Edit Project**: Click the three-dot menu on any project card
3. **Move Projects**: Drag and drop projects between folders
4. **Bulk Actions**: Use checkboxes to select multiple projects

### Folder Organization

1. **Create Folder**: Use the command palette or sidebar actions
2. **Move Projects**: Drag projects to folder names in the sidebar
3. **Filter by Folder**: Click on folder names to filter projects

### Keyboard Shortcuts

- **`Cmd+K` / `Ctrl+K`**: Open command palette
- **`Escape`**: Close modals and command palette
- **`↑↓`**: Navigate command palette results
- **`Enter`**: Execute selected command

## 🎨 Design System

### Color Palette

- **Background**: `#0a0a0a` (Primary), `#1a1a1a` (Secondary)
- **Borders**: `#2a2a2a`, `#333333`, `#444444`
- **Text**: `#ffffff` (Primary), `#888888` (Secondary)
- **Accent**: `#3b82f6` (Blue), `#10b981` (Green), `#f59e0b` (Amber)

### Typography

- **Font Family**: Geist (Vercel's custom font)
- **Font Sizes**: Tailwind's scale (text-xs to text-4xl)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold)

### Animations

- **Duration**: 200ms (quick), 300ms (normal), 500ms (slow)
- **Easing**: Framer Motion's default spring animations
- **Hover Effects**: Scale (1.02-1.05), opacity, and color transitions

## 🔧 Development Notes

### State Management

- **Local State**: React useState and useReducer hooks
- **Global State**: Custom context providers for shared state
- **Persistence**: Local storage for data persistence across sessions

### Performance Optimizations

- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useCallback**: Memoized callbacks for stable references
- **Lazy Loading**: Dynamic imports for non-critical components
- **Optimistic Updates**: Immediate UI feedback with data synchronization

### Code Quality

- **TypeScript**: Strict type checking for all components and hooks
- **ESLint**: Configured for Next.js and React best practices
- **Component Architecture**: Separation of concerns with custom hooks
- **Error Boundaries**: Graceful error handling throughout the application

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🚀 Deployment

This project is optimized for deployment on **Vercel**, but can be deployed on any platform that supports Next.js:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**

   ```bash
   npx vercel
   ```

3. **Other platforms**: Follow platform-specific Next.js deployment guides

## 📄 License

This project is for educational and portfolio purposes. Please respect Framer's original design and trademark.

---

**Built using Next.js, TypeScript, and Framer Motion**
