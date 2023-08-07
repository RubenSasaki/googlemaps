import places from './places.json' assert { type: 'json'};

let map;

const  createInfoWindowContent  = ({title = "contenido de prueba", descripttion = "descripcion de prueba"}) =>{
    return `
    <div>
    <p> ${title} </p>
    <p></p>
    </div>
    `;
    
};
const createMarker = async({map, title, position}) =>{ //creamos un amrcador 
    const{AdvancedMarkerElement} = await google.maps.importLibrary('marker'); //importamos al libreria de google maps
   
   
    const infoWindow = new google.maps.InfoWindow({
    content:  createInfoWindowContent({title})
   });
    const marker = new AdvancedMarkerElement({ // creamos un neuvio markador
        map,
        position
    });
    marker.addListener('click', ()=>{ //esto es apra geenrar un nuevo marcador
        map.setCenter(position);
        infoWindow.open(map, marker);
    });
};

const loadMap = async () => { // esto es apora cargar el mapa en la pagina
if(navigator.geolocation){
    
    navigator.geolocation.getCurrentPosition(async (positionArg) =>{
    const{ Map} = await google.maps.importLibrary('maps'); // importamos la librerua de google maps
    const position = { lat: positionArg.coords.latitude, lng:positionArg.coords.longitude}; //esto es apora saber en que lugar queremos mostrar el mapa
    
    map = new Map(document.getElementById('map'),{ //generamos un neuvo mapa y sus especificaciones
        center: position,
        zoom: 14,
        mapId: 'marker-maps'
    });
    
    map.addListener('click', async (event) => { //una funcion apra cuando se ahga click en el mapa
        await createMarker({ //llamamos ala funcion crear un amrcador apra crear un neuvo marcador cada que demos clcick en un lugar
            map,
            position: { lat: event.latLng.lat(), lng: event.latLng.lng()},
            title: 'marcador dinamico'
        });
    });
        await createMarker({
            map,
            position,
            title: " mi posicion"
        });
        for (const place of places){
            await createMarker({
                map,
                title: place.name,
                position:{lat: place.lat, lng: place.lng,}
            })
        }
    }, (error)=>{
        console.error(error);
    });
} else{
    alert('no s epude padre');
}
     

};

loadMap();