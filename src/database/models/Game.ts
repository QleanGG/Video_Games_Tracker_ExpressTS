import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Platform } from "./Platform";
import { UserGame } from "./UserGame";

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	genre: string;

	@Column("text")
	description: string;

	@ManyToMany(() => Platform, (platform) => platform.games)
	platforms: Platform[];

	@Column({ nullable: true })
	publisher: string;

	@Column()
	developer: string;

	@Column("date", { nullable: true })
	releaseDate: Date;

	@Column("float", { precision: 2, scale: 1, nullable: true })
	rating: number;

	@OneToMany(() => UserGame, userGame => userGame.user)
    userGames: UserGame[];  
}
