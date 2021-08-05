import React from "react";
import queryString from "query-string";
import { useEffect } from "react";
import axios from "axios";

import config from "../config.json";

interface TokenResponse {
  access_token: string | null;
}

export const CallbackHandler: React.FC = (props: any) => {
  useEffect(() => {
    axios.post(`${config.API_URL}/oauth/callback`, { code }).then((res) => {
      const data: TokenResponse = res.data;
      if (data.access_token === null) {
        window.location.href = "/login";
      } else {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "/guilds";
      }
    });
  }, []);

  const code = queryString.parse(props.location.search).code;

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-white text-5xl text-center">Redirecting...</h1>
    </div>
  );
};
