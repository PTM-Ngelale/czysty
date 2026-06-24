import { redirect } from "next/navigation";
import Image from "next/image";
import JoinForm from "./JoinForm";

export const metadata = {
  title: "Join Czysty Cleaners — Register",
  robots: "noindex, nofollow",
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const secret = process.env.QR_SECRET;

  if (!secret || params.ref !== secret) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <a href="/">
        <Image
          src="/images/logo.png"
          alt="Czysty Cleaners"
          width={200}
          height={68}
          className=""
          priority
        />
      </a>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-czysty-green/12 shadow-sm">
        {/* Card header */}
        <div className="bg-czysty-black px-10 py-8">
          <p className="font-body text-czysty-green text-[11px] uppercase tracking-[0.25em] mb-2">
            Celebrate with us!
          </p>
          <h1
            className="font-display font-extrabold text-czysty-cream uppercase leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}
          >
            CZYSTY @ 10
            <br />
            <span className="text-czysty-green">GIVEAWAY 🥳</span>
          </h1>
          <p className="font-body text-czysty-cream/45 text-[13px] mt-3 leading-relaxed">
            Enter your details for a chance to win a FREE professional clean up.
          </p>
        </div>

        {/* Form */}
        <div className="px-10 py-8">
          <JoinForm />
        </div>
      </div>

      <p className="font-body text-czysty-muted/40 text-[11px] mt-8 text-center">
        Czysty Cleaners Int&apos;l Ltd · Lagos
      </p>
    </main>
  );
}
