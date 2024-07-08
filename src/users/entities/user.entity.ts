import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  //Pour pouvoir créer un objet de type Partial User Entity avec une partie des propriétés seulement
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @Exclude()
  pwd: string; // pour ne pas l'exposer dans la doc des API
}
