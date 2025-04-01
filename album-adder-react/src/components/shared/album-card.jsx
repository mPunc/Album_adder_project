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
        <div>
            {albums.length > 0 ? (
                albums.map((album, index) => <AlbumCard key={index} oneAlbumDataXml={album} />)
            ) : (
                <p>Loading albums...</p>
            )}
        </div>
    );
}

function AlbumCard({ oneAlbumDataXml }) { 
    try {
        return (
            <div>
                <h2>{oneAlbumDataXml.getElementsByTagName("naslov")[0]?.innerHTML || "N/A"}</h2>
                <div>ID: {oneAlbumDataXml.getElementsByTagName("id")[0]?.innerHTML || "N/A"}</div>
                <div>Umjetnik: {oneAlbumDataXml.getElementsByTagName("umjetnik")[0]?.innerHTML || "N/A"}</div>
                <div>Žanr: {oneAlbumDataXml.getElementsByTagName("zanr")[0]?.innerHTML || "N/A"}</div>
                <div>Godina: {oneAlbumDataXml.getElementsByTagName("godina")[0]?.innerHTML || "N/A"}</div>
                <div>Producenti: {oneAlbumDataXml.getElementsByTagName("producenti")[0]?.innerHTML || "N/A"}</div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering AlbumCard:", error);
        return <></>;
    }
}

export default AlbumCards;
