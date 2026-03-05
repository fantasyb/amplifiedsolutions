import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Real Estate CRM Experts",
  description:
    "8+ years building technology for 250+ real estate teams. We deliver complete Follow Up Boss automation systems that transform how teams scale their business.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Amplified Solutions - Real Estate CRM Experts",
    description:
      "8+ years building technology for 250+ real estate teams. We deliver complete Follow Up Boss automation systems that transform how teams scale their business.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
