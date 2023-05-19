import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.createMovie(createMovieDto);
  }

  @Get()
  async findAllMovies() {
    return await this.moviesService.findAllMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.moviesService.getMovieById(+id);
  }

  @Patch(':id')
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.moviesService.updateMovie(+id, updateMovieDto);
  }

  @Delete(':id')
  async removeMovie(@Param('id') id: string) {
    return await this.moviesService.removeMovie(+id);
  }
}
