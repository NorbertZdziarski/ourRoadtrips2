import React from 'react';

function AboutUs() {

    return (
        <section className="underConstruction mainViewStyle">
            <header className={`layout_flex-sb`}>
                <button> idea </button>
                <button> aplikacja web </button>
                <button> aplikacja serwerowa  </button>
                <button> baza danych</button>
                <button> projekt i realizacja </button>
                <button> o mnie </button>
            </header>
            <main>
                <section>
                    <h4 >             * idea</h4>
                    <p>stworzenie............ </p>
                </section>

                <section>
                    <h4 >             * aplikacka web</h4>
                    <p>wykorzystuje ReactJS wraz z HTML, SASS, </p>
                </section>

                <section>
                    <h4 >   *  aplikacja serwerowa</h4>
                    <p>
                        * nodeJS </p>
                </section>
                <section>
                    <h4 >         *baza danych</h4>
                    <p>Mongo DB </p>
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