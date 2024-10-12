import * as React from 'react';
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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


function KoiraLista() {

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

  const handleExpandClick = (id) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (koirat.length > 0) {
    return (
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {koirat.map(koira => {
          let kuva = encodeURIComponent(koira.kuva);
          const isExpanded = expandedMap[koira.id] || false;

          return (
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
                    expand={isExpanded}
                    onClick={() => handleExpandClick(koira.id)}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Kuvaus:</Typography>
                    <Typography paragraph>
                      {koira.kuvaus}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default KoiraLista;
