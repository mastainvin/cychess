import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.scss";
import image_test from "./../images/fond.jpg";
import image_test2 from "./../images/im1.jpeg";

const Home = () => {
    const datas = [
        {
            id: 1,
            image: image_test,
            title: "Bienvenue sur notre site !",
            text: "Inscrivez-vous à des tournois, achetez votre matériel et discutez sur notre forum ! Bonne visite !",
        },
        {
            id: 2,
            image: image_test2,
            title: "Bienvenue sur notre site !",
            text: "Inscrivez-vous à des tournois, achetez votre matériel et discutez sur notre forum ! Bonne visite !",
        },
    ];

    return (
        <Carousel
            className="carousel-wrapper"
            showThumbs={true}
            autoPlay
            interval={2000}
            infiniteLoop
            thumbWidth={400}
            showIndicators={false}
            showStatus={false}
        >
            {datas.map((slide) => (
                <div
                    className="image-container"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                    }}
                >
                    <div className="overlay">
                        <h2 className="overlay__title">{slide.title}</h2>

                        <p className="overlay__text">{slide.text}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Home;
