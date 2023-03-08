import { Item } from '@pages/types';

const goods: Item[] = [
  {
    uuid: '03060c4f-cb85-4ff2-a85c-baf55b28c95c',
    name: 'MSI Immerse GH61 Gaming Headset',
    description:
      'About this item, hi-res virtual 7.1 surround sound, speakers installed by onkyo, built-in ess dac & amp, high-quality retractable microphone, usb & 3.5mm audio connectors, Connectivity technology: Wired, Included components: cable',
    price: { value: 110.8, currency: 'usd' },
    brand: {
      uuid: '47d2bdef-1065-4def-ae33-a1a4a000c27f',
      name: 'MSI'
    },
    category: {
      name: 'Headsets',
      uuid: 'dc72f059-7e80-4b6e-84fe-a2a2f1dff8d0'
    }
  },
  {
    uuid: '60596836-71ae-4b9d-8e45-984c493e1db1',
    name: 'UV Flashlight Black Light',
    brand: { uuid: 'ded8b228-5d10-448f-9dc7-1ac4615d7452', name: 'Vansky' },
    category: {
      name: 'Sports & Outdoors',
      uuid: 'bb5cd043-df71-46a0-9e7b-453d975f42d2'
    },
    description:
      'Ultra-compact design: The pocket-size UV flashlight can be carried along to detect stains in your car or illuminate minerals, body art',
    price: { currency: 'usd', value: 12.99 }
  },
  {
    uuid: 'fa4c7d73-3eb8-48cd-91eb-905513c01993',
    name: 'Casio EAW-MRW-200H-1BV',
    brand: { name: 'Casio', uuid: '5a2f7c9d-02bd-42ac-a5ba-7e395b1986cf' },
    category: {
      name: 'Wrist Watches',
      uuid: 'acab222b-6b0d-4f5e-bc21-89086fe5b517'
    },
    description:
      'If you’re searching for great value in a classic diver-look watch, look no further than the MRW200 from Casio.',
    price: {
      value: 21.62,
      currency: 'usd'
    }
  },
  {
    uuid: 'b175d4d9-58a2-427e-9986-6993187f31b2',
    name: 'Funko Pop! Advent Calendar: Marvel',
    brand: {
      name: 'Funko',
      uuid: 'f3fb7f1b-d6d8-4e37-943f-510a44ee54ed'
    },
    category: {
      name: 'Advent Calendars',
      uuid: '3879835b-e4ed-4bea-8b81-fada2198a28c'
    },
    description:
      'Take your holidays to new heights with the Marvel Funko Advent Calendar! Spider-Man is swinging by to deliver 24 unique Funko Pocket Pops! as you count down to your winter festivities.',
    price: {
      value: 35.71,
      currency: 'usd'
    }
  },
  {
    uuid: 'fc2ba290-938b-454f-a4b3-c9e053da839a',
    name: 'Razer DeathAdder Essential Gaming Mouse',
    description:
      '5 Programmable Buttons: Allows for button remapping and assignment of complex macro functions through Razer Synapse',
    brand: { name: 'Razer', uuid: 'ba2c7b1e-14ae-453e-a81f-26314f4b7f6d' },
    category: {
      name: 'PC Gaming Mice',
      uuid: 'd1d0e5c7-7309-43a0-a2a2-b8409e565200'
    },
    price: { value: 19.99, currency: 'usd' }
  }
];

export default goods;
