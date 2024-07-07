import platform_data from "../../platform_data";

export default function NintendoConsoles({
  selectedPlatforms,
  selectedNintendoConsoles,
  setSelectedNintendoConsoles,
}) {
  return (
    <div>
      <fieldset>
        <legend>Nintendo Consoles</legend>
        {platform_data.nintendo.map((option) => {
          return (
            <div key={option}>
              <input
                disabled={!selectedPlatforms.nintendo}
                type="checkbox"
                id={option}
                value={option}
                checked={selectedNintendoConsoles.includes(option) === true}
                onChange={(event) => {
                  let newSelectedConsoles = [...selectedNintendoConsoles];
                  if (newSelectedConsoles.includes(event.target.value)) {
                    newSelectedConsoles = newSelectedConsoles.filter(
                      (console) => console !== event.target.value
                    );
                  } else {
                    newSelectedConsoles.push(event.target.value);
                  }
                  setSelectedNintendoConsoles(newSelectedConsoles);
                }}
              />
              <label htmlFor={option}> {option}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
