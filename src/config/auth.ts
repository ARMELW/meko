import { createAuthClient } from 'better-auth/react'
import { emailOTPClient } from "better-auth/client/plugins"

import {
    inferAdditionalFields,
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api/auth`,
    plugins: [
        inferAdditionalFields({
            user: {
                isAdmin: { type: 'boolean' },
            },
        }),
        emailOTPClient()
    ],
})

export const { signIn, signUp, useSession } = authClient
