/**
 * Masks a string by converting characters to asterisks.
 * @param {string} value - The value to mask
 * @returns {string}
 */
module.exports = function mask (value, options = {}) {
  // ---------------------------------------------------------------------------
  // option defaults
  // ---------------------------------------------------------------------------

  options.char = options.char || '*'
  options.keepLeft = options.keepLeft || 0
  options.keepRight = options.keepRight || 0

  // ---------------------------------------------------------------------------
  // type casting and checks
  // ---------------------------------------------------------------------------

  if (!value) {
    throw new Error('cannot mask an undefined value')
  }

  value = String(value)
  options.char = String(options.char)
  options.keepLeft = Math.floor(parseInt(options.keepLeft, 10))
  options.keepRight = Math.floor(parseInt(options.keepRight, 10))

  // ---------------------------------------------------------------------------
  // mask
  // ---------------------------------------------------------------------------

  const regex = options.keepSymbols ? /[a-zA-Z0-9]/g : /(.)/g

  let masked = value.replace(regex, options.char)

  if (options.keepLeft > 0) {
    masked = value.substring(0, options.keepLeft) +
      masked.substring(options.keepLeft)
  }

  if (options.keepRight > 0) {
    masked = masked.slice(0, options.keepRight * -1) +
      value.substring(value.length - options.keepRight)
  }

  return masked
}
