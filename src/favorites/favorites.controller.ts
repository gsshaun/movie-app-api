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
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { AuthGuard } from '@nestjs/passport';
import { Favorite } from './entities/favorite.entity';

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
    return await this.favoritesService.addToFavorite(createFavoriteDto);
  }

  @Get()
  async getFavoritesList(@Request() req: any) {
    const user: User = req.user;
    const favorites = await this.favoritesService.getFavoriteList(user);
    if (favorites.length === 0) {
      throw new NotFoundException('No favorites found');
    }

    return favorites;
  }

  @Delete()
  async removeAllFavorites(@Request() req: any) {
    const favorites: Favorite[] = await this.getFavoritesList(req);
    await this.favoritesService.removeAllFromFavoriteList(favorites);

    return { success: true, message: 'Favorites removed' };
  }

  @Delete(':movieId')
  async removeMovieFromFavorites(
    @Request() req: any,
    @Param('movieId') movieId: number,
  ) {
    const user: User = req.user;
    const movie: Movie = await this.moviesService.getMovieById(movieId);
    await this.favoritesService.removeFromFavorites(user, movie);
    return { success: true, message: 'Movie removed successfully' };
  }
}
