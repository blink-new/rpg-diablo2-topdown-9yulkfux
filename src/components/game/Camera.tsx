import { ReactNode, useRef, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

interface CameraProps {
  children: ReactNode;
}

const Camera = ({ children }: CameraProps) => {
  const { gameState } = useGame();
  const cameraRef = useRef<HTMLDivElement>(null);

  // Обновление положения камеры, чтобы следовать за игроком
  useEffect(() => {
    if (!cameraRef.current) return;
    
    const { x, y } = gameState.player.position;
    const cameraElement = cameraRef.current;
    
    // Получаем размеры окна просмотра
    const viewportWidth = cameraElement.offsetWidth;
    const viewportHeight = cameraElement.offsetHeight;
    
    // Вычисляем смещение камеры, чтобы игрок был в центре
    const offsetX = x - viewportWidth / 2;
    const offsetY = y - viewportHeight / 2;
    
    // Устанавливаем положение камеры
    cameraElement.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
  }, [gameState.player.position]);

  return (
    <div className="camera-viewport">
      <div className="camera" ref={cameraRef}>
        {children}
      </div>
    </div>
  );
};

export default Camera;