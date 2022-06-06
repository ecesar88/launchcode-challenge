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
          departure: {
            create: quoteDto.departure,
          },
          destination: {
            create: quoteDto.destination,
          },
          contact: {
            create: [...quoteDto.contact],
          },
          transportation: {
            create: [...quoteDto.transportation],
          },
        },
      });

      return quote;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.quote.findMany({
        include: {
          contact: true,
          transportation: true,
          departure: {
            include: {
              coordinates: true,
            },
          },
          destination: {
            include: {
              coordinates: true,
            },
          },
        },
      });

      return {
        count: data?.length,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async paginate(skip: string, take = '10') {
    try {
      const data = await this.prismaService.quote.findMany({
        skip: parseInt(skip),
        take: parseInt(take),
        include: {
          contact: true,
          transportation: true,
          departure: {
            include: {
              coordinates: true,
            },
          },
          destination: {
            include: {
              coordinates: true,
            },
          },
        },
      });

      return {
        count: data?.length,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prismaService.quote.findUnique({
        where: {
          id: id,
        },
        include: {
          contact: true,
          transportation: true,
          departure: {
            include: {
              coordinates: true,
            },
          },
          destination: {
            include: {
              coordinates: true,
            },
          },
        },
      });

      return {
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, quoteDto: QuoteDto) {
    try {
      return this.prismaService.quote.updateMany({
        where: {
          id: id,
        },
        data: quoteDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.quote.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
