import { gql, useQuery } from "@apollo/client";

const GET_ROOMS = gql`
  query GetRooms($input: QueryRoomsInput) {
    rooms(input: $input) {
      list {
        id
        name
        floor
        for_stuff
      }
    }
  }
`;

function ListRooms() {
  // Define the 'input' variable with the 'q' property
  const input = { q: "" };

  const { loading, error, data } = useQuery(GET_ROOMS, {
    variables: { input }, // Pass the 'input' variable as a query variable
  });

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div className="">
      <h1 className="text-center p-5">Rooms App</h1>

      <div className=" text-end pb-5">
        <a href={`/create`} type="button" className="btn btn-outline-light ">
          + Add
        </a>
      </div>

      {data.rooms.list.map((room) => (
        <div key={room.id} className="d-flex justify-content-center mb-3 ">
          <div className="card p-4 bg-light w-100 fs-5 p-3">
            <div className="">
              Id: {room.id}
              <br />
              Name: {room.name}
              <br />
              Floor : {room.floor}
              <br />
              For Stuff : {room.for_stuff ? "True" : "False"}
            </div>
            <div className="d-flex justify-content-end gap-2">
              <a href={`/${room.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  style={{ cursor: "pointer" }}
                  className="bi bi-eye"
                  viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </a>
              <a href={`/edit/${room.id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  style={{ cursor: "pointer" }}
                  className="bi bi-pencil "
                  viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </a>
              <a href={`/delete/${room.id}`}>
                <svg
                  onClick={() =>
                    removeMeasurement({
                      variables: { id: measurement.id },
                    }).then(refetch)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  style={{ cursor: "pointer" }}
                  className="bi bi-trash text-danger "
                  viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListRooms;