import {Module} from '@nestjs/common';
import {AuthRepository} from 'src/application/auth/repositories/auth.repository';
import {SignInService} from 'src/application/auth/services/SignInService';
import {ValidateUserService} from 'src/application/auth/services/ValidateUserService';
import {PrismaService} from 'src/external/services/prisma.service';

@Module({
	providers: [SignInService, ValidateUserService, AuthRepository, PrismaService],
	exports: [SignInService, ValidateUserService, AuthRepository]
})
export class AuthServicesModule {}
