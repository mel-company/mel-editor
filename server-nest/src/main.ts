import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Editor API')
    .setDescription('API documentation for the Editor application')
    .setVersion('1.0')
    .addTag('stores', 'Store management endpoints')
    .addTag('templates', 'Template management endpoints')
    .addTag('storage', 'File storage endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 NestJS Server running at http://localhost:${port}`);
  console.log(`   - API: http://localhost:${port}/api/v1`);
  console.log(`   - Swagger Docs: http://localhost:${port}/api`);
}

bootstrap();
