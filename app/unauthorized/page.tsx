import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-black">403</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        You do not have permission to view this page.
      </p>
      <Link
        href="/"
        className="mt-5 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Go to Home
      </Link>
    </div>
  );
}