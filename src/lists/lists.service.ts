import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prismaservice: PrismaService) {}

  create(createListDto: CreateListDto) {
    return this.prismaservice.list.create({
      data: createListDto,
    }); // OK testé back vers BDD avec userId donné manuellement
  }

  findAllLists(userId: number) {
    return this.prismaservice.list.findMany({
      where: { userId },
    }); // OK testé back vers BDD avec userId donné manuellement
  }

  remove(id: number) {
    return this.prismaservice.list.delete({
      where: { id },
    });
  }
}
