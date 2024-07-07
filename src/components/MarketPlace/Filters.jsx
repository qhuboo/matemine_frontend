import Consoles from "./Consoles";
import Platforms from "./Platforms";

export default function Filters({
  selectedPlatforms,
  setSelectedPlatforms,
  selectedNintendoConsoles,
  setSelectedNintendoConsoles,
  selectedSegaConsoles,
  setSelectedSegaConsoles,
  selectedPlayStationConsoles,
  setSelectedPlayStationConsoles,
  selectedXboxConsoles,
  setSelectedXboxConsoles,
}) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Platforms
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
      <Consoles
        selectedPlatforms={selectedPlatforms}
        selectedNintendoConsoles={selectedNintendoConsoles}
        setSelectedNintendoConsoles={setSelectedNintendoConsoles}
        selectedSegaConsoles={selectedSegaConsoles}
        setSelectedSegaConsoles={setSelectedSegaConsoles}
        selectedPlayStationConsoles={selectedPlayStationConsoles}
        setSelectedPlayStationConsoles={setSelectedPlayStationConsoles}
        selectedXboxConsoles={selectedXboxConsoles}
        setSelectedXboxConsoles={setSelectedXboxConsoles}
      />
    </form>
  );
}
