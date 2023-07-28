import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_MEASUREMENT = gql`
  query GetMeasurement($id: ID!) {
    room(id: $id) {
      id
      name
      floor
      for_stuff
    }
  }
`;

const UPDATE_MEASUREMENT = gql`
  mutation UpdateRoom($updateRoomId: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $updateRoomId, input: $input) {
      id
      name
      floor
      for_stuff
    }
  }
`;
function MeasurementUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    name: "",
    floor: 0,
    for_stuff: false, // Set a default boolean value for for_stuff
  });
  const { loading, error, data } = useQuery(GET_MEASUREMENT, {
    variables: { id },
  });
  const [updateMeasurement, { loading: loading1, error: error1 }] =
    useMutation(UPDATE_MEASUREMENT);

  useEffect(() => {
    if (data && data.room) {
      setUpdate(data.room);
    }
  }, [data]);

  if (loading || loading1) {
    return "Loading...";
  }

  if (error || error1) {
    return `Error: ${error ? error.message : error1.message}`;
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
            const { id, __typename, ...updateInput } = update;
            updateMeasurement({
              variables: { updateRoomId: id, input: updateInput },
            }).then(({ data }) => {
              navigate(`/${data.updateRoom.id}`);
            });
          }}>
          Name:
          <input
            type="text"
            value={update.name}
            onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          />
          Floor:
          <input
            type="number"
            value={update.floor}
            onChange={(e) => setUpdate({ ...update, floor: +e.target.value })}
          />
          For Stuff:
          <select
            checked={update.for_stuff} // Use checked attribute for boolean value
            onChange={(e) =>
              setUpdate({ ...update, for_stuff: e.target.checked })
            }>
            {/* <option value="" disabled>
              Select an option
            </option> */}
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default MeasurementUpdate;
