import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Harry Potter Characters" },
    { name: "description", content: "Welcome to Hogwarts" },
  ];
};

export const loader = async () => {
  const res = await fetch(
    "https://harry-potter-api-en.onrender.com/characters"
  );

  const character = await res.json();
  return json(character);
};

export default function Index() {
  const character = useLoaderData<typeof loader>();

  const houseColor = () => {
    character.filter((char: any) => {
      if (char.hogwartsHouse === "Gryffindor") {
        return "bg-red-900";
      } else if (char.hogwartsHouse === "Slytherin") {
        return "bg-emerald-900";
      } else if (char.hogwartsHouse === "Ravenclaw") {
        return "bg-blue-900";
      } else {
        return "bg-yellow-700";
      }
    });
  };

  const houseColors = {
    Gryffindor: "bg-red-900",
    Slytherin: "bg-emerald-900",
    Ravenclaw: "bg-blue-900",
    Hufflepuff: "bg-yellow-700",
  };

  return (
    <div className="flex justify-center items-center w-full max-w-4xl min-h-screen mx-auto">
      <ul className="grid grid-cols-4 gap-4 p-4 w-full ">
        {character.map((char: any) => (
          <li
            key={char.id}
            className={`${
              char.hogwartsHouse === "Gryffindor"
                ? "bg-gradient-to-r from-black/90 to-red-900"
                : char.hogwartsHouse === "Slytherin"
                ? "bg-gradient-to-r from-black/90 to-emerald-900"
                : char.hogwartsHouse === "Ravenclaw"
                ? "bg-gradient-to-r from-black/90 to-blue-900"
                : char.hogwartsHouse === "Hufflepuff"
                ? "bg-gradient-to-r from-black/90 to-amber-500"
                : "bg-neutral-500"
            } max-w-44 p-4 w-full group rounded-2xl shadow-xl hover:scale-105`}
          >
            <img
              src={char.image}
              alt="Character Image"
              className=" rounded-2xl object-cover w-full h-[250px] shadow-lg"
            />
            <div className="">
              <div className="w-40">
                <p className="text-xl text-white">
                  <span className="font-semibold">Name: </span>
                  {char.nickname}
                </p>
                <div className="text-white/75">
                  <p className="">
                    <span className="font-semibold">House: </span>
                    {char.hogwartsHouse}
                  </p>
                  <p className="">
                    <span className="font-semibold">Played By: </span>
                    {char.interpretedBy}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
