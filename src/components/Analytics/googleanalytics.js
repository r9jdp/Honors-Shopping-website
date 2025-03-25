import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SF997C7LEF"
        strategy="afterInteractive"
      />

      {/* Initialize Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SF997C7LEF');
        `}
      </Script>
    </>
  );
}
