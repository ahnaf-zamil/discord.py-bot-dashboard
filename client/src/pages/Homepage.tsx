import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Status } from "../types";

import config from "../config.json";
import { Loading } from "../components/Loading";

export const Homepage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    axios.get(`${config.BOT_API_URL}/status`).then((resp) => {
      setStatus(resp.data);
    });

    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios
        .get(`${config.API_URL}/users/me`, {
          headers: {
            access_token: accessToken,
          },
        })
        .then((resp) => {
          const user: User = resp.data;
          setUser(user);
          setLoading(false);
        })
        .catch((e) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <div className="container mx-auto md:container md:mx-auto text-center h-screen">
        <div className="flex h-full justify-center items-center">
          <div className="container mx-auto">
            <img
              src={
                !user
                  ? "https://discord.com/assets/6f26ddd1bf59740c536d2274bb834a05.png"
                  : user.avatar_url
              }
              className="inline mb-5 rounded-full border-8 border-white"
              alt=""
            />
            <h1 className="text-white text-5xl mb-5 text-semibold">
              Bot Dashboard Tutorial
            </h1>
            {!user ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => (window.location.href = "/login")}
              >
                Log In with Discord
              </button>
            ) : (
              <div>
                <h1 className="text-white text-xl mb-2">
                  Logged In as:{" "}
                  <span className="font-semibold">
                    {user.username}#{user.discriminator}
                  </span>
                </h1>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                  onClick={() => (window.location.href = "/guilds")}
                >
                  Go to Guilds
                </button><br/>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => (window.location.href = "/logout")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
          <div className="container mx-auto md:w-2/6">
            <h1 className="text-white font-semibold text-4xl text-center mb-7">
              Info
            </h1>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white font-medium text-2xl text-center mb-3">
                  Ping
                </h1>
                <h1 className="text-center text-white font-bold text-xl py-2">
                  {status ? status.ping + " ms" : "N/A"}
                </h1>
              </div>
              <div>
                <h1 className="text-white font-medium text-2xl text-center mb-3">
                  Status
                </h1>
                <h1 className={`bg-${status ? 'green' : 'red'}-500 text-white font-bold py-2 px-4 rounded`}>
                {status ? 'Online' : 'Offline'}
                </h1>
              </div>
              <div>
                <h1 className="text-white font-medium text-2xl text-center mb-3">
                  Servers
                </h1>
                <h1 className="text-center text-white font-bold text-xl py-2">
                  {status ? status.guilds : "N/A"}
                </h1>
              </div>
            </div>
          </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#3B82F6"
            fill-opacity="1"
            d="M0,0L60,37.3C120,75,240,149,360,176C480,203,600,181,720,192C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
