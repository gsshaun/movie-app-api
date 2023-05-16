import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
