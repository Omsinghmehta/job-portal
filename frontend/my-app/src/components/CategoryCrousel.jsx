import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "./Redux/jobSlice";
const category = [
  "Frontend",
  "Backend",
  "React",
  "Full Stack",
  "Data Science",
  "MEAN Stack",
];

const CategoryCrousal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = (query) => {
    console.log(query)
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="max-w-120 mx-auto my-18">
        <CarouselContent>
          {category.map((cat, idx) => (
            <CarouselItem
              key={idx}
             
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={() => changeHandler(cat)} className="rounded   ">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCrousal;
