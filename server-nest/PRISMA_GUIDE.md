# Prisma Database Management Guide

This NestJS server uses **Prisma ORM** for type-safe database management with SQLite.

## 📋 Quick Reference

### Common Commands

```bash
# Generate Prisma Client (after schema changes)
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (visual database editor)
npm run prisma:studio
```

## 🗄️ Database Schema

Located in `prisma/schema.prisma`:

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float?
  category    String?
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Page {
  id        Int      @id @default(autoincrement())
  name      String
  route     String   @unique
  store     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Making Schema Changes

### 1. Update Schema
Edit `prisma/schema.prisma`:

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float?
  category    String?
  image       String?
  stock       Int      @default(0)  // New field
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 2. Create Migration
```bash
npm run prisma:migrate
# Enter migration name when prompted
```

### 3. Prisma Client Auto-Updates
The Prisma Client is automatically regenerated with type-safe methods for your new fields.

## 💻 Using Prisma in Services

### Example: ProductsService

```typescript
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.product.findMany({
      where: category ? { category } : undefined,
    });
  }

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  async update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
}
```

## 🎯 Prisma Features Used

### Type Safety
```typescript
// ✅ TypeScript knows all fields
const product = await prisma.product.findUnique({
  where: { id: 1 }
});
// product.name is typed as string
// product.price is typed as number | null
```

### Relations (Future)
```prisma
model Category {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}

model Product {
  id         Int      @id @default(autoincrement())
  categoryId Int
  category   Category @relation(fields: [categoryId], references: [id])
}
```

### Advanced Queries
```typescript
// Filtering
await prisma.product.findMany({
  where: {
    price: { gte: 100 },
    category: { in: ['electronics', 'books'] }
  }
});

// Sorting
await prisma.product.findMany({
  orderBy: { createdAt: 'desc' }
});

// Pagination
await prisma.product.findMany({
  skip: 10,
  take: 20
});
```

## 🛠️ Prisma Studio

Visual database editor accessible at `http://localhost:5555`:

```bash
npm run prisma:studio
```

Features:
- Browse all tables
- Add/edit/delete records
- Filter and search
- View relationships

## 📁 File Structure

```
server-nest/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Migration history
│   │   └── 20260221074532_init/
│   │       └── migration.sql
│   └── stores.db              # SQLite database file
└── src/
    └── shared/
        └── services/
            └── prisma.service.ts  # Prisma client wrapper
```

## 🔄 Migration Workflow

### Development
```bash
# Make schema changes
# Run migration (creates SQL + applies it)
npm run prisma:migrate
```

### Production
```bash
# Build the app
npm run build:nest

# Apply pending migrations
cd server-nest && npx prisma migrate deploy

# Start server
npm run start:nest
```

## 🐛 Troubleshooting

### Prisma Client Not Found
```bash
npm run prisma:generate
```

### Database Out of Sync
```bash
cd server-nest
npx prisma migrate reset  # ⚠️ Deletes all data
npx prisma migrate dev
```

### View Current Database State
```bash
cd server-nest
npx prisma db pull  # Introspect database
```

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
