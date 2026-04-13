#  Wabbittz Discovery – Superhero Explorer

##  Overview

Wabbittz Discovery is a React-based web application that allows users to search and explore superheroes from across comic universes. Users can view detailed information including power stats, biography, and more in a clean, interactive interface.

---

##  Features

*  Search for superheroes by name
*  View power stats (intelligence, strength, power, etc.)
*  Display biography details (full name, alignment, alter egos)
*  View character images (with fallback if unavailable)
*  Responsive card-based UI with hover effects

---

##  Tech Stack

* React (Vite)
* JavaScript (ES6+)
* CSS (custom styling)
* REST API integration

---

##  API Used

This project uses the SuperHero API to retrieve character data.

Base URL:
https://superheroapi.com/

Note: Due to CORS restrictions, requests are routed through a temporary proxy during development.


---

##  Known Issues

* API requires a CORS proxy for frontend requests
* Some characters may not have complete data (handled with optional chaining)

---

##  Future Improvements

*  Random hero generator
*  Ban list filtering (exclude certain traits or attributes)
*  Loading spinner for better UX
*  Pagination for large result sets
*  Backend integration to remove CORS dependency

---

## Author

Lauren Short

---

##  Inspiration

Built as part of a web development learning project to strengthen React fundamentals, API integration, and UI design skills.

---
