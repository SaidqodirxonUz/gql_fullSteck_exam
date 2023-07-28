import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_MEASUREMENT = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function MeasurementCreate() {
  const [name, setName] = useState("");
  const [floor, setFloor] = useState(1); // Changed variable name to floor
  const [for_stuff, setForStuff] = useState(false); // Added for_stuff state
  const [addMeasurement, { loading, error }] = useMutation(ADD_MEASUREMENT);
  const navigate = useNavigate();

  const disabled = !name || !floor; // Adjusted the condition for the disabled button

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div className="bg-primary w-100 h-100">
      <h1 className="text-center pt-5 ">Room Create</h1>
      <div className="d-flex justify-content-around ">
        <div className=" text-end">
          <a href={`/`} type="button" className="btn btn-outline-light ">
            « Back
          </a>
        </div>
        <div className=" text-end">
          <a href={`/create`} type="button" className="btn btn-outline-light ">
            + Add
          </a>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-3 p-5">
        <form
          className="card w-50 p-3 m-3 gap-4 bg-warning"
          onSubmit={(e) => {
            e.preventDefault();
            addMeasurement({
              variables: { input: { name, floor, for_stuff } }, // Include for_stuff in variables
            }).then(({ data }) => {
              navigate(`/${data.createRoom.id}`);
            });
          }}>
          Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          Floor:
          <input
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
          For Stuff:
          <select
            value={for_stuff}
            onChange={(e) => setForStuff(e.target.value)}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button type="submit" disabled={disabled}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default MeasurementCreate;
