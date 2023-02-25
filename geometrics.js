var geometrics = (function(exports) {
  "use strict"

  const TAU = 2 * Math.PI

  const RAD = 360 / TAU
  const DEG = TAU / 360

  // Convert radians to degrees.
  const deg = x => x * RAD

  // Convert degrees to radians.
  const rad = x => x * DEG

  /**
   * Helps covert from polar
   * @module poltocar
   * @param {Number} a - Polar angle (azimuth)
   * @param {Number} r - Radial distance
   * @returns {Object} - Point like, contains corresponding cartesian coordinates
   * @example
   * poltocar(Math.PI);
   */
  function poltocar(a = 0, r = 1) {
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
  function cartopol(x = 0, y = 0) {
    return { azimuth: Math.atan2(y, x), radius: Math.sqrt((x * x) + (y * y)) }
  }

  /**
   * Regular polygon
   * @param {Number} [radius=0] - Half size of circumcircle
   * @param {Number} [sides=3] - No. of sides
   * @returns {Array.<Object>} - Points x, y
   * @see {@link https://en.wikipedia.org/wiki/Regular_polygon}
   * @example
   * poly(50, 8); // Octagon with opposite facing vertices 100 units apart
   */
  function poly(radius = 0, sides = 3) {
    // Theta increment, compute once
    const r = TAU / sides

    return Array.from({ length: sides }).map((_, i) => poltocar(r * i, radius))
  }

  /**
   * Archimedean spiral (general)
   * @param {Number} [radius=0] - Half size of circumcircle
   * @param {Number} [turns=1] - No. of turns
   * @param {Number} [phase=1] - Offset
   * @param {Number} [n=1] - Controls how tight the wrapping is
   * @returns {Array.<Object>} - Points x, y
   * @see {@link https://en.wikipedia.org/wiki/Archimedean_spiral}
   */
  function coil(radius = 0, turns = 1, phase = 1, n = 1) {
    // Decides type of spiral (eg. with Fermat's, n = 2)
    const k = 1 / n

    // Compute distance between turns
    const r = radius / (TAU * turns)

    return Array.from({ length: 360 * turns }).map((_, i) => {
      const angle = rad(i)
      const reach = phase + (r * Math.pow(angle, k))

      return poltocar(angle, reach)
    })
  }

  /**
   * Rose curve
   * @param {Number} [radius=0] - Half size of circumcircle
   * @param {Number} [a=2] - k ratio antecedent
   * @param {Number} [b=3] - k ratio consequent
   * @param {Number} [offset=0] - Radial offset
   * @returns {Array.<Object>} - Points x, y
   * @see {@link http://mathworld.wolfram.com/Rose.html}
   */
  function rose(radius = 0, a = 2, b = 3, offset = 0) {
    // Decides number of petals
    const k = a / b

    // For calculating how many iterations produce a closed curve, assuming k is rational
    const r = 2 - ((b * a) % 2)

    return Array.from({ length: 180 * r * b }).map((_, i) => {
      const angle = rad(i)
      const reach = radius * Math.cos(k * angle)

      return poltocar(angle, reach + offset)
    })
  }

  /**
   * Superformula
   * @param {Number} [radius=0] - Half size of circumcircle
   * @param {Number} [m1=0] - Adds rotational symmetry
   * @param {Number} n1 - Real, controls pinching
   * @param {Number} n2 - Real, controls pinching
   * @param {Number} n3 - Real, controls pinching
   * @param {Number} [a=1] - Real excluding zero, controls sizing
   * @param {Number} [b=a] - Real excluding zero, controls sizing
   * @param {Number} [m2=m1] - Adds rotational symmetry
   * @returns {Array.<Object>} - Points x, y
   * @see {@link http://paulbourke.net/geometry/supershape}
   */
  function foxy(radius = 0, m1 = 0, n1, n2, n3, a = 1, b = a, m2 = m1) {
    const { cos, pow, abs } = Math

    const input = [a, b, m1, m2, n2, n3]
    const shift = TAU * 0.25

    const score = (phi, t1 = 0, id = 0) => {
      const [k, m, n] = input.filter((v, i) => ((i + id) % 2 ? 0 : v))

      let q = m * phi * 0.25

      // Turn cos into sin
      q += id ? shift : 0

      let t2 = cos(q) / k

      t2 = abs(t2)
      t2 = pow(t2, n)

      if (id === 1) {
        return t1 + t2
      }

      return score(phi, t2, id + 1)
    }

    return Array.from({ length: 360 }).map((_, i) => {
      const angle = rad(i)
      const t = score(angle)
      const reach = pow(t, 1 / n1)

      return abs(reach) ? poltocar(angle, radius / reach) : { x: 0, y: 0 }
    })
  }

  exports.TAU = TAU
  exports.cartopol = cartopol
  exports.coil = coil
  exports.deg = deg
  exports.foxy = foxy
  exports.poltocar = poltocar
  exports.poly = poly
  exports.rad = rad
  exports.rose = rose

  return exports
})({})
