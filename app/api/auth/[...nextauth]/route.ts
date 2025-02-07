import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID??"",
            clientSecret: process.env.GOOGLE_SECRET??"",
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          const allowedDomains = ['g.ucla.edu', 'ucla.edu'];
          const userEmail = user.email || '';
          const domain = userEmail.split('@')[1];
          
          if (allowedDomains.includes(domain)) {
            return true;
          } else {
            return '/api/auth/error?error=UnauthorizedDomain';
          }
        },
        async redirect({url, baseUrl}){
            return `${baseUrl}/profile`;
        }
      },
});

export {handler as GET, handler as POST};