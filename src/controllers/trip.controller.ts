import express, { Request } from "express";
import { AppDataSource } from "../dataSource";
import { Trip } from "../entities/Trip.entity";
import { User } from "../entities/User.entity";
import { CustomSessionData } from "../../global";

const tripController = express.Router();

//Index
tripController.get("/", async (_, res) => {
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
tripController.post("/", async (req: Request, res) => {
  const { title, date, start_date, end_date, flight } = req.body;
  const currentUser = (req.session as CustomSessionData).user;
  console.log(currentUser); // Log the current user to the console
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne(currentUser);

  if (!user) {
    throw new Error("User not found");
  }

  const trip = new Trip();
  trip.title = title;
  trip.date = date;
  trip.start_date = start_date;
  trip.end_date = end_date;
  trip.flight = flight;
  trip.user = user;

  try {
    const data = await AppDataSource.createQueryBuilder()
      .insert()
      .into(Trip)
      .values({
        user: currentUser ? { id: currentUser.id } : undefined,
        title,
        date,
        start_date,
        end_date,
        flight,
      })
      .execute();
    res.json(data);
  } catch (error) {
    res.status(500).json(JSON.stringify(error));
  }
});

//Update
tripController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date, flight } = req.body;
  try {
    const updatedTrip = await AppDataSource.createQueryBuilder()
      .update(Trip)
      .set({ title, start_date, end_date, flight })
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
