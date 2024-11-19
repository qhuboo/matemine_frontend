import platforms from "../../platform_data";

export default function Consoles({ isChecked, handleCheckBoxChange }) {
  return (
    <div>
      {Object.keys(platforms).map((platform) => (
        <fieldset key={platform}>
          <legend>{platform} Consoles</legend>
          {platforms[platform].map((console) => (
            <div key={console}>
              <input
                type="checkbox"
                id={console}
                value={console}
                checked={isChecked(platform, `${console}`)}
                onChange={() => handleCheckBoxChange(platform, `${console}`)}
              />
              <label htmlFor={console}> {console}</label>
            </div>
          ))}
        </fieldset>
      ))}
    </div>
  );
}
