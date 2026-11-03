// /blocks/hello-world/hello-world.js
export default function decorate(block) {
  const raw = block.textContent?.trim() || 'Hello there, world!!!!';
  block.textContent = raw.replace(/!+/g, '!');
  // Read options from the block header: hello-world (loud, red)
  // DA.Live adds them to data-classes as a comma-separated string.
  const opts = (block.dataset?.classes || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // Add BEM-style modifier classes, e.g., loud, subtle, red
  opts.forEach((opt) => block.classList.add(`is-${opt}`));
}