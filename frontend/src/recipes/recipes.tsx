type Recipe = {
  title: string;
  source: string;
  description: string;
  image: string;
};

const recipes: Recipe[] = [
  {
    title: "Blueberry-Banana Wraps",
    source:
      "https://www.forksoverknives.com/recipes/vegan-breakfast/blueberry-banana-wraps",
    description: `
        Refresh your breakfast routine with these simple, tasty wraps, which
          feature a mouthwatering mashup of fruit and veggies and come together
          in just 15 minutes. You can serve these chilled, at room temperature,
          or lightly warmed in a skillet.`,
    image: "wraps.webp",
  },
];

export default recipes;
