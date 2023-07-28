import db from "../../db/index.js";

const listRooms = async (payload) => {
  try {
    const {
      q,
      offset = 0,
      limit = 5,
      sort = { by: "id", order: "ASC" },
    } = payload.input;

    const dbQuery = db("rooms").select("id", "name", "floor", "for_stuff");

    if (q) {
      dbQuery.where("name", "ilike", `%${q}%`);
    }

    const total = await dbQuery.clone().count().groupBy("id");
    dbQuery.orderBy(
      sort.by == "FLOOR" ? "floor" : "id",
      sort.order == "ASC" ? "asc" : "desc"
    );
    dbQuery.limit(limit).offset(offset);

    const rooms = await dbQuery;

    return { list: rooms, total: total.length, limit, offset };
  } catch (error) {
    return error;
  }
};

export default listRooms;
