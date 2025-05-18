import { Enemy as EnemyType, Direction } from '../../types/game';

interface EnemyProps {
  enemy: EnemyType;
}

const Enemy = ({ enemy }: EnemyProps) => {
  const { position, spriteConfig, currentFrame = 0, isMoving, direction } = enemy;
  
  // Если нет конфигурации спрайта, показываем заглушку
  if (!spriteConfig) {
    return (
      <div
        className="enemy"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '32px',
          height: '32px',
          position: 'absolute',
          backgroundColor: '#b30000', // Красный для врага
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)', // Центрирование
          zIndex: 5, // Ниже игрока
        }}
      />
    );
  }
  
  const { url, frameWidth, frameHeight, scale = 1, directions, defaultDirection } = spriteConfig;

  const getBackgroundPosition = () => {
    // Если у врага есть анимации по направлениям
    if (directions) {
      const dirConfig = directions[direction] || directions[defaultDirection || Direction.Down];
      if (dirConfig) {
        const frameToDisplay = isMoving ? currentFrame : 0;
        const xOffset = frameToDisplay * frameWidth;
        const yOffset = dirConfig.row * frameHeight;
        return `-${xOffset}px -${yOffset}px`;
      }
    }
    // Стандартная анимация (один ряд кадров)
    const frameToDisplay = isMoving ? currentFrame : 0;
    const xOffset = frameToDisplay * frameWidth;
    return `-${xOffset}px 0px`;
  };

  const enemyStyle: React.CSSProperties = {
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
    zIndex: 5, // Ниже игрока
  };

  return <div style={enemyStyle} className="enemy-entity" />;
};

export default Enemy;