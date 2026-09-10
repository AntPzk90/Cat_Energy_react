export const FILTERS = {
  mainTitle: 'Сортировка',
  price: {
    subTitle: 'По цене',
    items: [
      {
        label: 'Обычная',
        type: '',
      },
      {
        label: 'По возрастанию | low',
        type: 'asc',
      },
      {
        label: 'По убыванию | high',
        type: 'desc',
      },
    ],
  }, // выпадающий список
  categoryType: {
    subTitle: 'Линия товара',
    items: [
      {
        label: 'линия SLIM',
        type: 'slim',
      },
      {
        label: 'линия PRO',
        type: 'pro',
      },
      {
        label: 'линия VEGAN',
        type: 'vegan',
      },
    ],
  }, // чекбокс
  componentsType: {
    subTitle: 'По компонентам',
    items: [
      {
        label: 'больше белка',
        type: 'protein',
      },
      {
        label: 'больше жиров',
        type: 'fat',
      },
      {
        label: 'больше углеводов',
        type: 'carbs',
      },
    ], // радио
  },
};
