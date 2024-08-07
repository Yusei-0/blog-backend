import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);
  await seederService.seed();

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // app.enableCors({
  //   origin: '*',
  // });
  //  Habilitar CORS con opciones específicas
  app.enableCors({
    origin: ['http://localhost:4200', 'http://lytu.online'], // Lista de dominios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Habilitar el intercambio de credenciales (cookies, headers de autorización, etc.)
  });
  await app.listen(4000);
}
bootstrap();
