
const DialogItem = ({ label, value, backgroundColor }) => {
  return (
    <span
      className={`rounded-full ${backgroundColor} p-4 hover:${backgroundColor.replace(
        'bg',
        'hover:bg'
      )} transition duration-300 cursor-pointer`}
    >
      {label}: {value}
    </span>
  );
};

export default DialogItem;