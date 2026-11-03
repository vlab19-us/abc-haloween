/* /blocks/teaser/teaser.js */

/**
 * Return block options applied as classes alongside `block` and `teaser`.
 *
 * @param {HTMLElement} block The teaser block element.
 * @returns {string[]} The configured block options.
 */
function getOptions(block) {
  return [...block.classList].filter(
    (className) => !['block', 'teaser'].includes(className),
  );
}

/**
 * Zoom the teaser image while its CTA is hovered or focused.
 *
 * @param {HTMLElement} block The teaser block element.
 */
function addEventListeners(block) {
  const button = block.querySelector('.button');
  const image = block.querySelector('.image');

  if (!button || !image) return;

  const zoomIn = () => image.classList.add('zoom');
  const zoomOut = () => image.classList.remove('zoom');

  button.addEventListener('mouseenter', zoomIn);
  button.addEventListener('mouseleave', zoomOut);
  button.addEventListener('focus', zoomIn);
  button.addEventListener('blur', zoomOut);
}

/**
 * Decorate a teaser block.
 *
 * Expected authored structure:
 * - First row: image
 * - Last row: heading, text, and CTA link
 *
 * @param {HTMLElement} block The teaser block element.
 */
export default function decorate(block) {
  const options = getOptions(block);
  const firstRow = block.querySelector(':scope > div:first-child');
  const lastRow = block.querySelector(':scope > div:last-child');
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const image = block.querySelector('img');
  const picture = block.querySelector('picture');

  lastRow?.classList.add('content');
  heading?.classList.add('title');
  image?.classList.add('image');

  block.querySelectorAll('p').forEach((paragraph) => {
    if (paragraph.textContent.trim().startsWith('Terms and conditions:')) {
      paragraph.classList.add('terms-and-conditions');
    }
  });

  if (options.includes('side-by-side')) {
    firstRow?.classList.add('image-wrapper');
  } else {
    picture?.classList.add('image-wrapper');
  }

  addEventListeners(block);
}