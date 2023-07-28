import db from "../../db/index.js";
import { NotFoundError } from "../../shared/errors/index.js";

const removeRooms = async ({ id }) => {
  const result = await db("rooms").where({ id }).first();

  if (!result) {
    throw new NotFoundError("rooms not found");
  }

  return (await db("rooms").where({ id }).delete().returning("*"))[0];
};

export default removeRooms;
