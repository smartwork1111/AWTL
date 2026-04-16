import React, { useState } from "react";

// Interface
interface FoodItem {
  id: number;
  name: string;
  rating: number;
}

const App: React.FC = () => {
  // Initial state
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 1, name: "🍕 Pizza", rating: 0 },
    { id: 2, name: "🍔 Burger", rating: 0 },
    { id: 3, name: "🌮 Taco", rating: 0 },
    { id: 4, name: "🥗 Salad", rating: 0 },
  ]);

  const [filter, setFilter] = useState<"all" | "high" | "low" | "unrated">("all");

  // Update rating
  const updateRating = (id: number, rating: number) => {
    setFoods(foods.map(food =>
      food.id === id ? { ...food, rating } : food
    ));
  };

  // Filter logic
  const filteredFoods = foods.filter(food => {
    if (filter === "high") return food.rating >= 4;
    if (filter === "low") return food.rating < 3 && food.rating > 0;
    if (filter === "unrated") return food.rating === 0;
    return true;
  });

  // Statistics
  const ratings = foods.map(f => f.rating);
  const total = ratings.reduce((a, b) => a + b, 0);
  const avg = total / foods.length;

  const highest = foods.reduce((a, b) => (a.rating > b.rating ? a : b));
  const lowest = foods.reduce((a, b) => (a.rating < b.rating ? a : b));
  const highCount = foods.filter(f => f.rating >= 4).length;

  const allZero = foods.every(f => f.rating === 0);

  // Reset
  const resetRatings = () => {
    setFoods(foods.map(f => ({ ...f, rating: 0 })));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Food Rating App</h2>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("high")}>High Rated (4+ ⭐)</button>
        <button onClick={() => setFilter("low")}>Low Rated (&lt;3 ⭐)</button>
        <button onClick={() => setFilter("unrated")}>Unrated (0 ⭐)</button>
      </div>

      <hr />

      {/* Food List */}
      {filteredFoods.map(food => (
        <div key={food.id}>
          <h3>{food.name} - {food.rating} ⭐</h3>
          {[1,2,3,4,5].map(star => (
            <button key={star} onClick={() => updateRating(food.id, star)}>
              {star}⭐
            </button>
          ))}
        </div>
      ))}

      <hr />

      {/* Statistics */}
      <h3>Statistics</h3>
      {allZero ? (
        <p>No ratings available</p>
      ) : (
        <>
          <p>Average Rating: {avg.toFixed(2)}</p>
          <p>Highest Rated: {highest.name}</p>
          <p>Lowest Rated: {lowest.name}</p>
          <p>Foods with 4+ ⭐: {highCount}</p>
        </>
      )}

      <hr />

      {/* Reset */}
      <button onClick={resetRatings}>Reset All Ratings</button>
    </div>
  );
};

export default App;