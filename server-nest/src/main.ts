import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      '*',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://demo.localhost:5173',
      'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Swagger configuration
  // const config = new DocumentBuilder()
  //   .setTitle('Editor API')
  //   .setDescription('API documentation for the Editor application')
  //   .setVersion('1.0')
  //   .addTag('stores', 'Store management endpoints')
  //   .addTag('templates', 'Template management endpoints')
  //   .addTag('storage', 'File storage endpoints')
  //   .addTag('products', 'Product management endpoints')
  //   .addTag('categories', 'Category management endpoints')
  //   .addTag('upload', 'File upload endpoints')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 NestJS Server running at http://localhost:${port}`);
  console.log(`   - API: http://localhost:${port}/api/v1`);
  console.log(`   - Swagger Docs: http://localhost:${port}/api`);
}

bootstrap();
