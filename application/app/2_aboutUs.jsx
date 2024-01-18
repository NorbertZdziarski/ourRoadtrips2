import React, {useState} from 'react';
import {useStoreState} from "easy-peasy";

import logoreact from "../images/React.png";
import logonode from "../images/nodeJS.png";
import logomongo from "../images/mongoDB.png";
import logosass from "../images/sass.png";
import logogoogle from "../images/google.png";
import logogmaps from "../images/gmaps.png";


function AboutUs() {
    const displayStyles = useStoreState(state => state.displayStyles);
    const [selectSection, setSelectSection] = useState();
    return (
        <section className="aboutUsStyle">
            <header >
                <a href="#aboutProject_idea" onClick={()=>setSelectSection('idea')}> idea </a>
                <a href="#aboutProject_front" onClick={()=>setSelectSection('front')}> aplikacja web </a>

                <a href="#aboutProject_back" onClick={()=>setSelectSection('back')}> aplikacja serwerowa  </a>
                <a href="#aboutProject_dataBase" onClick={()=>setSelectSection('db')}> baza danych</a>

                <a href="#aboutProject_api" onClick={()=>setSelectSection('api')}>API</a>

                <a href="#aboutProject_prj" onClick={()=>setSelectSection('prj')}> projekt i realizacja </a>
                <a href="#aboutProject_aboutMe" onClick={()=>setSelectSection('aboutme')}> o mnie </a>
            </header>
            <main>
                <section id="aboutProject_idea" className={selectSection === 'idea' ? 'selected' : ''}>
                    <div>
                    </div>
                    <div>
                        <h5 >* idea</h5>
                        <p> / wkrótce ;) / </p>
                    </div>
                </section>

                <section id="aboutProject_front" className={selectSection === 'front' ? 'selected' : ''}>
                    <div>
                        <img src={logoreact} className={`aboutme_photo`}/>
                        <img src={logosass} className={`aboutme_photo`}/>
                    </div>
                    <div>
                        <h5 >* aplikacja web</h5>
                        <p> podczas realizacji aplikacji wykorzystałem ReactJS + SASS oraz przedstawione poniżej frameworki oraz biblioteki:</p>
                        <ul> <p> ReactJS </p>
                            <li> język JSX </li>
                            <li> funkcje JavaScript </li>
                            <li> asynchroniczność </li>
                            <li> React Rooter Dom </li>
                            <li> easy-peasy </li>
                            <li> axios </li>
                            <li> jwt-decode </li>
                            <li> HTML5 </li>

                        </ul>
                        <ul> <p> SASS </p>
                            <li> RWD Responsive Web Design </li>
                            <li> Mixins </li>
                            <li> @Import </li>
                        </ul>
                    </div>
                </section>

                <section id="aboutProject_back" className={selectSection === 'back' ? 'selected' : ''}>
                    <div>
                        <img src={logonode} className={`aboutme_photo`}/>
                    </div>
                    <div>
                        <h5 >* aplikacja serwerowa</h5>
                        <p> aplikacja serwerowa została przeze mnie napisana w NodeJS. Wykorzystując SSH oraz FTP umieściłem ją na hostingu nazwa.pl.</p>
                        <ul>
                            <li> cors </li>
                            <li> dotenv </li>
                            <li> express </li>
                            <li> fs </li>
                            <li> mongoDB </li>
                            <li> multer </li>
                            <li> szyfrowanie wrażliwych danych zapisywanych w bazie</li>
                        </ul>
                    </div>
                </section>
                <section id="aboutProject_dataBase" className={selectSection === 'db' ? 'selected' : ''}>
                    <div>
                    <img src={logomongo} className={`aboutme_photo`}/>
                </div>
                <div >
                    <h5 > * baza danych</h5>
                    <p>Mongo DB </p>
                </div>
                </section>
                <section id='aboutProject_api' className={selectSection === 'api' ? 'selected' : ''}>
                    <div>
                        <img src={logogoogle} className={`aboutme_photo`}/>
                        <img src={logogmaps} className={`aboutme_photo`}/>
                    </div>
                    <div >
                        <h5> * API </h5>
                        <p> aplikacja wykorzystuje zewnętrzne API do obsługi: </p>
                        <ul>
                            <li> logowanie Google </li>
                            <li> obsługa Google Map </li>
                            <li> alternatywne logowanie ... / wkrótce /</li>
                        </ul>
                    </div>
                </section>
                <section id="aboutProject_prj" className={selectSection === 'prj' ? 'selected' : ''}>
                    <div>
                    </div>
                    <div>
                    <h5 >  * projekt i realizacja</h5>
                        <p>podczas realizacji wykorzystwałem ideę SCRUM oraz liczne narzędzia: </p>
                        <ul>
                            <li> idea SCRUM </li>
                            <li> narzędzie millanote </li>
                            <li> narzędzie GIThub </li>
                        </ul>

                    </div>
                </section>
                <section >
                    <div>
                    </div>
                    <div>
                        <h5 >* dalszy rozwój </h5>
                        <p> co jest w trakcie lub planowane do realizacji? </p>
                        <ul>
                            <li> inne sposoby logowania </li>
                            <li> wyszukiwarka </li>
                            <li> forum dyskusyjne </li>
                            <li> inna wersja językowa </li>
                        </ul>
                    </div>
                </section>
            </main>
            <footer id="aboutProject_aboutMe" className={'layout_flex-sb-directColumn '}>
                <p> zapraszam na strony o mnie: </p> <a href={'https://github.com/NorbertZdziarski'} target={'_blank'}> GitHub </a> <a href={'https://www.linkedin.com/in/norbert-zdziarski/'} target={'_blank'}> Linked In </a>
            </footer>
        </section>
    );
}

export default AboutUs;