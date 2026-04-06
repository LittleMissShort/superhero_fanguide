import { useState, useEffect } from "react"
import "./App.css"

function App() {

  const API_TOKEN= "17c729dfd1d038bcb243850225fdce1e"

  const [heroes, setHeroes] = useState([])
  const [search, setSearch] = useState("1")

  
  const fetchHeroes = async () => {
     try{
        const cleanSearch = search.trim().toLowerCase()
     
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${API_TOKEN}/search/${cleanSearch}`
            )
        const data = await response.json()
        console.log(data)
 
        if (data.response === "success") {
          setHeroes(data.results)
        } else {
          setHeroes([])
        }
        } catch (error) {
        console.error("Error fetching heroes:", error)
        setHeroes([])
    }
  } 

  useEffect(() => {
  const loadHeroes = async () => {
    await fetchHeroes()
  }

  loadHeroes()
}, [])

  return (  
    <div className= "container">
     <h3>The Hitchikers guide through the superhero galaxy </h3>
     
     <div className= "search-bar">
      <input
        type= "text"
        value ={search}
        onChange={(e) => setSearch(e.target.value)}
       /> 


     <button onClick={fetchHeroes}>
      Search
     </button> 

  </div>

   <div className="hero-grid">
      {heroes.length === 0 && <p>No heroes found. Try searching for another name.</p>}  
        {heroes.map((hero) => (
  <div className="hero-card" key={hero.id}>

    {hero.image?.url ? (
      <img 
        src={hero.image.url} 
        alt={hero.name} 
      />
    ) : (
      <p>No image available</p>
    )}
           <h3> {hero.name}</h3>
          
           <p>Power: {hero.powerstats.power}</p>
           <p>Intelligence: {hero.powerstats.intelligence}</p>
           <p>Strength: {hero.powerstats.strength}</p>
          
           <p>Occupation: {hero.work.occupation}</p>
           <p>Alter Egos: {hero.biography["alter-egos"]} </p> 
          
           <p>Full name: {hero.biography["full-name"]} </p>
          
           
           <p>Alignment: {hero.biography.alignment}</p>
           
          </div>
         ))}
       </div>
    </div>
  )
}

export default App