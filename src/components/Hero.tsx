import { CroppedImage } from "./CroppedImage";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <CroppedImage
        className="hero-mark"
        src="/images/geeskit-logo.jpg"
        alt="GEESKIT logo"
        naturalWidth={1600}
        naturalHeight={1600}
        crop={{ x: 300, y: 110, width: 1000, height: 1100 }}
        loading="eager"
      />
      <h1 id="hero-title" className="hero-wordmark">
        GEESKIT
      </h1>
      <p className="hero-tagline">Technology Business / SaaS</p>
      <p className="hero-byline">by ALMAGREMIUM ©</p>
    </section>
  );
}
