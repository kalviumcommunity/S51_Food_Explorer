// import React from 'react';
// import Dummydata from '../dummyData.json';

// function List() {
//     return (
//         <>
//             {Dummydata.map((data) => {
//                 return (
                    // <div className='main'>
                    //     <h1 className='h1'>Food Details</h1>
                    //     <p>Food ID : {data.FoodID}</p>
                    //     <p>Name : {data.Name}</p>
                    //     <p>Country : {data.Country}</p>
                    //     <p>City : {data.City}</p>
                    //     <p>Cuisine : {data.Cuisine}</p>
                    //     <p>Main Ingredients : {data.MainIngredients}</p>
                    //     <p>Type : {data.Type}</p>
                    //     <p>Taste : {data.Taste}</p>
                    // </div>
//                 );
//             })}
//         </>
//     );
// }

// export default List;

import React, {useState, useEffect} from "react";
function List(){
    const[data, setdata] = useState([])
    useEffect(()=>{
        fetchFood()
    }, [])

    const fetchFood = async () =>{
        try{
            const response = await fetch('https://foodexplorer-iqox.onrender.com/get')
            const data = await response.json()
            setdata(data)
            console.log(data)
        } catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <h1>Food Details</h1>
            {data.map((item)=>{
                return(
                    <div className='main'>
                        <h1 className='h1'>Food Details</h1>
                        <p>Food ID : {item.FoodID}</p>
                        <p>Name : {item.Name}</p>
                        <p>Country : {item.Country}</p>
                        <p>City : {item.City}</p>
                        <p>Cuisine : {item.Cuisine}</p>
                        <p>Main Ingredients : {item.MainIngredients}</p>
                        <p>Type : {item.Type}</p>
                        <p>Taste : {item.Taste}</p>
                    </div>
                )
            })}
        </>
    )

}
export default List;