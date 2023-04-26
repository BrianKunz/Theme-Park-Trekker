import { Request as ExpressRequest } from "express";
import { User } from "../entities/User.entity";

export type Request = ExpressRequest & { user?: User };
