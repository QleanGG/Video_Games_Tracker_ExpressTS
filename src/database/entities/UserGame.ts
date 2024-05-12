import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';
import { Game } from "./Game";

export enum GameStatus {
    Interested = "Interested",
    Own = "Own",
    CurrentlyPlaying = "Currently Playing",
    OnHold = "On Hold",
    Dropped = "Dropped",  
    Finished = "Finished",
    Completed = "Completed"
}

@Entity()
export class UserGame {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userGames)
    user: User;

    @ManyToOne(() => Game, game => game.userGames)
    game: Game;

    @Column({
        type: "enum",
        enum: GameStatus,
        default: GameStatus.Interested
    })
    status: GameStatus;  // Use the enum for statuses

    @Column({ nullable: true })
    review: string;  // Textual review of the game

    @Column("numeric", { nullable: true, precision: 2, scale: 1 })
    rating: number;  // Rating given by the user, from 1.0 to 10.0
}