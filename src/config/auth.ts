import { createAuthClient } from 'better-auth/react'
import { emailOTPClient } from "better-auth/client/plugins"

import {
    inferAdditionalFields,
     adminClient
} from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    baseURL: `${import.meta.env.VITE_APP_SERVER_URL || 'https://dev-api.meko.ac'}/api/auth`,
    plugins: [
        inferAdditionalFields({
            user: {
                isAdmin: { type: 'boolean' },
                firstname: { type: 'string'},
                lastname: { type: 'string'},
                isTrialActive: { type: 'boolean' },
                trialStartDate: { type: 'string' },
                trialEndDate: { type: 'string' }
            },
        }),
        emailOTPClient(),
         adminClient()
    ],
})

export const { signIn, signUp, useSession } = authClient
export const admin = authClient.admin;
export const impersonateUser = authClient.admin?.impersonateUser;
export const stopImpersonating = authClient.admin?.stopImpersonating;
