import { PrismaService } from "src/prisma/prisma.service";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGamesDto } from "./dto/create-game.dto";
import { Category } from "@prisma/client";
import { UpdateGameDto } from "./dto/update-game.dto";


@Injectable()
export class GamesService {
    constructor(private readonly prisma: PrismaService) { }


    async findAll() {
        return this.prisma.games.findMany();
    }

    async findUnique(id: number) {
        return this.prisma.games.findUnique({
            where: { id }
        })
    }

    async createGame(createGamesDto: CreateGamesDto) {

        const existGame = await this.prisma.games.findFirst({
            where: {
                title: createGamesDto.title,
                category: createGamesDto.category as Category
            },
        })

        if (existGame) {
            throw new ConflictException('Jogo já existente, tente novamente!');
        }

        return this.prisma.games.create({ data: createGamesDto })
    }

    async updateGame(id: number, updateGameDto: UpdateGameDto) {
        if (!updateGameDto || !updateGameDto.title || !updateGameDto.category) {
            throw new ConflictException('Dados de atualização incompletos ou inválidos.');
        }
        const existGame = await this.prisma.games.findUnique({
            where: { id },
        });

        if (!existGame) {
            throw new NotFoundException('Jogo não encontrado');
        }

        const duplicateGame = await this.prisma.games.findFirst({
            where: {
                title: updateGameDto.title,
                category: updateGameDto.category as Category,
                NOT: { id }, 
            },
        });

        if (duplicateGame) {
            throw new ConflictException('O jogo com esse título e categoria já existe!');
        }

        return this.prisma.games.update({
            where: { id },
            data: updateGameDto,
        });
    }

    async deleteGame(id:number){
        return this.prisma.games.delete({
            where: { id }
        })
    }

}