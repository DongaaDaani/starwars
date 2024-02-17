export default function Card(props) {
  return (
    <div
      key={props.starWarsItem.url}
      className="relative overflow-hidden rounded-lg shadow-xl bg-white transition duration-300 transform hover:scale-105"
    >
      <div
        onClick={() => {
          props.setModalVisible(true);
          props.setSelectedCharacter(props.starWarsItem);
        }}
        className="p-6 cursor-pointer bg-gradient-to-r from-gray-900 to-indigo-600 text-white rounded-t-lg"
      >
        <img
          src={process.env.PUBLIC_URL + "/card-icon2.png"}
          alt="Card Icon"
          className="w-16 h-16 mx-auto mb-4"
        />

        <h3 className="text-lg font-semibold italic mb-2">
          {props.starWarsItem?.name}
        </h3>
        <p className="text-sm font-semibold italic">
          {props.starWarsItem?.height} cm
        </p>
      </div>
    </div>
  );
}
