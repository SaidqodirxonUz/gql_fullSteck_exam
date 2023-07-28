import bcrypt from "bcryptjs";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rooms").del();
  await knex("rooms").insert([
    {
      // id:1,
      name: "Uzum",
      floor: "1",
      for_stuff: false,
    },
    {
      // id:2,
      name: "Adminstrator",
      floor: "2",
      for_stuff: true,
    },
    {
      // id: 3
      name: "Microsoft",
      floor: "3",
      for_stuff: false,
    },
    {
      // id:4,
      name: "Facebook",
      floor: "3",
      for_stuff: false,
    },
    {
      // id:5,
      name: "Twitter",
      floor: "3",
      for_stuff: false,
    },
    {
      // id:6,
      name: "Abutech",
      floor: "3",
      for_stuff: false,
    },
    {
      // id:7,
      name: "Xodimlar",
      floor: "3",
      for_stuff: true,
    },
    {
      // id:8,
      name: "Moliya bolimi",
      floor: "3",
      for_stuff: true,
    },
    {
      // id:9,
      name: "Kassa",
      floor: "3",
      for_stuff: true,
    },
    {
      // id:10,
      name: "O'quv ishlari ",
      floor: "3",
      for_stuff: true,
    },
  ]);
};

// id: ,increment           (Xonaning DBdagi idsi,)
// name: string            (Xonaning nomi)
// floor: integer            (Xonaning nechinchi qavatda ekanligi)
// for_stuff: boolean    (Agar true  bo’lsa xona Najot Ta’lim xodimlari uchun.)
