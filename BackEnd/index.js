const express = require("express");
const handler = require("./handler");
const path = require("path");
const port = process.env.PORT || 8001;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Route list Backend
app.get("/cars", handler.handleListcars);
app.get("/cars-size", handler.handleListSizecar);
app.post("/cars", handler.handleCreatecar);
app.get("/cars/:id", handler.handleGetcar);
app.put("/cars/:id", handler.handleUpdatecar);
app.delete("/cars/:id", handler.handleDeletecar);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
