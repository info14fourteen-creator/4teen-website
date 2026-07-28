import { LoaderLink } from "@/components/site/loader-link";
import {
  officialDirectorName,
  officialDunsNumber,
  officialLegalAddress,
  officialLegalEntityNameRu,
  officialLegalEntityName,
  officialLegalEntityShortName,
  officialLegalForm,
  officialRegistrationDate,
  officialRegistrationNumber,
  officialSupportEmail,
  officialSupportPhoneDisplay,
  officialSupportPhoneLink,
  officialSupportWhatsappUrl,
  officialTaxId,
  officialTronixRentUrl,
  officialWebsiteUrl,
} from "@/content/official-links";

function DunsRegisteredSeal({ mini = false }: { mini?: boolean }) {
  return (
    <iframe
      aria-label={mini ? "Dun & Bradstreet registered mini seal" : "Dun & Bradstreet registered seal"}
      className={`ft-duns-seal ${mini ? "is-mini" : "is-standard"}`}
      height={mini ? 43 : 97}
      loading="lazy"
      scrolling="no"
      src="https://dunsregistered.dnb.com/SealAuthentication.aspx?Cid=1"
      title={mini ? "Dun & Bradstreet registered mini seal" : "Dun & Bradstreet registered seal"}
      width={mini ? 49 : 114}
    />
  );
}

export function LegalTrustPanel({
  eyebrow = "Legal trust",
  title = "AG PLUS LLC is the legal operator of 4teen.me",
  lead = "The website, public support routes, and official contact layer should point to one clear legal operator with one clear trust record.",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <article className="ft-card ft-card--strong ft-public-page__trust-panel">
      <div className="ft-stack ft-stack--lg">
        <div className="ft-stack ft-stack--xs">
          <p className="ft-overline">{eyebrow}</p>
          <h2 className="ft-subtitle">{title}</h2>
          <p className="ft-text">{lead}</p>
        </div>

        <div className="ft-grid ft-grid--4 ft-public-page__hero-stats">
          <article className="ft-price-card">
            <p className="ft-price-label">Operator</p>
            <p className="ft-price-main">{officialLegalEntityShortName}</p>
            <p className="ft-price-sub">{officialLegalEntityName}</p>
          </article>
          <article className="ft-price-card">
            <p className="ft-price-label">D-U-N-S®</p>
            <p className="ft-price-main">{officialDunsNumber}</p>
            <p className="ft-price-sub">Dun & Bradstreet registered business identity</p>
          </article>
          <article className="ft-price-card">
            <p className="ft-price-label">Registration No.</p>
            <p className="ft-price-main">{officialRegistrationNumber}</p>
            <p className="ft-price-sub">Registered in Uzbekistan on {officialRegistrationDate}</p>
          </article>
          <article className="ft-price-card">
            <p className="ft-price-label">Tax ID</p>
            <p className="ft-price-main">{officialTaxId}</p>
            <p className="ft-price-sub">Public operator tax identification number</p>
          </article>
        </div>

        <div className="ft-grid ft-grid--2-even ft-public-page__trust-grid">
          <article className="ft-card ft-card--plain ft-public-page__panel">
            <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-card-title-top">Operator details</p>
                <h3 className="ft-card-title">{officialLegalEntityShortName}</h3>
              </div>

              <ul className="ft-list ft-public-page__list">
                <li>Legal form: {officialLegalForm}</li>
                <li>Director General: {officialDirectorName}</li>
                <li>Russian legal name: {officialLegalEntityNameRu}</li>
                <li>Registered address: {officialLegalAddress}</li>
                <li>Primary websites: 4teen.me and tronix.rent</li>
              </ul>

              <div className="ft-actions ft-actions--stack-mobile ft-public-page__trust-actions">
                <LoaderLink className="ft-btn ft-btn--secondary" href={officialWebsiteUrl}>
                  4teen.me
                </LoaderLink>
                <LoaderLink
                  className="ft-btn ft-btn--ghost"
                  href={officialTronixRentUrl}
                  rel="noopener noreferrer"
                  showLinkIcon
                  target="_blank"
                >
                  tronix.rent
                </LoaderLink>
              </div>
            </div>
          </article>

          <article className="ft-card ft-card--plain ft-public-page__panel">
            <div className="ft-stack ft-stack--md ft-public-page__panel-stack">
              <div className="ft-stack ft-stack--xs">
                <p className="ft-card-title-top">Support and D&B trust</p>
                <h3 className="ft-card-title">Public contact routes</h3>
              </div>

              <div className="ft-actions ft-actions--stack-mobile ft-public-page__trust-actions">
                <LoaderLink className="ft-btn ft-btn--secondary" href={`mailto:${officialSupportEmail}`}>
                  {officialSupportEmail}
                </LoaderLink>
                <LoaderLink className="ft-btn ft-btn--ghost" href={officialSupportPhoneLink}>
                  {officialSupportPhoneDisplay}
                </LoaderLink>
                <LoaderLink
                  className="ft-btn ft-btn--ghost"
                  href={officialSupportWhatsappUrl}
                  rel="noopener noreferrer"
                  showLinkIcon
                  target="_blank"
                >
                  WhatsApp
                </LoaderLink>
              </div>

              <div className="ft-public-page__seal-row">
                <DunsRegisteredSeal />
                <div className="ft-stack ft-stack--xs">
                  <p className="ft-card-title-top">D&B registered seal</p>
                  <p className="ft-text">
                    Standard Dun & Bradstreet seal for the public website. D-U-N-S® number:{" "}
                    {officialDunsNumber}.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </article>
  );
}
