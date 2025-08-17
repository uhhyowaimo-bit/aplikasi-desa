'use client';

import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style, Fill, Stroke, Text as OLText } from 'ol/style';
import Overlay from 'ol/Overlay';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Extent, extend } from 'ol/extent';

// === DATA LOKASI DESA (edit sesuka hati) ===


const villageLocations = [
  { id: 1, name: 'Desa Kampale', lon: 119.8872, lat: -3.8017, info: 'Desa Kampale terletak di wilayah …' },

];

export default function PetaDesa() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const popupEl = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapEl.current) return;

    // Base layer
    const base = new TileLayer({ source: new OSM() });

    // Vector source & features
    const source = new VectorSource();
    const extent: Extent = [Infinity, Infinity, -Infinity, -Infinity];

    const markerStyle = new Style({
      image: new Icon({
        src: '/marker.png',          // letakkan marker.png di /public
        anchor: [0.5, 1],
        scale: 1,
      }),
    });

    villageLocations.forEach((v) => {
      const coord = fromLonLat([v.lon, v.lat]); // OL pakai WebMercator internal
      const f = new Feature({
        geometry: new Point(coord),
        name: v.name,
        info: v.info,
      });
      f.setStyle([
        markerStyle,
        // Label kecil (opsional)
        new Style({
          text: new OLText({
            text: v.name,
            offsetY: -28,
            font: '12px Arial',
            fill: new Fill({ color: '#111' }),
            stroke: new Stroke({ color: 'white', width: 3 }),
          }),
        }),
      ]);
      source.addFeature(f);
      extend(extent, f.getGeometry()!.getExtent());
    });

    const vector = new VectorLayer({ source });

    // Popup overlay
    const overlay = new Overlay({
      element: popupEl.current!,
      autoPan: { animation: { duration: 200 } },
      offset: [0, -28],
      positioning: 'bottom-center',
      stopEvent: true,
    });
    overlayRef.current = overlay;

    // Map init
    const map = new Map({
      target: mapEl.current,
      layers: [base, vector],
      view: new View({
        center: fromLonLat([villageLocations[0].lon, villageLocations[0].lat]),
        zoom: 13,
      }),
      overlays: [overlay],
    });
    mapRef.current = map;

    // Fit ke semua marker (kalau lebih dari satu)
    if (isFinite(extent[0])) {
      map.getView().fit(extent, { padding: [40, 40, 40, 40], maxZoom: 16, duration: 300 });
    }

    // Klik fitur → popup
    map.on('singleclick', (evt) => {
      overlay.setPosition(undefined);
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const name = feature.get('name');
        const info = feature.get('info');
        if (popupEl.current) {
          popupEl.current.innerHTML = `
            <div style="min-width:180px;max-width:240px">
              <div style="font-weight:bold;margin-bottom:4px">${name ?? ''}</div>
              <div style="font-size:13px;line-height:1.35">${info ?? ''}</div>
            </div>
          `;
        }
        overlay.setPosition(evt.coordinate);
        return true; // stop iterasi
      });
    });

    // Cleanup
    return () => {
      map.setTarget(undefined);
      mapRef.current = null;
      overlayRef.current = null;
    };
  }, []);

  return (
    <div style={{ width: '100%', height: 400, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
      {/* Container Map */}
      <div ref={mapEl} style={{ width: '100%', height: '100%' }} />
      {/* Popup */}
      <div
        ref={popupEl}
        style={{
          position: 'absolute',
          background: 'white',
          color: '#111',
          borderRadius: 8,
          boxShadow: '0 6px 18px rgba(0,0,0,.2)',
          padding: '8px 10px',
          transform: 'translate(-50%, -100%)',
          pointerEvents: 'auto',
        }}
      />
    </div>
  );
}
