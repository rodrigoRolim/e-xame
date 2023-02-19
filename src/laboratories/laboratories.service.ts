import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditLaboratoryDto } from "./dto";
import { CreateLaboratoryDto } from "./dto/CreateLaboratories.dto";

@Injectable()
export class LaboratoryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateLaboratoryDto) {
    const laboratory = await this.prisma.laboratory.create({
      data: dto,
    })

    return laboratory;
  }

  getLaboratories(userId: number) {
    return this.prisma.laboratory.findMany({
      where: {
        id: userId
      }
    })
  }

  getLaboratoryById(userId: number, laboratoryById: number) {

  }

  editLaboratoryById(userId: number, dto: EditLaboratoryDto) {}

  deleteLaboratoryById(userId: number, laboratoryById: number) {}
}