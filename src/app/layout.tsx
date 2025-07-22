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
  title: "Amplified Solutions - Lead Management & Conversion Experts",
  description: "We turn cold leads into warm conversations. Complete Follow Up Boss optimization, ISA calling, and lead conversion services for real estate teams.",
  keywords: "lead management, ISA services, follow up boss, real estate leads, lead conversion, systematic follow-up, lead warming",
  openGraph: {
    title: "Amplified Solutions - Lead Management & Conversion Experts",
    description: "We turn cold leads into warm conversations. Complete Follow Up Boss optimization, ISA calling, and lead conversion services for real estate teams.",
    url: "https://amplifiedsolutions.com",
    siteName: "Amplified Solutions",
    images: [
      {
        url: "/AmplifiedSolutions_Logo-V2_Main.png",
        width: 1200,
        height: 630,
        alt: "Amplified Solutions - Lead Management & Conversion Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplified Solutions - Lead Management & Conversion Experts",
    description: "We turn cold leads into warm conversations. Complete Follow Up Boss optimization, ISA calling, and lead conversion services for real estate teams.",
    images: ["/AmplifiedSolutions_Logo-V2_Main.png"],
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

        {/* Google Analytics (Universal Analytics) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=UA-122248610-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ua" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-122248610-1');
          `}
        </Script>

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