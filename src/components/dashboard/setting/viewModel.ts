import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "linkWithBackend/services/auth_service";
import container from "linkWithBackend/services/inversify.config";

export function signOutHandle() {
    const authService = container.get<AuthService>(TYPES.AuthService)

    const signOut = async() => {
        const signOutStatus = await authService.signOut()
        if (signOutStatus === 200) {
            return true
        }
        return false
    }
    return signOut()
}