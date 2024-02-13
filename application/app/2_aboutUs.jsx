import React, {useState} from 'react';
import {useStoreState} from "easy-peasy";

import logoreact from "../images/React.png";
import logonode from "../images/nodeJS.png";
import logomongo from "../images/mongoDB.png";
import logosass from "../images/sass.png";
import logogoogle from "../images/google.png";
import logogmaps from "../images/gmaps.png";
import logomilanote from "../images/milanote.png";
import logogithub from "../images/github_alt_macos_bigsur_icon_190138.png";
import logoscrum from "../images/brand_scrum_icon_158716.png";
import componentsmap from "../images/canvas_ourroadtrips-komponenty.png"
import ourroadtrip_1 from "../images/ourroadtrip_1.jpg"
import ourroadtrip_2 from "../images/ourroadtrip_2.jpg"
import ourroadtrip_m1 from "../images/ourroadtrip_m1.png"
import ourroadtrip_m2 from "../images/ourroadtrip_m2.png"
import ourroadtrip_m3 from "../images/ourroadtrip_m3.png"


import {Link} from "react-router-dom";

import Anim_loading from "./anim_loading";



function AboutUs() {
    const displayStyles = useStoreState(state => state.displayStyles);
    const [selectSection, setSelectSection] = useState();
    const [ideasection, setIdeasection] = useState(1);
    const printScreenes = [ourroadtrip_1,ourroadtrip_2,ourroadtrip_m1,ourroadtrip_m2,ourroadtrip_m3]
    const [showLarge, setShowLarge] = useState('');
    function LargeImage() {

        return(
            <main className={'photoClassLarge'} onClick={()=>setShowLarge(false)}>
                <img src={image} className={photoClass} />
            </main>)
    }

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
                        {/*<p> / soon ;) / </p>*/}
                        <p>Jestem autorem i wykonawcą tej aplikacji. Odpowiadam za wygląd, UI, aplikację webową i serwerową a także za hosting czy domenę.</p>
                        <div className='layout_gridAuto button_a'>
                            <a onClick={()=>setIdeasection(1)}> 1. zakres funkcjonalnosci</a>
                            <a onClick={()=>setIdeasection(2)}> 2. mapa komponentów </a>
                            <a onClick={()=>setIdeasection(3)}> 3. zrzuty ekranu </a>
                            {/*<a onClick={()=>setIdeasection(4)}> 4.  </a>*/}
                        </div>
                        {ideasection === 1 ? <>
                            <ul> <p>funkcjonalność aplikacji: </p>
                                <li>zakładanie / edytowanie konta</li>
                                <li>dodawanie, modyfikowanie, usówanie:
                                    <li>- tras</li>
                                    <li>- samochodów</li>
                                    <li>- grup</li>
                                </li>
                                <li>wysyłanie, odbieranie, usówanie poczty między użytkownikami</li>
                                <li>filtrowanie, sortowanie tras</li>
                                <li>dodawanie komentarzy</li>
                                <li>dodawanie oceny</li>
                                <li>rysowanie oraz pokazywanie tras na mapach google</li>
                                <li>logowanie przez konto google</li>
                            </ul></> : <></>}
                        <div id={'divAboutUsImg'}>
                        {ideasection === 2 ? <>
                                <span>
                                    <img src={componentsmap} alt={'mapa komponentów'}/>
                                </span>
                            </>: <></>}
                            {ideasection === 3 ? <div id={'divAboutUsSampleImg'} className={'layout_gridAuto'}>
                                {printScreenes ? (
                                    printScreenes.map((printScreen) =>
                                            <span  key={printScreen} className={'photoPrintScreen'} >

                                                {showLarge ? <main className={'photoClassLarge'} onClick={()=>setShowLarge('')}>
                                                    <img src={showLarge} alt={showLarge}/>
                                                </main> : <img src={printScreen} alt={printScreen} onClick={()=>setShowLarge(printScreen)}/>}

                                            </span>
                                    )
                                ) : (<></>)}
                            </div> : <></>}
                            {/*{ideasection === 4 ? <div>4 / soon /</div> : <></>}*/}
                        </div>
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
                        <img src={logoscrum} className={`aboutme_photo`}/>
                        <img src={logomilanote} className={`aboutme_photo`}/>
                        <img src={logogithub} className={`aboutme_photo`}/>
                    </div>
                    <div>
                    <h5 >  * projekt i realizacja</h5>
                        <p>podczas realizacji wykorzystwałem ideę SCRUM oraz m.in. narzędzia: </p>
                        <ul>
                            <li> idea SCRUM </li>
                            <li> narzędzie millanote </li>
                            <li> narzędzie GIThub </li>
                            <li> WebStorm </li>
                            <li> free icons: https://icon-icons.com/ </li>
                            <li> Google Fonts: https://fonts.google.com/ </li>
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