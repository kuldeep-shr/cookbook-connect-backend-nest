import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap(): Promise<void> {
  try {
    // Create Nest app
    const app = await NestFactory.create(AppModule);

    // Optional: Enable CORS if needed
    app.enableCors();

    // Optional: Increase JSON payload limit
    app.use(json({ limit: '10mb' }));

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT); // ✅ awaited

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Failed to bootstrap NestJS app:', error);
    process.exit(1); // Exit if the app fails to start
  }
}

void bootstrap();
