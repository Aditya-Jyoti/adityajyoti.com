/**
 * Picks a hand-drawn border variation from a string.
 *
 * The listing pages used to roll Math.random() at build time, which meant the
 * borders reshuffled on every deploy, and the same post could render with two
 * different shapes in two different sections of one page. Deriving it from the
 * post's slug keeps a post looking like itself.
 */
export function handdrawn(seed: string, salt = 0): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (((hash >>> 3) + salt) % 5) + 1;
}

/** Card face and its offset shadow, guaranteed to differ from each other. */
export function handdrawnPair(seed: string): { card: number; shadow: number } {
  const card = handdrawn(seed);
  return { card, shadow: handdrawn(seed, 2) === card ? (card % 5) + 1 : handdrawn(seed, 2) };
}
