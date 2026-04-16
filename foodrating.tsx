import React, { useState, useMemo } from "react";

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

  // Update rating - fixed stale closure
  const updateRating = (id: number, rating: number) => {
    setFoods(prevFoods => prevFoods.map(food =>
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

  // Statistics - memoized to fix staleness and performance
  const stats = useMemo(() => {
    const hasRatings = foods.some(f => f.rating > 0);
    if (!hasRatings) {
      return {
        allZero: true,
        avg: 0,
        highest: null as FoodItem | null,
        lowest: null as FoodItem | null,
        highCount: 0
      };
    }

    const ratings = foods.map(f => f.rating);
    const total = ratings.reduce((a, b) => a + b, 0);
    const avg = total / foods.length;

    const highest = foods.reduce((a, b) => (a.rating > b.rating ? a : b));
    const lowest = foods.reduce((a, b) => (a.rating < b.rating ? a : b));
    const highCount = foods.filter(f => f.rating >= 4).length;

    return { allZero: false, avg, highest, lowest, highCount };
  }, [foods]);

  // Reset - fixed stale closure
  const resetRatings = () => {
    setFoods(prevFoods => prevFoods.map(f => ({ ...f, rating: 0 })));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>🍕 Food Rating App</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")} style={{ margin: "5px", padding: "10px" }}>Show All</button>
        <button onClick={() => setFilter("high")} style={{ margin: "5px", padding: "10px" }}>High Rated (4+ ⭐)</button>
        <button onClick={() => setFilter("low")} style={{ margin: "5px", padding: "10px" }}>Low Rated (less than 3 ⭐)</button>
        <button onClick={() => setFilter("unrated")} style={{ margin: "5px", padding: "10px" }}>Unrated (0 ⭐)</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Food List */}
      {filteredFoods.length === 0 ? (
        <p>No foods match the current filter.</p>
      ) : (
        filteredFoods.map(food => (
          <div key={food.id} style={{ margin: "20px 0", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>{food.name} - {food.rating} ⭐</h3>
            <div>
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star} 
                  onClick={() => updateRating(food.id, star)}
                  style={{ 
                    margin: "5px", 
                    padding: "8px 12px", 
                    background: food.rating >= star ? "#ffd700" : "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  {star}⭐
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Statistics */}
      <h3>📊 Statistics</h3>
      {stats.allZero ? (
        <p>No ratings available yet!</p>
      ) : (
        <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", display: "inline-block" }}>
          <p><strong>Average Rating:</strong> {stats.avg.toFixed(2)} ⭐</p>
          <p><strong>Highest Rated:</strong> {stats.highest?.name} ({stats.highest?.rating} ⭐)</p>
          <p><strong>Lowest Rated:</strong> {stats.lowest?.name} ({stats.lowest?.rating} ⭐)</p>
          <p><strong>Foods with 4+ ⭐:</strong> {stats.highCount}</p>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Reset */}
      <button 
        onClick={resetRatings}
        style={{ 
          padding: "12px 24px", 
          background: "#ff4444", 
          color: "white", 
          border: "none", 
          borderRadius: "6px", 
          fontSize: "16px",
          cursor: "pointer"
        }}
        disabled={stats.allZero}
      >
        Reset All Ratings
      </button>
    </div>
  );
};

export default App;

