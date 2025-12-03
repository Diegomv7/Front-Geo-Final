// src/pages/Home.jsx
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import './Home.css'; 
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw'; 
import L from 'leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// --- ICONOS ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const FlyToLocation = ({ center }) => {
    const map = useMap();
    if (center) map.flyTo(center, 15);
    return null;
};

const Home = () => {
    const navigate = useNavigate();
    
    // Estados
    const [places, setPlaces] = useState([]);
    const [zones, setZones] = useState([]);
    const [activeTab, setActiveTab] = useState('places');
    const [searchTerm, setSearchTerm] = useState(""); 
    
    // Lugares
    const [selectedPlace, setSelectedPlace] = useState(null); 
    const [isEditing, setIsEditing] = useState(false); 
    const [editForm, setEditForm] = useState({ name: '', description: '' }); 
    const [isCreating, setIsCreating] = useState(false); 
    const [newPlacePos, setNewPlacePos] = useState(null); 
    const [createForm, setCreateForm] = useState({ name: '', description: '' }); 
    
    // Zonas
    const [selectedZone, setSelectedZone] = useState(null);
    const [isEditingZone, setIsEditingZone] = useState(false);
    const [zoneForm, setZoneForm] = useState({ name: '', color: '' });
    
    const isDrawing = useRef(false); 

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    const API_URL = import.meta.env.VITE_API_URL;

    // --- CARGA DE DATOS ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPlaces = await axios.get(`${API_URL}/api/places`, config);
                setPlaces(resPlaces.data);
                const resZones = await axios.get(`${API_URL}/api/zones`, config);
                setZones(resZones.data);
            } catch (error) {
                if(error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, []);

    // --- EFECTOS AUXILIARES ---
    useEffect(() => {
        if (selectedPlace) {
            setSelectedZone(null); 
            setIsEditing(false); setIsCreating(false);
            setEditForm({ name: selectedPlace.name, description: selectedPlace.description });
        }
    }, [selectedPlace]);

    useEffect(() => {
        if (selectedZone) {
            setSelectedPlace(null);
            setActiveTab('zones');
            setIsEditingZone(false);
            setZoneForm({ name: selectedZone.name, color: selectedZone.color });
        }
    }, [selectedZone]);

    // --- LÓGICA LUGARES ---
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                if (isDrawing.current) return;
                if (selectedPlace) setSelectedPlace(null);
                if (selectedZone) setSelectedZone(null); 

                const { lat, lng } = e.latlng;
                setNewPlacePos({ lat, lng });
                setIsCreating(true);
                setCreateForm({ name: '', description: '' });
                setActiveTab('places'); 
            },
        });
        return null;
    };

    const saveNewPlace = async () => {
        if (!createForm.name) return alert("El nombre es obligatorio");
        try {
            const body = { name: createForm.name, description: createForm.description || "Sin descripción", latitude: newPlacePos.lat, longitude: newPlacePos.lng, visited: false };
            const res = await axios.post(`${API_URL}/api/places`, body, config);
            setPlaces([...places, res.data]); 
            setIsCreating(false); setNewPlacePos(null);
        } catch (error) { alert('Error al guardar'); }
    };

    const saveEdit = async () => {
        try {
            const res = await axios.put(`${API_URL}/api/places/${selectedPlace._id}`, editForm, config);
            const updated = res.data;
            setPlaces(places.map(p => p._id === updated._id ? updated : p));
            setSelectedPlace(updated);
            setIsEditing(false); 
        } catch (error) { alert("Error"); }
    };

    const deletePlace = async (id) => {
        if (!window.confirm("¿Eliminar lugar?")) return;
        try {
            await axios.delete(`${API_URL}/api/places/${id}`, config);
            setPlaces(places.filter(place => place._id !== id));
            setSelectedPlace(null); 
        } catch (error) { alert('Error'); }
    };

    const toggleVisited = async () => {
        try {
            const res = await axios.put(`${API_URL}/api/places/${selectedPlace._id}`, { visited: !selectedPlace.visited }, config);
            const updated = res.data;
            setPlaces(places.map(p => p._id === updated._id ? updated : p));
            setSelectedPlace(updated);
        } catch (error) { alert("Error"); }
    };

    const handleCreatedZone = async (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const rawLatLngs = layer.getLatLngs()[0];
            const coordinates = rawLatLngs.map(point => [point.lng, point.lat]);
            coordinates.push(coordinates[0]);
            
            setTimeout(async () => {
                const name = prompt("Nombre de esta Zona:");
                if (!name) { e.layer.remove(); return; }
                try {
                    const body = { name, color: '#3388ff', coordinates: [coordinates] };
                    const res = await axios.post(`${API_URL}/api/zones`, body, config);
                    setZones([...zones, res.data]);
                    e.layer.remove();
                } catch (error) { alert('Error al guardar zona'); }
            }, 200);
        }
    };

    const handleEditedZone = async (e) => {
        const layers = e.layers;
        layers.eachLayer(async (layer) => {
            const zoneId = layer.options.id; 
            if(zoneId) {
                const rawLatLngs = layer.getLatLngs()[0];
                const newCoordinates = rawLatLngs.map(point => [point.lng, point.lat]);
                newCoordinates.push(newCoordinates[0]);

                try {
                    const res = await axios.put(`${API_URL}/api/zones/${zoneId}`, { coordinates: [newCoordinates] }, config);
                    const updated = res.data;
                    setZones(prevZones => prevZones.map(z => z._id === updated._id ? updated : z));
                    console.log("Forma actualizada en BD");
                } catch (error) {
                    alert("Error al actualizar la forma de la zona");
                }
            }
        });
    };

    const saveZoneEdit = async () => {
        try {
            const res = await axios.put(`${API_URL}/api/zones/${selectedZone._id}`, zoneForm, config);
            const updated = res.data;
            setZones(zones.map(z => z._id === updated._id ? updated : z));
            setSelectedZone(updated);
            setIsEditingZone(false);
        } catch (error) { alert('Error al actualizar zona'); }
    };

    const deleteZone = async (id) => {
        if (!window.confirm("¿Eliminar esta zona?")) return;
        try {
            await axios.delete(`${API_URL}/api/zones/${id}`, config);
            setZones(zones.filter(z => z._id !== id));
            setSelectedZone(null);
        } catch (error) { alert('Error al eliminar'); }
    };

    const logout = () => { localStorage.removeItem('token'); window.location.href = '/login'; };
    const filteredPlaces = places.filter(place => place.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="home-container">
            <Sidebar 
                activeTab={activeTab} setActiveTab={setActiveTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} logout={logout}
                filteredPlaces={filteredPlaces}
                isCreating={isCreating} createForm={createForm} setCreateForm={setCreateForm} saveNewPlace={saveNewPlace} cancelCreation={() => { setIsCreating(false); setNewPlacePos(null); }}
                selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}
                isEditing={isEditing} setIsEditing={setIsEditing} editForm={editForm} setEditForm={setEditForm} saveEdit={saveEdit}
                toggleVisited={toggleVisited} deletePlace={deletePlace}
                zones={zones} selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                isEditingZone={isEditingZone} setIsEditingZone={setIsEditingZone} zoneForm={zoneForm} setZoneForm={setZoneForm}
                saveZoneEdit={saveZoneEdit} deleteZone={deleteZone}
            />

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer center={[20.0, 0.0]} zoom={3} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                    
                    {selectedPlace && <FlyToLocation center={[selectedPlace.location.coordinates[1], selectedPlace.location.coordinates[0]]} />}
                    <LocationMarker />
                    {isCreating && newPlacePos && <Marker position={newPlacePos} opacity={0.6}><Popup>¡Nuevo lugar aquí!</Popup></Marker>}

                    {places.map(place => (
                        <Marker key={place._id} position={[place.location.coordinates[1], place.location.coordinates[0]]} eventHandlers={{ click: () => setSelectedPlace(place) }}>
                            <Popup>
                                <b>{place.name}</b>
                                <br />
                                {place.description}
                                <br />
                                {place.visited ? "Visitado" : "Pendiente"}
                            </Popup>
                        </Marker>
                    ))}

                    <FeatureGroup>
                        <EditControl 
                            position="topright" 
                            onCreated={handleCreatedZone}
                            onEdited={handleEditedZone}
                            onDrawStart={() => { isDrawing.current = true; }}
                            onDrawStop={() => { setTimeout(() => { isDrawing.current = false; }, 100); }}
                            onEditStart={() => { isDrawing.current = true; }}
                            onEditStop={() => { isDrawing.current = false; }}
                            draw={{ rectangle: false, circle: false, circlemarker: false, marker: false, polyline: false, polygon: true }} 
                        />
                        
                        {zones.map(zone => (
                            <Polygon 
                                key={zone._id} 
                                pathOptions={{ color: zone.color, id: zone._id }} 
                                positions={zone.geometry.coordinates[0].map(coord => [coord[1], coord[0]])} 
                                eventHandlers={{ click: () => setSelectedZone(zone) }}
                            >
                                <Popup>{zone.name}</Popup>
                            </Polygon>
                        ))}
                    </FeatureGroup>

                </MapContainer>
            </div>
        </div>
    );
};

export default Home;