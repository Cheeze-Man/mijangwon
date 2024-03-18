import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Signin from "@/components/Signin";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Ouroom",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const SigninPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
};

export default SigninPage;
