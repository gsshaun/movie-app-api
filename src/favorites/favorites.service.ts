import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
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
    const { user, movie } = createFavoriteDto;
    const favorite = await this.favoriteRepository.findOne({
      where: { user, movie },
    });
    if (favorite) {
      throw new ConflictException('Movie already in favorites');
    }
    return await this.favoriteRepository.save(createFavoriteDto);
  }

  async getFavoriteList(user: User) {
    return await this.favoriteRepository.find({
      where: { user },
      relations: ['movie'],
    });
  }

  async removeAllFromFavoriteList(favorites: Favorite[]) {
    await this.favoriteRepository.remove(favorites);
  }

  async removeFromFavorites(user: User, movie: Movie) {
    const favorite = await this.favoriteRepository.findOne({
      where: { user, movie },
    });
    if (!favorite) {
      throw new NotFoundException('Favorite movie not found');
    }
    await this.favoriteRepository.remove(favorite);
  }
}
