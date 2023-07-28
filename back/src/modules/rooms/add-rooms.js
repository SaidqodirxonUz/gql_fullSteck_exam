import db from "../../db/index.js";

const addRooms = async (payload) => {
  const result = await db("rooms").insert(payload).returning("*");

  return result[0];
};

export default addRooms;
