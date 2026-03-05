import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials - Real Estate Teams We've Helped",
  description:
    "See what real estate teams like Spyglass Realty, Greybeard Realty, and The Greenya Group say about our Follow Up Boss automation and CRM optimization services.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | Amplified Solutions",
    description:
      "See what real estate teams like Spyglass Realty, Greybeard Realty, and The Greenya Group say about our Follow Up Boss automation and CRM optimization services.",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
