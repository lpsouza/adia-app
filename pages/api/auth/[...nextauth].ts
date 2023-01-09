import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const { name, email: id, image } = user;
            const userInDB = await fetch(`${process.env.CORE_API}/users/${id}`);
            if (userInDB.status === 404) {
                await fetch(`${process.env.CORE_API}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email: id,
                        image,
                    })
                });
            } else if (userInDB.status === 200) {
                const user = await userInDB.json();
                if (user.name !== name || user.image !== image) {
                    await fetch(`${process.env.CORE_API}/users/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            image,
                        })
                    });
                }
            }
            return true
        },
    }
});
