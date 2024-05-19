import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { UserGame } from "./UserGame";
import { Profile } from "./Profile";

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

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(() => UserGame, userGame => userGame.user)
    userGames: UserGame[];  // Games associated with the user

    @Column({ default: 'user' })
    role: string;
}
