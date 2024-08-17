export class Recipe {
  constructor(
    public id: number,
    public name: string,
    public foods: { id: number; quantity: number }[]
  ) {}

  static fromType(recipe: TRecipe) {
    return new Recipe(recipe.id, recipe.name, recipe.foods);
  }
}

export type TRecipe = {
  id: number;
  name: string;
  foods: { id: number; quantity: number }[];
};
