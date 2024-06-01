import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { User } from "./User";
import { Platform } from "./Platform";

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	bio: string; // Short biography or gamer description

	@Column({ nullable: true, default: "/uploads/default_avatar.png" })
	avatarUrl: string; // URL to the user's avatar image, can be linked to an actual image file

	@Column({ nullable: true })
	favoriteGames: string; // List of favorite games, could be stored as JSON

	@Column({ nullable: true })
	gamerTag: string; // User's in-game nickname or handle

	@ManyToMany(() => Platform)
	@JoinTable()
	platforms: Platform[]; // Array of gaming platforms the user is interested in

	@ManyToOne(() => Platform, { nullable: true })
	@JoinColumn()
	mainPlatform: Platform; // User's primary gaming platform

	@OneToOne(() => User, (user) => user.profile)
	@JoinColumn() // Specifies that UserProfile will own the relationship and contain the foreign key
	user: User;
}
