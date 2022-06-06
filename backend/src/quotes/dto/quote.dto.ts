import { Contact, Quote, Transportation, Location } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
} from 'class-validator';

type keysToOmit =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'departureLocationId'
  | 'destinationLocationId';

type QuoteDTO = Omit<Quote, keysToOmit>;

export class QuoteDto implements QuoteDTO {
  @IsObject()
  @IsNotEmptyObject()
  departure: Location;

  @IsObject()
  @IsNotEmptyObject()
  destination: Location;

  @IsDateString()
  @IsNotEmpty()
  departureDate: string;

  @IsDateString()
  returnDate: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfTravellers: number;

  @IsArray()
  contact: Contact[];

  @IsArray()
  transportation: Transportation[];
}
