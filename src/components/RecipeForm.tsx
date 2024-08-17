import React, { useState, useEffect } from "react";
import { addRecipe, getAllFoods } from "../data/db";
import { Food } from "../entities/Food";

const RecipeForm: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<{ [key: number]: number }>(
    {}
  );
  const [recipeName, setRecipeName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        setFoods(data);
        setFilteredFoods(data);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredFoods(
        foods.filter((food) => food.name.toLowerCase().includes(lowercasedTerm))
      );
    } else {
      setFilteredFoods(foods);
    }
  }, [searchTerm, foods]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const foodEntries = Object.entries(selectedFoods).map(([id, quantity]) => ({
      id: Number(id),
      quantity,
    }));

    try {
      await addRecipe({ name: recipeName, foods: foodEntries });
      alert("Recipe added successfully!");
      setRecipeName("");
      setSelectedFoods({});
      setSearchTerm("");
    } catch (error) {
      alert("Failed to add recipe: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Recipe</h2>
      <div>
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <h3>Select Foods and Quantities</h3>
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredFoods.length > 0 ? (
          <ul>
            {filteredFoods.map((food) => (
              <li key={food.id}>
                <label>
                  {food.name}:
                  <input
                    type="number"
                    min="0"
                    value={selectedFoods[food.id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(food.id, Number(e.target.value))
                    }
                  />
                  {food.unit}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching foods found.</p>
        )}
      </div>
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;
