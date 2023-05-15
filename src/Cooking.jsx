import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Cooking() {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        setMeals(response.data.meals);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="row">
      {loading ? (
        <div className="loading-layer">
          <div className="custom-loader"></div>
        </div>
      ) : (
        meals.map((meal) => (
          <div key={meal.idMeal} className="col-md-10 offset-md-1">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={meal.strMealThumb}
                  className="img-fluid rounded w-100"
                  alt={meal.strMeal}
                />
              </div>
              <div className="col-md-8">
                <h2 className="mt-4 mb-3">{meal.strMeal}</h2>
                <h4 className="mt-4 mb-3">Ingredients:</h4>
                <ul className="list-group list-group-flush">
                  {Object.keys(meal).map((key) => {
                    if (key.startsWith("strIngredient") && meal[key]) {
                      return (
                        <li className="list-group-item" key={key}>
                          {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
                <h4 className="mt-4 mb-3">Instructions:</h4>
                <p className="card-text">{meal.strInstructions}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
