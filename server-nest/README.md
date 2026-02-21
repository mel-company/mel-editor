# NestJS Server with MVC Architecture

A modern NestJS server implementation following MVC (Model-View-Controller) architecture pattern.

## 📁 Project Structure

```
server-nest/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root application module
│   ├── modules/                   # Feature modules
│   │   ├── products/              # Products module
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   └── dto/
│   │   │       ├── create-product.dto.ts
│   │   │       └── update-product.dto.ts
│   │   ├── pages/                 # Pages module
│   │   │   ├── pages.module.ts
│   │   │   ├── pages.controller.ts
│   │   │   ├── pages.service.ts
│   │   │   └── dto/
│   │   │       ├── create-page.dto.ts
│   │   │       └── update-page.dto.ts
│   │   └── storage/               # Storage module (R2)
│   │       ├── storage.module.ts
│   │       ├── storage.controller.ts
│   │       └── storage.service.ts
│   └── shared/                    # Shared resources
│       ├── shared.module.ts
│       └── services/
│           └── database.service.ts
├── .env                           # Environment variables
├── tsconfig.json                  # TypeScript configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` and update with your actual values
   - Configure Cloudflare R2 credentials if using storage

3. Set up database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

### Running the Server

Development mode:
```bash
npm run dev:nest
```

Production mode:
```bash
npm run build:nest
npm run start:nest
```

### Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Create/apply migrations
npm run prisma:migrate

# Open Prisma Studio (visual DB editor)
npm run prisma:studio
```

## 📚 API Endpoints

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create new product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Pages
- `GET /api/v1/pages` - Get all pages
- `GET /api/v1/pages/:id` - Get page by ID
- `POST /api/v1/pages` - Create new page
- `PUT /api/v1/pages/:id` - Update page
- `DELETE /api/v1/pages/:id` - Delete page

### Storage
- `POST /api/v1/storage/upload` - Upload file to R2
- `DELETE /api/v1/storage/:key` - Delete file from R2

## 🏗️ Architecture

### MVC Pattern

- **Models**: Defined through DTOs (Data Transfer Objects)
- **Views**: JSON responses from controllers
- **Controllers**: Handle HTTP requests and route to services
- **Services**: Contain business logic and data access

### Module Structure

Each feature is organized as a NestJS module with:
- **Module**: Defines the module and its dependencies
- **Controller**: Handles HTTP requests
- **Service**: Contains business logic
- **DTOs**: Define data structures for requests/responses

### Shared Resources

- **DatabaseService**: Global SQLite database connection
- **SharedModule**: Provides shared services across modules

## 🔧 Configuration

### TypeScript

The project uses TypeScript with decorators enabled for NestJS:
- `experimentalDecorators: true`
- `emitDecoratorMetadata: true`

### Database

SQLite database located at `stores.db` with tables:
- `products`: Product catalog
- `pages`: Page configurations

## 📝 Adding New Modules

1. Create module directory: `src/modules/your-module/`
2. Create files:
   - `your-module.module.ts`
   - `your-module.controller.ts`
   - `your-module.service.ts`
   - `dto/create-your-module.dto.ts`
   - `dto/update-your-module.dto.ts`
3. Import module in `app.module.ts`

## 🛠️ Development

### Code Style

- Follow NestJS conventions
- Use dependency injection
- Keep controllers thin, services fat
- Use DTOs for data validation

### Best Practices

- One module per feature
- Shared services in `shared/` directory
- DTOs for all request/response data
- Proper error handling with NestJS exceptions
