import { useState, useEffect } from "react";

const FilmSelect = (props) => {
  const [list, setList] = useState([]);

  const handleFilmChange = (e) => {
    const selectedFilmValue = e.target.value;
    const selectedFilm = list.find(
      (film) => film.episode_id == selectedFilmValue
    );

    if (selectedFilm) {
      props.setSelectedFilmCharacters(selectedFilm.characters || []);
    }

    props.onChange(e);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SWAP_API}/api/${props.urlName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP hiba! Állapotkód: ${response.status}`);
      }

      const responseData = await response.json();

      const formattedData = [
        { label: "Select a movie", value: 0 },
        ...responseData.results.map((item) => ({
          ...item,
          label: item["title"],
          value: item["episode_id"],
        })),
      ];
      setList(formattedData);
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  return (
    <div>
      <div className="col relative basis-64 ">
        <select
          id={props.id}
          name={props.name}
          value={list.find((p) => p.value === props.value)}
          onChange={handleFilmChange}
          disabled={props.disabled}
          className="block w-full py-3 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-400 italic font-semibold text-gray-700 border-2 border-gray-400 px-4 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600  disabled:cursor-not-allowed disabled:bg-stone-200 disabled:opacity-50 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        >
          {list.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilmSelect;
