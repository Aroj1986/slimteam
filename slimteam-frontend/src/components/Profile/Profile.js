
import React from "react";
import Profile_expert from "./Profile_expert";
import UserCompletingRegistration from "./UserPortfolio/UserCompletingRegistration";

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
        <UserCompletingRegistration
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
