// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. IMPORTAMOS ESTO

const Sidebar = ({ 
    // Props Globales
    activeTab, setActiveTab, logout, searchTerm, setSearchTerm,
    
    // Props Lugares
    filteredPlaces,
    isCreating, createForm, setCreateForm, saveNewPlace, cancelCreation,
    selectedPlace, setSelectedPlace,
    isEditing, setIsEditing, editForm, setEditForm, saveEdit,
    toggleVisited, deletePlace,

    // Props Zonas
    zones, selectedZone, setSelectedZone,
    isEditingZone, setIsEditingZone, zoneForm, setZoneForm,
    saveZoneEdit, deleteZone
}) => {
    
    const navigate = useNavigate(); // <--- 2. INICIALIZAMOS EL HOOK AQUÍ

    // --- 1. MODO CREACIÓN (Lugar) ---
    if (isCreating) {
        return (
            <div className="sidebar fade-in">
                <h2 className="sidebar-title" style={{color: '#4dabf7'}}>Nuevo Lugar</h2>
                <div style={{marginTop: '20px'}}>
                    <label>Nombre:</label>
                    <input className="dark-input" autoFocus type="text"
                        value={createForm.name} onChange={(e) => setCreateForm({...createForm, name: e.target.value})} 
                    />
                    <label>Descripción:</label>
                    <textarea className="dark-input" rows="4"
                        value={createForm.description} onChange={(e) => setCreateForm({...createForm, description: e.target.value})} 
                    />
                    <div className="btn-group">
                        <button className="btn btn-success" onClick={saveNewPlace}>Guardar</button>
                        <button className="btn btn-cancel" onClick={cancelCreation}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }

    // --- 2. MODO DETALLE ZONA ---
    if (selectedZone) {
        return (
            <div className="sidebar fade-in">
                <button className="btn-back" onClick={() => setSelectedZone(null)}>⬅ Volver</button>
                
                {isEditingZone ? (
                    <div>
                        <h2 className="sidebar-title">Editar Zona</h2>
                        <label>Nombre:</label>
                        <input className="dark-input" type="text"
                            value={zoneForm.name} onChange={(e) => setZoneForm({...zoneForm, name: e.target.value})} 
                        />
                        <label>Color:</label>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
                            <input type="color" 
                                value={zoneForm.color} onChange={(e) => setZoneForm({...zoneForm, color: e.target.value})}
                                style={{border: 'none', width: '50px', height: '40px', cursor: 'pointer', background: 'transparent'}}
                            />
                            <span style={{fontSize: '0.9rem', color: '#aaa'}}>{zoneForm.color}</span>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={saveZoneEdit}>Actualizar</button>
                            <button className="btn btn-danger" onClick={() => setIsEditingZone(false)}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className="sidebar-title">{selectedZone.name}</h1>
                        <div style={{
                            width:'100%', height:'30px', background: selectedZone.color, 
                            marginBottom:'20px', borderRadius:'4px', border:'1px solid #fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            textShadow: '0px 0px 4px black', fontSize: '0.8rem'
                        }}>Color Actual</div>
                        
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <button className="btn btn-primary" onClick={() => setIsEditingZone(true)}>Editar </button>
                            <button className="btn btn-danger" onClick={() => deleteZone(selectedZone._id)}>Eliminar Zona</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // --- 3. MODO DETALLE LUGAR ---
    if (selectedPlace) {
        return (
            <div className="sidebar fade-in">
                <button className="btn-back" onClick={() => setSelectedPlace(null)}>⬅ Volver</button>

                {isEditing ? (
                    <div>
                        <h2 className="sidebar-title">Editando Lugar</h2>
                        <label>Nombre:</label>
                        <input className="dark-input" type="text"
                            value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                        />
                        <label>Descripción:</label>
                        <textarea className="dark-input" rows="4"
                            value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} 
                        />
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={saveEdit}>Actualizar</button>
                            <button className="btn btn-danger" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="sidebar-title" style={{fontSize: '1.8rem'}}>{selectedPlace.name}</h1>
                        <p style={{color: '#aaa', minHeight: '40px'}}>{selectedPlace.description || "Sin descripción"}</p>
                        
                        <div className="status-card" onClick={toggleVisited}
                             style={{
                                 background: selectedPlace.visited ? 'rgba(40, 167, 69, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                 border: 1px solid ${selectedPlace.visited ? '#28a745' : '#666'}
                             }}>
                            <span>Estado: <strong className={selectedPlace.visited ? "text-visited" : "text-pending"}>
                                {selectedPlace.visited ? "Visitado" : "Por visitar"}
                            </strong></span>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Editar Información</button>
                            <button className="btn btn-danger" onClick={() => deletePlace(selectedPlace._id)}>Eliminar Lugar</button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // --- 4. VISTA PRINCIPAL (LISTAS) ---
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Mis Viajes</h2>
            
            
            {/* PESTAÑAS */}
            <div className="btn-group" style={{marginBottom: '20px'}}>
                <button 
                    className={btn ${activeTab === 'places' ? 'btn-primary' : 'btn-cancel'}}
                    onClick={() => setActiveTab('places')}
                >
                    Lugares
                </button>
                <button 
                    className={btn ${activeTab === 'zones' ? 'btn-primary' : 'btn-cancel'}}
                    onClick={() => setActiveTab('zones')}
                >
                    Zonas
                </button>
            </div>

            <input className="dark-input" type="text" placeholder={activeTab === 'places' ? "Buscar lugar..." : "Buscar zona..."}
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
            />
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
                
                {/* LISTA DE LUGARES */}
                {activeTab === 'places' && (
                    <>
                        {filteredPlaces.length === 0 && <p style={{color:'#777', textAlign: 'center'}}>Haz clic en el mapa para agregar.</p>}
                        {filteredPlaces.map(place => (
                            <div key={place._id} className="list-item" onClick={() => setSelectedPlace(place)}
                                style={{ background: place.visited ? 'rgba(40, 167, 69, 0.15)' : 'rgba(255, 255, 255, 0.03)' }}>
                                <strong style={{display: 'block', color: 'white'}}>{place.name}</strong>
                                <span className={place.visited ? "text-visited" : "text-pending"}>
                                    {place.visited ? "Visitado" : "Pendiente"}
                                </span>
                            </div>
                        ))}
                    </>
                )}

                {/* LISTA DE ZONAS */}
                {activeTab === 'zones' && (
                    <>
                        {(!zones || zones.length === 0) && <p style={{color:'#777', textAlign: 'center'}}>Usa la herramienta para dibujar.</p>}
                        {zones && zones.filter(z => z.name.toLowerCase().includes(searchTerm.toLowerCase())).map(zone => (
                            <div key={zone._id} className="list-item" onClick={() => setSelectedZone(zone)}
                                style={{ borderLeft: 5px solid ${zone.color} }}>
                                <strong style={{display: 'block', color: 'white'}}>{zone.name}</strong>
                                <span style={{fontSize: '0.8rem', color: '#aaa'}}>Zona</span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* BOTÓN RECOMENDACIONES (3ra Vista) */}
            <button 
                className="btn btn-recommendations"
                onClick={() => navigate('/recommendations')} 
            >
                Ver Recomendaciones
            </button>
            
            <button className="btn btn-logout" onClick={logout}>Cerrar Sesión</button>
        </div>
    );
};

export default Sidebar;