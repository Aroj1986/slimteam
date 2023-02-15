import React from "react";
import Carousel from "react-bootstrap/Carousel";

function AboutUs() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
        <div className="d-flex flex-row justify-content-md-between align-items-center p-2">
          <img
            src="https://static5.abbyy.com/abbyycommedia/32760/02a-profservices-customers.jpg"
            style={{ height: 300 }}
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, totam
            ipsum? Rerum repudiandae voluptas incidunt, quas numquam saepe ipsam
            reiciendis. Voluptates autem doloremque inventore rem ab impedit
            consequatur. Illo, culpa? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Aut odio quas hic repellendus, quia nostrum ex.
            Neque veniam corrupti sapiente? Enim unde, explicabo molestias
            repellat perspiciatis rerum harum qui atque?
          </p>
        </div>

        <Carousel
          variant="dark"
          className="flex-carousel text-center"
          style={{ width: 300 }}
        >
          <Carousel.Item>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
              fugit quam facere nobis corporis molestias deserunt!
            </p>
            <p>
              {" "}
              - <i>WBS Coding School</i> -{" "}
            </p>
          </Carousel.Item>
          <Carousel.Item>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
              fugit quam facere nobis corporis molestias deserunt!
            </p>
            <p>
              {" "}
              - <i>Agentur für Arbeit</i> -{" "}
            </p>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default AboutUs;
