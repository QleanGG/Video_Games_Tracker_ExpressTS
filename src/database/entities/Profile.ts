import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: true })
    bio: string; // Short biography or gamer description
    
    @Column({ nullable: true, default: "/public/default_avatar.png" })
    avatarUrl: string; // URL to the user's avatar image, can be linked to an actual image file
    
    @Column({ nullable: true })
    favoriteGames: string; // List of favorite games, could be stored as JSON
    
    @Column({ nullable: true })
    gamerTag: string; // User's in-game nickname or handle
    
    @Column({ type: 'text', array: true, nullable: true })
    platforms: string[]; // Array of gaming platforms the user is interested in
    
    @Column({ nullable: true })
    mainPlatform: string; // User's primary gaming platform
    
    @OneToOne(() => User, user => user.profile)
    @JoinColumn() // Specifies that UserProfile will own the relationship and contain the foreign key
    user: User;
}