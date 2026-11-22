import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  return auth.api.getSession({ headers: await headers() });
};

// asol JWT (eyJ... diye shuru), session token na
export const getToken = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const { token } = await auth.api.getToken({ headers: await headers() });
  return token;
};

export const authFetch = async (url: string, init: RequestInit = {}) => {
  const token = await getToken();

  return fetch(url, {
    ...init,
    headers: { ...init.headers, authorization: `Bearer ${token}` },
    cache: "no-store",
  });
};

export const requireRole = async (...roles: string[]) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/login");
  if (roles.length > 0 && !roles.includes(user.role as string)) {
    redirect("/unauthorized");
  }

  return user;
};