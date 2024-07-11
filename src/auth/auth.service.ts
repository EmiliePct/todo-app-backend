import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pwd: string): Promise<AuthEntity> {
    // Etape 1 : Trouver le user par son email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // Si aucun user trouvé, lever une exception
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Etape 2 : Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(pwd, user.pwd);

    // Si le mot de passe ne correspond pas, lever une exception
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Etape 3 : Générer un mot de passe contenant l'ID du user et le retourner
    return {
      userId: user.id,
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
