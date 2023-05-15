import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Catmeals() {
  const { Cat } = useParams();
  const [meals, setmeals] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getcategorymeals() {
    try {
      let { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Cat}`
      );
      console.log(data.meals);
      setmeals(data.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getcategorymeals();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-layer">
          <div className="custom-loader"></div>
        </div>
      )}
      <div className="container">
        <div className="row gx-3 gy-2">
          {meals &&
            meals.map((meal) => (
              <div className="meal col-md-3 " key={meal.idCategory}>
                <Link to={`/Meals/${meal.idMeal}`}>
                  <div>
                    <img src={meal.strMealThumb} alt={meal.strCategory} />
                    <p
                      className="text-center"
                      style={{ textDecoration: "none" }}
                    >
                      {meal.strMeal}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
