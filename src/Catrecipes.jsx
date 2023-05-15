import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [meals, setMeals] = useState();

  async function getData() {
    const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    setMeals(data.categories);
    console.log(data.categories);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className='row'>
      {meals &&
        meals.map((meal) => (
          <div className='meal col-md-3' key={meal.idCategory}>
            <img src={meal.strCategoryThumb} alt={meal.strCategory} />
            <p className='text-center'>{meal.strCategory}</p>
          </div>
        ))}
    </div>
    </div>
  );
}
