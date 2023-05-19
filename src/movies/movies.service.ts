import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto) {
    const { actors, ...movie } = createMovieDto;
    const newMovie = this.movieRepository.create(movie);
    newMovie.actors = actors.toString();
    return await this.movieRepository.save(newMovie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    Object.assign(movie, updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async removeMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.remove(movie);
    return `Movie with ID ${id} is removed`;
  }
}
