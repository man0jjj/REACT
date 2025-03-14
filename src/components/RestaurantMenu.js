import React from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";



const RestaurantMenu = () => {
  const {resId} = useParams();

const resInfo = useRestaurantMenu(resId); 

const [showIndex, setShowIndex] = useState(null);

if (resInfo === null) return  <Shimmer/>;




const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;


const itemCards =
resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
  ?.itemCards || [];

const categories = 
resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) =>
   c.card?.card?.["@type"] === 
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")


 // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

return  (
        <div className="text-center">
            <h1 className="font-bold my-4 text text-lg">{name}</h1>
            <p className="font-bold">{cuisines.join (", ")} - {costForTwoMessage} </p>
       
            {categories.map((category, index) => (
            <RestaurantCategory 
            key = {category?.card?.card.title}
            data={category?.card?.card}
            showItems = {index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
            />
            ))}
        </div>
    );
};

export default RestaurantMenu;