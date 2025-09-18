"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT') || 3000;
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Flutter Prueba Backend')
        .setDescription('API de prueba con users, movimientos y auth')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port);
    console.log(`Listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map