export default function Platforms({ selectedPlatforms, setSelectedPlatforms }) {
  return (
    <fieldset>
      <legend>Select Platforms</legend>
      {Object.keys(selectedPlatforms).map((option) => {
        return (
          <div key={option}>
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedPlatforms[option] === true}
              onChange={(event) => {
                setSelectedPlatforms({
                  ...selectedPlatforms,
                  [option]: event.target.checked,
                });
              }}
            />
            <label htmlFor={option}> {option}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
