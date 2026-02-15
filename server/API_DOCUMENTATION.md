# Server API Documentation

## Overview

This server provides a comprehensive API for managing multi-tenant e-commerce stores with template-based page building capabilities. The server supports both local development and production deployments with Cloudflare R2 storage integration.

## Database Schema

### Tables

#### `stores`
Primary table for storing store data and configurations.

| Column | Type | Description |
|--------|------|-------------|
| `store_id` | TEXT (PRIMARY KEY) | Unique identifier for the store |
| `template_id` | TEXT | Template identifier used by the store |
| `json` | TEXT | Store configuration data (JSON) |
| `published_json` | TEXT | Published version of store data (JSON) |
| `subdomain` | TEXT (UNIQUE) | Subdomain for multi-tenant routing |

#### `templates`
Table for storing available templates.

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (PRIMARY KEY) | Template unique identifier |
| `category` | TEXT | Template category (e.g., 'ecommerce') |
| `folder` | TEXT | Template folder name |
| `title` | TEXT | Template display title |
| `description` | TEXT | Template description |
| `preview_image` | TEXT | Preview image URL |

## API Endpoints

### Store Management

#### GET `/api/v1/store/:key`
Retrieve a specific key value from store data.

**Parameters:**
- `key` (path): The data key to retrieve

**Response:**
```json
{
  "data": "value or null"
}
```

#### POST `/api/v1/store/:key`
Store a value for a specific key.

**Parameters:**
- `key` (path): The data key to store
- `value` (body): The value to store

**Response:**
```json
{
  "success": true
}
```

#### GET `/api/v1/published/store/:key`
Retrieve a specific key value from published store data.

**Parameters:**
- `key` (path): The data key to retrieve

**Response:**
```json
{
  "data": "value or null"
}
```

### Template Management

#### GET `/api/v1/templates/list`
List all available templates.

**Response:**
```json
{
  "data": [
    {
      "id": "retail-v1",
      "category": "ecommerce",
      "folder": "retail-v1",
      "title": "Retail v1",
      "description": "A modern, responsive template for retail stores.",
      "preview_image": ""
    }
  ]
}
```

#### GET `/api/v1/template`
Get template data for the current store.

**Response:**
```json
{
  "data": {
    "template": "template-data"
  }
}
```

### Page Templates & Layouts

#### GET `/api/v1/layouts/:pageId`
Get layout configuration for a specific page.

**Parameters:**
- `pageId` (path): Page identifier

**Response:**
```json
{
  "data": {
    "pageId": "home",
    "template": "template-data"
  } || null
}
```

#### POST `/api/v1/page-templates/:pageId`
Save page template selection for a specific page.

**Parameters:**
- `pageId` (path): Page identifier
- Body: Template selection object

**Response:**
```json
{
  "success": true
}
```

#### GET `/api/v1/page-templates`
Get all page template selections for the store.

**Response:**
```json
{
  "data": [
    {
      "pageId": "home",
      "template": "template-data"
    }
  ]
}
```

### Mock Data (Development)

#### GET `/api/v1/products`
Get mock products data for development.

**Response:**
```json
{
  "data": [mock-products-array]
}
```

#### GET `/api/v1/categories`
Get mock categories data for development.

**Response:**
```json
{
  "data": [mock-categories-array]
}
```

### Publishing & Style Generation

#### POST `/api/v1/publish`
Publish the current store data.

**Response:**
```json
{
  "success": true,
  "message": "Store published successfully"
}
```

#### POST `/api/v1/generate-styles`
Manually trigger style generation for store settings.

**Response:**
```json
{
  "success": true,
  "styleUrl": "https://example.com/styles.css"
}
```

### File Upload

#### POST `/api/v1/upload`
Upload files (supports both R2 and local storage).

**Request:** `multipart/form-data`
- `file`: File to upload
- `storeId` (optional): Store identifier for organization

**Response:**
```json
{
  "success": true,
  "fileUrl": "https://example.com/uploads/file.jpg"
}
```

### Debug Endpoints

#### GET `/api/v1/debug/stores`
Debug endpoint to list all stores with metadata.

**Response:**
```json
{
  "data": [
    {
      "store_id": "store-1",
      "subdomain": "demo",
      "json_len": 1234,
      "pub_len": 1234
    }
  ]
}
```

## Multi-Tenant Architecture

### Store Resolution
The server uses subdomain-based multi-tenancy:

- `demo.localhost` → `demo` store
- `store.example.com` → `store` store
- `localhost` → `demo` store (default)

### Store Data Structure
Each store contains:
- `storeSettings`: Theme colors, fonts, and configuration
- `pageTemplates`: Array of page template selections
- `styleUrl`: Generated CSS URL
- Custom data keys as needed

## Storage Configuration

### Cloudflare R2 Integration
The server supports Cloudflare R2 for file storage:

**Environment Variables:**
- `R2_ACCESS_KEY_ID`: R2 access key
- `R2_SECRET_ACCESS_KEY`: R2 secret key
- `R2_ENDPOINT`: R2 endpoint URL
- `R2_BUCKET_NAME`: R2 bucket name
- `R2_PUBLIC_URL`: Public URL for R2 files

### Fallback Storage
If R2 is not configured, files are stored locally in `client/public/uploads/`.

## Style Generation

The server generates custom CSS based on store settings:

**Store Settings Structure:**
```json
{
  "colors": {
    "primary": "#4272FF",
    "secondary": "#ACBA12",
    "text": "#1D293D"
  },
  "fonts": {
    "heading": "sans-serif",
    "body": "sans-serif"
  }
}
```

Generated CSS includes:
- CSS custom properties for colors and fonts
- Base styles and typography
- Tailwind CSS utilities

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error description"
}
```

Common error codes:
- `400`: Bad Request (missing parameters, invalid data)
- `404`: Not Found (store not found, data not found)
- `500`: Internal Server Error (database errors, parsing errors)

## Development vs Production

### Development Mode
- Uses Vite for hot module reloading
- Loads mock data from template files
- Supports live template editing

### Production Mode
- Uses published data only
- Static file serving
- Optimized for performance

## Security Considerations

- File upload size limit: 10MB
- Subdomain validation and filtering
- JSON parsing with error handling
- R2 configuration validation

## Database Migrations

The server handles automatic migrations:
1. `published_json` column addition
2. `subdomain` column addition
3. Templates table creation
4. Seed data population
