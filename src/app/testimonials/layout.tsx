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

const reviews = [
  {
    author: "Ryan Rodenbeck",
    jobTitle: "Broker / Owner",
    company: "Spyglass Realty",
    reviewBody:
      "Being an independent broker, there's no company resource to pull from when trying to scale a company. Hiring the Amplified team took all the burden of those things and even things like lead distribution, CRM structure, out of our hands. Could not have done it without Amplified Solutions!",
  },
  {
    author: "Nat Ferguson",
    jobTitle: "Owner",
    company: "Ferguson Realty",
    reviewBody:
      "After finding myself stuck with stagnant growth and absent a 5 year plan, I signed up for the Roadmap program. The Amplified team helped me create a plan that brought meaningful growth to my brokerage, so much so that I crushed my 5 year plan in 18 months.",
  },
  {
    author: "Cindy Greenya",
    jobTitle: "Owner",
    company: "The Greenya Group",
    reviewBody:
      "They have been integral in the process of coaching and implementing the Follow Up Boss CRM. I am so thankful to have their guidance on an otherwise difficult transition.",
  },
  {
    author: "Chip Craig & Caleb Hofheins",
    jobTitle: "Co-Owners",
    company: "Greybeard Realty",
    reviewBody:
      "The team at Amplified Solutions were instrumental in helping us use Follow Up Boss to its fullest potential. They helped us plan and implement a lead management strategy.",
  },
  {
    author: "Anthony Malafronte",
    jobTitle: "Team Leader",
    company: "My Tampa Agent",
    reviewBody:
      "They are EXPERTS of process, procedure, and most importantly implementation. They helped us first understand what we had that was working, assessed what we didn't have that we needed, and put into place a systemized series of plans.",
  },
  {
    author: "Rachel Van Cleave",
    jobTitle: "Team Member",
    company: "The Stratton Group",
    reviewBody:
      "By the end of our sessions, I was proficient in our systems, I had a clear understanding of how our agent trainings need to go, and how to effectively manage our leads.",
  },
  {
    author: "Dean Linnell",
    jobTitle: "Owner",
    company: "The Linnell Group",
    reviewBody:
      "Working with the team at Amplified Solutions provides my team and I with a highly focused, strategic path to clearing the noise clutter we'd begun to accumulate in our real estate business.",
  },
  {
    author: "Anna Kilinski",
    jobTitle: "Owner",
    company: "Anna K Intown",
    reviewBody:
      "Amplified Solutions make the hiring process, well, easy. They offered guidance as to what to look for when we were meeting with candidates and always gave us the best pick of our options!",
  },
  {
    author: "Naomi Hattaway",
    jobTitle: "Owner",
    company: "8th and Home",
    reviewBody:
      "After working with Amplified Solutions, I can confidently say that my business has been impacted in ways I did not imagine. From the very beginning stages, I felt challenged, listened to and supported by the team.",
  },
];

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "The AS System - Follow Up Boss Automation",
            provider: {
              "@type": "ProfessionalService",
              name: "Amplified Solutions",
              url: "https://www.amplifiedsolutions.com",
            },
            review: reviews.map((r) => ({
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
              author: {
                "@type": "Person",
                name: r.author,
                jobTitle: r.jobTitle,
              },
              reviewBody: r.reviewBody,
            })),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: reviews.length.toString(),
              bestRating: "5",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
