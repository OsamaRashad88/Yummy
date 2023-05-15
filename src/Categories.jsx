import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(true);

  async function getData() {
    const { data } = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    setMeals(data.categories);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-layer">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div className="row">
          {meals.map((meal) => (
            <div className="meal col-md-3" key={meal.idCategory}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/Catmeals/${meal.strCategory}`}
              >
                <div>
                  <img src={meal.strCategoryThumb} alt={meal.strCategory} />
                  <p className="text-center">{meal.strCategory}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
