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
        

        return (
            <div className='album-card-main'>
                <h2 className='card-title'>{oneAlbumDataXml.getElementsByTagName("naslov")[0]?.childNodes[0].nodeValue || "N/A"}</h2>
                <div>ID: {oneAlbumDataXml.getElementsByTagName("id")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Artist: {oneAlbumDataXml.getElementsByTagName("umjetnik")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Genre: {oneAlbumDataXml.getElementsByTagName("zanr")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Year: {oneAlbumDataXml.getElementsByTagName("godina")[0]?.childNodes[0].nodeValue || "N/A"}</div>
                <div>Producers: {producers || "N/A"}</div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering AlbumCard:", error);
        return <></>;
    }
}

export default AlbumCards;
