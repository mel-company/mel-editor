# JSON Optimization Strategies for Client-Server Communication

## 1. HTTP Compression (Recommended - Easy Win)

### Install compression middleware:
```bash
npm install compression
npm install -D @types/compression
```

### Enable in main.ts:
```typescript
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable compression (gzip)
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6, // Compression level (0-9, 6 is good balance)
  }));
  
  // ... rest of setup
}
```

**Benefits:**
- Reduces JSON payload size by 60-80%
- Automatic for all responses
- Minimal CPU overhead
- Works with all clients that support gzip

---

## 2. Partial Updates (PATCH instead of PUT)

Instead of sending the entire store JSON, only send changed fields:

### Create a new DTO for partial updates:
```typescript
// patch-store.dto.ts
export class PatchStoreDto {
  @ApiPropertyOptional({ description: 'Partial store data updates' })
  jsonUpdates?: Record<string, any>;
}
```

### Add PATCH endpoint:
```typescript
@Patch(':storeId')
@ApiOperation({ summary: 'Partially update store data' })
async patch(@Param('storeId') storeId: string, @Body() updates: PatchStoreDto) {
  const store = await this.storesService.findOne(storeId);
  const currentData = JSON.parse(store.json || '{}');
  
  // Merge updates
  const updatedData = { ...currentData, ...updates.jsonUpdates };
  
  return this.storesService.update(storeId, {
    json: JSON.stringify(updatedData)
  });
}
```

**Benefits:**
- Only send changed data
- Reduces payload size by 90%+ for small edits
- Faster processing

---

## 3. Field Selection (Query Parameters)

Allow clients to request only specific fields:

```typescript
@Get(':storeId')
async findOne(
  @Param('storeId') storeId: string,
  @Query('fields') fields?: string
) {
  const store = await this.storesService.findOne(storeId);
  
  if (fields) {
    const requestedFields = fields.split(',');
    const filtered = {};
    requestedFields.forEach(field => {
      if (store[field] !== undefined) {
        filtered[field] = store[field];
      }
    });
    return filtered;
  }
  
  return store;
}
```

**Usage:**
```bash
GET /api/v1/stores/demo?fields=storeId,subdomain
# Returns only storeId and subdomain, not the full JSON
```

**Benefits:**
- Client controls payload size
- Reduces unnecessary data transfer
- Faster parsing on client

---

## 4. JSON Minification

Remove whitespace from JSON before storing/sending:

```typescript
// In stores.service.ts
async update(storeId: string, updateStoreDto: UpdateStoreDto) {
  // Minify JSON before storing
  if (updateStoreDto.json) {
    const parsed = JSON.parse(updateStoreDto.json);
    updateStoreDto.json = JSON.stringify(parsed); // No whitespace
  }
  
  return this.prisma.store.update({
    where: { storeId },
    data: updateStoreDto,
  });
}
```

**Benefits:**
- Reduces JSON size by 10-20%
- No functionality loss
- Automatic

---

## 5. Delta/Diff Updates (Advanced)

Send only the differences between old and new state:

```bash
npm install fast-json-patch
```

```typescript
import { compare, applyPatch } from 'fast-json-patch';

@Patch(':storeId/delta')
async applyDelta(
  @Param('storeId') storeId: string,
  @Body() delta: any[]
) {
  const store = await this.storesService.findOne(storeId);
  const currentData = JSON.parse(store.json || '{}');
  
  // Apply JSON patch
  const updatedData = applyPatch(currentData, delta).newDocument;
  
  return this.storesService.update(storeId, {
    json: JSON.stringify(updatedData)
  });
}
```

**Client usage:**
```typescript
const oldData = { products: [{ id: 1, name: 'Old' }] };
const newData = { products: [{ id: 1, name: 'New' }] };

const delta = compare(oldData, newData);
// delta = [{ op: 'replace', path: '/products/0/name', value: 'New' }]

await fetch('/api/v1/stores/demo/delta', {
  method: 'PATCH',
  body: JSON.stringify(delta)
});
```

**Benefits:**
- Minimal payload for large objects
- Efficient for collaborative editing
- Precise change tracking

---

## 6. Binary Formats (Alternative to JSON)

For very large payloads, consider binary formats:

### MessagePack (smaller than JSON):
```bash
npm install @msgpack/msgpack
```

```typescript
import { encode, decode } from '@msgpack/msgpack';

@Post(':storeId/binary')
async updateBinary(@Param('storeId') storeId: string, @Body() buffer: Buffer) {
  const data = decode(buffer);
  return this.storesService.update(storeId, {
    json: JSON.stringify(data)
  });
}
```

**Benefits:**
- 20-30% smaller than JSON
- Faster parsing
- Type preservation

---

## 7. Caching & ETags

Prevent unnecessary data transfer with HTTP caching:

```typescript
@Get(':storeId')
async findOne(
  @Param('storeId') storeId: string,
  @Headers('if-none-match') etag?: string,
  @Res() res?: Response
) {
  const store = await this.storesService.findOne(storeId);
  const currentEtag = createHash('md5').update(store.json).digest('hex');
  
  if (etag === currentEtag) {
    return res.status(304).send(); // Not Modified
  }
  
  res.setHeader('ETag', currentEtag);
  res.setHeader('Cache-Control', 'private, max-age=60');
  return res.json(store);
}
```

**Benefits:**
- Zero data transfer if unchanged
- Browser handles automatically
- Reduces server load

---

## 8. Pagination for Large Arrays

For stores with many products/pages:

```typescript
@Get(':storeId/products')
async getProducts(
  @Param('storeId') storeId: string,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 20
) {
  const store = await this.storesService.findOne(storeId);
  const data = JSON.parse(store.json || '{}');
  const products = data.products || [];
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: products.slice(start, end),
    total: products.length,
    page,
    limit,
    hasMore: end < products.length
  };
}
```

**Benefits:**
- Reduces initial load time
- Better UX for large datasets
- Lower memory usage

---

## Recommended Implementation Priority

### Phase 1 (Quick Wins):
1. ✅ **Enable compression** - 5 minutes, 60-80% reduction
2. ✅ **Minify JSON** - 10 minutes, 10-20% reduction
3. ✅ **Add field selection** - 15 minutes, variable reduction

### Phase 2 (Medium Effort):
4. ✅ **Implement PATCH endpoints** - 30 minutes, 90%+ for small edits
5. ✅ **Add ETags/caching** - 30 minutes, 100% for unchanged data

### Phase 3 (Advanced):
6. ✅ **Delta updates** - 1-2 hours, optimal for real-time editing
7. ✅ **Pagination** - 1 hour, better for large datasets
8. ✅ **Binary formats** - 2 hours, 20-30% smaller

---

## Performance Comparison

| Method | Payload Size | Complexity | Best For |
|--------|-------------|------------|----------|
| No optimization | 100% | Low | Small data |
| Compression | 20-40% | Very Low | All cases |
| Minification | 80-90% | Very Low | All cases |
| Field selection | 10-50% | Low | Specific queries |
| PATCH updates | 5-10% | Medium | Frequent edits |
| Delta updates | 1-5% | High | Collaborative editing |
| Binary formats | 70-80% | Medium | Large payloads |
| Caching | 0% | Medium | Unchanged data |

---

## Example: Combined Approach

```typescript
// Enable compression globally
app.use(compression());

// Minify + Field selection + Caching
@Get(':storeId')
async findOne(
  @Param('storeId') storeId: string,
  @Query('fields') fields?: string,
  @Headers('if-none-match') etag?: string,
  @Res() res?: Response
) {
  const store = await this.storesService.findOne(storeId);
  
  // Generate ETag
  const currentEtag = createHash('md5')
    .update(JSON.stringify(store))
    .digest('hex');
  
  // Check cache
  if (etag === currentEtag) {
    return res.status(304).send();
  }
  
  // Field selection
  let response = store;
  if (fields) {
    const requestedFields = fields.split(',');
    response = {};
    requestedFields.forEach(field => {
      if (store[field] !== undefined) {
        response[field] = store[field];
      }
    });
  }
  
  // Minify JSON fields
  if (response.json) {
    response.json = JSON.stringify(JSON.parse(response.json));
  }
  
  res.setHeader('ETag', currentEtag);
  res.setHeader('Cache-Control', 'private, max-age=60');
  return res.json(response);
}
```

**Result:** 95%+ reduction in typical scenarios!
