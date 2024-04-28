import axios from "axios";
import config from "../config";

class UserService {
    /**
     * User sign up with google account.
     * @param {Object} data
     * @param {string} data.username - Username
     * @param {string} data.fullName - Username
     * @param {string} data.accessToken - Access token of google
     * @param {"hr" | "candidate"} data.type - Type of user
     */
    singUpWithGoogle(data) {
        return this.request("login-with-google", {
            username: data.username,
            full_name: data.fullName,
            access_token: data.accessToken,
            type: data.type
        })
    }

    /**
     * User sign up with google account.
     * @param {Object} data
     * @param {string} data.accessToken - token
     */
    getMe(data) {
        return this.request("get-me", {
            access_token: data.accessToken
        })
    }

    async request(method, data) {
        return axios.post(`${config.BACKEND_URL}/user/${method}`, data)
        .then(response => response.data)
        .catch(response => {
            if (error.response && error.response.data) {
                return error.response.data
            }

            return {
                success: false,
                message: error.message
            }
        })
    }
}

export default new UserService()