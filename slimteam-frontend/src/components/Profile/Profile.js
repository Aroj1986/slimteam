
import React from "react";
import Profile_expert from "./Profile_expert";
import Profile_user from "./Profile_user";

function Profile_gerneric({
  email,
  setEmail,
  name,
  setName,
  isExpert,
  isUser,
  setUserLogin,
}) {
  return (
    <div>
      {isExpert ? (
        <Profile_expert
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          isExpert={isExpert}
          isUser={isUser}
          setUserLogin={setUserLogin}
        />
      ) : (
        <Profile_user
          email={email}
          setEmail={setEmail}
          name={name}
          setName={setName}
          isExpert={isExpert}
          isUser={isUser}
          setUserLogin={setUserLogin}
        />
      )}

    </div>
  );
}

export default Profile_gerneric;
