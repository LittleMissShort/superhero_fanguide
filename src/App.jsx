import { useState, useEffect } from "react"
import "./App.css"
import { Routes, Route, Link, useParams } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts"

function App() {

  const API_TOKEN= "17c729dfd1d038bcb243850225fdce1e"

  const [heroes, setHeroes] = useState([])
  const [search, setSearch] = useState("man")
  const [filter, setFilter] = useState("all")

  function HeroDetail() {
    const { id } = useParams()
    const [hero, setHero] = useState(null)

    useEffect(() => {
      const fetchHero = async() => {
        try {
          const response = await fetch(
            `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${API_TOKEN}/${id}`  
          )
          const data = await response.json()
          setHero(data)
        }catch (error) {
          console.error("Error fetching hero:", error)
          }
        }
        fetchHero()
      }, [id])
      if(!hero) return <p style={{color:"yellow"}}>Loading...</p>

      return (
      <div style={{ color: "white", textAlign: "center" }}>
        <h1>{hero.name}</h1>

        <img src={hero.image?.url} alt={hero.name} />

        <p>Power: {hero.powerstats?.power}</p>
        <p>Intelligence: {hero.powerstats?.intelligence}</p>
        <p>Strength: {hero.powerstats?.strength}</p>

        <p>Full Name: {hero.biography?.["full-name"]}</p>
        <p>Alignment: {hero.biography?.alignment}</p>
      </div>
    )
  }

  const fetchHeroes = async () => {
      try{
        const cleanSearch = search.trim().toLowerCase()
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${API_TOKEN}/search/${cleanSearch}`
            )
        
        const data = await response.json()
        console.log(data)
 
      if (data.response === "success") {
        let results = data.results
       if (results.length < 10) {
         const randomHeroes = []
         let count = results.length
       while (count < 10) {
         const randomId = Math.floor(Math.random() * 731) + 1
 
         const res = await fetch(
         `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${API_TOKEN}/${randomId}`
         )

         const heroData = await res.json()

       if (heroData.response === "success") {
        randomHeroes.push(heroData)
        count++
      }
    }

    results = [...results, ...randomHeroes]
  }

  setHeroes(results)

   } else {
   setHeroes([])
   }

   } catch (error) {
    console.error("Error fetching heroes:", error)
    setHeroes([])
   } 
  }

  useEffect(() => {
    if (search.trim() !== "") {
    fetchHeroes()
    }
  }, [search])





const filteredHeroes = heroes.filter(hero => {
  if(filter === "all") return true
  return hero.biography?.alignment === filter
})


  return (  
    <Routes> 
      <Route path = "/" element ={
        <>
         <div className= "container">
          <h3>The Hitchikers guide through the superhero galaxy </h3>
     
     <div className= "search-bar">
      <input
        type= "text"
        value ={search}
        onChange={(e) => setSearch(e.target.value)}
       /> 

    <select onChange={(e) => setFilter(e.target.value)}>
     <option value="all" >ALL</option>
     <option value="good" >Good</option>
     <option value="bad" >Bad</option>
    </select>


     <button onClick={fetchHeroes}>
      Search
     </button> 

  </div>
  
  <div className="stats">
    <p>Total Heroes: {heroes.length}</p>
    <p>
      Average Power: {
        heroes.length > 0
         ? Math.round(
            heroes.reduce(
              (sum, hero) => sum + Number(hero.powerstats?.power || 0),
              0
            ) / heroes.length
         )
         :0

      }
    </p>


    <p>
      Max Intelligence: {
        heroes.length> 0
          ? Math.max(
            ...heroes.map(hero => Number(hero.powerstats?.intelligence || 0))
            )
          : 0
        
      }
    </p>
  </div>
  
  <div style={{display: "flex", justifyContent: "center",marginTop: "20px"}}>
    <BarChart width= {400} height ={200} data ={heroes.slice(0,5)}>
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip/>
      <Bar dataKey="powerstats.power" fill= "#8884d8"/>
    </BarChart>
  </div>
   
    <div style={{display: "flex", justifyContent: "center",marginTop: "20px"}}>
    <BarChart width= {400} height ={200} data ={heroes.slice(0,5)}>
      <XAxis dataKey="name" />
      <YAxis/>
      <Tooltip/>
      <Bar dataKey="powerstats.intelligence" fill= "#82ca9d"/>
    </BarChart>

  </div>
   <div className="hero-grid">
      {heroes.length === 0 && <p>No heroes found. Try searching for another name.</p>}  
        {filteredHeroes.map((hero) => (

  <Link to={`/hero/${hero.id}`} key={hero.id}>

  <div className="hero-card">

    {hero.image?.url ? (
      <img 
        src={hero.image.url} 
        alt={hero.name} 
      />
    ) : (
      <p>No image available</p>
    )}
           <h3> {hero.name}</h3>
          
           <p>Power: {hero.powerstats?.power}</p>
           <p>Intelligence: {hero.powerstats?.intelligence}</p>
           <p>Strength: {hero.powerstats?.strength}</p>
          
           <p>Occupation: {hero.work?.occupation}</p>
           <p>Alter Egos: {hero.biography?.["alter-egos"]} </p> 
          
           <p>Full name: {hero.biography?.["full-name"]} </p>
          
           
           <p>Alignment: {hero.biography?.alignment}</p>
           
          </div>

          </Link>

         ))} 
       </div>
       
    </div>
    </>

    } />

    <Route path="/hero/:id" element={<HeroDetail />}

    />


    </Routes>
    
  )
} 


export default App