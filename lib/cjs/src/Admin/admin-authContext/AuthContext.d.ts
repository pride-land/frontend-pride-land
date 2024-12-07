import { ReactNode } from 'react';
import * as jwt from 'jwt-decode';
interface AuthContextType {
    user: jwt.JwtPayload | null;
    authTokens: any;
    loginUser: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    logoutUser: () => void;
}
declare const AuthContext: import("react").Context<AuthContextType | undefined>;
export declare const AuthProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default AuthContext;
export declare const useAuth: () => AuthContextType;
