import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { MoviesService } from 'src/movies/movies.service';
import { Movie } from 'src/movies/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Movie])],
  controllers: [FavoritesController],
  providers: [FavoritesService, MoviesService],
})
export class FavoritesModule {}
