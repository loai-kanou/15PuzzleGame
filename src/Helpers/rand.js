/**
 * Returns random int number between min and max
 * @param min number
 * @param max number
 * @returns number between min and max
 */
export const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1))
