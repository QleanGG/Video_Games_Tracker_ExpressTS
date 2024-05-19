// src/@types/express/index.d.ts
import { User as CustomUser } from "../../types";

declare global {
    namespace Express {
        interface User extends CustomUser {}
    }
}
