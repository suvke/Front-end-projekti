const express = require('express');
const app = express();

let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }))

app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('koirat.db', (error) => {
    if (error) {
        console.log(error.message);
        return res.status(400).json({ message: 'Kantaa ei voida avata' });
    }
});

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Toimii' });
});

//haetaan kaikki koirat tietokannasta
app.get('/koira/all', (req, res) => {
    db.all('select * from koira', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

//haetaan yksi koira tietokannasta id:n perusteella
app.get('/koira/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from koira where id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        // Jos haku ei tuottanut yhtään riviä
        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Haettua koiraa ei ole' });
        }

        return res.status(200).json(result);
    });
});

app.get('/koira/kuvat', (req, res) => {
    db.all('select kuva from koira where kuva IS NOT NULL', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

//koiran poistaminen tietokannasta
app.delete('/koira/delete/:id', (req, res) => {
    let id = req.params.id;

    // Huomaa, että ei nuolinotaatiofunktioina kuten muissa kohdassa
    db.run('delete from koira where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Ei poistettavaa');
            return res.status(404).json({ message: 'Ei poistettavaa koiraa' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); // Mihin kansioon ladataan
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);  // Millä tiedostonimellä
    }
});

const upload = multer({ storage: storage })

//uuden koiran lisääminen tietokantaan
app.post('/koira/add', upload.single('kuva'), (req, res) => {
    let koira = req.body;

    let kuvaNimi = null;
    if (req.file) {
        kuvaNimi = req.file.originalname;
    }

    db.run('insert into koira (rotu,alkuperamaa,korkeus,paino,koko,liikunnallisuus,seurallisuus,turkinhoito,linkki,kuva,kuvaus) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [koira.rotu, koira.alkuperamaa, koira.korkeus, koira.paino, koira.koko, koira.liikunnallisuus, koira.seurallisuus, koira.turkinhoito, koira.linkki, kuvaNimi, koira.kuvaus], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

//kuvan hakeminen tietokannasta
app.get('/download/:nimi', (req, res) => {
    let file = './images/' + req.params.nimi;
    res.download(file);
});

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});
