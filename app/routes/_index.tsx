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

  return (
    <div className="max-w-96 place-items-center w-full min-h-screen mx-auto bg-slate-200 flex flex-col">
      <h1 className="text-4xl font-semibold text-center pt-12">
        Harry Potter Character Search
      </h1>
      <div className="pt-6">
        <ul className="flex flex-col justify-center mx-auto max-w-[22rem]">
          {character.map((char) => (
            <li key={char.id} className=" px-6">
              <p className="text-xl">
                <span className="font-semibold">Name: </span>
                {char.character}
              </p>
              <p className="text-xl">
                <span className="font-semibold">House: </span>
                {char.hogwartsHouse}
              </p>
              <p className="pb-6 text-xl">
                <span className="font-semibold">Played By: </span>
                {char.interpretedBy}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
