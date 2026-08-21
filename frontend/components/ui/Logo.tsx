export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-[10px] bg-ink text-bg"
      style={{ width: size, height: size }}
    >
      {/* Simple triangular mark — stand-in for the Figma glyph until brand assets are provided */}
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L22 20H2L12 2Z"
          fill="currentColor"
        />
        <path
          d="M12 8L17 17H7L12 8Z"
          fill="rgb(var(--color-bg))"
        />
      </svg>
    </div>
  );
}
