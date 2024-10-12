import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { yellow, brown } from '@mui/material/colors';
import Sivupalkki from './components/Sivupalkki';
import KoiraLomake from './components/KoiraLomake';
import KoiraLista, { ListaLoader } from './components/KoiraLista';
import KoiranLisays, { LomakeAction } from './components/KoiranLisays';


const theme = createTheme({
  palette: {
    primary: { main: yellow[900], contrastText: '#FFFFFF' },
    secondary: { main: brown[500], contrastText: '#FFFFFF' },
  },
  typography: {
    fontFamily: "'Fira Sans', sans-serif",
    },
});

const router = createBrowserRouter([
  {
    element: <Sivupalkki />,
    children: [
      {
        path: '/',
        element: <KoiraLomake />,
        loader: ListaLoader,
      },
      {
        path: 'lista',
        element: <KoiraLista />,
        loader: ListaLoader,
      },
      {
        path: 'lisaa',
        element: <KoiranLisays />,
      },
      {
        path: 'lisaa/uusi',
        action: LomakeAction
      },
    ] 
  },
]);


function App() {

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    
    <CssBaseline />
    </ThemeProvider>
  )
}

export default App
