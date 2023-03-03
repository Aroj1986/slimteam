import Portfolio_expert from "./Portfolio_expert";
import Portfolio_user from "./PortfolioUser/Portfolio_user";

function Portfolio_generic({ email, name, role, setName }) {
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
