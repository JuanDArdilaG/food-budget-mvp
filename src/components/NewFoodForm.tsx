// src/components/FoodForm.tsx
import React, { useState } from "react";
import { addFood } from "../data/db";

const NewFoodForm: React.FC = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name && brand && price !== "" && quantity !== "" && unit) {
      try {
        await addFood({
          name,
          brand,
          price,
          quantity,
          unit,
        });
        alert("Food item added successfully!");
        // Clear form fields after submission
        setName("");
        setBrand("");
        setPrice("");
        setQuantity("");
        setUnit("");
      } catch (error) {
        alert("Failed to add food item: " + error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <h2>New Food Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Brand:
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Unit:
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Food</button>
      </form>
    </>
  );
};

export default NewFoodForm;
