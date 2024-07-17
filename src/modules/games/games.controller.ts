import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGamesDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";


@Controller('games')
export class GamesController{
    constructor (private readonly gamesService:GamesService) {}

    @Get()
    async findAll(){
        return this.gamesService.findAll();
    }

    @Get(':id')
    async findUnique(@Param('id') id:string){
        return this.gamesService.findUnique(Number(id));
    }

    @Post()
    async createGame(@Body() createGamesDto:CreateGamesDto){
        return this.gamesService.createGame(createGamesDto)
    }

    @Put(':id')
    async updateGame(@Param('id') @Body() id:string, updateGameDto:UpdateGameDto){
        return this.gamesService.updateGame(Number(id), updateGameDto)
    }

    @Delete(':id')
    async deleteGame(@Param('id') id:string){
        return this.gamesService.deleteGame(Number(id))
    }

}