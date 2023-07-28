import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/core/ProtectedRoute";
import About from "./pages/About";
import RoomsCreate from "./pages/Rooms/RoomsCreate";
import RoomsList from "./pages/Rooms/RoomsList";
import RoomsShow from "./pages/Rooms/RoomsShow";
import RoomsUpdate from "./pages/Rooms/RoomsUpdate";

function App() {
  return (
    <>
      <div className="bg-warning w-100 h-100">
        <div className="container pb-5">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RoomsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <RoomsCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <RoomsUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:id"
              element={
                <ProtectedRoute>
                  <RoomsShow />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          {/* <About /> */}
        </div>
      </div>
    </>
  );
}
export default App;
