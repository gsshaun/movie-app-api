import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async addToFavorite(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoriteRepository.save(createFavoriteDto);
  }

  // getFavoriteList() {
  //   return `This action returns all favorites`;
  // }

  async removeFromFavorite(user: User, movie: Movie) {
    const favorites = await this.favoriteRepository.find({
      where: { user, movie },
    });
    if (favorites.length === 0) {
      throw new NotFoundException('Favorite movie not found');
    }
    await this.favoriteRepository.remove(favorites);
  }
}
