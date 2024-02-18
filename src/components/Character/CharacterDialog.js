import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../ui/Button";
import FullLoader from "../ui/FullLoader";
import DialogItem from "../ui/DialogItem";

export function CharacterDialog(props) {
  const cancelButtonRef = useRef(null);
  const [films, setFilms] = useState([]);
  const [homeworld, setHomeworld] = useState({});
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (props.selectedCharacter) {
      setLoading(true);
      const fetchFilms = async () => {
        try {
          const filmPromises = props.selectedCharacter.films.map(
            async (filmUrl) => {
              const filmResponse = await fetch(filmUrl);
              if (filmResponse.ok) {
                const filmData = await filmResponse.json();
                return filmData.title;
              } else {
                throw new Error(
                  `Film lekérdezési hiba! Állapotkód: ${filmResponse.status}`
                );
              }
            }
          );

          const films = await Promise.all(filmPromises);
          setFilms(films);
        } catch (error) {
          console.error("Hiba történt a filmek lekérdezésekor:", error);
        }
      };

      const fetchHomeworld = async () => {
        try {
          const homeworldResponse = await fetch(
            props.selectedCharacter.homeworld
          );
          if (homeworldResponse.ok) {
            const homeworldData = await homeworldResponse.json();
            setHomeworld({
              name: homeworldData.name,
              climate: homeworldData.climate,
              terrain: homeworldData.terrain,
            });
          } else {
            throw new Error(
              `Homeworld lekérdezési hiba! Állapotkód: ${homeworldResponse.status}`
            );
          }
        } catch (error) {
          console.error("Hiba történt a homeworld lekérdezésekor:", error);
        }
      };

      Promise.all([fetchFilms(), fetchHomeworld()])
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Hiba történt a lekérdezések során:", error);
          setLoading(false);
        });
    }
  }, [props.selectedCharacter]);

  if (!loading) {
    return (
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={props.setShow}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-lg" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg p-8 w-full max-w-2xl mx-auto my-8">
                <div className="flex items-center justify-center">
                  <img
                    src={process.env.PUBLIC_URL + "/card-icon2.png"}
                    alt="Card Icon"
                    className="w-16 h-16 mx-auto mb-4 rounded-full"
                  />
                </div>
                <div className="text-center mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-semibold text-gray-800"
                  >
                    Star Wars Character Details
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <DialogItem
                        label="Name"
                        value={props.selectedCharacter?.name}
                        backgroundColor="bg-indigo-400"
                      />
                      <DialogItem
                        label="Height"
                        value={`${props.selectedCharacter?.height} cm`}
                        backgroundColor="bg-indigo-400"
                      />
                      <DialogItem
                        label="Birth Year"
                        value={props.selectedCharacter?.birth_year}
                        backgroundColor="bg-indigo-400"
                      />
                      <DialogItem
                        label="Mass"
                        value={`${props.selectedCharacter?.mass} kg`}
                        backgroundColor="bg-indigo-400"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="text-center mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold text-gray-800"
                      >
                        Homeworld Details
                      </Dialog.Title>
                      <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <DialogItem
                            label="Name"
                            value={homeworld.name}
                            backgroundColor="bg-green-200"
                          />
                          <DialogItem
                            label="Climate"
                            value={homeworld.climate}
                            backgroundColor="bg-green-200"
                          />
                          <DialogItem
                            label="Terrain"
                            value={homeworld.terrain}
                            backgroundColor="bg-green-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="text-center mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold text-gray-800"
                      >
                        Films
                      </Dialog.Title>
                      <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          {films.map((film, index) => (
                            <DialogItem
                              key={index}
                              label={film}
                              value={film}
                              backgroundColor="bg-blue-200"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={() => props.setShow}
                    formValid={true}
                    label="Cancel"
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  } else {
    return <FullLoader loading={true} />;
  }
}
