import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signinDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly JwtService: JwtService,
  ) {}
  async signup(signupDto: SignupDto) {
    const { email, first_name, surname, pwd } = signupDto;
    // ** Vérifier si l'utilisateur est déjà inscrit
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists.');
    // ** Hasher le mot de passe
    const hash = await bcrypt.hash(pwd, 10);
    // ** Enregistrer l'utilisateur dans la base de données
    await this.prismaService.user.create({
      data: { email, first_name, surname, pwd: hash },
    });
    // ** Retourner une réponse de succès
    return { data: 'User successfully created.' };
  }

  async signin(signinDto: SigninDto) {
    const { email, pwd } = signinDto;
    // ** Véririer si l'utilisateur est déjà inscrit
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found.');
    // ** Comparer le mot de passe
    const match = await bcrypt.compare(pwd, user.pwd);
    if (!match) throw new UnauthorizedException('Password does not match.');
    // ** Retourner un access token jwt
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.JwtService.signAsync(payload);
    return { user: user.email, token };
  }
}
