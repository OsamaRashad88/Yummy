import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Countrydishes() {
  const [meals, setmeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { countryname } = useParams();

  async function getcountrydishes() {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryname}`
      );
      setmeals(data.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getcountrydishes();
  }, [countryname]);

  return (
    <>
      {loading ? (
        <div className="loading-layer">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {meals.map((meal) => (
              <div className="col-md-3 meal" key={meal.idMeal}>
                <Link to={`/Meals/${meal.idMeal}`}>
                  <div>
                    <img src={meal.strMealThumb} alt="" />
                    <p style={{ textDecoration: "none" }}>{meal.strMeal}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
