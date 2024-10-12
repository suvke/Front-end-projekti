const sqlite3 = require('sqlite3').verbose();
//luodaan tietokanta
const db = new sqlite3.Database('koirat.db');

//luodaan taulu tietokantaan
db.serialize( () => {

	let sql = "CREATE TABLE koira (" +
			"id integer PRIMARY KEY NOT NULL, " +
			"rotu text NOT NULL, " +
			"alkuperamaa text NOT NULL, " +
			"korkeus integer NOT NULL, " +
			"paino integer NOT NULL, " +
            "koko text NOT NULL, " +
            "liikunnallisuus text NOT NULL, " +
            "seurallisuus text NOT NULL, " +
            "turkinhoito text NOT NULL, " +
            "linkki text NOT NULL, " +    
			"kuva text, " +
			"kuvaus text )";

	db.run(sql, (error) => {
		if (error) {
			return console.log(error.message);
		}
		console.log("Taulu tehtiin");
	}); 

	//lisätään uusia tietueita eli koirarotuja tietokantaan
	sql = "INSERT INTO `koira` (`id`, `rotu`, `alkuperamaa`, `korkeus`, `paino`, `koko`, `liikunnallisuus`, `seurallisuus`, `turkinhoito`, `linkki`, `kuva`, `kuvaus`) " +
	" VALUES (1, 'shetlanninlammaskoira', 'Iso-Britannia', '35', '10', 'pieni', 'kohtalainen', 'erittäin seurallinen', 'kohtalainen', 'https://www.shetlanninlammaskoirat.fi/', 'sheltti.jpg', 'Shetlanninlammaskoira eli sheltti on pieni paimenkoira, joka soveltuu moneen käyttötarkoitukseen, kuten lemmikiksi, agilityyn, tokoon, paimennukseen ja näyttelyihin.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `koira` (`id`, `rotu`, `alkuperamaa`, `korkeus`, `paino`, `koko`, `liikunnallisuus`, `seurallisuus`, `turkinhoito`, `linkki`, `kuva`, `kuvaus`) " +
	" VALUES (2, 'kultainennoutaja', 'Iso-Britannia', '50', '30', 'suuri', 'kohtalainen', 'erittäin seurallinen', 'kohtalainen', 'https://www.goldenring.fi/', 'kultainennoutaja.jpg', 'Kultainennoutaja on keskikokoinen, älykäs, miellyttämisenhaluinen ja toiminnanhaluinen koira. Alunperin se on jalostettu metsästyskoiraksi eli ammutun pienriistan noutajaksi. Kultaisen rodunomaiset ominaisuudet tekevät siitä hyvän harrastuskoiran moniin eri lajeihin. Kultainen ei ole pelkkä seurakoira, vaan se kaipaa paljon liikuntaa sekä ohjattua toimintaa.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `koira` (`id`, `rotu`, `alkuperamaa`, `korkeus`, `paino`, `koko`, `liikunnallisuus`, `seurallisuus`, `turkinhoito`, `linkki`, `kuva`, `kuvaus`) " +
	" VALUES (3, 'villakoira', 'Ranska', '40', '25', 'keskikokoinen', 'suuri', 'erittäin seurallinen', 'työläs', 'https://villakoirakerho.com/', 'villakoira.jpg', 'Villakoira on luonteeltaan iloinen ja vilkas. Se nauttii keskipisteenä olemisesta. Lisäksi villakoira on miellyttämisenhaluinen ja oppimiskykyinen. Villakoira pitää toiminnasta ja se sopii monipuoliseen harrastustoimintaan.')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

    sql = "INSERT INTO `koira` (`id`, `rotu`, `alkuperamaa`, `korkeus`, `paino`, `koko`, `liikunnallisuus`, `seurallisuus`, `turkinhoito`, `linkki`, `kuva`, `kuvaus`) " +
	" VALUES (4, 'novascotiannoutaja', 'Kanada', '45', '20', 'keskikokoinen', 'suuri', 'erittäin seurallinen', 'helppohoitoinen', 'https://www.tollerit.fi/', 'tolleri.jpg', 'Novascotiannoutaja on erittäin monikäyttöinen ja aktiivinen koira, jonka kanssa voit puuhata melkeinpä mitä tahansa. Metsästyksen sekä taipumus- ja metsästyskokeiden lisäksi tolleri soveltuu moneen muuhunkin lajiin harrastuskaveriksi. Olitpa sitten kiinnostunut mejästä, tottelevaisuuskokeista, rally-tokosta, agilitystä, pk-kokeista, vesipelastuksesta tai näyttelyistä, saat tollerista innokkaan seuralaisen. ')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});



	db.each("SELECT id, rotu FROM koira", function(err, row) {
		if (err) {
			return console.log(err.message);
		}
		console.log(row.id + ", " + row.rotu);
	});

	db.close();
});
