import Platforms from "./Platforms";

export default function Filters({ selectedPlatforms, setSelectedPlatforms }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Platforms
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
    </form>
  );
}
