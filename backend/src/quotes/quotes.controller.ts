import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuoteDto } from './dto/quote.dto';
import ROUTES from 'src/constants/routes';

@Controller(ROUTES.QUOTES)
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() quoteDto: QuoteDto) {
    return this.quotesService.create(quoteDto);
  }

  @Get(`${ROUTES.QUOTES_PAGINATE}`)
  paginate(@Query() queryParams: Record<string, string>) {
    console.log(queryParams);
    return this.quotesService.paginate(queryParams.skip, queryParams.take);
  }

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() quoteDto: QuoteDto) {
    return this.quotesService.update(id, quoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }
}
