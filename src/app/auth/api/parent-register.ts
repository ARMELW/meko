import { authClient } from "@/config/auth"

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface RegisterCallbacks {
    onSuccess: () => void;
    onError: (error: unknown) => void;
}

export async function parentRegister(
    data: RegisterData,
    callbacks: RegisterCallbacks
): Promise<void> {
    await authClient.signUp.email(
        {
            name: data.name,
            email: data.email,
            password: data.password,
            isAdmin: false,
        },
        {
            onSuccess: () => {
                console.log("User successfully registered");
                callbacks.onSuccess();
            },
            onError: ({ error }) => {
                console.error("Registration failed:", error);
                callbacks.onError(error);
            },
        }
    );
}