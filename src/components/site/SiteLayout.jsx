import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useSite, useWhatsApp } from "../../lib/site";
import { WhatsAppIcon } from "./BrandIcons";
import RefreshAdModal from "./RefreshAdModal";

export default function SiteLayout() {
  const { settings } = useSite();
  const wa = useWhatsApp();

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">Skip to content</a>
      {settings.announcement && (
        <div className="announce">
          <div className="container">
            <p><strong>Offer</strong> · {settings.announcement}</p>
            <a href={wa} target="_blank" rel="noreferrer">Message us →</a>
          </div>
        </div>
      )}
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <a className="wa-fab" href={wa} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
        <WhatsAppIcon />
        <span>Chat with us</span>
      </a>
      <RefreshAdModal />
    </>
  );
}
