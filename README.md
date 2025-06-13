# Web Builder Inspired by Framer

This is a functional prototype of a Web Builder inspired by Framer, focused on replicating its visual editing experience with drag-and-drop, component system, and persistence. The backend (coming soon) will enable cloud storage, user login, and design sharing.

**Live Demo:** [https://framerdashboard.vercel.app](https://framerdashboard.vercel.app)

## 🎯 Project Overview

A complete web builder that replicates the Framer experience with a project dashboard and advanced visual editor. The project demonstrates modern React patterns, fluid animations, drag & drop, and scalable architecture for design applications.

## ✨ Key Features

### 🏠 **Project Dashboard**

- **Complete Project Management**: CRUD operations with local persistence
- **Folder System**: Hierarchical organization with drag & drop
- **Command Palette**: Global search with `Cmd+K` / `Ctrl+K`
- **Project States**: Draft, Published, Archived with visual indicators
- **Advanced Filters**: By folder, status, date, and custom tags

### 🎨 **Visual Web Builder**

- **Responsive Canvas**: Visual editing with breakpoints (Desktop, Tablet, Phone)
- **Advanced Drag & Drop**: Enhanced UX with hover indicators, expanded drag areas, and smooth animations
- **Tool System**: Select, Insert, Layout, Text, Vector, CMS with single-use functionality
- **Properties Panel**: Real-time editing of styles and content
- **Zoom Controls**: Zoom in/out with visual controls and keyboard shortcuts
- **Page Management**: Create and rename pages with elegant modal interface

### 🧩 **Component System**

- **Basic Elements**: Text, Button, Container, Image with customizable styles
- **Vector Shapes**: Rectangle, Oval, Polygon, Star, and custom paths
- **Predefined Templates**: Navigation bars, menus, and complex components
- **AI Assistant**: Element generation with natural text prompts
- **Layer Hierarchy**: Visual organization of elements with sidebar
- **Immediate Text Editing**: Click-to-create text with instant editing mode

### ⌨️ **Keyboard Shortcuts**

- **Ctrl+D**: Duplicate selected element
- **Delete**: Remove selected element
- **Escape**: Deselect element
- **T/B/C/I**: Add Text/Button/Container/Image
- **Ctrl +/-/0**: Zoom controls
- **Cmd+K**: Command palette

### 🎛️ **Advanced Features**

- **Local Persistence**: Automatic saving to localStorage
- **Asset System**: Upload and management of images and files
- **Breakpoint System**: Responsive design with real-time preview
- **Enhanced Drag & Drop**: Hover indicators, expanded drag areas, and visual feedback
- **Smart Tool Behavior**: Single-use tools with automatic deselection
- **Page Management**: Elegant modal system for creating and renaming pages
- **Empty Canvas State**: Always-visible canvas with helpful overlay messages
- **Undo/Redo**: (Coming soon) Change history
- **Export/Import**: (Coming soon) Export designs as code

## 🆕 Recent Improvements

### Enhanced Drag & Drop System

- **Expanded Drag Areas**: 8px larger drag zones for easier element manipulation
- **Visual Feedback**: Hover indicators with blue rings and subtle scaling effects
- **Drag Icons**: Move indicators that appear on hover for better UX
- **Conflict Prevention**: Smart detection to avoid conflicts between drag and resize operations

### Smart Tool Behavior

- **Single-Use Tools**: Text and Vector tools automatically deselect after creating elements
- **Immediate Text Editing**: Text elements become editable immediately upon creation
- **Vector Shape Panel**: Dedicated panel with 5 geometric shapes (Rectangle, Oval, Polygon, Star, Path)
- **Tool State Management**: Proper cleanup and state transitions between tools

### Page Management System

- **Elegant Modal Interface**: Replaced browser prompts with custom modal for page operations
- **Dual Functionality**: Single-click to switch pages, double-click to rename
- **Auto-Focus & Selection**: Text automatically selected when renaming for immediate editing
- **Keyboard Support**: Enter to confirm, Escape to cancel, with real-time validation

### Canvas Improvements

- **Always-Visible Canvas**: White canvas area visible even when empty
- **Helpful Overlays**: Informative messages for empty pages without blocking functionality
- **Consistent Sizing**: Proper canvas dimensions maintained across all page states
- **Better Visual Hierarchy**: Clear separation between canvas and surrounding interface

## 🛠️ Development Process

This project was developed with a modern and efficient approach based on:

- **Rapid and deep research with AI** (Deep Research OpenAI, Perplexity, DeepSeek, Anthropic, official documentation, forums).
- **Technical planning** in `Development.md` before writing code.
- **Development with contextual AI assistance** (Cursor AI), validating and testing each step.
- **Integration of continuous learning** through automatic feedback loops reflected in the repo.

This workflow allowed me to build, test, and adjust a complex system in a few days without compromising quality.

### 📚 Learning System

- **`learning.md`**: Automatic logging of errors and solutions
- **Feedback Loops**: Prevention of recurring errors
- **Best Practices**: Documentation of successful patterns
- **TypeScript Strict**: Early error detection

## 🛠️ Tech Stack

### **Core Framework**

- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & Animation**

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12.16.0](https://www.framer.com/motion/)** - Production-ready motion library
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons

### **Drag & Drop**

- **[@dnd-kit/core 6.3.1](https://dndkit.com/)** - Modern drag and drop toolkit
- **[@dnd-kit/sortable 10.0.0](https://dndkit.com/)** - Sortable drag and drop utilities
- **[@dnd-kit/utilities 3.2.2](https://dndkit.com/)** - Additional DnD utilities

### **Data Validation**

- **[Zod 3.25.56](https://zod.dev/)** - TypeScript-first schema validation

### **Development Tools**

- **[ESLint 9](https://eslint.org/)** - Code linting and formatting
- **Cursor AI** - AI-powered development environment

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── builder/[id]/            # Web Builder pages
│   │   └── page.tsx             # Main builder interface
│   ├── page.tsx                 # Main dashboard
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── builder/                 # Web Builder components
│   │   ├── AIFramer.tsx         # AI Assistant for generation
│   │   ├── BuilderCanvas.tsx    # Main canvas with enhanced drag & drop
│   │   ├── BuilderProperties.tsx # Properties panel
│   │   ├── BuilderSidebar.tsx   # Sidebar with pages/layers/assets
│   │   ├── BuilderToolbar.tsx   # Top toolbar
│   │   ├── InsertPanel.tsx      # Element insertion panel
│   │   ├── PageRenameModal.tsx  # Elegant page rename modal
│   │   ├── VectorPanel.tsx      # Vector shapes selection panel
│   │   └── ResizeableElement.tsx # Resizable element
│   ├── modals/                  # Modal components
│   │   ├── AccountModal.tsx
│   │   ├── ContactModal.tsx
│   │   ├── SettingsModal.tsx
│   │   └── UpdatesModal.tsx
│   ├── CommandPalette.tsx       # Command palette component
│   ├── Dashboard.tsx            # Analytics dashboard
│   ├── ProjectCard.tsx          # Project card component
│   ├── Header.tsx               # Application header
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── [other components...]
├── hooks/                       # Custom React hooks
│   ├── useBuilder.ts            # Builder state management
│   ├── useCommandPalette.tsx    # Command palette logic
│   ├── useDashboard.tsx         # Dashboard state
│   ├── useProjects.tsx          # Project management
│   └── [other hooks...]
├── utils/                       # Utility functions
│   ├── aiMockResponses.ts       # AI mock responses and templates
│   └── learningConsole.ts       # Learning feedback system
├── types/                       # TypeScript definitions
│   └── index.ts                 # Type definitions
└── learning.md                  # Learning feedback log
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
   Navigate to [http://localhost:3000](http://localhost:3000).

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm run start`** - Start the production server
- **`npm run lint`** - Run ESLint for code quality checks

## 🎮 Usage Guide

### Dashboard Navigation

1. **Projects Overview**: Main view with all projects
2. **Create Project**: Click on "+" card or use command palette
3. **Edit Project**: Click on the three-dot menu on any project card
4. **Open Builder**: Click on "Edit" to open the web builder

### Web Builder Interface

1. **Toolbar**: Select tools (Select, Insert, Layout, Text, Vector, CMS)
2. **Sidebar**:
   - **Pages**: Manage project pages (click to switch, double-click to rename)
   - **Layers**: Element hierarchy with visual organization
   - **Assets**: Upload and file management with drag & drop
3. **Canvas**: Enhanced visual editing area with:
   - Always-visible white canvas (even when empty)
   - Improved drag & drop with hover indicators
   - Zoom controls and responsive breakpoints
4. **Properties Panel**: Real-time editing of selected element properties

### AI Assistant

1. **Describe your element**: "Create a hero section with title and button"
2. **Select category**: Popular, sections, components, etc.
3. **Generate**: AI will create the element automatically
4. **Customize**: Edit properties in the properties panel

### Keyboard Shortcuts

#### Global

- **`Cmd+K` / `Ctrl+K`**: Open command palette
- **`Escape`**: Close modals and deselect elements

#### Builder

- **`Ctrl+D`**: Duplicate selected element
- **`Delete`**: Remove selected element
- **`Escape`**: Deselect element
- **`T`**: Add Text element (single-use, auto-deselects)
- **`B`**: Add Button element
- **`C`**: Add Container element
- **`I`**: Add Image element
- **`Ctrl++`**: Zoom in
- **`Ctrl+-`**: Zoom out
- **`Ctrl+0`**: Reset zoom

## 🎨 Design System

### Color Palette

- **Background**: `#0a0a0a` (Primary), `#0f0f0f` (Builder), `#1a1a1a` (Secondary)
- **Borders**: `#2a2a2a`, `#333333`, `#444444`
- **Text**: `#ffffff` (Primary), `#888888` (Secondary), `#666666` (Tertiary)
- **Accent**: `#3b82f6` (Blue), `#10b981` (Green), `#f59e0b` (Amber), `#8b5cf6` (Purple)

### Component Architecture

- **Atomic Design**: Atoms, molecules, organisms pattern
- **Compound Components**: Complex components with sub-components
- **Render Props**: Flexible component composition
- **Custom Hooks**: Reusable logic separation

### Animation Principles

- **Micro-interactions**: Hover, focus, and click feedback
- **Layout Animations**: Smooth element transitions
- **Page Transitions**: Fluid navigation between views
- **Loading States**: Skeleton screens and spinners

## 🔧 Technical Implementation

### State Management

- **useBuilder Hook**: Centralized builder state management
- **Local Storage**: Persistent data across sessions
- **Context Providers**: Shared state for command palette and themes
- **Optimistic Updates**: Immediate UI feedback

### Performance Optimizations

- **React.memo**: Memoized components to prevent re-renders
- **useCallback**: Stable function references
- **Code Splitting**: Dynamic imports for non-critical components
- **Image Optimization**: Next.js automatic image optimization

### Type Safety

- **Strict TypeScript**: Full type coverage
- **Interface Definitions**: Clear component contracts
- **Zod Validation**: Runtime type checking
- **Generic Types**: Reusable type patterns

### Error Handling

- **Error Boundaries**: Graceful error recovery
- **Try-Catch Blocks**: Async operation protection
- **Validation**: Input validation in all forms
- **Fallback UI**: User-friendly error states

## 🚀 Deployment

This project is optimized for deployment on **Vercel**:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**

   ```bash
   npx vercel
   ```

3. **Environment Variables**: No external APIs required (everything local)

## 🔮 Roadmap

### Phase 1: Core Builder (✅ Completed)

- [x] Dashboard with project management
- [x] Web builder with enhanced drag & drop
- [x] Component system with vector shapes
- [x] AI Assistant
- [x] Responsive breakpoints
- [x] Page management with elegant modals
- [x] Single-use tool behavior
- [x] Immediate text editing
- [x] Always-visible canvas

### Phase 2: Advanced Features (🚧 In Progress)

- [ ] Undo/Redo system
- [ ] Component library
- [ ] Advanced animations
- [ ] Export to code
- [ ] Template marketplace

### Phase 3: Backend Integration (📋 Planned)

- [ ] User authentication
- [ ] Cloud storage
- [ ] Real-time collaboration
- [ ] Project sharing
- [ ] Team management

### Phase 4: Production Features (🔮 Future)

- [ ] Custom domain publishing
- [ ] SEO optimization
- [ ] Performance analytics
- [ ] A/B testing
- [ ] E-commerce integration

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 📄 License

This project is for educational and portfolio purposes. Please respect Framer's original design and trademark.
