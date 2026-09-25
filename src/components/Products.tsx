import { CroppedImage } from "./CroppedImage";
import { InterfaceArt } from "./InterfaceArt";

function MwCard() {
  return (
    <a
      className="product-card product-card--mw"
      href="https://mw.geeskit.com/"
      aria-labelledby="mw-title"
      aria-describedby="mw-desc"
    >
      <div className="mw-inner">
        <div className="mw-media">
          <CroppedImage
            src="/images/mw-logo.jpg"
            alt="MW Measurement Wallet logo"
            naturalWidth={1024}
            naturalHeight={1024}
            crop={{ x: 100, y: 235, width: 824, height: 412 }}
          />
        </div>
        <div className="mw-body">
          <h3 id="mw-title" className="product-title">
            MW — Measurement Wallet
          </h3>
          <p id="mw-desc" className="product-tagline">
            COLLECT GROUP SIZES WITH CONFIDENCE.
          </p>
          <InterfaceArt variant="mw" />
        </div>
      </div>
    </a>
  );
}

function NyCard() {
  return (
    <a
      className="product-card product-card--ny"
      href="https://nowyes.geeskitgsp.workers.dev/"
      aria-labelledby="ny-title"
      aria-describedby="ny-desc"
    >
      <div className="ny-inner">
        <div className="ny-media">
          <div className="ny-plate">
            <img
              src="/images/ny-logo.jpg"
              alt="NY NOWYES LISTO logo"
              width={734}
              height={741}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="ny-body">
          <h3 id="ny-title" className="product-title">
            NY — NOWYES
          </h3>
          <p id="ny-desc" className="product-tagline product-tagline--ny">
            A practical migrant life and paperwork tool for people building a new life in Mexico.
          </p>
          <InterfaceArt variant="ny" />
        </div>
      </div>
    </a>
  );
}

export function Products() {
  return (
    <section id="products" className="products" aria-labelledby="products-title">
      <h2 id="products-title" className="section-title">
        OUR PRODUCTS
      </h2>
      <div className="product-grid">
        <MwCard />
        <div className="product-divider" aria-hidden="true" />
        <NyCard />
      </div>
    </section>
  );
}
