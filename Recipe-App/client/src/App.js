import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from "@apollo/client";
import Order from './components/recipes-page/recipes-page';
import Navbar from './components/navbar/navbar';
import { useEffect, useState } from 'react';
//import Order from './components/recipes-page/recipes-page';


function App() {
  const [query, setQuery] = useState(
    gql`
  query GetAllRecipies {
    showRecipies {
      id
      name 
      cookTimeMinutes
      difficulty   
      image  
      ingredients
      servings
    }
  } 
`
  )
  const { data, loading, refetch } = useQuery(query); 
 
  useEffect(() => {
  // Here, you can call refetch whenever the query state changes
    refetch();
    console.log(data);
  }, [query, refetch]); // Add refetch as a dependency to useEffect
  return (
    <>
      <Navbar  setQuery={setQuery} data ={data}/>
      <Order data={data} loading={loading} />
    </>
  );
}

export default App;
