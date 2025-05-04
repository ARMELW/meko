import { authClient } from "@/config/auth"

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginCallbacks {
    onSuccess: () => void;
    onError: (error: unknown) => void;
}

export async function login(
    data: LoginData,
    callbacks: LoginCallbacks
): Promise<void> {
    await authClient.signIn.email(
        {
            email: data.email,
            password: data.password
        },
        {
            onSuccess: () => {
                console.log("You have successfully logged in.");
                callbacks.onSuccess();
            },
            onError: ({ error }) => {
                console.error("login failed:", error);
                callbacks.onError(error);
            },
        }
    );
}