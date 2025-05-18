import { Position, Direction, SpriteConfig } from '../../types/game';

interface PlayerProps {
  position: Position;
  direction: Direction;
  isMoving: boolean;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  spriteConfig?: SpriteConfig; // Сделали опциональным
  currentFrame?: number; // Сделали опциональным
}

const Player = ({
  position,
  direction,
  isMoving,
  spriteConfig,
  currentFrame = 0, // Значение по умолчанию
}: PlayerProps) => {
  // Если нет конфигурации спрайта, показываем заглушку
  if (!spriteConfig) {
    return (
      <div
        className="player"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '32px',
          height: '32px',
          position: 'absolute',
          backgroundColor: 'red', // Временно, пока нет спрайтов
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)', // Центрирование игрока
          zIndex: 10,
        }}
      >
        {/* Индикатор направления */}
        <div 
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            borderRadius: '50%',
            left: direction.includes('left') ? '0' : 
                  direction.includes('right') ? '100%' : '50%',
            top: direction.includes('up') ? '0' : 
                 direction.includes('down') ? '100%' : '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    );
  }

  const { url, frameWidth, frameHeight, directions, defaultDirection, scale = 1 } = spriteConfig;

  const getBackgroundPosition = () => {
    const dirConfig = directions?.[direction] || directions?.[defaultDirection || Direction.Down];
    if (!dirConfig) return '0px 0px';

    const frameToDisplay = isMoving ? currentFrame : 0; // Если стоит, показываем первый кадр
    const xOffset = frameToDisplay * frameWidth;
    const yOffset = dirConfig.row * frameHeight;
    return `-${xOffset}px -${yOffset}px`;
  };

  const playerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${frameWidth * scale}px`,
    height: `${frameHeight * scale}px`,
    backgroundImage: `url(${url})`,
    backgroundPosition: getBackgroundPosition(),
    backgroundRepeat: 'no-repeat',
    transform: 'translate(-50%, -50%)', // Центрирование спрайта
    imageRendering: 'pixelated', // Для сохранения пиксельного стиля
    zIndex: 10,
  };

  return <div style={playerStyle} className="player-entity" />;
};

export default Player;