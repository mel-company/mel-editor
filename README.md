# Developer Guide - E-commerce UI Editor

> 📚 **للتوثيق الشامل بالعربية:** راجع [DOCUMENTATION.md](./DOCUMENTATION.md) - يحتوي على شرح تفصيلي لبنية المشروع، Types، تدفق البيانات، State Management، كيفية إضافة قوالب وأقسام جديدة، والتكامل مع Backend.

## Overview

This project is a React-based "No-Code" editor designed to allow users to build and customize e-commerce pages via a drag-and-drop interface (in progress) and a configuration sidebar. It is built for speed and ease of use, providing a "What You See Is What You Get" (WYSIWYG) experience.

## Technology Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: Lucide React

## Project Architecture

The application is split into two main visual areas:

1.  **Sidebar (`src/components/editor/side-nav`)**: The control center where users select sections to edit, change themes, and manage content.
2.  **Preview Area (`src/components/editor/render`)**: The live view of the e-commerce page being built.

### Directory Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── render/       # Logic for rendering the active page
│   │   └── side-nav/     # Sidebar components (Section List, details, theme)
│   └── ui/               # Reusable UI primitives (Buttons, Inputs, etc.)
├── store/
│   └── editor/           # Zustand stores for global editor state
├── hooks/                # Custom hooks (e.g., useSectionDetails)
├── types/                # TypeScript definitions
└── mock/                 # Mock data and templates
```

## State Management

The core of the editor's logic resides in the `useSectionStore`.

### Section Store (`src/store/editor/section/index.tsx`)

This store manages the state of the page sections. It features:

- **`sections`**: An array of `SectionType` objects representing the current page structure.
- **`activeSectionId`**: The ID (`target_id`) of the section currently being edited.
- **Persistence**: The store serves as the single source of truth and is automatically persisted to `localStorage` to save the user's progress.

#### Key Actions:

- `setSections`: Replaces the entire list of sections (e.g., on load).
- `setSection`: Updates a specific section's data.
- `setActiveSectionId`: Changes the currently focused section.

## Data Flow

1.  **Rendering**:

    - The `RenderTemplate` component subscribes to `sections` from the store.
    - It iterates over the sections and renders the corresponding component (defined in `options.component`) by passing the configuration data as props.
    - Each rendered section receives a unique `target_id` generated during initialization.

2.  **Editing**:

    - When a user clicks a section in the Preview Area, `setActiveSectionId` is called.
    - The Sidebar detects the change and loads the `section-details` component.
    - The `useSectionDetails` hook retrieves the active section and provides helper functions (`handleTextChange`, `handleUploadImage`, etc.) to modify it.

3.  **Updates**:
    - User inputs in the Sidebar trigger the helper functions.
    - These functions call `setSection` in the store.
    - The store updates the state, triggering a re-render of the Preview Area to reflect changes immediately.

## Key Types (`src/types/index.d.ts`)

- **`SectionType`**: Defines the structure of a section on the page.
  - `target_id`: Unique ID for the specific instance of the section (created at runtime).
  - `section_id`: ID identifying the _type_ of section (e.g., "hero-1").
  - `options`: Array containing configuration and the React component itself.
- **`SectionOptionType`**: Defines the configuration for a section type, including its React component and editable properties (content, photos, etc.).

## How to Work with Sections

### Adding a New Section Type

1.  **Create the Component**: Build your React component in a suitable folder. It should accept props that match the data structure you intend to provide via `options`.
2.  **Define Configuration**: Add an entry to your template/section registry (e.g., `mockTemplate` uses this).
    - Assign it a unique `section_id`.
    - Import the component and assign it to the `component` property in `options`.
    - Define initial `content`, `photos`, or `products`.

### Helper Hooks (`src/hooks/editor-section-details`)

This hook is the bridge between the UI and the Store. It simplifies complex state updates.

- `handleTextChange(value, name)`: Updates a specific text field within the active section's content.
- `handleUploadImage(file, index)`: Updates an image at a specific index.

## Common Development Tasks

- **Start Dev Server**: `pnpm dev`
- **Build for Production**: `pnpm build`
- **Linting**: `pnpm lint`

## Troubleshooting

- **"Section not updating"**: Ensure you are using `setSection` with the correct `target_id`. The store creates a _new_ array reference to trigger React re-renders.
- **"Component not found"**: correct `section_id` in the `options` array must match the section you are trying to render. Ensure the `component` property is a valid React component.
