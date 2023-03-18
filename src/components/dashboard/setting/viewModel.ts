import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "linkWithBackend/services/auth_service";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";

export function signOutHandle() {
    const memService = container.get<MemoryService>(TYPES.MemoryService)
    const authService = container.get<AuthService>(TYPES.AuthService)

    const signOut = async() => {
        const refreshToken = memService.getLocalStorage("refreshToken")
        const signOutStatus = await authService.signOut(refreshToken)

        if (signOutStatus === 200) {
            memService.removeLocalStorage()
            return true
        }
        return false
    }
    return signOut()
}