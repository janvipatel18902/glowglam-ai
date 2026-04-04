// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   app.enableCors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   });

//   app.setGlobalPrefix('api');

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   app.useStaticAssets(join(process.cwd(), 'uploads'), {
//     prefix: '/uploads',
//   });

//   await app.listen(process.env.PORT ?? 5000);
// }
// bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    // origin: [
    //   'http://localhost:3000',
    //   'https://your-frontend-domain.vercel.app',
    // ],
    // credentials: true,

    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
