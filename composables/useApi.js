import { $fetch } from 'ohmyfetch'
import { useMainStore } from '~/stores/main'
import { useAuthStore } from '~/stores/auth'
import Cookies from 'js-cookie'

const useApi = async (uri, options) => {
    const mainStore = useMainStore()
    const authStore = useAuthStore()
    const { apiBaseUrl } = useRuntimeConfig().public

    mainStore.spinning = true

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.accessToken}`
    }

    try {
        const response = await $fetch(`${apiBaseUrl}${uri}`, {
            ...options,
            headers,
        })

        mainStore.spinning = false

        return response
    } catch (e) {
        if (e.response && e.response.status === 401) {
            try {
                // try refresh token
                const { access_token } = await $fetch(`${apiBaseUrl}/auth/refresh`, {
                    method: 'POST',
                    headers,
                })

                Cookies.set('accessToken', access_token, { path: '/', expires: 7 })
                authStore.accessToken = access_token

                // after token is refreshed, resend the failed request
                const response = await $fetch(`${apiBaseUrl}${uri}`, {
                    ...options,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                })

                mainStore.spinning = false

                return response
            } catch (e) {
                authStore.logout()

                mainStore.spinning = false

                return navigateTo({ name: 'login' })
            }
        }

        mainStore.spinning = false

        throw e
    }
}

export default useApi
