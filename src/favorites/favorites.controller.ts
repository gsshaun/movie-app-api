import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post(':movieId')
  async addToFavorite(@Request() req: any, @Param('movieId') movieId: number) {
    const user: User = req.user;
    const movie: Movie = await this.moviesService.getMovieById(movieId);
    const createFavoriteDto = { user, movie };
    return this.favoritesService.addToFavorite(createFavoriteDto);
  }

  @Delete(':movieId')
  async removeMovieFromFavorite(
    @Request() req: any,
    @Param('movieId') movieId: number,
  ) {
    const user: User = req.user;
    const movie: Movie = await this.moviesService.getMovieById(movieId);
    await this.favoritesService.removeFromFavorite(user, movie);
    return { success: true, message: 'Movie removed successfully' };
  }
}
