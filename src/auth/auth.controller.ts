import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentiaols.dto';
import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';
import { User } from './user.model';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }
    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: UserEntity) {
        console.log(user);
    }
}
