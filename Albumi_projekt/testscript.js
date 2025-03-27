//let container = document.getElementById("target-div-1");

fetch("modified_albumi_data.xml")
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        const albums_data = xmlDoc.getElementsByTagName("albumi_data")[0];
        let childrenArray = Object.values(albums_data.children);
        const targetNode = document.getElementById("target-div-1");
        
        childrenArray.forEach(x => 
            {
                let currentAlbumsArray = Object.values(x.children);
                currentAlbumsArray.forEach(albumi => {
                    console.log(albumi);

                    let currentAlbumNode = document.createElement("div");
                    currentAlbumNode.appendChild(Object.assign(document.createElement("h2"), {innerHTML:albumi.getElementsByTagName("naslov")[0].innerHTML}));
                    currentAlbumNode.appendChild(Object.assign(document.createElement("div"), {innerHTML:"ID: " + albumi.getElementsByTagName("id")[0].innerHTML}));
                    currentAlbumNode.appendChild(Object.assign(document.createElement("div"), {innerHTML:"Umjetnik: " + albumi.getElementsByTagName("umjetnik")[0].innerHTML}));
                    currentAlbumNode.appendChild(Object.assign(document.createElement("div"), {innerHTML:"Žanr: " + albumi.getElementsByTagName("zanr")[0].innerHTML}));
                    currentAlbumNode.appendChild(Object.assign(document.createElement("div"), {innerHTML:"Godina: " + albumi.getElementsByTagName("godina")[0].innerHTML}));
                    currentAlbumNode.appendChild(Object.assign(document.createElement("div"), {innerHTML:"Producenti: " + albumi.getElementsByTagName("producenti")[0].innerHTML}));
                    
                    targetNode.appendChild(currentAlbumNode);
                });
            }
        );
        

    })
    .catch(error => console.error("Error loading XML:", error)
);