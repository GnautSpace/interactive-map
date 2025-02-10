import {useState,useMemo,useRef,useCallback,useEffect} from 'react'
import {useMapEvents,Marker,Popup} from 'react-leaflet'

function LocationDraggableMarker(){
    const center={lat: 34.653,lng: 135.511};
    const [pos,setPos]=useState(center);
    const [draggable,setDraggable]=useState(false);
    const markerRef = useRef(null); 
  
     
    useEffect(()=>{
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    setPos({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error)=>{

                    console.error("Error getting geolocation: ",error);
                }
            );
        }
        else{
            console.error("Geolocation not supported b your browser!");
        }
    },[]);

    const map=useMapEvents({
        click(){
            map.locate();
        },
        locationfound(e){
            setPos(e.latlng);
            map.flyTo(e.latlng,map.getZoom());
        },
    });

    const eventHandlers=useMemo(()=>({
        dragend(){
            if (markerRef.current){
                setPos(markerRef.current.getLatLng());
            }
        }
    }),[]);


    const toggleDraggable=useCallback(()=>{
        setDraggable((d)=>!d);
    },[]);
    return pos?(
        <>
            <Marker draggable={draggable} eventHandlers={eventHandlers} position={pos} ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
                    </span>
                    <p>Coordinates: {pos.lat.toFixed(5)},{pos.lng.toFixed(5)}</p>
                </Popup>
            </Marker>
        </>
    ):null;
    
}

export default LocationDraggableMarker;