import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuotesModule } from './quotes/quotes.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [QuotesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
