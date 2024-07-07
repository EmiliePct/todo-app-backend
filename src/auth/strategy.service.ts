import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config/dist';


type Payload = {
  sub: number,
  email: string,
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

//   //était utilisée dans une vidéo de Houssam mais pour autoriser la suppression de compte je crois... à voir si c'est utile plus tard ?
//   async validate(payload: Payload) {
//     const user = await this.prismaService.user.findUnique({
//       where: { email: payload.email },
//     });
//     if (!user) throw new UnauthorizedException('Unauthorized.');
//     console.log(user);
//     return user;
//   }
}
