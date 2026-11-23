import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

// ek-i client bar bar use hobe (dev e hot reload, prod e ek-i instance e)
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

const client =
    globalForMongo._mongoClient ??
    (globalForMongo._mongoClient = new MongoClient(
        process.env.BETTER_AUTH_DB_URI as string
    ));

const db = client.db("rentifydb");

export const auth = betterAuth({

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: ['customer', 'owner', 'admin'],
                input: true,
                default: 'customer',
            }
        }
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            mapProfileToUser: () => ({
                role: "customer",
            }),
        },
    },

    database: mongodbAdapter(db),
     plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }),
      },
    }),
  ],
});