
import { useState,useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {


  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')

  // useEffect will be called when ever we refresh or rerender our page
// ,[] will be calling 1nce

  useEffect(()=>{
    // reading or fetching data  from this url (promise)
    Axios.get('http://localhost:3001/read').then((response) => {
      console.log(JSON.stringify(response.data))
      setFoodList(response.data)

    }).catch(error =>{
      console.log(error)
    })
  },[])
  

  
  const addToList = () => {
    // send this data from front end  to index.js where we post the data to database
    Axios.post("http://localhost:3001/insert", {
      foodName : foodName,
      days : days
      })

  }
  const updateFood = (id) => {
    // put represent updating
    // have to pass object to recognize what element to update 

    Axios.put("http://localhost:3001/update", {

      id : id,
      newFoodName : newFoodName
    })
  }

  const deleteFood = (id) => {
    // put represent updating
    // have to pass object to recognize what element to update 
    // api req to http://localhost:3001/delete/${id}
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  return (
    
    <>
    <div className = "App">


      <h1>CRUD App with MERN</h1>

      <label >Food Name:</label>
      <input type="text"  onChange={(event) => {
        setFoodName(event.target.value)
      }}/>

      <label >Days Since you Ate it:</label>
      <input type="number" onChange={(event) => {
        setDays(event.target.value)
      }}/>

      <button onClick={addToList}> Add to List</button>

      <h1>Food List</h1>

      {foodList.map((val ,key)=>{

        return(

          <div key={key} className= "foodView">
            <h1> {val.foodName}</h1>
            <h1> {val.daysSinceAte}</h1>

            <input type="text" placeholder='New Food Name' onChange={ (event) => {
              setNewFoodName(event.target.value)
            }}
            />

            <button onClick={() => deleteFood(val._id)}
            >Delete</button>
            <button onClick={ () => updateFood(val._id) }
            >Update</button>

          </div>
          )})
      }
    </div>
    </>
  );
}

export default App;
