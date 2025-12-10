export const variationsRectangle = {
  variations: [
    {
      id: 1,
      attribute_id: 1,
      value: "Pink",
      attribute: {
        id: 1,
        slug: "color",
        name: "Color",
        type: "rectangle",
        values: [
          { id: 1, attribute_id: 1, value: "Pink" },
          { id: 2, attribute_id: 1, value: "Black" },
          { id: 3, attribute_id: 1, value: "White" },
          { id: 4, attribute_id: 1, value: "Blue" },
        ],
      },
    },
    {
      id: 2,
      attribute_id: 2,
      value: "128GB",
      attribute: {
        id: 2,
        slug: "memory-storage",
        name: "Memory Storage",
        type: "swatch",
        values: [
          { id: 2, attribute_id: 2, value: "128GB" },
          { id: 3, attribute_id: 2, value: "256GB" },
          { id: 4, attribute_id: 2, value: "512GB" },
        ],
      },
    },
  ],
};
