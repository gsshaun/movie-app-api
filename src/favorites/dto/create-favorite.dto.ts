import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateFavoriteDto {
  public user: User;
  public movie: Movie;
}
