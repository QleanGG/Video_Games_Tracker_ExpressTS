import { AppDataSource } from "../database/database";
import { User } from "../database/entities/User";
import bcrypt from 'bcryptjs';


class UserService {
    private userRepository = AppDataSource.getRepository(User);
    async registerUser(email: string, username: string, password: string): Promise<Omit<User, 'password'> | {message:string}> {
        const existingUser = await this.userRepository.findOne({ where: { email } });

        if (existingUser) {
            return {message: "Email is already in use" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({email, username, password:hashedPassword});

        await this.userRepository.save(newUser);

        const {password: _, ...userWithoutPassword} = newUser;
        return userWithoutPassword;
    }
}

export default UserService;