const GenderSelect = (props) => {
    const list = ["Select a gender", "male", "female", "n/a"];
  
    return (
      <div>
        <div className="col relative basis-64">
          <select
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={(e) => props.onChange(e)}
            disabled={props.disabled}
            className="block w-full py-3 rounded-md bg-gradient-to-r from-indigo-100 to-indigo-400 italic font-semibold text-gray-700 border-2 border-gray-400 px-4 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600  disabled:cursor-not-allowed disabled:bg-stone-200 disabled:opacity-50 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          >
            {list.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default GenderSelect;