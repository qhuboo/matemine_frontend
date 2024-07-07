import NintendoConsoles from "./NintendoConsoles";
import SegaConsoles from "./SegaConsoles";
import PlayStationConsoles from "./PlayStationConsoles";
import XboxConsoles from "./XboxConsoles";

export default function Consoles({
  selectedPlatforms,
  selectedNintendoConsoles,
  setSelectedNintendoConsoles,
  selectedSegaConsoles,
  setSelectedSegaConsoles,
  selectedPlayStationConsoles,
  setSelectedPlayStationConsoles,
  selectedXboxConsoles,
  setSelectedXboxConsoles,
}) {
  return (
    <div>
      <NintendoConsoles
        selectedPlatforms={selectedPlatforms}
        selectedNintendoConsoles={selectedNintendoConsoles}
        setSelectedNintendoConsoles={setSelectedNintendoConsoles}
      />
      <SegaConsoles
        selectedPlatforms={selectedPlatforms}
        selectedSegaConsoles={selectedSegaConsoles}
        setSelectedSegaConsoles={setSelectedSegaConsoles}
      />
      <PlayStationConsoles
        selectedPlatforms={selectedPlatforms}
        selectedPlayStationConsoles={selectedPlayStationConsoles}
        setSelectedPlayStationConsoles={setSelectedPlayStationConsoles}
      />
      <XboxConsoles
        selectedPlatforms={selectedPlatforms}
        selectedXboxConsoles={selectedXboxConsoles}
        setSelectedXboxConsoles={setSelectedXboxConsoles}
      />
    </div>
  );
}
