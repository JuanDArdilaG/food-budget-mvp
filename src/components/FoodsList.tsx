// src/components/FoodsList.tsx
import React, { useEffect, useState } from "react";
import { getAllFoods } from "../data/db";
import { Food } from "../entities/Food";

const FoodsList: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        setFoods(data);
        setFilteredFoods(data);
      } catch (error) {
        setError("Failed to fetch foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredFoods(
        foods.filter(
          (food) =>
            food.name.toLowerCase().includes(lowercasedTerm) ||
            food.brand.toLowerCase().includes(lowercasedTerm)
        )
      );
    } else {
      setFilteredFoods(foods);
    }
  }, [searchTerm, foods]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Search Foods</h2>
      <input
        type="text"
        placeholder="Search by name or brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredFoods.length > 0 ? (
        <ul>
          {filteredFoods.map((food) => (
            <li key={food.id}>
              <strong>{food.name}</strong> - {food.brand} - ${food.price} -{" "}
              {food.quantity} {food.unit}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching foods found.</p>
      )}
    </div>
  );
};

export default FoodsList;
