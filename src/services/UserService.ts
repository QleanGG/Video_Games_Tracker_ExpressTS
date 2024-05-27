import { AppDataSource } from "../database/database";
import { User } from "../database/entities/User";
import bcrypt from 'bcryptjs';


class UserService {
    private userRepository = AppDataSource.getRepository(User);
    async registerUser(email: string, username: string, password: string): Promise<Omit<User, 'password'> | {message:string}> {
        const existingMail = await this.userRepository.findOne({ where: { email } });

        if (existingMail) {
            return {message: "Email is already in use" };
        }

        const existingUser = await this.userRepository.findOne({ where: { username } });

        if (existingUser) {
            return {message: "User already registered" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({email, username, password:hashedPassword});

        await this.userRepository.save(newUser);

        const {password: _, ...userWithoutPassword} = newUser;
        return userWithoutPassword;
    }
}

export default UserService;