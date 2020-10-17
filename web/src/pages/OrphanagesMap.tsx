import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';

import Switch from 'react-switch';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
};

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [darkModeMap, setDarkModeMap] = useState(false);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    function handleDarkModeMap() {
        darkModeMap ? setDarkModeMap(false) : setDarkModeMap(true);
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Patos de Minas</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <label className="switch-map-mode">
                <Switch 
                    onChange={handleDarkModeMap} 
                    checked={darkModeMap} 
                    onHandleColor="#15C3D6"
                    offHandleColor="#15C3D6"
                    offColor="#000"
                    onColor="#FFF"
                    checkedIcon={false}
                    uncheckedIcon={false}
                />
            </label>

            <Map
                center={[-18.5807986, -46.520825]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.title.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/${darkModeMap ? 'dark-v10' : 'streets-v11'}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => (
                    <Marker
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                        key={orphanage.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>

            <Link to="orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;