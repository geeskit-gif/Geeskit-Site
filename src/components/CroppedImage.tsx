import type { CSSProperties } from "react";

type CroppedImageProps = {
  src: string;
  alt: string;
  naturalWidth: number;
  naturalHeight: number;
  crop: { x: number; y: number; width: number; height: number };
  className?: string;
  loading?: "eager" | "lazy";
};

/**
 * Frames a region of an image without altering the source file:
 * the original is rendered at its native aspect ratio and the container
 * acts as a viewport onto the requested crop box.
 */
export function CroppedImage({
  src,
  alt,
  naturalWidth,
  naturalHeight,
  crop,
  className,
  loading = "lazy",
}: CroppedImageProps) {
  const frameStyle: CSSProperties = {
    aspectRatio: `${crop.width} / ${crop.height}`,
  };
  const imageStyle: CSSProperties = {
    width: `${(naturalWidth / crop.width) * 100}%`,
    height: `${(naturalHeight / crop.height) * 100}%`,
    left: `${(-crop.x / crop.width) * 100}%`,
    top: `${(-crop.y / crop.height) * 100}%`,
  };

  return (
    <div className={`cropped-image ${className ?? ""}`} style={frameStyle}>
      <img
        src={src}
        alt={alt}
        width={naturalWidth}
        height={naturalHeight}
        style={imageStyle}
        loading={loading}
        decoding="async"
      />
    </div>
  );
}
