import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credentiaols.dto';
import { UserEntity } from './user.entity';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { Jwtpayload } from './jwt-payload';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        // const found = await this.userRepository.findOne({ where: { username: authCredentialDto.username } });
        // if (found) {
        //     throw new NotFoundException(`Username already exists`);
        // }
        const salt = await bcrypt.genSalt();
        authCredentialDto.salt = salt;
        authCredentialDto.password = await this.hashPassword(authCredentialDto.password, salt);

        try {
            await this.userRepository.save(authCredentialDto);
        } catch (error) {
            if (error.code === 23505) {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (user && await user.validatePassword(password)) {
            const payLoad: Jwtpayload = { username };
            const accessToken = await this.jwtService.sign(payLoad);
            return { accessToken };
        } else {
            return null;
        }

    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
