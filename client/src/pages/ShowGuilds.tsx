import React, { useState, useEffect } from "react";
import { Guild, User } from "../types";
import axios from "axios";

import config from "../config.json";
import { Loading } from "../components/Loading";

export const ShowGuilds: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [guilds, setGuilds] = useState<Array<Guild> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const makeRequests = async () => {
      if (accessToken) {
        const guildsRes = await axios.get(`${config.API_URL}/guilds`, {
          headers: {
            access_token: accessToken,
          },
        });
        setGuilds(guildsRes.data.guilds);
        await new Promise((r) => setTimeout(r, 500));
        const userRes = await axios.get(`${config.API_URL}/users/me`, {
          headers: {
            access_token: accessToken,
          },
        });
        setUser(userRes.data);
        setLoading(false);
      } else {
      }
    };
    makeRequests();
  }, []);

  console.log(guilds);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex items-center h-full justify-center">
          <div className="h-3/4">
            <h1 className="text-white text-4xl mb-16 text-center">Guilds</h1>
            <div className="pt-10 pb-14 h-64 grid grid-cols-3 gap-8">
              {guilds?.map((guild: Guild) => {
                return (
                  <div
                    onClick={() =>
                      (window.location.href = `/guilds/${guild.id}`)
                    }
                    className="transition duration-500 transform hover:scale-110 bg-gray-700 hover:bg-gray-600 rounded text-white mb-12 cursor-pointer"
                  >
                    <div className="flex -mt-16 justify-center">
                      <img
                        className="rounded-full"
                        width="150"
                        src={guild.icon_url}
                      />
                    </div>
                    <div className="px-6 py-4">
                      <h1 className="text-xl word-break font-semibold text-center">
                        {guild.name}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>

        <div className="absolute w-full left-0 bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#3B82F6"
              fill-opacity="1"
              d="M0,0L60,37.3C120,75,240,149,360,176C480,203,600,181,720,192C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
          </div>

          <div className="absolute top-0 right-0 mr-5 mt-5">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar_url}
                width="50"
                alt=""
                className="rounded-full"
              />
              <h1 className="text-white text-lg">
                {user?.username}#{user?.discriminator}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
