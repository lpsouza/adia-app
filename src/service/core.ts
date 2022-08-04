const api = process.env.NEXT_PUBLIC_CORE_API;

const CoreService = {
  users: {
    get: async (email?: string) => {
      let url = !email ? `${api}/users` : `${api}/users/${email}`;
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
      const response = await fetch(`${api}/users`, {
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