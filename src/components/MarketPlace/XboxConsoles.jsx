import platform_data from "../../platform_data";

export default function XboxConsoles({
  selectedPlatforms,
  selectedXboxConsoles,
  setSelectedXboxConsoles,
}) {
  return (
    <div>
      <fieldset>
        <legend>Xbox Consoles</legend>
        {platform_data.xbox.map((option) => {
          return (
            <div key={option}>
              <input
                disabled={!selectedPlatforms.xbox}
                type="checkbox"
                id={option}
                value={option}
                checked={selectedXboxConsoles.includes(option) === true}
                onChange={(event) => {
                  let newSelectedConsoles = [...selectedXboxConsoles];
                  if (newSelectedConsoles.includes(event.target.value)) {
                    newSelectedConsoles = newSelectedConsoles.filter(
                      (console) => console !== event.target.value
                    );
                  } else {
                    newSelectedConsoles.push(event.target.value);
                  }
                  setSelectedXboxConsoles(newSelectedConsoles);
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
