import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prismaService: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    try {
      const quote = this.prismaService.quote.create({
        data: {
          ...createQuoteDto,
          contact: {
            create: [...createQuoteDto.contact],
          },
          transportationType: {
            create: [...createQuoteDto.transportationType],
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
      });
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
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
