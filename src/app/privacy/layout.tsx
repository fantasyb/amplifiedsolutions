import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Amplified Solutions privacy policy. How we collect, use, and protect your information.",
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: false,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
