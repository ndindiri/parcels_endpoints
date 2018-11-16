const Joi = require('joi');
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
const parcels = [
       {id: 1, NameOfUser:'John', NameOfParcels: 'Parcel 1', CountryFrom: 'Rwanda', DeliveryCountry: 'Kenya', Weigth: '2kg', Heigh: '3cm', Width: '5cm', Length: '4cm' },
       {id: 2, NameOfUser:'Peter', NameOfParcels: 'Parcel 2',CountryFrom: 'Burundi', DeliveryCountry: 'Tanzanie', Weigth: '1.5kg', Heigh: '2.5cm', Width: '2.5cm', Length: '2cm'},
       {id: 3, NameOfUser:'Luck', NameOfParcels: 'Parcel 3',CountryFrom: 'Zambia', DeliveryCountry: 'Benin', Weigth: '1kg', Heigh: '8cm', Width: '3cm', Length: '3cm'},
       {id: 4, NameOfUser:'Cris', NameOfParcels: 'Parcel 4',CountryFrom: 'Angola', DeliveryCountry: 'Togo', Weigth: '3kg', Heigh: '4cm', Width: '6cm', Length: '10cm'},
];

app.get(['/', '/index.html' ], (req, res) =>{
 
  res.render('index.ejs');
 });
// To Get All parcels 
app.get('/sendIT/parcels', (req, res) =>{
	res.send(parcels);
});

// To Post on parcels

app.post('/sendIT/parcels', (req, res) =>{

	const {error} = validateParcel(req.body); //result.error

     if (error) return res.status(400).send(error.details[0].message);
   
	const parcel = {
		        id: parcels.length + 1,
		NameOfUser: req.body.NameOfUser,
    NameOfParcel: req.body.NameOfParcel,
    CountryFrom: req.body.CountryFrom,
    DeliveryCountry: req.body.DeliveryCountry,
    Weigth: req.body.Weigth,
    Heigh: req.body.Heigh, 
    Width: req.body.Width, 
    Length: req.body.Length
	};
	parcels.push(parcel);
	res.send(parcel);
});
 //Update Data
app.put('/sendIT/parcels/:id', (req, res) =>{
	
  // Look up the parcel
    //If not existing then return 404

    const parcel = parcels.find(p => p.id === parseInt(req.params.id));
     if (!parcel) return res.status(404).send('The parcel with the the the given Id was not found');
 
     //Validte pp
     //If invalid, return 400 - Bad request
     
     const {error} = validateParcel(req.body); //result.error
     if (error) return res.status(400).send(error.details[0].message);
     //Update parcel

    parcel.NameOfUser = req.body.NameOfUser;
    parcel.NameOfParcl = req.body.NameOfParcel;
    parcel.CountryFrom = req.body.CountryFrom;
    parcel.DeliveryCountry = req.body.DeliveryCountry;
    parcel.Weigth = req.body.Weigth;
    parcel.Heigh = req.body.Heigh; 
    parcel.Width = req.body.Width; 
    parcel.Length = req.body.Length;

     //Return the update parcel

     res.send(parcel);
});

app.delete('/sendIT/parcels/:id', (req, res) =>{
	
    //Look up the parcel
    //Not existing then return 404
    
     const parcel = parcels.find(p => p.id === parseInt(req.params.id));
     if (!parcel) return res.status(404).send('The parcel with the the the given Id was not found');
     
    //Delete
     
     const index =parcels.indexOf(parcel);
     parcels.splice(index, 1);

    //Return the same parcel

    res.send(parcel);
});

 function validateParcel(parcel){
 	const schema = {
       NameOfUser: Joi.string().min(4).required()
	};
	return Joi.validateparcel, (schema);
 }

//To Get Single parcels /sendIT/parcels/1

app.get('/sendIT/parcels/:id', (req, res) =>{

const parcel = parcels.find(p => p.id === parseInt(req.params.id));
if (!parcel) return res.status(404).send('The parcel with the the the given Id was not found');
res.send(parcel);
});

//To Get Single parcels GET /sendIT/users/<userId>/parcels

app.get('/sendIT/users/:id', (req, res) =>{

const parcel = parcels.find(p => p.id === parseInt(req.params.id));
if (!parcel) return res.status(404).send('The parcel with the the the given Id was not found');
res.send(parcel);
});


//PORT 
const port = (process.env.PORT || 3000);

app.listen(3000, () => console.log(`listening on port ${port}...`));
