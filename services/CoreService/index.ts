import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const CoreService = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      return response;
    },
    register: async (name: string, email: string, password: string) => {
      const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      return response;
    },
    token: async (token: string) => {
      const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      return response;
    },
    refresh: async (token: string) => {
      const response = await fetch(`${publicRuntimeConfig.CORE_API}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      return response;
    }
  },
  users: {
    get: async (email?: string) => {
      let url = !email ? `${publicRuntimeConfig.CORE_API}/users` : `${publicRuntimeConfig.CORE_API}/users/${email}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
      });
      return response.json();
    },
    post: async (user: any) => {
      const response = await fetch(`${publicRuntimeConfig.CORE_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        },
        body: JSON.stringify(user)
      });
      return response.json();
    }
  }
}

export default CoreService;