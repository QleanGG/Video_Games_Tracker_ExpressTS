import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Game } from './Game';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Game, game => game.genres)
  games: Game[];
}
