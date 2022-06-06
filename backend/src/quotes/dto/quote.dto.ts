import { Contact, Quote, TransportationType } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

type QuoteDTO = Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>;

export class QuoteDto implements QuoteDTO {
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @IsString()
  departureAirportName: string;

  @IsString()
  destinationAirportName: string;

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

  @IsArray()
  transportationType: TransportationType[];

  @IsArray()
  contact: Contact[];
}
