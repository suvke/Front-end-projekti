import * as React from 'react';
import { useState } from 'react';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Box, Paper, FormControl, Select, MenuItem, Button, InputLabel, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useLoaderData } from 'react-router-dom';
import { getKoirat } from './koirat';

export async function ListaLoader() {
  // välitetään data tietokantakäsittelijälle
  let response = await getKoirat();

  if (response.status === 400) {
    throw Error(response.message);
  }

  return { response };
}


function KoiraLomake() {

  const { response } = useLoaderData();
  const koirat = response.data;

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expandedMap, setExpandedMap] = React.useState({});

  const isExpanded = (id) => expandedMap[id] || false;

  const handleExpandClick = (id) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const initialState = {
    koko: '',
    liikunnallisuus: '',
    seurallisuus: '',
    turkinhoito: '',
  };

  const [koko, setKoko] = useState(initialState.koko);
  const [liikunnallisuus, setLiikunnallisuus] = useState(initialState.liikunnallisuus);
  const [seurallisuus, setSeurallisuus] = useState(initialState.seurallisuus);
  const [turkinhoito, setTurkinhoito] = useState(initialState.turkinhoito);
  const [haetaan, setHaetaan] = useState(false);

  const muuta = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'koko':
        setKoko(value);
        break;
      case 'liikunnallisuus':
        setLiikunnallisuus(value);
        break;
      case 'seurallisuus':
        setSeurallisuus(value);
        break;
      case 'turkinhoito':
        setTurkinhoito(value);
        break;
      default:
        break;
    }
    setHaetaan(false);
  }


  const hae = () => {
    setHaetaan(true);
  }

  const tyhjenna = () => {
    setKoko(initialState.koko);
    setLiikunnallisuus(initialState.liikunnallisuus);
    setSeurallisuus(initialState.seurallisuus);
    setTurkinhoito(initialState.turkinhoito);
    setHaetaan(false);
  };
  
  const haeKoirat = () => {
    if (haetaan === true) {
      
      let result = koirat.filter(koira => {
      let kuva = encodeURIComponent(koira.kuva);

        return (
          (koko === '' || koira.koko === koko) &&
          (liikunnallisuus === '' || koira.liikunnallisuus === liikunnallisuus) &&
          (seurallisuus === '' || koira.seurallisuus === seurallisuus) &&
          (turkinhoito === '' || koira.turkinhoito === turkinhoito)
        );
      });

      if (result.length > 0) {
        let haku = result.map(koira => (
          <Grid container spacing={2} sx={{ marginTop: 1 }}>

            <Grid item key={koira.id}>
              <Card sx={{ width: 230 }}>
                <CardHeader
                  title={
                    <Typography variant="subtitle1" fontSize="0.9rem">
                      {koira.rotu.toUpperCase()}
                    </Typography>
                  }
                />
                
                <CardContent>
                  {koira.kuva ?
                  <CardMedia sx={{ height: 150, width: 200 }}
                  image={'http://localhost:8080/download/' + koira.kuva} />
                    :
                    <Typography sx={{ height: 100, width: 200 }}>Ei kuvaa</Typography>
                }
                  <Typography variant="subtitle2" fontSize="0.9rem" paddingTop='10px'>
                    Alkuperämaa: {koira.alkuperamaa}
                  </Typography>
                  <Typography variant="subtitle2" fontSize="0.9rem">
                    Korkeus: {koira.korkeus} cm
                  </Typography>
                  <Typography variant="subtitle2" fontSize="0.9rem">
                    Paino: {koira.paino} kg
                  </Typography>

                </CardContent>
                <CardActions>
                  <a href={koira.linkki} target="_blank" rel="noopener noreferrer">
                    Rotujärjestön sivut <OpenInNewIcon />
                  </a>
                  <ExpandMore
                    expand={isExpanded(koira.id)}
                    onClick={() => handleExpandClick(koira.id)}
                    aria-expanded={isExpanded(koira.id)}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>

                </CardActions>
                <Collapse in={isExpanded(koira.id)} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Kuvaus:</Typography>
                    <Typography paragraph>
                    {koira.kuvaus}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        ));

        return haku;
      } else {
        return <p>Haku ei tuottanut yhtään tulosta</p>;
      }
    }
  }


  return (
    <Paper sx={{ padding: '10px', margin: '10px' }}>
      <Box component='form' autoComplete='off'
        sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>

        <FormControl fullWidth sx={{paddingBottom: '20px'}}>
          <InputLabel id="koko-label">Koko</InputLabel>
          <Select
            labelId="koko-label"
            id="koko"
            name="koko"
            value={koko}
            onChange={muuta}
          >
            <MenuItem value="">
              <em>-- Valitse koko --</em>
            </MenuItem>
            <MenuItem value="pieni">Pieni</MenuItem>
            <MenuItem value="keskikokoinen">Keskikokoinen</MenuItem>
            <MenuItem value="suuri">Suuri</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{paddingBottom: '20px'}}>
          <InputLabel id="liikunnallisuus-label">Liikunnallisuus</InputLabel>
          <Select
            labelId="liikunnallisuus-label"
            id="liikunnallisuus"
            name="liikunnallisuus"
            value={liikunnallisuus}
            onChange={muuta}
          >
            <MenuItem value="">
              <em>-- Valitse liikunnallisuus --</em>
            </MenuItem>
            <MenuItem value="pieni">Pieni</MenuItem>
            <MenuItem value="kohtalainen">Kohtalainen</MenuItem>
            <MenuItem value="suuri">Suuri</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{paddingBottom: '20px'}}>
          <InputLabel id="seurallisuus-label">Seurallisuus</InputLabel>
          <Select
            labelId="seurallisuus-label"
            id="seurallisuus"
            name="seurallisuus"
            value={seurallisuus}
            onChange={muuta}
          >
            <MenuItem value="">
              <em>-- Valitse seurallisuus --</em>
            </MenuItem>
            <MenuItem value="itsenäinen">Itsenäinen</MenuItem>
            <MenuItem value="seurallinen">Seurallinen</MenuItem>
            <MenuItem value="erittäin seurallinen">Erittäin seurallinen</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{paddingBottom: '20px'}}>
          <InputLabel id="turkinhoito-label">Turkinhoito</InputLabel>
          <Select
            labelId="turkinhoito-label"
            id="turkinhoito"
            name="turkinhoito"
            value={turkinhoito}
            onChange={muuta}
          >
            <MenuItem value="">
              <em>-- Valitse turkinhoito --</em>
            </MenuItem>
            <MenuItem value="helppohoitoinen">Helppohoitoinen</MenuItem>
            <MenuItem value="kohtalainen">Kohtalainen</MenuItem>
            <MenuItem value="työläs">Työläs</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ textAlign: 'left', padding: '10px' }}>
          <Button onClick={hae} variant='contained' sx={{ marginRight: 3 }} startIcon={<SearchIcon />}>Hae</Button>
          <Button onClick={tyhjenna} variant='contained' color='secondary' startIcon={<ClearIcon />}>Tyhjennä</Button>
        </Box>


        {haeKoirat()}
      </Box>
    </Paper>
  );

}

export default KoiraLomake;
