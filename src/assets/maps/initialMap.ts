import { GameMap, EntityType, SpawnPointType } from '../../types/game';

export const initialMap: GameMap = {
  id: 'initial',
  name: 'Тристрам',
  width: 50,
  height: 50,
  tileSize: 32,
  layers: [
    {
      id: 'background',
      name: 'Фон',
      tiles: Array(50).fill([]).map(() => Array(50).fill(0)),
      isBackground: true,
    },
    {
      id: 'ground',
      name: 'Земля',
      tiles: Array(50).fill([]).map(() => Array(50).fill(1)),
    },
    {
      id: 'obstacles',
      name: 'Препятствия',
      tiles: Array(50).fill([]).map(() => Array(50).fill(0)),
      isCollision: true,
    },
  ],
  entities: [
    {
      id: 'chest1',
      type: EntityType.Chest,
      position: { x: 500, y: 400 },
      properties: {
        isLocked: false,
        loot: {
          gold: [10, 20],
          items: [
            {
              itemId: 'potion_health_minor',
              chance: 0.8,
            },
          ],
        },
      },
    },
  ],
  exits: [
    {
      id: 'exit_to_wilderness',
      position: { x: 800, y: 600 },
      size: { width: 64, height: 64 },
      targetMapId: 'wilderness',
      targetPosition: { x: 100, y: 100 },
    },
  ],
  spawnPoints: [
    {
      id: 'player_spawn',
      position: { x: 400, y: 300 },
      type: SpawnPointType.Player,
    },
    {
      id: 'enemy_spawn_1',
      position: { x: 600, y: 400 },
      type: SpawnPointType.Enemy,
    },
  ],
};