import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { SignupDto } from './dto/signupDto';
import { SigninDto } from './dto/signinDto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
 
@Controller('auth')
export class AuthController {
  // pour injecter la classe au niveau du controller
  constructor(private readonly authService: AuthService) {}

  // ** Inscription
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  // ** Connexion et création du token
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

//   @UseGuards(AuthGuard("jwt")) // pour protéger la possibilité d'utiliser une route. dans une vidéo de Houssam mais pour autoriser la suppression de compte je crois... à voir si c'est utile plus tard ?
 
}
