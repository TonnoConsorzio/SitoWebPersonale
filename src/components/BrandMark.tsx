type BrandMarkProps = {
  size?: number;
  className?: string;
};

export function BrandMark({ size = 42, className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} style={{ width: size, height: size }} aria-hidden="true">
      <img src="/media/brand/logo-mark.png" alt="" width={size - 12} height={size - 12} />
    </span>
  );
}
