import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './InsertData.css'; 

export default function InsertData() {
    const [FoodID, setFoodID] = useState('');
    const [Name, setName] = useState('');
    const [Country, setCountry] = useState('');
    const [Cuisine, setCuisine] = useState('');
    const [MainIngredients, setMainIngredients] = useState('');
    const [City, setCity] = useState('');
    const [Type, setType] = useState('');
    const [Taste, setTaste] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://foodexplorer-iqox.onrender.com/post", { FoodID, Name, Country, City, Cuisine, MainIngredients, Type, Taste })
            .then((res)=>{
                console.log(res)
                navigate('/')
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div>Insert Data</div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className='div'>
                        <label htmlFor="Name">Name:</label><br />
                        <input type="text" id="Name" name="Name" onChange={(e) => setName(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="Country">Country:</label><br />
                        <input type="text" id="Country" name="Country" onChange={(e) => setCountry(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="Cuisine">Cuisine:</label><br />
                        <input type="text" id="Cuisine" name="Cuisine" onChange={(e) => setCuisine(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="MainIngredients">Main Ingredients:</label><br />
                        <input type="text" id="MainIngredients" name="MainIngredients" onChange={(e) => setMainIngredients(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="City">City:</label><br />
                        <input type="text" id="City" name="City" onChange={(e) => setCity(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="Taste">Taste:</label><br />
                        <input type="text" id="Taste" name="Taste" onChange={(e) => setTaste(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="Type">Type:</label><br />
                        <input type="text" id="Type" name="Type" onChange={(e) => setType(e.target.value)} /><br />
                    </div>
                    <div className='div'>
                        <label htmlFor="FoodID">Food ID:</label><br />
                        <input type="text" id="FoodID" name="FoodID" onChange={(e) => setFoodID(e.target.value)} /><br />
                    </div>
                    <input type="submit" className='submit' value="Submit" />
                </form>
            </div>
        </>
    );
}
