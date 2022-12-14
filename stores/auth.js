import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useMainStore } from '~/stores/main'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            accessToken: useCookie('accessToken'),
        }
    },

    actions: {
        async login(body) {
            const mainStore = useMainStore()

            mainStore.spinning = true

            const { authBaseUrl } = useRuntimeConfig().public

            try {
                let { data } = await $fetch(`${authBaseUrl}/login`, {
                    method: 'POST',
                    body,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                Cookies.set('accessToken', data.access_token, { path: '/', expires: 7 })

                this.accessToken = data.access_token

                let user = {
                    id: data.user.id,
                    id_1c: data.user.id_1c,
                    login: data.user.login,
                    email: data.user.email,
                    name: data.user.name,
                    filial: data.user.filial,
                    filial_id_esbd: data.user.filial_id_esbd,
                    manager_id: data.user.manager_id,
                    agent_id: data.user.agent_id,
                    agents: data.user.agents
                        ? data.user.agents.map((agent) => {
                            return {
                                id_1c: agent.id_1c,
                                login: agent.login,
                                email: agent.email,
                                name: agent.name,
                            }
                        })
                        : [],
                    roles: data.user.roles,
                    roleNames: data.user.roles
                        .reduce((roleNames, currentRole) => {
                            if (roleNames === '') {
                                return roleNames + currentRole.title
                            }

                            if (roleNames.includes(currentRole.title)) {
                                return roleNames
                            }

                            return roleNames + ', ' + currentRole.title
                        }, ''),
                }

                localStorage.setItem('user', JSON.stringify(user))

                mainStore.spinning = false

                return data
            } catch (e) {
                mainStore.spinning = false

                throw e
            }
        },

        logout() {
            Cookies.remove('accessToken')

            this.accessToken = ''
        },
    },

    getters: {
        isAuthenticated(state) {
            return !!state.accessToken
        },

        user(state) {
            let value = {}

            if (process.client && state.accessToken) {
                value = JSON.parse(localStorage.getItem('user'))
            }

            return value
        },

        hasRole() {
            return (roleName) => this.user.id && this.user.roles.some((role) => role.title === roleName)
        },

        isAdmin() {
            return this.hasRole('Admin')
        },

        isManager() {
            return this.hasRole('Manager')
        },

        isAgent() {
            return this.hasRole('Agent')
        },

        isSubagent() {
            return this.hasRole('Subagent')
        },
        isOperator() {
            return this.hasRole('Operator')
        },

        agents() {
            return this.user.id ? this.user.agents : []
        }
    },
})
