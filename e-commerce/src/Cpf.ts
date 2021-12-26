/* eslint-disable class-methods-use-this */
export default class Cpf {
  cpf: string;

  constructor(cpf: string) {
    if (!this.validateCpf(cpf)) throw new Error('Invalid CPF');
    this.cpf = cpf;
  }

  validateCpf(cpf: string) {
    const cpfFormatted = this.clean(cpf);
    if (!this.isValidCpfSize(cpfFormatted)) return false;
    if (this.isBlock(cpfFormatted)) return false;
    const firstChecker = this.calculateDigit(cpfFormatted, 10);
    const secondChecker = this.calculateDigit(cpfFormatted, 11);
    const checkDigits = `${firstChecker}${secondChecker}`;
    const cpfCheckDigits = cpf.slice(-2);
    return cpfCheckDigits === checkDigits;
  }

  private clean(cpf: string) {
    return cpf.replace(/[ *.-]/gi, '');
  }

  private calculateDigit(cpf: string, checkerDigitToCalc: number) {
    let total = 0;
    let count = checkerDigitToCalc;
    // eslint-disable-next-line no-restricted-syntax
    for (const digit of cpf) {
      if (count > 1) {
        total += count * parseInt(digit, 10);
        count -= 1;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private isValidCpfSize(cpf: string) {
    return cpf.length === 11;
  }

  private isBlock(cpf: string) {
    const firstDigit = cpf[0];
    return [...cpf].every((digit) => digit === firstDigit);
  }
}
