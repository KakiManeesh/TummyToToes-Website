import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Providers } from "./providers";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.tummytotoes.com";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TummyToToes Studio | Newborn & Maternity Photographer in Hyderabad",
    template: "%s | TummyToToes Studio",
  },
  description:
    "TummyToToes Studio is a Hyderabad-based newborn, maternity, kids, events, fashion and wedding photography studio led by Surya Kiran. Book a session to preserve your most precious moments.",
  keywords: [
    "newborn photographer Hyderabad",
    "maternity photographer Hyderabad",
    "kids photographer Hyderabad",
    "fashion photographer Hyderabad",
    "event photographer Hyderabad",
    "wedding photographer Hyderabad",
    "TummyToToes Studio",
    "Surya Kiran photographer",
    "baby photography Hyderabad",
    "best newborn photographer Kukatpally",
  ],
  authors: [{ name: "Surya Kiran", url: SITE_URL }],
  creator: "Surya Kiran",
  publisher: "TummyToToes Studio",
  applicationName: "TummyToToes Studio",
  category: "Photography",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "TummyToToes Studio",
    title: "TummyToToes Studio | Newborn & Maternity Photographer in Hyderabad",
    description:
      "Newborn, maternity, kids, events, fashion and wedding photography in Hyderabad by Surya Kiran. Slow, intentional, emotionally honest portraiture.",
    images: [
      {
        url: "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780254909/Untitled_1500_x_500_px_1500_x_335_px_v6oveg.webp",
        width: 1500,
        height: 335,
        alt: "TummyToToes Studio — Newborn & Maternity Photography Hyderabad",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TummyToToes Studio | Newborn & Maternity Photographer in Hyderabad",
    description:
      "Newborn, maternity, kids, events, fashion and wedding photography in Hyderabad by Surya Kiran.",
    images: [
      "https://res.cloudinary.com/dgcebqgy3/image/upload/v1780254909/Untitled_1500_x_500_px_1500_x_335_px_v6oveg.webp",
    ],
    creator: "@tummytotoes",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad",
    "geo.position": "17.4933;78.3915",
    ICBM: "17.4933, 78.3915",
    "business:contact_data:street_address": "Kukatpally",
    "business:contact_data:locality": "Hyderabad",
    "business:contact_data:region": "Telangana",
    "business:contact_data:postal_code": "500072",
    "business:contact_data:country_name": "India",
    "business:contact_data:email": "tummytotoes@gmail.com",
    "business:contact_data:phone_number": "+91-99665-31312",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD: Combined Organization, LocalBusiness and Photographer entity.
  // This helps search engines and LLMs (GEO / AEO) unambiguously understand
  // the business, its services and its physical location.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: "TummyToToes Studio",
        alternateName: "TummyToToes Photography",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.png`,
        },
        description:
          "TummyToToes Studio is a Hyderabad-based photography studio specialising in newborn, maternity, kids, events, fashion and wedding portraiture.",
        email: "tummytotoes@gmail.com",
        telephone: "+91-99665-31312",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kukatpally",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500072",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.4933,
          longitude: 78.3915,
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "AdministrativeArea", name: "Telangana" },
          { "@type": "Country", name: "India" },
        ],
        sameAs: [
          "https://www.instagram.com/tummy.to.toes.photography/",
          "https://wa.me/919966531312",
        ],
        knowsAbout: [
          "Newborn Photography",
          "Maternity Photography",
          "Kids Photography",
          "Fashion Photography",
          "Event Photography",
          "Wedding Photography",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
        ],
      },
      {
        "@type": ["LocalBusiness", "PhotographyBusiness"],
        "@id": `${SITE_URL}/#photographer`,
        name: "TummyToToes Studio",
        image: `${SITE_URL}/favicon.png`,
        url: SITE_URL,
        telephone: "+91-99665-31312",
        email: "tummytotoes@gmail.com",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kukatpally",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500072",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.4933,
          longitude: 78.3915,
        },
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
        founder: {
          "@type": "Person",
          name: "Surya Kiran",
          jobTitle: "Lead Photographer & Founder",
        },
        employee: {
          "@type": "Person",
          name: "Surya Kiran",
          jobTitle: "Photographer",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Photography Sessions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Maternity Photography Session",
                serviceType: "Maternity Photography",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Newborn Photography Session",
                serviceType: "Newborn Photography",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kids Photography Session",
                serviceType: "Kids Photography",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fashion Photography Session",
                serviceType: "Fashion Photography",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Event Photography Coverage",
                serviceType: "Event Photography",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wedding Photography Coverage",
                serviceType: "Wedding Photography",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "TummyToToes Studio",
        inLanguage: "en-IN",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#surya-kiran`,
        name: "Surya Kiran",
        jobTitle: "Photographer",
        worksFor: {
          "@id": `${SITE_URL}/#organization`,
        },
        url: SITE_URL,
        sameAs: [
          "https://www.instagram.com/tummy.to.toes.photography/",
        ],
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          // The whole graph is rendered into a single JSON-LD script so search
          // engines and LLMs can parse the full entity graph in one pass.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={bodyFont.className}>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
