/**
 * Utilities. Provides misc. functionality not specific to any one component.
 */

export default (() => {
  /**
   * Seeded pseudorandom number generator.
   * Used to generate random-ish looking patterns that don't change from render to render, i.e. the card pile.
   **/
  function seedRand(min, max, seed) {
    min = min || 0;
    max = max || 1;
    let rand;
    if (typeof seed === "number") {
      seed = (seed * 9301 + 49297) % 233280;
      let rnd = seed / 233280;
      const disp = Math.abs(Math.sin(seed));
      rnd = rnd + disp - Math.floor(rnd + disp);
      rand = Math.floor(min + rnd * (max - min + 1));
    } else {
      rand = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return rand;
  }

  return {
    seedRand: seedRand,
  };
})();

/**
 *
 */
