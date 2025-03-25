// app/[productId]/layout.js
import GoogleAnalytics from "@/components/Analytics/googleanalytics";

export default function ProductLayout({ children }) {
  return (
    <>
      <head>
        <GoogleAnalytics />
      </head>
      <main>{children}</main>
    </>
  );
}
