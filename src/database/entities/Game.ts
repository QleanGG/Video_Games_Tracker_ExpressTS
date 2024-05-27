import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Platform } from "./Platform";
import { UserGame } from "./UserGame";
import { Genre } from "./Genre";

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@ManyToMany(() => Genre, (genre) => genre.games)
	@JoinTable()
	genres: Genre[];

	@Column({ nullable: true })
	description: string;

	@ManyToMany(() => Platform, (platform) => platform.games)
	platforms: Platform[];

	@Column({ nullable: true })
	publisher: string;

	@Column()
	developer: string;

	@Column("date", { nullable: true })
	releaseDate: Date;

	@Column("numeric", { precision: 2, scale: 1, nullable: true })
	rating: number;

	@OneToMany(() => UserGame, userGame => userGame.game)
    userGames: UserGame[];  

	@Column({ nullable: true })
    imageUrl: string;
}
