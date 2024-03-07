import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './List.css'

function List() {
    const [data, setData] = useState([]);
    const [selectedCreator, setSelectedCreator] = useState('');

    useEffect(() => {
        fetchFood();
    }, []);

    const fetchFood = async () => {
        try {
            const response = await fetch('https://foodexplorer-iqox.onrender.com/get');
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (foodID) => {
        try {
            const response = await fetch(`https://foodexplorer-iqox.onrender.com/delete/${foodID}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedData = data.filter(item => item.FoodID !== foodID);
                setData(updatedData);
                console.log('Food item deleted successfully');
            } else {
                console.error('Failed to delete food item');
            }
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    };

    const handleCreatorChange = (e) => {
        setSelectedCreator(e.target.value);
    };

    const uniqueCreators = [...new Set(data.map(item => item.CreatedBy))];
    const filteredData = selectedCreator ? data.filter(item => item.CreatedBy === selectedCreator) : data;

    return (
        <>
            <h1><i>FOOD EXPLORER</i></h1>
            <h2><i>Embark on a Culinary Journey with Food Explorer: Where Every Bite Tells a Story!</i></h2>
            <hr></hr>
            <div className="head">
                <h1>Food Details</h1>
                <Link to='/insertData' className="link"><button className="button">ADD</button></Link>
                <div className="filter">
                    <label htmlFor="createdBy">Filter by Creator:</label>
                    <select id="createdBy" value={selectedCreator} onChange={handleCreatorChange}>
                        <option value="">All</option>
                        {uniqueCreators.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="box">
                {filteredData.map((item) => (
                    <div className='main' key={item.FoodID}>
                        <p>Food ID : {item.FoodID}</p>
                        <p>Name : {item.Name}</p>
                        <p>Country : {item.Country}</p>
                        <p>City : {item.City}</p>
                        <p>Cuisine : {item.Cuisine}</p>
                        <p>Main Ingredients : {item.MainIngredients}</p>
                        <p>Type : {item.Type}</p>
                        <p>Taste : {item.Taste}</p>
                        <p>Created By : {item.CreatedBy}</p>
                        <Link to={`/updateData/${item.FoodID}`}><button className="Updatebutton">UPDATE</button></Link>
                        <button className="Updatebutton" onClick={() => handleDelete(item.FoodID)}>DELETE</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default List;
