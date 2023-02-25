/**
 * Helps covert from polar
 * @module poltocar
 * @param {Number} a - Polar angle (azimuth)
 * @param {Number} r - Radial distance
 * @returns {Object} - Point like, contains corresponding cartesian coordinates
 * @example
 * poltocar(Math.PI);
 */
export function poltocar(a = 0, r = 1) {
  return { x: r * Math.cos(a), y: r * Math.sin(a) }
}

/**
 * Helps convert to polar
 * @module cartopol
 * @param {Number} x - Position along the horizontal axis
 * @param {Number} y - Position along the vertical axis
 * @returns {Object} - Vector like, contains corresponding polar coordinates
 * @example
 * cartopol(1, 1);
 */
export function cartopol(x = 0, y = 0) {
  return { azimuth: Math.atan2(y, x), radius: Math.sqrt((x * x) + (y * y)) }
}
