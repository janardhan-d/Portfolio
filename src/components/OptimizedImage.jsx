// Serves the WebP variant next to the original raster image,
// with the original as fallback. SVG and other formats pass
// straight through as a plain <img>.
export default function OptimizedImage({ src, alt, className, width, height, ...rest }) {
  const isRaster = /\.(png|jpe?g)$/i.test(src);

  if (!isRaster) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        {...rest}
      />
    );
  }

  const webpSrc = src.replace(/\.(png|jpe?g)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        {...rest}
      />
    </picture>
  );
}
