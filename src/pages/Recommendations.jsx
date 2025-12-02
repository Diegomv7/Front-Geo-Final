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
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Chichén Itzá",
            description: "Antigua ciudad maya conocida por la pirámide de Kukulkán.",
            latitude: 20.6843,
            longitude: -88.5678,
            image: "https://images.unsplash.com/photo-1542897647-60687bb1b3e1?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Pirámides de Egipto",
            description: "Las majestuosas pirámides de Giza, testigos de la antigüedad faraónica.",
            latitude: 29.9792,
            longitude: 31.1342,
            image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Gran Muralla China",
            description: "Antigua fortificación china construida para proteger el imperio.",
            latitude: 40.4319,
            longitude: 116.5704,
            image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Cristo Redentor",
            description: "Monumento icónico que se eleva sobre Río de Janeiro.",
            latitude: -22.9519,
            longitude: -43.2105,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Machu Picchu",
            description: "Antigua ciudad inca en los Andes peruanos. Una maravilla del mundo.",
            latitude: -13.1631,
            longitude: -72.5450,
            image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Monte Fuji",
            description: "El monte sagrado de Japón, famoso por su forma perfecta.",
            latitude: 35.3606,
            longitude: 138.7274,
            image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Tokio",
            description: "Ciudad vibrante y futurista, corazón tecnológico de Japón.",
            latitude: 35.6895,
            longitude: 139.6917,
            image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Nueva York",
            description: "La ciudad que nunca duerme, llena de cultura y rascacielos.",
            latitude: 40.7128,
            longitude: -74.0060,
            image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Los Ángeles",
            description: "Ciudad de entretenimiento, playas soleadas y Hollywood.",
            latitude: 34.0522,
            longitude: -118.2437,
            image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Las Vegas",
            description: "Capital mundial del entretenimiento y los casinos.",
            latitude: 36.1699,
            longitude: -115.1398,
            image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Miami",
            description: "Ciudad costera famosa por sus playas, cultura latina y vida nocturna.",
            latitude: 25.7617,
            longitude: -80.1918,
            image: "https://images.unsplash.com/photo-1504272017915-32d1bd315a59?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Coliseo Romano",
            description: "Anfiteatro icónico del Imperio Romano en el corazón de Roma.",
            latitude: 41.8902,
            longitude: 12.4922,
            image: "https://images.unsplash.com/photo-1506801310323-534be5e7bb3e?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Madrid",
            description: "Capital vibrante de España, llena de arte, cultura y vida urbana.",
            latitude: 40.4168,
            longitude: -3.7038,
            image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Barcelona",
            description: "Ciudad mediterránea con arquitectura única y energía creativa.",
            latitude: 41.3851,
            longitude: 2.1734,
            image: "https://images.unsplash.com/photo-1523633589114-89d7f1a2ccc1?auto=format&fit=crop&w=400&q=80"
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
