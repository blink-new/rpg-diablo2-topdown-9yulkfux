import { useEffect, useRef } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Direction, PlayerInput } from '../../types/game';
import Map from './Map';
import Player from './Player';
import Camera from './Camera';
import '../../styles/game.css';

const GameEngine = () => {
  const { gameState, playerInput, setPlayerInput } = useGame();
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Настройка обработчиков клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setPlayerInput({ moveUp: true });
          break;
        case 's':
        case 'ArrowDown':
          setPlayerInput({ moveDown: true });
          break;
        case 'a':
        case 'ArrowLeft':
          setPlayerInput({ moveLeft: true });
          break;
        case 'd':
        case 'ArrowRight':
          setPlayerInput({ moveRight: true });
          break;
        case ' ':
          setPlayerInput({ attack: true });
          break;
        case '1':
          setPlayerInput({ useSkill1: true });
          break;
        case '2':
          setPlayerInput({ useSkill2: true });
          break;
        case '3':
          setPlayerInput({ useSkill3: true });
          break;
        case '4':
          setPlayerInput({ useSkill4: true });
          break;
        case 'q':
          setPlayerInput({ usePotion: true });
          break;
        case 'i':
          setPlayerInput({ openInventory: true });
          break;
        case 'c':
          setPlayerInput({ openCharacterSheet: true });
          break;
        case 'k':
          setPlayerInput({ openSkillTree: true });
          break;
        case 'm':
          setPlayerInput({ openMap: true });
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          setPlayerInput({ moveUp: false });
          break;
        case 's':
        case 'ArrowDown':
          setPlayerInput({ moveDown: false });
          break;
        case 'a':
        case 'ArrowLeft':
          setPlayerInput({ moveLeft: false });
          break;
        case 'd':
        case 'ArrowRight':
          setPlayerInput({ moveRight: false });
          break;
        case ' ':
          setPlayerInput({ attack: false });
          break;
        case '1':
          setPlayerInput({ useSkill1: false });
          break;
        case '2':
          setPlayerInput({ useSkill2: false });
          break;
        case '3':
          setPlayerInput({ useSkill3: false });
          break;
        case '4':
          setPlayerInput({ useSkill4: false });
          break;
        case 'q':
          setPlayerInput({ usePotion: false });
          break;
        case 'i':
          setPlayerInput({ openInventory: false });
          break;
        case 'c':
          setPlayerInput({ openCharacterSheet: false });
          break;
        case 'k':
          setPlayerInput({ openSkillTree: false });
          break;
        case 'm':
          setPlayerInput({ openMap: false });
          break;
      }
    };

    // Добавление обработчиков событий
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Удаление обработчиков событий при размонтировании
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setPlayerInput]);

  return (
    <div className="game-container" ref={gameContainerRef}>
      <Camera>
        <Map map={gameState.currentMap} />
        <Player
          position={gameState.player.position}
          direction={gameState.player.direction}
          isMoving={gameState.player.isMoving}
          health={gameState.player.health}
          maxHealth={gameState.player.maxHealth}
          mana={gameState.player.mana}
          maxMana={gameState.player.maxMana}
        />
        {/* Здесь будут отрисованы противники, NPC и другие объекты */}
      </Camera>
      
      {/* Игровой интерфейс */}
      <div className="game-ui">
        {/* Панель здоровья и маны */}
        <div className="health-mana-panel">
          <div className="health-bar">
            <div 
              className="health-fill" 
              style={{ width: `${(gameState.player.health / gameState.player.maxHealth) * 100}%` }}
            ></div>
            <span className="health-text">{gameState.player.health}/{gameState.player.maxHealth}</span>
          </div>
          <div className="mana-bar">
            <div 
              className="mana-fill" 
              style={{ width: `${(gameState.player.mana / gameState.player.maxMana) * 100}%` }}
            ></div>
            <span className="mana-text">{gameState.player.mana}/{gameState.player.maxMana}</span>
          </div>
        </div>

        {/* Панель навыков */}
        <div className="skills-panel">
          <div className="skill-slot">1</div>
          <div className="skill-slot">2</div>
          <div className="skill-slot">3</div>
          <div className="skill-slot">4</div>
        </div>

        {/* Мини-карта (будет реализована позже) */}
        <div className="mini-map">
          <div className="mini-map-placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default GameEngine;