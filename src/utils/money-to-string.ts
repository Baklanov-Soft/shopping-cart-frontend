import { Money } from 'types/catalog';

function moneyToString({ currency, value }: Money) {
  switch (currency) {
    case 'USD':
      return '$' + value.toString();

    default:
      throw new Error('Unsupported currency.');
  }
}

export default moneyToString;
