import React from "react";
import { navigate } from "@reach/router";

import { Status } from "./Status";
import { Footer } from "./Footer";

export function Nav() {
  function goToLogout() {
    navigate("/logout");
  }

  function goToStreaming() {
    navigate("/stream");
  }

  return (
    <nav className="card">
      <Status />
      <button onClick={goToStreaming} className="card-btn">
        Go to streaming
      </button>
      <button onClick={goToLogout} className="card-btn">
        Logout
      </button>
      <Footer />
    </nav>
  );
}
