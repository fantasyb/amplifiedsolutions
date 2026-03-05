import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Schedule a Strategy Call",
  description:
    "Schedule a free 30-minute strategy session or send us a message. We'll show you how Follow Up Boss automation can transform your real estate team's lead conversion.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Amplified Solutions",
    description:
      "Schedule a free 30-minute strategy session or send us a message. We respond within 24 hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
