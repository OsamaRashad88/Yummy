import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Countries() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const Flags = [
    "./Flags/1.jpg",
    "./Flags/2.png",
    "./Flags/3.png",
    "./Flags/4.png",
    "./Flags/5.png",
    "./Flags/6.png",
    "./Flags/7.png",
    "./Flags/8.png",
    "./Flags/9.png",
    "./Flags/10.png",
    "./Flags/11.png",
    "./Flags/12.png",
    "./Flags/13.png",
    "./Flags/14.png",
    "./Flags/15.png",
    "./Flags/16.png",
    "./Flags/17.png",
    "./Flags/18.png",
    "./Flags/19.png",
    "./Flags/20.png",
    "./Flags/21.png",
    "./Flags/22.png",
    "./Flags/23.png",
    "./Flags/24.png",
    "./Flags/25.png",
    "./Flags/26.png",
    "./Flags/27.png",
  ];

  useEffect(() => {
    async function getallcountries() {
      try {
        setLoading(true);
        let { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
        );
        setMeals(data.meals);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getallcountries();
  }, []);

  useEffect(() => {
    function addFlag() {
      setMeals((prevMeals) =>
        prevMeals.map((meal, index) => ({
          ...meal,
          Flagsrc: Flags[index % Flags.length],
        }))
      );
    }
    addFlag();
  }, [Flags]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-layer">
          <div className="custom-loader"></div>
        </div>
      ) : (
        meals.length > 0 && (
          <div className="row">
            {meals.map((meal) => (
              <div className="col-md-3" key={meal.strArea}>
                <Link
                  to={`/Country/${meal.strArea}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <img className="w-100" src={meal.Flagsrc} alt="" />
                    <p className="text-center">{meal.strArea}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
