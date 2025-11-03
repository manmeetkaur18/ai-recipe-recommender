import { useState } from 'react';
import './index.css'; // make sure your styles are in index.css

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    if (!ingredients.trim()) return; // prevent empty input
    try {
      const res = await fetch('http://localhost:3001/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  return (
    <div className="container">
      <h1>AI Recipe Recommender</h1>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={getRecipes}>Recommend</button>
      </div>

      {recipes.length > 0 && (
        <ul>
          {recipes.map((r, idx) => (
            <li key={idx}>{r.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
