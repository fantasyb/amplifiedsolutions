import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Follow Up Boss Automation & CRM Setup",
  description:
    "The AS System: complete Follow Up Boss automation including action plans, smart lists, lead ponds, lead flows, pipeline setup, training, and ongoing support. 7-10 day buildout.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Amplified Solutions",
    description:
      "The AS System: complete Follow Up Boss automation including action plans, smart lists, lead ponds, lead flows, pipeline setup, training, and ongoing support.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
