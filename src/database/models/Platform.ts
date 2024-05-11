import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from 'typeorm';
import {Game} from './Game';

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Game, game => game.platforms)
    @JoinTable()
    games: Game[]
}
