import './components-shared.css';

function AlbumCards() {
    let aLotOfAlbums = Array();

    fetch('./data/albumi_data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            const album = xmlDoc.getElementsByTagName("album");
            let albumArray = Object.values(album);


            albumArray.forEach(x => {
                //return AlbumCard(x);
                aLotOfAlbums.push(AlbumCard(x));
            });

        })
        .catch(error => console.error("Error loading XML:", error))
    ;

    console.log(aLotOfAlbums);
    
    return (
        <div>
            {AlbumCard(aLotOfAlbums.at(1))}
        </div>
    );
}

function AlbumCard(oneAlbumDataXml) { 
    try {
        return(
            <div>
                <h2>{oneAlbumDataXml.getElementsByTagName("naslov")[0].innerHTML}</h2>
                <div>ID: {oneAlbumDataXml.getElementsByTagName("id")[0].innerHTML}</div>
                <div>Umjetnik: {oneAlbumDataXml.getElementsByTagName("umjetnik")[0].innerHTML}</div>
                <div>Žanr: {oneAlbumDataXml.getElementsByTagName("zanr")[0].innerHTML}</div>
                <div>Godina: {oneAlbumDataXml.getElementsByTagName("godina")[0].innerHTML}</div>
                <div>Producenti: {oneAlbumDataXml.getElementsByTagName("producenti")[0].innerHTML}</div>
            </div>
        );
    }   
    catch {
        console.log(oneAlbumDataXml);
        return <></>;
    }
}

export default AlbumCards;
