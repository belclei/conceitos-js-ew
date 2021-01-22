class Util {
  static #defaultFormat = Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency'
  })
  static formatCurrency(value) {
    return this.#defaultFormat.format(value)
  }
  static unFormatCurrency(value) {
    const result = Number(value.replace(/\D/g, '')) / 100
    return result
  }
}

module.exports = Util