import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { UserGame } from "./UserGame";
import { UserProfile } from "./UserProfile";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	username: string;

	@Column({ unique: true, nullable: true })
	email: string;

    @Column({nullable: true})
    password: string;

    @Column({ nullable: true })
    oauthProvider: string;

    @Column({nullable: true})
    oauthId: string;

    @OneToOne(() => UserProfile, profile => profile.user)
    profile: UserProfile;

    @OneToMany(() => UserGame, userGame => userGame.user)
    userGames: UserGame[];  // Games associated with the user
}
