import { useState, useEffect } from "react";
import { CharacterDialog } from "./CharacterDialog";
import Card from "./Card";
import Pagination from "../Pagination/Pagination";
import FullLoader from "../ui/FullLoader";
import SearchInput from "../ui/SearchInput";
import FilmSelect from "../ui/FilmSelect";
import PlanetSelect from "../ui/PlanetSelect";
import GenderSelect from "../ui/GenerSelect";

export default function CharacterList() {

  //  Every page characters summa, (use when some filter is active).
  const [allCharacter, setAllCharacter] = useState([]);

  //List of characters (filtered by page or any conditions)
  const [characters, setCharacters] = useState(null);

  // Selected character
  const [selectedCharacter, setSelectedCharacter] = useState();

  //More detail dialog visible state
  const [modalVisible, setModalVisible] = useState(false);

  // Pagination component states
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  //Name filter
  const [filter, setFilter] = useState("");

  //Film filter
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedFilmCharacters, setSelectedFilmCharacters] = useState();

  // Plates filter
  const [selectedPlantes, setSelectedPlanets] = useState();
  const [selectedPlanetsCharacters, setSelectedPlanetsCharacter] = useState();

 //Gender filter
  const [selectedGender,setSelectedGender] = useState();


  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getAllCharacters = async () => {
    let allCharacters = [];
    let currentPage = 1;
    let totalPages = 1;
    while (currentPage <= 9) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SWAP_API}/api/people/?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP hiba! Állapotkód: ${response.status}`);
        }
        const responseData = await response.json();

        allCharacters = [...allCharacters, ...responseData.results];
        totalPages = Math.ceil(
          responseData.count / responseData.results.length
        );
        currentPage++;
      } catch (error) {
        console.error("Hiba történt:", error);
        break;
      }
    }
    setAllCharacter(allCharacters);
  };



  const filterByFilm = (characters, filmCharacters) => {
    const movieCharacterUrls = filmCharacters.map(
      (characterUrl) => characterUrl
    );
    return characters.filter((character) =>
      movieCharacterUrls.includes(character.url)
    );
  };



  const filterByName = (characters, name) => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  };



  const filterByPlanets = (characters, planetsCharacters) => {
    const planetCharacterUrls = planetsCharacters.map(
      (characterUrl) => characterUrl
    );
    return characters.filter((character) =>
      planetCharacterUrls.includes(character.url)
    );
  };



  const filterByGender = (characters) => {
    return characters.filter((character) =>
    character.gender.includes(selectedGender)
    );
  };

  const filterCharacters = (characters,name,filmCharacters,planetsCharacters) => {
    let filteredCharacters = [...characters];

    if (name) {
      filteredCharacters = filterByName(filteredCharacters, name);
    }

    if (selectedFilm != 0 && selectedFilm != null) {
      filteredCharacters = filterByFilm(filteredCharacters, filmCharacters);
    }

    if (selectedPlantes != 0 && selectedPlantes != null) {
      filteredCharacters = filterByPlanets(filteredCharacters,planetsCharacters);
    }

    if (selectedGender != null && selectedGender != "Select a gender") {
      filteredCharacters = filterByGender(filteredCharacters);
    }

    return filteredCharacters;
  };

  const getListByPageNumber = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_SWAP_API}/api/people/?page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP hiba! Állapotkód: ${response.status}`);
      }

      const responseData = await response.json();

      let filteredCharacters = responseData.results;

      if (
        filter != "" ||
        (selectedFilm != 0 && selectedFilm != null) ||
        (selectedPlantes != 0 && selectedPlantes != null) ||  (selectedGender != "Select a gender" && selectedGender != null)
      ) {
        filteredCharacters = filterCharacters(allCharacter,filter,selectedFilmCharacters,selectedPlanetsCharacters);
      }
      setCharacters(filteredCharacters);
    } catch (error) {
      console.error("Hiba történt:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  useEffect(() => {
    getListByPageNumber();
  }, [currentPage, filter, selectedFilm, selectedPlantes,selectedGender]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-gradient-to-b from-gray-600 via-gray-400 to-gray-200 px-10"
      style={{
        backgroundImage: 'url("/logo192.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="py-3 pb-6 w-full flex items-center">
          <div className="flex-grow ">
            <div className="grid grid-cols-3">
              <div className="col">
                <SearchInput
                  id="characterName"
                  label="Név kereső"
                  type="text"
                  disabled={false}
                  value={filter}
                  placeholder="Adja meg a karakter nevét"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="ml-4">
              <FilmSelect
                name="filmSelectName"
                value={selectedFilm}
                onChange={(e) => setSelectedFilm(e.target.value)}
                disabled={false}
                urlName="films"
                setSelectedFilmCharacters={setSelectedFilmCharacters}
              />
            </div>

       

            <div className="ml-4">
              <GenderSelect
                name="genderSelect"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                disabled={false}
             
              />
            </div>

            <div className="ml-4">
              <PlanetSelect
                name="planetSelectName"
                value={selectedPlantes}
                onChange={(e) => setSelectedPlanets(e.target.value)}
                disabled={false}
                urlName="planets"
                setSelectedPlanetsCharacter={setSelectedPlanetsCharacter}
              />
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 justify-center">
          {characters?.map((item) => (
            <Card
              key={item.url}
              starWarsItem={item}
              setSelectedCharacter={setSelectedCharacter}
              setModalVisible={setModalVisible}
            />
          ))}
        </ul>
      </div>
      <Pagination
        disabled={filter !== ""}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <CharacterDialog
        show={modalVisible}
        setShow={() => setModalVisible(false)}
        selectedCharacter={selectedCharacter}
        getListByPageNumber={getListByPageNumber}
      />
      <FullLoader loading={loading} />
    </div>
  );
}
