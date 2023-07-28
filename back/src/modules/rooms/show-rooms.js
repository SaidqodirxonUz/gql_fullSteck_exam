import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

const showRooms = async ({ id }) => {
  const rooms = await db("rooms").where({ id }).first();

  if (!rooms) {
    throw new NotFoundError("rooms not found");
  }

  return rooms;
};

export default showRooms;
