import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findUnique(id: number) {
        const user = await this.prisma.user.findUnique(
            {
                where: { id }
            }
        )
        if (!user) {
            throw new NotFoundException(`Usuário com o id ${id}, não foi encontrado`)
        }
        return user
    }

    async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: createUserDto.email },
                    { nickname: createUserDto.nickname }
                ],
            },
        });

        if (existingUser) {
            throw new ConflictException('Usuário já existente, tente novamente!');
        }

        return this.prisma.user.create({ data: createUserDto })
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            
            throw new NotFoundException('Usuário não encontrado');
        }

        if (
            (updateUserDto.email && updateUserDto.email !== existingUser.email) || 
            (updateUserDto.nickname && updateUserDto.nickname !== existingUser.nickname)
        ) {
            const conflictingUser = await this.prisma.user.findFirst({
                where: {
                    id: { not: id }, 
                    OR: [
                        { email: updateUserDto.email },
                        { nickname: updateUserDto.nickname }
                    ],
                },
            });

            if (conflictingUser) {
                throw new ConflictException('Usuário com esse e-mail ou nickname já existe');
            }
        }

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({ where: { id } })
    }

}