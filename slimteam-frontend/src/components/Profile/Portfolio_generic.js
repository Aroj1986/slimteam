import Portfolio_expert from "./Portfolio_expert";
import UserDisplayingDetails from "./UserPortfolio/UserDisplayingUI"


function Portfolio_generic({
  email,
  name,
  role,
  setName
})

{
    console.log(role)
  return (
    <div>
      {role === "Expert" ? (
        <Portfolio_expert
          email={email}
          name={name}
          role={role}
          setName={setName}
        />
      ) : (
        <UserDisplayingDetails
        email={email}
        name={name}
       role={role}
       setName={setName}
        />
      )}

    </div>
  );
}

export default Portfolio_generic;
