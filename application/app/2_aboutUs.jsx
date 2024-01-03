import React from 'react';
import {useStoreState} from "easy-peasy";

import logoreact from "../images/React.png";
import logonode from "../images/nodeJS.png";
import logomongo from "../images/mongoDB.png";
import logosass from "../images/sass.png";
import logogoogle from "../images/google.png";
import logogmaps from "../images/gmaps.png";


function AboutUs() {
    const displayStyles = useStoreState(state => state.displayStyles);
    return (
        <section className="underConstruction mainViewStyle">
            <header className={`layout_flex-sb`}>
                <button> idea </button>
                <button> aplikacja web </button>
                <button> aplikacja serwerowa  </button>
                <button> baza danych</button>
                <button> API</button>
                <button> projekt i realizacja </button>
                <button> o mnie </button>
            </header>
            <main>
                <section>
                    <h4 >             * idea</h4>
                    <p>stworzenie............ </p>
                </section>

                <section>
                    <img src={logoreact} className={`aboutme_photo`}/>
                    <img src={logosass} className={`aboutme_photo`}/>
                    <div>
                        <h4 >             * aplikacka web</h4>
                        <p>wykorzystuje ReactJS wraz z HTML, SASS, </p>
                    </div>
                </section>

                <section>
                    <img src={logonode} className={`aboutme_photo`}/>
                    <h4 >   *  aplikacja serwerowa</h4>
                    <p>
                        * nodeJS </p>
                </section>
                <section>
                    <img src={logomongo} className={`aboutme_photo`}/>
                    <h4 >         *baza danych</h4>
                    <p>Mongo DB </p>
                </section>
                <section>
                    <img src={logogoogle} className={`aboutme_photo`}/>
                    <img src={logogmaps} className={`aboutme_photo`}/>
                    <h4 > API </h4>
                </section>
                <section>
                    <h4 >             *             *projekt i realizacja</h4>
                    <p>idea scrum </p>
                    <p>millanote </p>
                    <p>millanote </p>
                </section>
                <section>
                    <h4 >             * aplikacka web</h4>
                    <p>wykorzystuje ReactJS wraz z HTML, SASS, </p>
                </section>
            </main>
            <footer>
                <p> o mnie. Linked In, </p>
            </footer>
        </section>
    );
}

export default AboutUs;