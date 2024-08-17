import { Food, TFood } from "../entities/Food";
import { Recipe, TRecipe } from "../entities/Recipe";

const dbName = "foodDB";
const dbVersion = 2;

export const openDatabase = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("foods")) {
        db.createObjectStore("foods", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const addFood = async (food: Omit<TFood, "id">) => {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("foods", "readwrite");
    const store = transaction.objectStore("foods");
    const request = store.add(food);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addRecipe = async (recipe: Omit<TRecipe, "id">) => {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction("recipes", "readwrite");
    const store = transaction.objectStore("recipes");
    const request = store.add(recipe);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getAllFoods = async () => {
  const db = await openDatabase();
  return new Promise<Food[]>((resolve, reject) => {
    const transaction = db.transaction("foods", "readonly");
    const store = transaction.objectStore("foods");
    const request = store.getAll(); // Get all items

    request.onsuccess = () => {
      resolve((request.result as TFood[]).map((food) => Food.fromType(food)));
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getAllRecipes = async () => {
  const db = await openDatabase();
  return new Promise<Recipe[]>((resolve, reject) => {
    const transaction = db.transaction("recipes", "readonly");
    const store = transaction.objectStore("recipes");
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(
        (request.result as TRecipe[]).map((recipe) => Recipe.fromType(recipe))
      );
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
