import React from 'react';
import Dummydata from '../dummyData.json';

function List() {
    return (
        <>
            {Dummydata.map((data) => {
                return (
                    <div className='main'>
                        <h1 className='h1'>Food Details</h1>
                        <p>Food ID : {data.FoodID}</p>
                        <p>Name : {data.Name}</p>
                        <p>Country : {data.Country}</p>
                        <p>City : {data.City}</p>
                        <p>Cuisine : {data.Cuisine}</p>
                        <p>Main Ingredients : {data.MainIngredients}</p>
                        <p>Type : {data.Type}</p>
                        <p>Taste : {data.Taste}</p>
                    </div>
                );
            })}
        </>
    );
}

export default List;
