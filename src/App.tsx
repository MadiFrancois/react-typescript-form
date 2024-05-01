import './App.css';
import { MantineProvider } from '@mantine/core';
import { Header } from './Layout/Header';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  
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
