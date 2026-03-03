import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* -------------------- CORS -------------------- */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /* -------------------- API Prefix -------------------- */
  app.setGlobalPrefix('api/v1');

  /* -------------------- Serve React Build -------------------- */

  const clientPath = path.join(__dirname, '../../dist/client');

  // Serve static files
  app.use(express.static(clientPath));

  // SPA fallback (لا يلمس API)
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }

    res.sendFile(path.join(clientPath, 'index.html'));
  });

  /* -------------------- Start Server -------------------- */

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 App URL: http://localhost:${port}`);
  console.log(`📡 API: http://localhost:${port}/api/v1`);
}

bootstrap();