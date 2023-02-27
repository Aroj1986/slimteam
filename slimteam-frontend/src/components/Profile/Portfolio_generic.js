import Portfolio from "./Portfolio";
import Portfolio_user from "./Portfolio_user"


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
        <Portfolio
          email={email}
          name={name}
          role={role}
          setName={setName}
        />
      ) : (
        <Portfolio_user
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
