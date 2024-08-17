// src/components/RecipesList.tsx
import React, { useEffect, useState } from "react";
import { getAllFoods, getAllRecipes } from "../data/db";
import { Recipe } from "../entities/Recipe";
import { Food } from "../entities/Food";

const RecipesList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        setFoods(data);
      } catch (error) {
        setError("Failed to fetch foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (error) {
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [foods]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>List of Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => {
            const totalPrice = +recipe.foods
              .reduce((total, food) => {
                const foodDetails = foods.find((f) => f.id === food.id);
                if (!foodDetails) {
                  return total;
                }
                return total + food.quantity * foodDetails.pricePerUnit;
              }, 0)
              .toFixed(2);
            return (
              <li key={recipe.id}>
                <h3>
                  {recipe.name} Price: ${totalPrice}
                </h3>
                <ul>
                  {recipe.foods.map((food) => {
                    const foodDetails = foods.find((f) => f.id === food.id);
                    if (!foodDetails) {
                      return null;
                    }
                    return (
                      <li key={food.id}>
                        {/* For displaying food details, you might want to fetch food details separately */}
                        {foodDetails.name} - Quantity: {food.quantity}
                        {foodDetails.unit} - Price: $
                        {+(foodDetails.pricePerUnit * food.quantity).toFixed(2)}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipesList;
