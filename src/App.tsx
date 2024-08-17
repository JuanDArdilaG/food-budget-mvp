// src/App.tsx
import React from "react";
import NewFoodForm from "./components/NewFoodForm";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import FoodsList from "./components/FoodsList";
import RecipeForm from "./components/RecipeForm";
import RecipesList from "./components/RecipesList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Food Management</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Add Food</Link>
            </li>
            <li>
              <Link to="/foods">Search Foods</Link>
            </li>
            <li>
              <Link to="/recipes">Create Recipe</Link>
            </li>
            <li>
              <Link to="/recipes-list">View Recipes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<NewFoodForm />} />
          <Route path="/foods" element={<FoodsList />} />
          <Route path="/recipes" element={<RecipeForm />} />
          <Route path="/recipes-list" element={<RecipesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
