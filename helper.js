export const TAU = 2 * Math.PI

const RAD = 360 / TAU
const DEG = TAU / 360

// Convert radians to degrees.
export const deg = x => x * RAD

// Convert degrees to radians.
export const rad = x => x * DEG
