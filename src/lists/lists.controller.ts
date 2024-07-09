import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { ListEntity } from './entities/list.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'; // pour grouper les endpoints sur Swagger et créer des réponses claires ou du bon type

@Controller('lists')
@UseGuards(JwtAuthGuard) // pour protéger toutes les API
@ApiBearerAuth() // pour signaler à swagger que les requêtes sont protégées
@ApiTags('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  @ApiCreatedResponse({ type: ListEntity })
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto); // OK testé back vers BDD avec userId entré manuellement
  }

  @Get(':userId')
  @ApiOkResponse({ type: ListEntity, isArray: true })
  async findAllLists(@Param('userId', ParseIntPipe) userId: number) {
    return this.listsService.findAllLists(userId); // OK testé back vers BDD avec userId entré manuellement, retourne un tableau d'objets
  }

  @Delete(':id')
  @ApiOkResponse({ type: ListEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.remove(id); // OK testé back vers BDD avec listID entré manuellement, retourne la liste supprimée ?. Supprime bien les tâches een cascade.
  }
}
