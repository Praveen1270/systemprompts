export function TinyShelfBadge() {
  return (
    <a
      href="https://www.tinyshelf.co/?ref=systemprompts.fun"
      title="Featured on TinyShelf"
      target="_blank"
      rel="noopener"
      className="inline-block opacity-90 hover:opacity-100 transition-opacity shrink-0"
    >
      <img
        src="https://www.tinyshelf.co/badge/tinyshelf-badge-dark-f4d1216a.svg"
        alt="Featured on TinyShelf"
        width={216}
        height={64}
        loading="lazy"
        className="h-11 w-auto"
      />
    </a>
  );
}

export default TinyShelfBadge;
