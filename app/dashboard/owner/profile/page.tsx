import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/app/components/ProfileForm";

export default async function OwnerProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <ProfileForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }}
      />
    </div>
  );
}