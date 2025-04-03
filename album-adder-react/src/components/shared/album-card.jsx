import { useState, useEffect } from 'react';
import './components-shared.css';

function AlbumCards() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch('./data/albumi_data.xml')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "application/xml");
                const albumArray = Array.from(xmlDoc.getElementsByTagName("album"));

                setAlbums(albumArray);
            })
            .catch(error => console.error("Error loading XML:", error));
    }, []); // Empty dependency array -> Runs only once when the component mounts

    /* ovaj map je malo čudni, na znam ak je ovaj key value ok za posle
        mislim da bi najbolje  bilo, imati posebni js file koji preuzima xml, obradi podatke kak treba i pohrani ga u useState
        onda bi lakše bilo mapirati podatke kam treba, ili barem kaj vrati id nekak, jer ipak je zadatak delati u xml-u,
        a ovo bolje dela s .json files
        3. 4. 2025. nakon https://youtu.be/tHjxSVaj_wY

        15 min later
        mislim da bi mogel napraviti funkciju koja vraća id albuma i album ko dva elementa objekta
        malo jeje sjebano, ali možda bi radilo

        na listi albuma, delete i hide opcije za gumbe, hide bu samo maknul z liste trenutno, a vrne se s refreshom,
        a delete ga baš reši
    */

    return (
        <div className='album-card-container-main'>
            {albums.length > 0 ? (
                albums.map((album, index) => <AlbumCard key={index} oneAlbumDataXml={album} />)
            ) : (
                <p>Loading albums...</p>
            )}
        </div>
    );
}

export function AlbumCard({ oneAlbumDataXml }) {
    try {
        let producersArray = Array.from(oneAlbumDataXml.getElementsByTagName("producenti")[0].getElementsByTagName("producent"));
        let producers = "";
        producersArray.forEach(prod => producers += prod.childNodes[0].nodeValue + ", ")
        producers = producers.replace(/,\s*$/, ""); //This regular expression will remove the last comma and any whitespace after it
        
        const favButton = (x) => {
            console.log(oneAlbumDataXml.getElementsByTagName("id")[0]?.childNodes[0].nodeValue + " " + x);
        };

        return (
            <div className='album-card-main'>
                <h2 className='card-title'>{oneAlbumDataXml.getElementsByTagName("naslov")[0]?.childNodes[0].nodeValue || "N/A"}</h2>
                <div>ID: {oneAlbumDataXml.getElementsByTagName("id")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Artist: {oneAlbumDataXml.getElementsByTagName("umjetnik")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Genre: {oneAlbumDataXml.getElementsByTagName("zanr")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Year: {oneAlbumDataXml.getElementsByTagName("godina")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Producers: {producers || "N/A"}</div>
                
                <button onClick={() => {favButton("test")}}>Log ID</button>
            </div>
        );
    } catch (error) {
        console.error("Error rendering AlbumCard:", error);
        return <></>;
    }
}

export default AlbumCards;
