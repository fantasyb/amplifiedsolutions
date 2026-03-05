import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Amplified Solutions terms of service and conditions of use.",
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: false,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
