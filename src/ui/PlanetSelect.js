import { useState, useEffect } from "react";
const PlanetSelect = (props) => {
  const [list, setList] = useState([]);

  const handlePlanetChange = (e) => {
    const selectedFilmValue = e.target.value;
    const selectedFilm = list.find((film) => film.value == selectedFilmValue);

    if (selectedFilm) {
      props.setSelectedPlanetsCharacter(selectedFilm.residents || []);
    }

    props.onChange(e);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let allPlanets = [{ name: "Select a planet", value: 0, residents: [] }];

    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= 6) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SWAP_API}/api/planets/?page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error(`HTTP hiba! Állapotkód: ${response.status}`);
        }

        const responseData = await response.json();

        const planetsWithIds = responseData.results.map((planet) => {
          const parts = planet.url.split("/");
          const planetId = parts[parts.length - 2];

          return {
            name: planet.name,
            value: parseInt(planetId),
            residents: planet.residents,
          };
        });

        allPlanets = [...allPlanets, ...planetsWithIds];
        totalPages = Math.ceil(
          responseData.count / responseData.results.length
        );
        currentPage++;
      } catch (error) {
        console.error("Hiba történt:", error);
        break;
      }
    }
    setList(allPlanets);
  };

  return (
    <div>
      <div className="col relative basis-64 ">
        <select
          id={props.id}
          name={props.name}
          value={list.find((p) => p.value === props.value)}
          onChange={handlePlanetChange}
          disabled={props.disabled}
          className="block w-full py-3 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-400 italic font-semibold text-gray-700 border-2 border-gray-400 px-4 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600  disabled:cursor-not-allowed disabled:bg-stone-200 disabled:opacity-50 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        >
          {list.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlanetSelect;
