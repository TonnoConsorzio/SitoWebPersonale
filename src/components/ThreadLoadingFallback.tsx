export function ThreadLoadingFallback() {
  return (
    <div className="thread-canvas thread-canvas--fallback" data-thread-stage="hero" aria-hidden="true">
      <svg className="thread-canvas__fallback" viewBox="0 0 600 430" focusable="false">
        <path className="thread-canvas__fallback-main" d="M48 285C114 102 178 82 250 213s128 124 188-19c33-79 73-121 121-156" />
        <path className="thread-canvas__fallback-accent" d="M250 213c34 62 67 87 99 78" />
      </svg>
    </div>
  );
}
