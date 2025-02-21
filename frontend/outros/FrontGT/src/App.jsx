import { useState } from "react";
// import "./index.css";
// import "./App.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
// import Overlay from "./components/Overlay";

function App() {
  const [isMoved, setIsMoved] = useState(false);

  const toggleOverlay = () => setIsMoved(!isMoved);

  return (
    <main>
      <div className={`login-container ${isMoved ? "move" : ""}`}>
        <LoginForm onSwitch={toggleOverlay} />
        <RegisterForm onSwitch={toggleOverlay} />
      </div>
    </main>
  );
}

export default App;