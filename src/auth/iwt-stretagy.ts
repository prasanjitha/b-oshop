import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from "typeorm";
import { Jwtpayload } from "./jwt-payload";
import { UserEntity } from "./user.entity";
import { User } from "./user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret52'
        });
    }
    async validate(payload: Jwtpayload): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}