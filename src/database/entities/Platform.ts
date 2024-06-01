import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Game } from "./Game";

export enum PlatformName {
	PlayStation5 = "PlayStation 5",
	PC = "PC",
	NintendoSwitch = "Nintendo Switch",
	XboxSeriesX = "Xbox Series X",
}

@Entity()
export class Platform {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: PlatformName,
	})
	name: PlatformName;

	@ManyToMany(() => Game, (game) => game.platforms)
	@JoinTable()
	games: Game[];
}
