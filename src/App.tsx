import './App.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './Layout/Header';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{

    //axios.post("http://localhost:3000/users",{name:"toto2",age:21});
    //axios.patch("http://localhost:3000/users/043b",{name:"toto222222222"});
    //axios.delete("http://localhost:3000/users/4268");
    axios.get("http://localhost:3000/users/043bs")
    .then((response) => {
      // le resultat de la requete en cas de success
      // Http Code 2XX
      // (200 success OK, 
      //  201 success Created, 
      // 204 success No content)
      console.log("Success use case",response.data);
    }).catch(e=>{
      // le resultat en cas d'echec de la requete 
      // http Code (4XX,5XX) 
      // 4XX c'est le code lorsque le client effectue une erreur
      // 400 Bad Request (donnée mal formaté)
      // 401 Not Authorized (utilisateur non authentifié) (not Anonyme)
      // 403 Forbiden (tu es authentifié mais tu n'a pas les privilèges nécessaire pour effectuer (CRUD)) 
      // 404 Not Found 
      // 408 Timeout
  
      //5XX 
      // 500 Internal server error (une erreur c'est produit lors de l'execution de votre au niveau du serveur)
      // 503 Service Unavalable (API Gateway) Client --> API --> Backenk
      // 504 Gateway Timeout
  
      console.error("Error use case",e)
    });
  },[]);
  


  return (
    <MantineProvider defaultColorScheme={"auto"}>
        <Header />
        
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />}  />
          ))}
        </Routes>

    </MantineProvider>
    
  );
}

export default App;
