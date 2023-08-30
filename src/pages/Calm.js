import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";

import { notion, useNotion } from "../services/notion";
import { Nav} from "../components/Nav";
import axios from 'axios';


export function Calm() {
  const { user } = useNotion();
  const [calm, setCalm] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    notion.signalQuality().subscribe((signalQuality) => {
      setCalm(signalQuality[0].status);
    });

  }, [user]);

  return (
    <main className="main-container">
      {user ? <Nav /> : null}
      <div className="calm-score">
        &nbsp;{calm} <div className="calm-word">signal quality</div>
      </div>
    </main>
  );
}
