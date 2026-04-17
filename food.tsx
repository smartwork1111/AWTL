import React, { useState } from "react";

// ✅ Define FoodItem type
interface FoodItem {
  id: number;
  name: string;
  rating: number;
}

// ✅ Define filter type
type FilterType = "all" | "high" | "low" | "unrated";

const App: React.FC = () => {
  // ✅ Initial state
  const [foods, setFoods] = useState<FoodItem[]>([
    { id: 1, name: "🍕 Pizza", rating: 0 },
    { id: 2, name: "🍔 Burger", rating: 0 },
    { id: 3, name: "🌮 Taco", rating: 0 },
    { id: 4, name: "🥗 Salad", rating: 0 },
  ]);

  const [filter, setFilter] = useState<FilterType>("all");

  // ✅ Update rating
  const updateRating = (id: number, rating: number) => {
    setFoods((prev) =>
      prev.map((food) =>
        food.id === id ? { ...food, rating } : food
      )
    );
  };

  // ✅ Reset all ratings
  const resetRatings = () => {
    setFoods((prev) =>
      prev.map((food) => ({ ...food, rating: 0 }))
    );
  };

  // ✅ Apply filter
  const filteredFoods = foods.filter((food) => {
    switch (filter) {
      case "high":
        return food.rating >= 4;
      case "low":
        return food.rating < 3;
      case "unrated":
        return food.rating === 0;
      default:
        return true;
    }
  });

  // ✅ Statistics
  const totalRating = foods.reduce((sum, f) => sum + f.rating, 0);
  const avgRating =
    foods.length > 0 ? (totalRating / foods.length).toFixed(2) : "0.00";

  const highestRated = [...foods].sort((a, b) => b.rating - a.rating)[0];
  const lowestRated = [...foods].sort((a, b) => a.rating - b.rating)[0];

  const highCount = foods.filter((f) => f.rating >= 4).length;

  const allZero = foods.every((f) => f.rating === 0);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🍽 Food Rating App</h1>

      {/* ✅ Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>Show All</button>
        <button onClick={() => setFilter("high")}>High Rated (4+ ⭐)</button>
        <button onClick={() => setFilter("low")}>Low Rated (&lt;3 ⭐)</button>
        <button onClick={() => setFilter("unrated")}>Unrated (0 ⭐)</button>
      </div>

      {/* ✅ Food List */}
      {filteredFoods.map((food) => (
        <div key={food.id} style={{ marginBottom: "15px" }}>
          <h3>
            {food.name} — Rating: {food.rating} ⭐
          </h3>

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => updateRating(food.id, star)}
              style={{ margin: "2px" }}
            >
              {star}⭐
            </button>
          ))}
        </div>
      ))}

      {/* ✅ Statistics Section */}
      <div style={{ marginTop: "30px" }}>
        <h2>📊 Statistics</h2>

        {allZero ? (
          <p>No ratings available</p>
        ) : (
          <>
            <p>Average Rating: {avgRating}</p>
            <p>Highest Rated: {highestRated?.name}</p>
            <p>Lowest Rated: {lowestRated?.name}</p>
            <p>Foods with 4⭐ or more: {highCount}</p>
          </>
        )}
      </div>

      {/* ✅ Reset Button */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={resetRatings}>Reset All Ratings 🔄</button>
      </div>
    </div>
  );
};

export default App;
