import { AnimatedBrandMark } from "@/components/site/animated-brand-mark";

export function FourteenLoader({ size = 116 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      className="ft-loader-mark"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <AnimatedBrandMark autoplay />
    </div>
  );
}
