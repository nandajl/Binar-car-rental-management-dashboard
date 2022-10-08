const axios = require('axios');
const uploadOnMemory = require("./uploadOnMemory");
const cloudinary = require("./cloudinary");

async function handleListCars(req, res) {
  try {
    const cars = await axios.get('http://localhost:8001/cars');
    // console.log(cars.data);
    res.render('index', cars.data);
  } catch (error) {
    res.status(400).json("Error")
    
  }
}
async function handleListSizeCars(req, res) {
  try {
    const query = req.query.size
    query.size = query
    const cars = await axios.get(`http://localhost:8001/cars-size?size=${query}`, query);
    console.log("cars ",cars.data);
    res.render('index'), cars.data;
  } catch (error) {
    res.status(400).json(error)
    
  }
}

function handleAddCar(req, res) {
  res.render('add-car', {title:"Add New Car"});
}


function handleInsertCar(req, res) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, async function (err, result) {
        if (!!err) {
            console.log(err);
            return res.status(400).json({
                message: "Gagal upload file!",
            });
        }

        const body = req.body;
        body.image = result.url;
        try {
            const cars = await axios.post('http://localhost:8001/cars', body);
            return res.redirect("/")
        } catch (err) {
            return res.status(500).json(err)
        }
    });
}

async function handleEditCar(req, res) {
  try {
    
    console.log(req.url);
    const id = req.params.id;
    const cars = await axios.get(`http://localhost:8001/cars/${id}`);
    res.render('edit-car', cars.data)
  } catch (err) {
      res.status(500).json(err)
  }
}

function handleUpdateCar(req, res) {
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, async function (err, result) {
      if (!!err) {
          console.log(err);
          return res.status(400).json({
              message: "Gagal upload file!",
          });
      }
      const id = req.params.id;
      const body = req.body;
      body.image = result.url;
      try {
          const cars = await axios.put(`http://localhost:8001/cars/${id}`, body);
          return res.redirect("/")
      } catch (err) {
          return res.status(500).json(err)
      }
  });
}

async function handleDeleteCar(req, res) {
  try {
    const id = req.params.id;
    const cars = await axios.delete(`http://localhost:8001/cars/${id}`);
    res.redirect("/")
  } catch (err) {
      res.status(500).json(err)
}
}





module.exports = {
  handleListCars,
  handleAddCar,
  handleUpdateCar,
  handleInsertCar,
  handleEditCar,
  handleUpdateCar, 
  handleDeleteCar,
  handleListSizeCars
};
