import React from "react";
import { sliderItems } from "../../data/categoryGames";

const CategorySlider = (props) => {

function handleClick(tmp){
  props.setCategory(sliderItems[tmp].desc)
  console.log(props.category);
}
  return (
    <div className="category-slider">
    <div className='single-category' onClick={() => handleClick(1)}>
        <img src={sliderItems[1].img}></img>
        <p>{sliderItems[1].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(2)}>
        <img src={sliderItems[2].img}></img>
        <p>{sliderItems[2].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(3)}>
        <img src={sliderItems[3].img}></img>
        <p>{sliderItems[3].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(4)}>
        <img src={sliderItems[4].img}></img>
        <p>{sliderItems[4].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(5)}>
        <img src={sliderItems[5].img}></img>
        <p>{sliderItems[5].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(6)}>
        <img src={sliderItems[6].img}></img>
        <p>{sliderItems[6].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(7)}>
        <img src={sliderItems[7].img}></img>
        <p>{sliderItems[7].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(8)}>
        <img src={sliderItems[8].img}></img>
        <p>{sliderItems[8].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(9)}>
        <img src={sliderItems[9].img}></img>
        <p>{sliderItems[9].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(10)}>
        <img src={sliderItems[10].img}></img>
        <p>{sliderItems[10].title}</p>
    </div>
    <div className='single-category' onClick={() => handleClick(0)} style={{width: "18px"}}>
        <p>{sliderItems[0].title}</p>
    </div>
    </div>
  );
};

export default CategorySlider;
