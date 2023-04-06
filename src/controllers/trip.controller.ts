import express from "express";
import { AppDataSource } from "../dataSource";
import { Trip } from "../entities/Trip.entity";
const tripController = express.Router();

//Index
tripController.get("/", async (req, res) => {
  try {
    const data = await AppDataSource.createQueryBuilder(Trip, "trip").getMany();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Show
tripController.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AppDataSource.createQueryBuilder(Trip, "trip")
      .where("trip.id = :id", { id })
      .getOne();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Create
tripController.post("/", async (req, res) => {
  const { username, date, start_date, end_date, flight } = req.params;

  try {
    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Trip)
      .values({ username, date, start_date, end_date, flight })
      .execute();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Update
tripController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, flight } = req.body;
  try {
    const updatedTrip = await AppDataSource.createQueryBuilder()
      .update(Trip)
      .set({ start_date, end_date, flight })
      .where("id = :id", { id })
      .execute();
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Delete
tripController.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrip = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Trip)
      .where("id = :id", { id })
      .execute();
    res.json(deletedTrip);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

export default tripController;
