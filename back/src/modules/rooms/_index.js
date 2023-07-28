import { readFileSync } from "fs";
import { join } from "path";
import listRooms from "./list-rooms.js";
import showRooms from "./show-rooms.js";
import addRooms from "./add-rooms.js";
import editRooms from "./edit-rooms.js";
import removeRooms from "./remove-rooms.js";

import { httpValidator } from "../../shared/http-validator/index.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src", "modules", "rooms", "_schema.gql"),
  "utf8"
);

const resolvers = {
  Query: {
    rooms: (_, { input }) => {
      return listRooms(input);
    },
    room: (_, { id }) => {
      return showRooms({ id });
    },
    rooms: (_, args) => {
      // console.log(listRooms(_, args));
      return listRooms(args);
    },
  },

  Mutation: {
    createRoom: (_, { input }) => {
      return addRooms(input);
    },
    updateRoom: (_, { id, input }) => {
      return editRooms({ id, ...input });
    },
    removeRoom: (_, { id }) => {
      return removeRooms({ id });
    },
  },
};

export default { typeDefs, resolvers };
