import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amplifiedsolutions.com"),
  title: {
    default: "Amplified Solutions | Automation for Real Estate Teams",
    template: "%s | Amplified Solutions",
  },
  description: "We automate your real estate operations for less than a VA costs. Reporting, follow-up, transaction coordination, CRM, content — if your team is doing it by hand, we build a system that does it automatically.",
  keywords: "real estate automation, real estate operations, CRM automation, real estate reporting automation, transaction coordination automation, fractional CTO real estate, Follow Up Boss automation, real estate AI automation, real estate business automation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amplified Solutions | Automation for Real Estate Teams",
    description: "Think of everything in your business you do manually. We automate it all for less than a VA costs.",
    url: "https://www.amplifiedsolutions.com",
    siteName: "Amplified Solutions",
    images: [
      {
        url: "/AmplifiedSolutions_Logo-V2_Main.png",
        width: 1200,
        height: 630,
        alt: "Amplified Solutions - Automation for Real Estate Teams",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplified Solutions | Automation for Real Estate Teams",
    description: "Think of everything in your business you do manually. We automate it all for less than a VA costs.",
    images: ["/AmplifiedSolutions_Logo-V2_Main.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Amplified Solutions",
              url: "https://www.amplifiedsolutions.com",
              logo: "https://www.amplifiedsolutions.com/AmplifiedSolutions_Logo-V2_Main.png",
              description:
                "We automate real estate operations for less than a VA costs. Reporting, follow-up, transaction coordination, CRM, content — we embed with your team and build systems that run themselves.",
              foundingDate: "2018",
              founder: {
                "@type": "Person",
                name: "Joey Ahern",
                jobTitle: "Founder",
                knowsAbout: ["Real Estate Technology", "Business Automation", "CRM Systems", "Follow Up Boss"],
              },
              sameAs: [
                "https://www.facebook.com/AmplifiedSolutions/",
                "https://www.instagram.com/amplifiedsolutions/",
                "https://www.youtube.com/amplifiedsolutions",
                "https://joeyahern.com",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://www.amplifiedsolutions.com",
              },
              areaServed: "US",
              serviceType: [
                "Real Estate Business Automation",
                "Fractional CTO Services",
                "CRM Setup and Optimization",
                "Automated Reporting and Dashboards",
                "Transaction Coordination Automation",
                "Follow-up and Nurture Systems",
                "Content and SEO Automation",
              ],
            }),
          }}
        />

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1939399046125748');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1939399046125748&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4BJ51L4Q08"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4BJ51L4Q08');
          `}
        </Script>

        {/* Follow Up Boss Widget Tracker */}
        <Script id="fub-widget-tracker" strategy="afterInteractive">
          {`
            (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
            {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
            (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
            e.parentNode.insertBefore(t,e);})
            (window,"https://widgetbe.com/agent",document,"widgetTracker");
            window.widgetTracker("create", "WT-PHDNQRQQ");
            window.widgetTracker("send", "pageview");
          `}
        </Script>
      </head>
      
      <body className={`${manrope.className} antialiased bg-neutral-cream text-gray-800`}>
        {children}
      </body>
    </html>
  );
}