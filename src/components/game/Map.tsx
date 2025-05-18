import { GameMap } from '../../types/game';
import { useRef, useEffect } from 'react';

interface MapProps {
  map: GameMap;
}

const Map = ({ map }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Отрисовка тайлов карты
  useEffect(() => {
    if (!mapRef.current) return;

    // В будущем здесь будет функция для отрисовки тайлов
    // Сейчас просто отображаем простую сетку для демонстрации
    const mapElement = mapRef.current;
    mapElement.style.width = `${map.width * map.tileSize}px`;
    mapElement.style.height = `${map.height * map.tileSize}px`;
    mapElement.style.backgroundSize = `${map.tileSize}px ${map.tileSize}px`;
    mapElement.style.backgroundImage = `linear-gradient(to right, #444 1px, transparent 1px), 
                                        linear-gradient(to bottom, #444 1px, transparent 1px)`;
    mapElement.style.backgroundColor = '#2a2a2a';
  }, [map]);

  return (
    <div className="game-map" ref={mapRef}>
      {/* В будущем здесь будут отрисованы объекты карты */}
      {map.entities.map((entity) => (
        <div
          key={entity.id}
          className={`map-entity entity-${entity.type}`}
          style={{
            left: `${entity.position.x}px`,
            top: `${entity.position.y}px`,
            width: `${map.tileSize}px`,
            height: `${map.tileSize}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Map;