import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { 
  GameState, 
  GameAction, 
  GameActionType, 
  Character,
  CharacterClass,
  Direction,
  GameMap,
  Position,
  PlayerInput,
  EnemyType
} from '../types/game';
import { initialMap } from '../assets/maps/initialMap';

// Начальный персонаж
const initialPlayer: Character = {
  id: 'player',
  position: { x: 400, y: 300 },
  direction: Direction.Down,
  speed: 3,
  health: 100,
  maxHealth: 100,
  mana: 50,
  maxMana: 50,
  isMoving: false,
  currentFrame: 0, // Текущий кадр анимации
  spriteConfig: {
    url: '/assets/sprites/player_walk.png',
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
    scale: 2,
    directions: {
      [Direction.Down]: { row: 0 },
      [Direction.Left]: { row: 1 },
      [Direction.Right]: { row: 2 },
      [Direction.Up]: { row: 3 },
      // Диагональные направления могут использовать основные
      [Direction.UpLeft]: { row: 3 },
      [Direction.UpRight]: { row: 3 },
      [Direction.DownLeft]: { row: 0 },
      [Direction.DownRight]: { row: 0 },
    },
    defaultDirection: Direction.Down,
  },
  inventory: [],
  equipment: {},
  stats: {
    strength: 10,
    dexterity: 10,
    vitality: 10,
    energy: 10,
    resistances: {
      fire: 0,
      cold: 0,
      lightning: 0,
      poison: 0,
    },
    damageBonus: 0,
    attackRating: 50,
    defense: 10,
    blockChance: 0,
    criticalStrikeChance: 5,
  },
  skills: [],
  level: 1,
  experience: 0,
  experienceToNextLevel: 1000,
  characterClass: CharacterClass.Warrior,
};

// Начальное состояние игры
const initialGameState: GameState = {
  player: initialPlayer,
  currentMap: initialMap,
  enemies: [{
    id: 'enemy1',
    name: 'Слизень',
    type: EnemyType.Beast,
    level: 1,
    position: { x: 500, y: 400 },
    direction: Direction.Down,
    isMoving: true,
    speed: 1,
    health: 20,
    maxHealth: 20,
    damage: [2, 4],
    stats: {
      strength: 5,
      dexterity: 3,
      vitality: 4,
      attackRating: 20,
      defense: 5,
      resistances: {
        fire: 0,
        cold: 0,
        lightning: 0,
        poison: 0,
      },
    },
    experience: 10,
    isAggressive: true,
    aggroRange: 100,
    skills: [],
    currentFrame: 0,
    spriteConfig: {
      url: '/assets/sprites/slime_move.png',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 4,
      scale: 1.5,
      defaultDirection: Direction.Down,
    },
  }],
  npcs: [],
  items: [],
  quests: [],
  gameTime: 0,
  isGamePaused: false,
  currentMapId: 'initial',
};

// Начальное состояние ввода
const initialPlayerInput: PlayerInput = {
  moveUp: false,
  moveDown: false,
  moveLeft: false,
  moveRight: false,
  attack: false,
  useSkill1: false,
  useSkill2: false,
  useSkill3: false,
  useSkill4: false,
  usePotion: false,
  openInventory: false,
  openCharacterSheet: false,
  openSkillTree: false,
  openMap: false,
};

// Редьюсер для обработки действий в игре
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.MOVE_PLAYER: {
      const { position, direction, isMoving } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          position,
          direction,
          isMoving
        }
      };
    }
    case GameActionType.ATTACK: {
      // Логика атаки будет реализована позже
      return state;
    }
    case GameActionType.USE_SKILL: {
      // Логика использования навыка будет реализована позже
      return state;
    }
    case GameActionType.TAKE_DAMAGE: {
      const { damage } = action.payload;
      const newHealth = Math.max(0, state.player.health - damage);
      return {
        ...state,
        player: {
          ...state.player,
          health: newHealth
        }
      };
    }
    // Другие обработчики действий будут добавлены позже
    
    case GameActionType.UPDATE_ANIMATION: {
      const { entityId, currentFrame } = action.payload;
      
      if (entityId === 'player') {
        return {
          ...state,
          player: {
            ...state.player,
            currentFrame,
          },
        };
      } else {
        // Обновляем состояние врага
        return {
          ...state,
          enemies: state.enemies.map(enemy => 
            enemy.id === entityId 
              ? { ...enemy, currentFrame } 
              : enemy
          ),
        };
      }
    }
    
    default:
      return state;
  }
}

// Создание контекста игры
interface GameContextType {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  playerInput: PlayerInput;
  setPlayerInput: React.Dispatch<React.SetStateAction<PlayerInput>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Провайдер контекста игры
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [playerInput, setPlayerInput] = useReducer(
    (state: PlayerInput, action: Partial<PlayerInput>) => ({ ...state, ...action }),
    initialPlayerInput
  );

  // Обработка игрового цикла
  useEffect(() => {
    let lastTime = 0;
    let animationFrameId: number;

    const gameLoop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Обновление игровой логики
      updateGame(deltaTime);

      // Запланировать следующий кадр
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Запуск игрового цикла
    animationFrameId = requestAnimationFrame(gameLoop);

    // Очистка при размонтировании
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, playerInput]);

  // Функция обновления игры
  const updateGame = (deltaTime: number) => {
    // Обновление положения игрока на основе ввода
    updatePlayerMovement();
    
    // Обновление анимации
    updateAnimations(deltaTime);
    
    // Здесь будет другая логика обновления игры
  };

  // Обновление движения игрока
  const updatePlayerMovement = () => {
    if (gameState.isGamePaused) return;

    let dx = 0;
    let dy = 0;
    let isMoving = false;
    let direction = gameState.player.direction;

    if (playerInput.moveUp) {
      dy -= gameState.player.speed;
      direction = Direction.Up;
      isMoving = true;
    }
    if (playerInput.moveDown) {
      dy += gameState.player.speed;
      direction = Direction.Down;
      isMoving = true;
    }
    if (playerInput.moveLeft) {
      dx -= gameState.player.speed;
      direction = Direction.Left;
      isMoving = true;
    }
    if (playerInput.moveRight) {
      dx += gameState.player.speed;
      direction = Direction.Right;
      isMoving = true;
    }

    // Диагональные направления
    if (playerInput.moveUp && playerInput.moveLeft) {
      direction = Direction.UpLeft;
    } else if (playerInput.moveUp && playerInput.moveRight) {
      direction = Direction.UpRight;
    } else if (playerInput.moveDown && playerInput.moveLeft) {
      direction = Direction.DownLeft;
    } else if (playerInput.moveDown && playerInput.moveRight) {
      direction = Direction.DownRight;
    }

    if (isMoving) {
      const newPosition: Position = {
        x: gameState.player.position.x + dx,
        y: gameState.player.position.y + dy,
      };

      // Проверка коллизий будет добавлена позже
      // Пока просто обновляем позицию игрока

      dispatch({
        type: GameActionType.MOVE_PLAYER,
        payload: {
          position: newPosition,
          direction,
          isMoving,
        },
      });
    } else if (gameState.player.isMoving) {
      // Остановка движения
      dispatch({
        type: GameActionType.MOVE_PLAYER,
        payload: {
          position: gameState.player.position,
          direction: gameState.player.direction,
          isMoving: false,
        },
      });
    }
  };

  // Обновление анимаций
  const updateAnimations = (deltaTime: number) => {
    // Счетчик для обновления анимаций каждые X миллисекунд
    // static let animationCounter = 0; // Это неправильный синтаксис
    const animationTime = 150; // Время между кадрами в мс
    
    // Обновляем кадр каждые 150мс если есть движение
    if (gameState.player.isMoving) {
      const nextFrame = ((gameState.player.currentFrame || 0) + 1) % (gameState.player.spriteConfig?.frameCount || 4);
      dispatch({
        type: GameActionType.UPDATE_ANIMATION,
        payload: {
          entityId: 'player',
          currentFrame: nextFrame,
        },
      });
    }
    
    // Обновляем кадры анимации врагов
    gameState.enemies.forEach(enemy => {
      if (enemy.isMoving) {
        const nextFrame = ((enemy.currentFrame || 0) + 1) % (enemy.spriteConfig?.frameCount || 4);
        dispatch({
          type: GameActionType.UPDATE_ANIMATION,
          payload: {
            entityId: enemy.id,
            currentFrame: nextFrame,
          },
        });
      }
    });
  };

  return (
    <GameContext.Provider value={{ gameState, dispatch, playerInput, setPlayerInput }}>
      {children}
    </GameContext.Provider>
  );
}

// Хук для использования контекста игры
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}