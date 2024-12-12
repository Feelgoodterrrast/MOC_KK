import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Swal from "sweetalert2";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://www.melivecode.com/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();

        if (response.status === "ok") {
          await Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ",
            text: "ยินดีต้อนรับเข้าสู่ระบบ",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          return response.user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
