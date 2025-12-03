import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const recommendedPlaces = [
        {
            name: "Torre Eiffel",
            description: "Icono de París y una de las estructuras más reconocidas del mundo.",
            latitude: 48.8584,
            longitude: 2.2945,
            image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Chichén Itzá",
            description: "Antigua ciudad maya conocida por la pirámide de Kukulkán.",
            latitude: 20.6843,
            longitude: -88.5678,
            image: "https://images.unsplash.com/photo-1695385246146-1e12a7479410?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Pirámides de Egipto",
            description: "Las majestuosas pirámides de Giza, testigos de la antigüedad faraónica.",
            latitude: 29.9792,
            longitude: 31.1342,
            image: "https://images.unsplash.com/photo-1570026517541-258404ea3bfc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Gran Muralla China",
            description: "Antigua fortificación china construida para proteger el imperio.",
            latitude: 40.4319,
            longitude: 116.5704,
            image: "https://images.unsplash.com/photo-1608037521244-f1c6c7635194?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Cristo Redentor",
            description: "Monumento icónico que se eleva sobre Río de Janeiro.",
            latitude: -22.9519,
            longitude: -43.2105,
            image: "https://images.unsplash.com/photo-1693497159317-4c2107c5aeee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Machu Picchu",
            description: "Antigua ciudad inca en los Andes peruanos. Una maravilla del mundo.",
            latitude: -13.1631,
            longitude: -72.5450,
            image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Monte Fuji",
            description: "El monte sagrado de Japón, famoso por su forma perfecta.",
            latitude: 35.3606,
            longitude: 138.7274,
            image: "https://images.unsplash.com/photo-1618278942403-e973260cc425?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Tokio",
            description: "Ciudad vibrante y futurista, corazón tecnológico de Japón.",
            latitude: 35.6895,
            longitude: 139.6917,
            image: "https://images.unsplash.com/photo-1544768784-2d876c85ff15?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Nueva York",
            description: "La ciudad que nunca duerme, llena de cultura y rascacielos.",
            latitude: 40.7128,
            longitude: -74.0060,
            image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Los Ángeles",
            description: "Ciudad de entretenimiento, playas soleadas y Hollywood.",
            latitude: 34.0522,
            longitude: -118.2437,
            image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Las Vegas",
            description: "Capital mundial del entretenimiento y los casinos.",
            latitude: 36.1699,
            longitude: -115.1398,
            image: "https://images.unsplash.com/photo-1516975698824-571e2c952dbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Miami",
            description: "Ciudad costera famosa por sus playas, cultura latina y vida nocturna.",
            latitude: 25.7617,
            longitude: -80.1918,
            image: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Coliseo Romano",
            description: "Anfiteatro icónico del Imperio Romano en el corazón de Roma.",
            latitude: 41.8902,
            longitude: 12.4922,
            image: "https://plus.unsplash.com/premium_photo-1661963952208-2db3512ef3de?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Madrid",
            description: "Capital vibrante de España, llena de arte, cultura y vida urbana.",
            latitude: 40.4168,
            longitude: -3.7038,
            image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Barcelona",
            description: "Ciudad mediterránea con arquitectura única y energía creativa.",
            latitude: 41.3851,
            longitude: 2.1734,
            image: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const handleAdd = async (place) => {
        try {
            const config = { headers: { 'x-auth-token': token } };
            await axios.post('http://localhost:4000/api/places', {
                name: place.name,
                description: place.description,
                latitude: place.latitude,
                longitude: place.longitude,
                visited: false
            }, config);

            alert(`¡${place.name} agregado a tu mapa!`);
        } catch (error) {
            alert("Error al agregar (tal vez ya expiró tu sesión)");
        }
    };

    return (
        <div className="recom-container">
            <div className="recom-wrapper">

                <div className="recom-header">
                    <button 
                        className="recom-back-btn"
                        onClick={() => navigate('/')}
                    >
                        ⬅ Volver
                    </button>

                    <h1 className="recom-title">Destinos Recomendados</h1>
                </div>

                <div className="recom-grid">
                    {recommendedPlaces.map((place, index) => (
                        <div key={index} className="recom-card">
                            
                            <img src={place.image} alt={place.name} className="recom-img" />

                            <div className="recom-card-body">
                                <h3 className="recom-card-title">{place.name}</h3>
                                <p className="recom-card-desc">{place.description}</p>

                                <button 
                                    className="recom-add-btn"
                                    onClick={() => handleAdd(place)}
                                >
                                    Agregar Lugar
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Recommendations;
