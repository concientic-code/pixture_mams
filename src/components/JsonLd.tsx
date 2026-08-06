export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MAMS Grupo Textil",
    url: "https://grupotextilmams.com",
    logo: "https://grupotextilmams.com/images/logos/logo-horizontal-blue.png",
    description:
      "Aliado textil en Guarne, Colombia. Diseño, tejido seamless, teñido, confección y empaque bajo un mismo techo.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guarne",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "marcela.echeverri@grupotextilmams.com",
      contactType: "sales",
    },
    sameAs: [],
    foundingDate: "2002",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
    },
    knowsAbout: [
      "Textile manufacturing",
      "Seamless garments",
      "Private label",
      "Dyeing",
      "Full-package manufacturing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
