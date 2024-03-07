import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

export default function UpdateData() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [mainIngredients, setMainIngredients] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [taste, setTaste] = useState('');
    const [foodID, setFoodID] = useState('');
    const [createdby, setcreatedby] = useState('');

    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get(`https://foodexplorer-iqox.onrender.com/get/${id}`);
                if (response.status === 200) {
                    const data = response.data;
                    
                    setName(data.Name);
                    setCountry(data.Country);
                    setCuisine(data.Cuisine);
                    setMainIngredients(data.MainIngredients);
                    setCity(data.City);
                    setType(data.Type);
                    setTaste(data.Taste);
                    setFoodID(data.FoodID);
                    setcreatedby(data.CreatedBy)

                } else {
                    console.error('Failed to fetch food data');
                }
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };

        fetchFoodData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`https://foodexplorer-iqox.onrender.com/patch/${id}`, {
                Name: name,
                Country: country,
                Cuisine: cuisine,
                MainIngredients: mainIngredients,
                City: city,
                Type: type,
                Taste: taste,
                FoodID: foodID,
                CreatedBy: createdby
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Updated Food:', response.data);
                navigate('/');
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    return (
        <>
            <h2>Update Data</h2>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <div className='div'>
                        <label htmlFor="FoodID">Food ID</label>
                        <input type="text" id="FoodID" name="FoodID" value={foodID} onChange={(e) => setFoodID(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Name">Name</label>
                        <input type="text" id="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Country">Country</label>
                        <input type="text" id="Country" name="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Cuisine">Cuisine</label>
                        <input type="text" id="Cuisine" name="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="MainIngredients">Main Ingredients</label>
                        <input type="text" id="MainIngredients" name="MainIngredients" value={mainIngredients} onChange={(e) => setMainIngredients(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="City">City</label>
                        <input type="text" id="City" name="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Taste">Taste</label>
                        <input type="text" id="Taste" name="Taste" value={taste} onChange={(e) => setTaste(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Type">Type</label>
                        <input type="text" id="Type" name="Type" value={type} onChange={(e) => setType(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Type">Created By</label>
                        <input type="text" id="CreatedBy" name="CreatedBy" onChange={(e) => setcreatedby(e.target.value)} />
                    </div>
                    <input type="submit" className='submit' value="Submit" />
                </form>
            </div>
        </>
    );
}
