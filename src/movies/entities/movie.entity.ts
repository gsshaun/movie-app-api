import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'imdb_id', type: 'varchar', length: 20, nullable: true })
  imdbId: string;

  @Column({ name: 'poster', type: 'varchar', length: 255, nullable: true })
  poster: string;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'type', type: 'varchar', length: 20, nullable: true })
  type: string;

  @Column({ name: 'director', type: 'varchar', length: 20, nullable: true })
  director: string;

  @Column({ name: 'plot', type: 'varchar', length: 255, nullable: true })
  plot: string;

  @Column({ name: 'actors', type: 'text', nullable: true })
  actors: string;

  @OneToMany(() => Favorite, (favorite) => favorite.movie)
  favorites: Favorite[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
