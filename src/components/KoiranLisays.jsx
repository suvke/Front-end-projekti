import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputLabel, MenuItem } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { Form, redirect } from 'react-router-dom';
import { addKoira } from './koirat';

export async function LomakeAction({ request }) {
  // pyydetään form-data muuttujaan
  const formData = await request.formData();
  // välitetään data tietokantakäsittelijälle
  const response = await addKoira(formData);

  if (response.status === 400) {
    throw Error(response.message);
  }

  return redirect('/lista');
}

// Lisää Form
// Poista Boxista form
// Poista painikkeesta onClick ja laita submit

function KoiranLisays() {

  const [koira, setValues] = useState({
    rotu: '',
    alkuperamaa: '',
    korkeus: '',
    paino: '',
    koko: '',
    liikunnallisuus: '',
    seurallisuus: '',
    turkinhoito: '',
    linkki: '',
    kuva: [],
    kuvaus: '',
  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setValues({
      ...koira,
      [e.target.name]: e.target.value
    });

    setViesti('');
  };

  const muutaKuva = (e) => {

    setValues({
      ...koira,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

  const tyhjenna = () => {

    setValues({
        rotu: '',
        alkuperamaa: '',
        korkeus: '',
        paino: '',
        koko: '',
        liikunnallisuus: '',
        seurallisuus: '',
        turkinhoito: '',
        linkki: '',
        kuva: '',
        kuvaus: '',
    });

    setViesti('');
  }

  let kuvaNimi = '';
  if (koira.kuva !== null) {
    kuvaNimi = koira.kuva.name;
  }

  // FORM lisää
  // BOXista pois component='form'
  // Button type='submit'
    return (
        <Paper sx={{ padding: '10px', margin: '10px' }}>

        {/* jos viedään kuvia tarvitaan encType=multipart*/}
        <Form action='uusi' method='post' encType='multipart/form-data'>
          <Box sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>

            <TextField label='Rotu' name='rotu' value={koira.rotu}
              onChange={muuta} required fullWidth autoFocus />

            <TextField label='Alkuperämaa' id='alkuperamaa' name='alkuperamaa' value={koira.alkuperamaa}
              onChange={muuta} required fullWidth />
              
            <TextField label='Korkeus' name='korkeus' value={koira.korkeus}
              onChange={muuta} required fullWidth />

            <TextField label='Paino' name='paino' value={koira.paino}
              onChange={muuta} required fullWidth />

            <TextField label='Koko' name='koko' value={koira.koko} onChange={muuta} required fullWidth select>
              <MenuItem value='pieni'>Pieni</MenuItem>
              <MenuItem value='keskikokoinen'>Keskikokoinen</MenuItem>
              <MenuItem value='suuri'>Suuri</MenuItem>
            </TextField>

            <TextField label='Liikunnallisuus' name='liikunnallisuus' value={koira.liikunnallisuus} onChange={muuta} required fullWidth select>
              <MenuItem value='pieni'>Pieni</MenuItem>
              <MenuItem value='kohtalainen'>Kohtalainen</MenuItem>
              <MenuItem value='suuri'>Suuri</MenuItem>
            </TextField>

            <TextField label='Seurallisuus' name='seurallisuus' value={koira.seurallisuus} onChange={muuta} required fullWidth select>
              <MenuItem value='itsenäinen'>Itsenäinen</MenuItem>
              <MenuItem value='seurallinen'>Seurallinen</MenuItem>
              <MenuItem value='erittäin seurallinen'>Erittäin seurallinen</MenuItem>
            </TextField>

            <TextField label='Turkinhoito' name='turkinhoito' value={koira.turkinhoito} onChange={muuta} required fullWidth select>
              <MenuItem value='helppohoitoinen'>Helppohoitoinen</MenuItem>
              <MenuItem value='kohtalainen'>Kohtalainen</MenuItem>
              <MenuItem value='työläs'>Työläs</MenuItem>
            </TextField>

            <TextField label='Linkki' name='linkki' value={koira.linkki}
              onChange={muuta} required fullWidth />

            <input accept='image/*' name='kuva' id='kuva' type='file'
              onChange={muutaKuva} hidden />

            <InputLabel htmlFor='kuva'>
              <Typography sx={{ display: 'inline' }}>Kuva</Typography>
              <Button component='span'>
                <AttachmentIcon />
              </Button>
              <Typography sx={{ display: 'inline' }}>{kuvaNimi}</Typography>
            </InputLabel>

            <TextField label='Kuvaus' name='kuvaus' value={koira.kuvaus}
              onChange={muuta} required fullWidth />

          <Box sx={{ textAlign: 'center' }}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Lisää</Button>
            <Button onClick={tyhjenna} variant='contained' color='secondary' startIcon={<ClearIcon />}>Tyhjennä</Button>
          </Box>
        </Box>
      </Form>

      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>

    </Paper>
  );
}

export default KoiranLisays;