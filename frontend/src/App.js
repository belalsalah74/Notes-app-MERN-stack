import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NoteView from "./components/NoteView";
import { AppContext } from "./Context";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Header from "./components/Header";

function App() {
  const url = `http://localhost:5000/api`;
  const token = JSON.parse(localStorage.getItem("token"));
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/:id" element={<NoteView />} />
        <Route path="/login" element={<LoginRegisterPage />} />
      </>
    )
  );
  return (
    <>
      <AppContext.Provider value={{ url, token }}>
        <div className="container mt-5 w-md-50">
          <div className="wrapper ">
            <Header />
            <div className="content">
              <RouterProvider router={router} />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
