
// Better Auth admin/impersonation API
export { admin, impersonateUser, stopImpersonating } from '../../config/auth';
export type {
    LoginOtpData,
    LoginFormData,
    OtpFormData,
    VerifyOtpData
} from './types'

export {
    loginSchema,
    otpSchema
} from './schema'

export {
    sendOtpVerification,
} from './api/otp'

export {
    verifyOtpLogin,
    verifyOtpRegister
} from './api/verify-otp'

export {
    checkEmailExists
} from './api/check-email'

export {
    useOtpAuth,
} from './hooks/use-otp-auth'

export {
    useCheckEmail,
} from './hooks/use-check-email'

