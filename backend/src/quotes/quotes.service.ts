import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuoteDto } from './dto/quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prismaService: PrismaService) {}

  create(quoteDto: QuoteDto) {
    try {
      const quote = this.prismaService.quote.create({
        data: {
          ...quoteDto,
          contact: {
            create: [...quoteDto.contact],
          },
          transportationType: {
            create: [...quoteDto.transportationType],
          },
        },
      });

      return quote;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.prismaService.quote.findMany({
        include: {
          contact: true,
          transportationType: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.prismaService.quote.findUnique({
        where: {
          id: id,
        },
        include: {
          contact: true,
          transportationType: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  update(id: string, quoteDto: QuoteDto) {
    try {
      return this.prismaService.quote.update({
        where: {
          id: id,
        },
        data: {
          ...quoteDto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.quote.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
