import { Contact, Quote, TransportationType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

type QuoteDTO = Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateQuoteDto implements QuoteDTO {
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @IsString()
  @IsNotEmpty()
  destinationLocation: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfTravellers: number;

  @IsDateString()
  @IsNotEmpty()
  departureDate: string;

  @IsDateString()
  returnDate: string;

  transportationTypes?: TransportationType[];

  contact?: Contact[];
}
