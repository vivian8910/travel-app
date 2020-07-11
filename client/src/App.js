import React from 'react';
import { useState, useEffect } from 'react';
import { listLogEntries } from './Api';
import LogEntryForm from './LogEntryForm';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const App = () =>  {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getLogEntries = async() => {
    const logEntriesResult = await listLogEntries();
    setLogEntries(logEntriesResult);
  }

  useEffect(() => {
    getLogEntries();
  }, []);

  const showAddMarkerPopUp = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    })
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/yangx/ckbv3bqmt0w911irv2vblrg2p'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopUp}
    >
      {
        logEntries.map(entry => (
          <div key={entry._id}>
          <Marker 
            latitude={entry.latitude} 
            longitude={entry.longitude}
           >
            <img 
              className='marker' 
              style={{
                width: `calc(1vmin * ${viewport.zoom})`,
                height: `calc(1vmin * ${viewport.zoom})`, 
              }}
              src='https://i.imgur.com/y0G5YTX.png' 
              alt='marker' 
              onClick={() => setShowPopup({
                [entry._id]: true
              })}
            />
          </Marker>
          {
            showPopup[entry._id] && 
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top" 
                sortByDepth={true}
              >
                <div className='popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                </div>
              </Popup>
          }
          </div>
        ))
      }
      {
        addEntryLocation && 
        <>
        <Marker 
          latitude={addEntryLocation.latitude} 
          longitude={addEntryLocation.longitude}
        >
          <img 
            className='marker' 
            style={{
              width: `calc(1vmin * ${viewport.zoom})`,
              height: `calc(1vmin * ${viewport.zoom})`, 
            }}
            src='https://i.imgur.com/y0G5YTX.png' 
            alt='marker' 
          />
        </Marker> 
        <Popup
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={() => setAddEntryLocation(null)}
          anchor="top" 
        >
          <div className='popup'>
            <LogEntryForm 
              onClose={() => {
                setAddEntryLocation(null);
                getLogEntries();
              }}
              location={addEntryLocation}
            />
          </div>
        </Popup>
        </>
      }
    </ReactMapGL>
  );
}

export default App;
