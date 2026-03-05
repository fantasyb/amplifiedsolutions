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
    default: "Amplified Solutions | Follow Up Boss Automation for Real Estate Teams",
    template: "%s | Amplified Solutions",
  },
  description: "We build your Follow Up Boss CRM the right way — proven workflows, intelligent routing, and automated follow-up that converts leads without overwhelming your team.",
  keywords: "follow up boss automation, follow up boss setup, real estate CRM, FUB optimization, real estate lead conversion, pipeline management, action plans, smart lists",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amplified Solutions | Follow Up Boss Automation for Real Estate Teams",
    description: "We build your Follow Up Boss CRM the right way — proven workflows, intelligent routing, and automated follow-up that converts leads without overwhelming your team.",
    url: "https://www.amplifiedsolutions.com",
    siteName: "Amplified Solutions",
    images: [
      {
        url: "/AmplifiedSolutions_Logo-V2_Main.png",
        width: 1200,
        height: 630,
        alt: "Amplified Solutions - Follow Up Boss Automation for Real Estate Teams",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplified Solutions | Follow Up Boss Automation for Real Estate Teams",
    description: "We build your Follow Up Boss CRM the right way — proven workflows, intelligent routing, and automated follow-up that converts leads.",
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
                "Follow Up Boss automation and CRM optimization for real estate teams. We build proven workflows, intelligent routing, and automated follow-up systems.",
              foundingDate: "2018",
              founder: {
                "@type": "Person",
                name: "Joey Ahern",
              },
              sameAs: [
                "https://www.facebook.com/AmplifiedSolutions/",
                "https://www.instagram.com/amplifiedsolutions/",
                "https://www.youtube.com/amplifiedsolutions",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://www.amplifiedsolutions.com/contact",
              },
              areaServed: "US",
              serviceType: [
                "Follow Up Boss CRM Setup",
                "Real Estate CRM Automation",
                "Lead Management Optimization",
                "ISA Services",
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