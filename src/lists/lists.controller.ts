import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
// import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto); // OK testé back vers BDD avec userId entré manuellement
  }

  @Get(':userId')
  findAllLists(@Param('userId') userId: string) {
    return this.listsService.findAllLists(userId); // OK testé back vers BDD avec userId entré manuellement, retourne un tableau d'objets
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listsService.remove(id); // OK testé back vers BDD avec listID entré manuellement, retourne la liste supprimée ?. Supprime bien les tâches een cascade.
  }
}
