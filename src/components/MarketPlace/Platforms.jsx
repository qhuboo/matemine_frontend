import platforms from "../../platform_data";

export default function Platforms({ selectedPlatforms, setSelectedPlatforms }) {
  return (
    <fieldset>
      <legend>Select Platforms</legend>
      {Object.keys(platforms).map((option) => {
        return (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedPlatforms.includes(option)}
              onChange={(event) => {
                let newSelectedPlatforms = [];
                if (event.target.checked) {
                  newSelectedPlatforms = [...selectedPlatforms, option];
                } else {
                  newSelectedPlatforms = selectedPlatforms.filter(
                    (platform) => platform !== option
                  );
                }
                setSelectedPlatforms(newSelectedPlatforms);
              }}
            />
            <label htmlFor={option}> {option}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
