import { BACKEND_API_URL } from "./config"

export const createImageUrl = (path) => {
    // TODO : remove this check once image path issue is fixed
    // Author: Atabic
    if (path && !path.includes("uploads")) {
        return `${BACKEND_API_URL + "uploads/" + path}`
    }
    return `${BACKEND_API_URL + path}`
}