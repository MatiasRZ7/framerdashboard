"use client";

import { useState, useCallback } from "react";

export interface BuilderElement {
  id: string;
  type:
    | "text"
    | "image"
    | "container"
    | "button"
    | "rectangle"
    | "oval"
    | "polygon"
    | "star"
    | "path";
  name: string;
  content?: string;
  styles: {
    position?: string;
    left?: string;
    top?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    padding?: string;
    paddingTop?: string;
    margin?: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    borderRadius?: string;
    border?: string;
    borderTop?: string;
    borderBottom?: string;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
    fontFamily?: string;
    lineHeight?: string;
    boxShadow?: string;
    flexDirection?: string;
    textAlign?: string;
    cursor?: string;
    [key: string]: string | undefined;
  };
  children?: string[];
  parent?: string;
}

export interface BuilderPage {
  id: string;
  name: string;
  elements: BuilderElement[];
}

export interface BuilderAsset {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "document";
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface BuilderProject {
  id: string;
  name: string;
  pages: BuilderPage[];
  currentPageId: string;
  assets: BuilderAsset[];
}

export function useBuilder(projectId: string) {
  // Estado inicial del proyecto
  const [project, setProject] = useState<BuilderProject>({
    id: projectId,
    name: "Untitled",
    currentPageId: "home",
    assets: [],
    pages: [
      {
        id: "home",
        name: "Home",
        elements: [
          {
            id: "title",
            type: "text",
            name: "Matias Rivera Zahn",
            content: "Matías Rivera Zahn",
            styles: {
              position: "absolute",
              left: "50px",
              top: "50px",
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1f2937",
            },
          },
          {
            id: "description",
            type: "text",
            name: "Experienced web...",
            content:
              "Experienced web designer with a strong background in crafting user-focused, visually engaging websites for a wide range of clients. Passionate about elegant layouts and seamless digital experiences.",
            styles: {
              position: "absolute",
              left: "50px",
              top: "120px",
              fontSize: "18px",
              color: "#6b7280",
              width: "500px",
            },
          },
          {
            id: "portfolio-1",
            type: "container",
            name: "Portfolio Item 1",
            content: "Portfolio Item 1",
            styles: {
              position: "absolute",
              left: "50px",
              top: "250px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              padding: "24px",
              width: "300px",
              height: "192px",
            },
          },
          {
            id: "portfolio-2",
            type: "container",
            name: "Portfolio Item 2",
            content: "Portfolio Item 2",
            styles: {
              position: "absolute",
              left: "400px",
              top: "250px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              padding: "24px",
              width: "300px",
              height: "192px",
            },
          },
          {
            id: "footer",
            type: "container",
            name: "Footer",
            content: "2021-2025 | Lead Web Designer, Studio Pixel",
            styles: {
              position: "absolute",
              left: "50px",
              top: "500px",
              fontSize: "14px",
              color: "#6b7280",
              width: "650px",
              paddingTop: "32px",
              borderTop: "1px solid #e5e7eb",
            },
          },
        ],
      },
    ],
  });

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [activeTool, setActiveTool] = useState<string>("select");
  const [sidebarTab, setSidebarTab] = useState<"pages" | "layers" | "assets">(
    "layers"
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState<
    "desktop" | "tablet" | "phone"
  >("desktop");

  // Obtener la página actual
  const currentPage = project.pages.find(
    (page) => page.id === project.currentPageId
  );

  // Obtener el elemento seleccionado
  const selectedElement = selectedElementId
    ? currentPage?.elements.find((el) => el.id === selectedElementId)
    : null;

  // Funciones para manejar elementos
  const selectElement = useCallback((elementId: string | null) => {
    setSelectedElementId(elementId);
  }, []);

  const updateElement = useCallback(
    (elementId: string, updates: Partial<BuilderElement>) => {
      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: page.elements.map((element) =>
                  element.id === elementId
                    ? { ...element, ...updates }
                    : element
                ),
              }
            : page
        ),
      }));
    },
    []
  );

  const updateElementStyles = useCallback(
    (elementId: string, styles: Partial<BuilderElement["styles"]>) => {
      updateElement(elementId, {
        styles: {
          ...selectedElement?.styles,
          ...styles,
        },
      });
    },
    [updateElement, selectedElement]
  );

  // Función para actualizar posición de un elemento
  const updateElementPosition = useCallback(
    (elementId: string, position: { x: number; y: number }) => {
      const element = currentPage?.elements.find((e) => e.id === elementId);
      if (element) {
        updateElement(elementId, {
          styles: {
            ...element.styles,
            left: `${position.x}px`,
            top: `${position.y}px`,
          },
        });
      }
    },
    [updateElement, currentPage]
  );

  // Función para actualizar tamaño de un elemento
  const updateElementSize = useCallback(
    (elementId: string, size: { width: number; height: number }) => {
      const element = currentPage?.elements.find((e) => e.id === elementId);
      if (element) {
        updateElement(elementId, {
          styles: {
            ...element.styles,
            width: `${size.width}px`,
            height: `${size.height}px`,
          },
        });
      }
    },
    [updateElement, currentPage]
  );

  // Funciones para manejar páginas
  const addPage = useCallback((name: string) => {
    const newPageId = `page-${Date.now()}`;
    setProject((prev) => ({
      ...prev,
      pages: [
        ...prev.pages,
        {
          id: newPageId,
          name,
          elements: [],
        },
      ],
    }));
  }, []);

  const switchPage = useCallback((pageId: string) => {
    setProject((prev) => ({
      ...prev,
      currentPageId: pageId,
    }));
    setSelectedElementId(null);
  }, []);

  const renamePage = useCallback((pageId: string, newName: string) => {
    setProject((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === pageId ? { ...page, name: newName } : page
      ),
    }));
  }, []);

  // Funciones para herramientas
  const setActiveToolHandler = useCallback((tool: string) => {
    setActiveTool(tool);
    // Si cambiamos a una herramienta que no es CMS, cambiamos el sidebar
    if (tool === "insert") {
      // El InsertPanel se mostrará automáticamente
    } else {
      setSidebarTab("layers");
    }
  }, []);

  const setSidebarTabHandler = useCallback(
    (tab: "pages" | "layers" | "assets") => {
      setSidebarTab(tab);
    },
    []
  );

  const setBreakpoint = useCallback(
    (breakpoint: "desktop" | "tablet" | "phone") => {
      setCurrentBreakpoint(breakpoint);
      setSelectedElementId(null); // Deseleccionar elemento al cambiar breakpoint
    },
    []
  );

  // Funciones para manejar assets
  const addAsset = useCallback((file: File) => {
    const newAsset: BuilderAsset = {
      id: `asset-${Date.now()}`,
      name: file.name,
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("audio/")
        ? "audio"
        : "document",
      url: URL.createObjectURL(file),
      size: file.size,
      uploadedAt: new Date(),
    };

    setProject((prev) => ({
      ...prev,
      assets: [...prev.assets, newAsset],
    }));

    return newAsset;
  }, []);

  const removeAsset = useCallback((assetId: string) => {
    setProject((prev) => ({
      ...prev,
      assets: prev.assets.filter((asset) => asset.id !== assetId),
    }));
  }, []);

  const addElementFromAsset = useCallback(
    (asset: BuilderAsset, position: { x: number; y: number }) => {
      const newElement: BuilderElement = {
        id: `element-${Date.now()}`,
        type: asset.type === "image" ? "image" : "container",
        name: asset.name,
        content: asset.url, // Siempre usar la URL del asset
        styles: {
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: asset.type === "image" ? "200px" : "200px",
          height: asset.type === "image" ? "150px" : "100px",
        },
      };

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, newElement],
              }
            : page
        ),
      }));

      return newElement;
    },
    []
  );

  // Función para crear templates de menu
  const createMenuTemplate = useCallback(
    (templateName: string): BuilderElement => {
      const baseId = `menu-${Date.now()}`;

      // Generar contenido dinámico basado en el template
      const getMenuContent = () => {
        switch (templateName) {
          case "Menu Dropdown":
            return {
              content: `PRODUCT\nDesign - An infinite canvas\nContent - Create your first blog\nPublish - Go live within seconds\n\nRESOURCES\nBlog - Interviews and how-tos\nUpdates - Features and bug fixes\nDocumentation - Get started with our API`,
              styles: {
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.6",
                width: "320px",
                height: "auto",
              },
            };
          case "Menu Sidebar":
            return {
              content: `☰ MENU\n\n🎨 Design\nAn infinite canvas\n\n📝 Content\nCreate your first blog\n\n🚀 Publish\nGo live within seconds\n\n📚 Resources\nBlog & Documentation`,
              styles: {
                backgroundColor: "#f8fafc",
                borderRadius: "0px",
                padding: "20px",
                border: "none",
                borderRight: "1px solid #e5e7eb",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.8",
                width: "280px",
                height: "400px",
              },
            };
          case "Menu Grid":
            return {
              content: `PRODUCT\n\n🎨 Design\nInfinite canvas\n\n📝 Content\nFirst blog\n\n🚀 Publish\nGo live\n\n📦 API\nDevelopers`,
              styles: {
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.5",
                width: "360px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
              },
            };
          case "Menu Cards":
            return {
              content: `🎨 Design\nAn infinite canvas for creativity\n\n📝 Content\nCreate and manage your blog\n\n🚀 Publish\nGo live within seconds`,
              styles: {
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px",
                border: "none",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "15px",
                color: "#1f2937",
                lineHeight: "1.7",
                width: "400px",
                height: "180px",
              },
            };
          case "Menu Tabs":
            return {
              content: `Design | Content | Publish\n\n🎨 DESIGN TOOLS\nCreate with an infinite canvas\nComponents and interactions\nResponsive breakpoints\n\n📱 PREVIEW MODE\nSee your work come to life`,
              styles: {
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderTop: "3px solid #3b82f6",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.6",
                width: "380px",
                height: "160px",
              },
            };
          default:
            return {
              content: "Menu Items\nOption 1\nOption 2\nOption 3",
              styles: {
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid #e5e7eb",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "14px",
                color: "#374151",
                width: "200px",
                height: "120px",
              },
            };
        }
      };

      const menuContent = getMenuContent();

      return {
        id: baseId,
        type: "container",
        name: templateName,
        content: menuContent.content,
        styles: {
          position: "absolute",
          left: "50px",
          top: "150px",
          ...menuContent.styles,
        },
      };
    },
    []
  );

  // Función para crear templates de navegación
  const createNavigationTemplate = useCallback(
    (templateName: string): BuilderElement => {
      const baseId = `nav-${Date.now()}`;

      // Generar contenido dinámico basado en el template
      const getNavigationContent = () => {
        switch (templateName) {
          case "Navigation Horizontal":
            return {
              content:
                "🐦 Features | Discover | Gallery | Templates | Updates | Downloads | Blog | About | Careers",
              styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0px",
                border: "none",
                borderBottom: "1px solid #f0f0f0",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "15px",
                color: "#666666",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              },
            };
          case "Navigation Minimal":
            return {
              content: "🐦 Features | Discover | Gallery | Templates | Updates",
              styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0px",
                border: "none",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "15px",
                color: "#333333",
              },
            };
          case "Navigation Split":
            return {
              content:
                "🐦 Product ▽ | Resources ▽ | Community ▽ | Changelog | Pricing",
              styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0px",
                border: "none",
                borderBottom: "1px solid #f0f0f0",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "15px",
                color: "#666666",
              },
            };
          default:
            return {
              content: "🐦 Features | Gallery | Templates",
              styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 40px",
                backgroundColor: "#ffffff",
                borderRadius: "0px",
                border: "none",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: "15px",
                color: "#666666",
              },
            };
        }
      };

      const navContent = getNavigationContent();

      return {
        id: baseId,
        type: "container",
        name: templateName,
        content: navContent.content,
        styles: {
          position: "absolute",
          left: "0px",
          top: "50px",
          width: "100%",
          height: "auto",
          minHeight: "60px",
          ...navContent.styles,
        },
      };
    },
    []
  );

  // Función para agregar elementos desde templates
  const addElementFromTemplate = useCallback(
    (elementType: string, templateName: string) => {
      let newElement: BuilderElement;

      // Handle AI-generated elements
      if (elementType === "ai-generated") {
        try {
          const aiResponse = JSON.parse(templateName);
          newElement = {
            id: `element-${Date.now()}`,
            type: aiResponse.type as "text" | "image" | "container" | "button",
            name: aiResponse.name,
            content: aiResponse.content,
            styles: {
              position: "absolute",
              left: "50px",
              top: "50px",
              ...aiResponse.styles,
            },
          };
        } catch (error) {
          console.error("Error parsing AI response:", error);
          // Fallback to default container
          newElement = {
            id: `element-${Date.now()}`,
            type: "container",
            name: "AI Element",
            content: "AI Generated Content",
            styles: {
              position: "absolute",
              left: "50px",
              top: "50px",
              width: "200px",
              height: "100px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              padding: "16px",
            },
          };
        }
      } else if (elementType === "navigation") {
        newElement = createNavigationTemplate(templateName);
      } else if (elementType === "menu") {
        newElement = createMenuTemplate(templateName);
      } else {
        // Default fallback
        newElement = {
          id: `element-${Date.now()}`,
          type: "container",
          name: templateName,
          content: templateName,
          styles: {
            position: "absolute",
            left: "50px",
            top: "50px",
            width: "200px",
            height: "100px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            padding: "16px",
          },
        };
      }

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, newElement],
              }
            : page
        ),
      }));

      // Seleccionar el nuevo elemento
      setSelectedElementId(newElement.id);

      return newElement;
    },
    [createNavigationTemplate, createMenuTemplate]
  );

  // Función para duplicar un elemento
  const duplicateElement = useCallback(
    (elementId: string) => {
      const element = currentPage?.elements.find((e) => e.id === elementId);
      if (!element) return;

      const duplicatedElement: BuilderElement = {
        ...element,
        id: `element-${Date.now()}`,
        name: `${element.name} Copy`,
        styles: {
          ...element.styles,
          left: `${parseInt(element.styles.left || "0") + 20}px`,
          top: `${parseInt(element.styles.top || "0") + 20}px`,
        },
      };

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, duplicatedElement],
              }
            : page
        ),
      }));

      setSelectedElementId(duplicatedElement.id);
      return duplicatedElement;
    },
    [currentPage]
  );

  // Función para eliminar un elemento
  const deleteElement = useCallback(
    (elementId: string) => {
      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: page.elements.filter((e) => e.id !== elementId),
              }
            : page
        ),
      }));

      if (selectedElementId === elementId) {
        setSelectedElementId(null);
      }
    },
    [selectedElementId]
  );

  // Función para añadir elementos básicos
  const addBasicElement = useCallback(
    (type: "text" | "button" | "container" | "image") => {
      const newElement: BuilderElement = {
        id: `element-${Date.now()}`,
        type,
        name:
          type === "text"
            ? "Texto"
            : type === "button"
            ? "Button"
            : type === "container"
            ? "Contenedor"
            : "Imagen",
        content:
          type === "text"
            ? "Nuevo texto"
            : type === "button"
            ? "Button"
            : type === "container"
            ? ""
            : "",
        styles: {
          position: "absolute",
          left: "50px",
          top: "50px",
          ...(type === "text" && {
            fontSize: "16px",
            color: "#000000",
            fontWeight: "normal",
          }),
          ...(type === "button" && {
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }),
          ...(type === "container" && {
            width: "200px",
            height: "100px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }),
          ...(type === "image" && {
            width: "200px",
            height: "150px",
            backgroundColor: "#e5e7eb",
            borderRadius: "8px",
          }),
        },
      };

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, newElement],
              }
            : page
        ),
      }));

      setSelectedElementId(newElement.id);
      return newElement;
    },
    []
  );

  // Función para añadir texto en posición específica (para herramienta Text)
  const addTextAtPosition = useCallback(
    (position: { x: number; y: number }) => {
      const newElement: BuilderElement = {
        id: `text-${Date.now()}`,
        type: "text",
        name: "Text",
        content: "Type something",
        styles: {
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          fontSize: "16px",
          color: "#000000",
          fontWeight: "normal",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        },
      };

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, newElement],
              }
            : page
        ),
      }));

      setSelectedElementId(newElement.id);
      // Cambiar automáticamente a la herramienta select después de crear el texto
      setActiveTool("select");
      return newElement;
    },
    []
  );

  // Función para añadir formas vectoriales en posición específica
  const addVectorShape = useCallback(
    (
      shapeType: "rectangle" | "oval" | "polygon" | "star" | "path",
      position: { x: number; y: number }
    ) => {
      const newElement: BuilderElement = {
        id: `${shapeType}-${Date.now()}`,
        type: shapeType,
        name: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
        content: "",
        styles: {
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "100px",
          height: "100px",
          backgroundColor: "#3b82f6",
          border: "2px solid #1e40af",
          ...(shapeType === "rectangle" && {
            borderRadius: "0px",
          }),
          ...(shapeType === "oval" && {
            borderRadius: "50%",
          }),
          ...(shapeType === "polygon" && {
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            borderRadius: "0px",
          }),
          ...(shapeType === "star" && {
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            borderRadius: "0px",
          }),
          ...(shapeType === "path" && {
            borderRadius: "20px 0px 20px 0px",
          }),
        },
      };

      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.currentPageId
            ? {
                ...page,
                elements: [...page.elements, newElement],
              }
            : page
        ),
      }));

      setSelectedElementId(newElement.id);
      // Cambiar automáticamente a la herramienta select después de crear la forma
      setActiveTool("select");
      return newElement;
    },
    []
  );

  return {
    // Estado
    project,
    currentPage,
    selectedElement,
    selectedElementId,
    activeTool,
    sidebarTab,
    currentBreakpoint,

    // Acciones
    selectElement,
    updateElement,
    updateElementStyles,
    updateElementPosition,
    updateElementSize,
    addPage,
    switchPage,
    renamePage,
    setActiveTool: setActiveToolHandler,
    setSidebarTab: setSidebarTabHandler,
    setBreakpoint,
    addAsset,
    removeAsset,
    addElementFromAsset,
    addElementFromTemplate,
    duplicateElement,
    deleteElement,
    addBasicElement,
    addTextAtPosition,
    addVectorShape,
  };
}
