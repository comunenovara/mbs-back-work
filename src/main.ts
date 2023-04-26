import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix(process.env.BASE_URL);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}));

	app.enableCors();

    // Swagger
    {
        const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setVersion('1.0')
        .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }

    await app.listen(3000);
}
bootstrap();
