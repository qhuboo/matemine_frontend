import platform_data from "../../platform_data";

export default function SegaConsoles({
  selectedPlatforms,
  selectedSegaConsoles,
  setSelectedSegaConsoles,
}) {
  return (
    <div>
      <fieldset>
        <legend>Sega Consoles</legend>
        {platform_data.sega.map((option) => {
          return (
            <div key={option}>
              <input
                disabled={!selectedPlatforms.sega}
                type="checkbox"
                id={option}
                value={option}
                checked={selectedSegaConsoles.includes(option) === true}
                onChange={(event) => {
                  let newSelectedConsoles = [...selectedSegaConsoles];
                  if (newSelectedConsoles.includes(event.target.value)) {
                    newSelectedConsoles = newSelectedConsoles.filter(
                      (console) => console !== event.target.value
                    );
                  } else {
                    newSelectedConsoles.push(event.target.value);
                  }
                  setSelectedSegaConsoles(newSelectedConsoles);
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
