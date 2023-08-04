import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { EditLaboratoryDto } from './dto';
import { CreateLaboratoryDto } from './dto/CreateLaboratories.dto';
import { LaboratoryService } from './laboratories.service';

@Controller('laboratory')
export class LaboratoryController {
  constructor(
    private laboratoryService: LaboratoryService,
  ) {}

  @Post('create')
  create(
    @GetUser('id') userId: number,
    @Body() dto: CreateLaboratoryDto,
  ) {
    return this.laboratoryService.create(
      userId,
      dto,
    );
  }

  @Get()
  getLaboratories(@GetUser('id') userId: number) {
    return this.laboratoryService.getLaboratories(
      userId,
    );
  }

  @Get(':id')
  getLaboratoryById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    laboratoryId: number,
  ) {
    return this.laboratoryService.getLaboratoryById(
      userId,
      laboratoryId,
    );
  }

  @Patch(':id')
  editLaboratoryById(
    @GetUser('id') userId: number,
    @Body() dto: EditLaboratoryDto,
  ) {
    return this.laboratoryService.editLaboratoryById(
      userId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteLaboratoryById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)
    laboratoryId: number,
  ) {
    return this.laboratoryService.deleteLaboratoryById(
      userId,
      laboratoryId,
    );
  }
}
