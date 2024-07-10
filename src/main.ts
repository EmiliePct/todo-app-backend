import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//Pour créer un intercepteur pour exclure des propriétés d'objets de réponse
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, enableDebugMessages: true }),
  ); //pour activer la validation dto au global. La whitelist permet d'empêcher l'injection de propriétés qui n'auraient pas de décorateur de validation dans les DTO
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Todo-app')
    .setDescription('Todo-app - test technique')
    .setVersion('0.1')
    .addBearerAuth() // pour pouvoir autoriser les tests sur les API protégées dans Swagger avec un token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
