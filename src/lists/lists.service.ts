import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
// import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prismaservice: PrismaService) {}

  create(createListDto: CreateListDto) {
    return this.prismaservice.list.create({
      data: createListDto,
      include: { user: true }, //pas sûr qu'il soit utile de renvoyer le user
    }); // OK testé back vers BDD avec userId donné manuellement
  }

  findAllLists(userId: string) {
    return this.prismaservice.list.findMany({
      where: { userId: parseInt(userId) },
    }); // OK testé back vers BDD avec userId donné manuellement
  }

  // update(id: number, updateListDto: UpdateListDto) {
  //   return `This action updates a #${id} list`;
  // }

  remove(id: string) {
    return this.prismaservice.list.delete({
      where: { id: parseInt(id) },
    });
  }
}
