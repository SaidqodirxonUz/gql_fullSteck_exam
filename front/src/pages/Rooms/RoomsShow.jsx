import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_ROOM = gql`
  query Query($id: ID!) {
    room(id: $id) {
      id
      name
      floor
      for_stuff
    }
  }
`;

function RoomShow() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { id },
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    console.log(error);
    return `Error: ${error.message}`;
  }

  return (
    <>
      <h1 className="text-center pt-5 ">Room Details</h1>
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
        <div className="card w-50 p-3 m-3 ">
          <h4>{data.room.name}</h4>
        </div>
        <div className="card w-50 p-3 m-3">
          <h4>Floor: {data.room.floor}</h4>
          <h4>For Stuff: {data.room.for_stuff ? "True" : "False"}</h4>
        </div>
      </div>
    </>
  );
}

export default RoomShow;
