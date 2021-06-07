import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.scss";
import image1 from "./../images/fond6.png";
import image2 from "./../images/fond2.jpeg";
import image3 from "./../images/fond3.jpeg";

const Home = () => {
    const datas = [
        {
            id: 1,
            image: image1,
            title: "Bienvenue sur notre site !",
            text: " Nous sommes l'association CYCHESS basée à CYTECH. Pour toute question vous pouvez nous la poser dans le forum ou bien par contact privé en bas de page.",
        },
        {
            id: 2,
            image: image2,
            title: "Participez à nos événements !",
            text: "Vous pouver participer à des évènements: tournois, rencontres amicales, suivis de grands tournois et bien plus !",
        },
        {
            id: 3,
            image: image3,
            title: "Fan des échecs ?",
            text: " Faites un tour dans notre boutique remplie de produits du monde des pions.",
        },
    ];

    return (
        <Carousel
            className="carousel-wrapper"
            showThumbs={true}
            autoPlay
            interval={7000}
            infiniteLoop
            thumbWidth={400}
            showIndicators={false}
            showStatus={false}
            stopOnHover={false}
        >
            {datas.map((slide) => (
                <div
                    className="image-container"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                    }}
                >
                    <div className="overlay">
                        <p className="overlay__title">{slide.title}</p>
                        <p className="overlay__text">{slide.text}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Home;
