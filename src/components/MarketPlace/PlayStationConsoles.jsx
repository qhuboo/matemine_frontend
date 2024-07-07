import platform_data from "../../platform_data";

export default function PlayStationConsoles({
  selectedPlatforms,
  selectedPlayStationConsoles,
  setSelectedPlayStationConsoles,
}) {
  return (
    <div>
      <fieldset>
        <legend>PlayStation Consoles</legend>
        {platform_data.playstation.map((option) => {
          return (
            <div key={option}>
              <input
                disabled={!selectedPlatforms.playstation}
                type="checkbox"
                id={option}
                value={option}
                checked={selectedPlayStationConsoles.includes(option) === true}
                onChange={(event) => {
                  let newSelectedConsoles = [...selectedPlayStationConsoles];
                  if (newSelectedConsoles.includes(event.target.value)) {
                    newSelectedConsoles = newSelectedConsoles.filter(
                      (console) => console !== event.target.value
                    );
                  } else {
                    newSelectedConsoles.push(event.target.value);
                  }
                  setSelectedPlayStationConsoles(newSelectedConsoles);
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
