const express = require("express");
const handler = require("./handler");
const path = require("path");
const port = process.env.PORT || 8000;
const uploadOnMemory = require("./uploadOnMemory");
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');

// Router Frontend
app.get("/", handler.handleListCars);
// app.get("/cars-size", handler.handleListSizeCars);
app.get("/add-car", handler.handleAddCar);
app.post("/add-car",uploadOnMemory.single("image"), handler.handleInsertCar);
app.get("/edit-car/:id", handler.handleEditCar);
app.post("/update-car/:id", uploadOnMemory.single("image"), handler.handleUpdateCar);
app.get("/delete-car/:id", handler.handleDeleteCar);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
