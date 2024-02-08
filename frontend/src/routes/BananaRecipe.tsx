import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import recipes from "../recipes/recipes";

const BananaRecipe = () => {
  const recipe = recipes[Math.floor(Math.random() * recipes.length)];

  return (
    <div style={{ marginTop: "2em" }}>
      <Card>
        <CardHeader title={recipe.title} subheader={recipe.source} />
        <CardMedia
          component="img"
          image={`src/assets/recipes/${recipe.image}`}
          alt="Wraps"
        />
        <CardContent>{recipe.description}</CardContent>
      </Card>
    </div>
  );
};

export default BananaRecipe;
