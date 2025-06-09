import { ButtonGroup, Button } from "react-bootstrap";

function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="d-flex justify-content-center my-3">
      <ButtonGroup>
        <Button
          variant={currentFilter === "all" ? "dark" : "outline-dark"}
          onClick={() => onFilterChange("all")}
        >
          Toutes
        </Button>
        <Button
          variant={currentFilter === "active" ? "primary" : "outline-primary"}
          onClick={() => onFilterChange("active")}
        >
          En cours
        </Button>
        <Button
          variant={currentFilter === "completed" ? "success" : "outline-success"}
          onClick={() => onFilterChange("completed")}
        >
          Terminées
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default FilterBar;