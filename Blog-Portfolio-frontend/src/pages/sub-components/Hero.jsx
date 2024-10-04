import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  const [user, setuser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me/portfolio",
        { withCredentials: true }
      );
      setuser(data.user);
    };
    getMyProfile();
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-3">
        Hey, I'm {user.fullName}
      </h1>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] ">
        <Typewriter
          words={["Blogger", "Comidean"]}
          loop={5}
          cursor
          typeSpeed={30}
          deleteSpeed={30}
          delaySpeed={20}
        />
      </h1>
    </div>
  );
}
