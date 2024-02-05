// Sources
// 1. https://www.forksoverknives.com/recipes/vegan-menus-collections/banana-recipes-ways-to-use-ripe-overripe-bananas/

type Recipe = {
  title: string;
  source: string;
  description: string;
  image: string;
};

const recipes: Recipe[] = [
  {
    title: "Banana Wraps",
    source:
      "https://www.forksoverknives.com/recipes/vegan-breakfast/blueberry-banana-wraps/",
    description: `Refresh your breakfast routine with these simple, tasty wraps, which feature a mouthwatering mashup of fruit and veggies and come together in just 15 minutes. You can serve these chilled, at room temperature, or lightly warmed in a skillet.`,
    image: "wraps.webp",
  },
  {
    title: "Banana Bread",
    source:
      "https://www.forksoverknives.com/recipes/vegan-breakfast/gluten-free-banana-teff-bread/",
    description: `Banana is the main sweetener in this gluten-free banana bread. The end result is a deliciously moist loaf, fragrant with cinnamon and studded with walnuts and raisins.`,
    image: "bread.webp",
  },
  {
    title: "Banana Brownies",
    source:
      "https://www.forksoverknives.com/recipes/vegan-desserts/peanut-butter-banana-brownies/",
    description: `Banana helps sweeten these chewy brownies on the inside. But it's the sliced banana on top that's really clever, adding a fresh creaminess to complement the rich chocolate-peanut flavor.`,
    image: "brownies.webp",
  },
];

export default recipes;
