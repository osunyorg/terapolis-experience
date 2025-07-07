/**
 * Return smoother value for animation
 */
export default function smoothValue(
  start,
  end,
  smoothFactor = 0.125
) {
  return start - (start - end) * smoothFactor
}
