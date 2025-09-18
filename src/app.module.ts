import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: "mongodb+srv://oscarleonardoortizramirez_db_user:In1VAKDJlnLV7BHD@pruebaflutter.1hvbywd.mongodb.net/",
        // options can be added here
      }),
    }),
    UsersModule,
    MovimientosModule,
    AuthModule,
  ],
})
export class AppModule {}
