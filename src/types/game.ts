// Тип для координат
export interface Position {
  x: number;
  y: number;
}

// Конфигурация спрайта
export interface SpriteConfig {
  url: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  scale?: number;
  directions?: Record<Direction, { row: number }>;
  defaultDirection?: Direction;
}

// Тип для персонажа
export interface Character {
  id: string;
  position: Position;
  direction: Direction;
  speed: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  isMoving: boolean;
  spriteConfig?: SpriteConfig; // Добавляем конфигурацию спрайта
  currentFrame?: number; // Текущий кадр анимации
  inventory: Item[];
  equipment: Equipment;
  stats: CharacterStats;
  skills: Skill[];
  level: number;
  experience: number;
  experienceToNextLevel: number;
  characterClass: CharacterClass;
}

// Направления движения
export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  UpLeft = 'up-left',
  UpRight = 'up-right',
  DownLeft = 'down-left',
  DownRight = 'down-right',
}

// Тип для предмета
export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  stats: ItemStats;
  requirements: ItemRequirements;
  icon: string;
  isStackable: boolean;
  quantity: number;
}

// Типы предметов
export enum ItemType {
  Weapon = 'weapon',
  Armor = 'armor',
  Helm = 'helm',
  Shield = 'shield',
  Gloves = 'gloves',
  Boots = 'boots',
  Belt = 'belt',
  Ring = 'ring',
  Amulet = 'amulet',
  Potion = 'potion',
  Scroll = 'scroll',
  Gem = 'gem',
  Rune = 'rune',
  Miscellaneous = 'miscellaneous',
}

// Редкость предметов
export enum ItemRarity {
  Normal = 'normal',
  Magic = 'magic',
  Rare = 'rare',
  Unique = 'unique',
  Set = 'set',
  Crafted = 'crafted',
}

// Статистика предмета
export interface ItemStats {
  damage?: [number, number]; // Минимальный и максимальный урон
  defense?: number;
  strength?: number;
  dexterity?: number;
  vitality?: number;
  energy?: number;
  resistances?: {
    fire?: number;
    cold?: number;
    lightning?: number;
    poison?: number;
  };
  bonuses?: {
    toAllSkills?: number;
    toSpecificSkills?: {
      skillId: string;
      value: number;
    }[];
    lifeSteal?: number;
    manaSteal?: number;
    criticalStrikeChance?: number;
    attackSpeed?: number;
    castRate?: number;
  };
}

// Требования для предмета
export interface ItemRequirements {
  level?: number;
  strength?: number;
  dexterity?: number;
  vitality?: number;
  energy?: number;
}

// Экипировка персонажа
export interface Equipment {
  weapon?: Item;
  offhand?: Item;
  helm?: Item;
  armor?: Item;
  gloves?: Item;
  belt?: Item;
  boots?: Item;
  ring1?: Item;
  ring2?: Item;
  amulet?: Item;
}

// Статистика персонажа
export interface CharacterStats {
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  resistances: {
    fire: number;
    cold: number;
    lightning: number;
    poison: number;
  };
  damageBonus: number;
  attackRating: number;
  defense: number;
  blockChance: number;
  criticalStrikeChance: number;
}

// Умения персонажа
export interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  manaCost: number;
  cooldown: number;
  damage?: [number, number];
  areaOfEffect?: number;
  icon: string;
  type: SkillType;
  element?: Element;
}

// Тип умения
export enum SkillType {
  Passive = 'passive',
  Active = 'active',
  Aura = 'aura',
}

// Элементы урона
export enum Element {
  Physical = 'physical',
  Fire = 'fire',
  Cold = 'cold',
  Lightning = 'lightning',
  Poison = 'poison',
  Magic = 'magic',
}

// Классы персонажей
export enum CharacterClass {
  Warrior = 'warrior',
  Rogue = 'rogue',
  Sorcerer = 'sorcerer',
  Paladin = 'paladin',
  Necromancer = 'necromancer',
}

// Тип для игровой карты
export interface GameMap {
  id: string;
  name: string;
  width: number;
  height: number;
  tileSize: number;
  layers: MapLayer[];
  entities: Entity[];
  exits: MapExit[];
  spawnPoints: SpawnPoint[];
}

// Слой карты
export interface MapLayer {
  id: string;
  name: string;
  tiles: number[][];
  isCollision?: boolean;
  isBackground?: boolean;
}

// Сущность на карте
export interface Entity {
  id: string;
  type: EntityType;
  position: Position;
  properties?: Record<string, any>;
}

// Тип сущности
export enum EntityType {
  Enemy = 'enemy',
  NPC = 'npc',
  Chest = 'chest',
  Portal = 'portal',
  Item = 'item',
}

// Выход с карты
export interface MapExit {
  id: string;
  position: Position;
  size: { width: number; height: number };
  targetMapId: string;
  targetPosition: Position;
}

// Точка появления
export interface SpawnPoint {
  id: string;
  position: Position;
  type: SpawnPointType;
}

// Тип точки появления
export enum SpawnPointType {
  Player = 'player',
  Enemy = 'enemy',
  NPC = 'npc',
}

// Состояние игры
export interface GameState {
  player: Character;
  currentMap: GameMap;
  enemies: Enemy[];
  npcs: NPC[];
  items: DroppedItem[];
  quests: Quest[];
  gameTime: number;
  isGamePaused: boolean;
  currentMapId: string;
}

// Противник
export interface Enemy {
  id: string;
  name: string;
  type: EnemyType;
  level: number;
  position: Position;
  direction: Direction;
  isMoving: boolean;
  speed: number;
  health: number;
  maxHealth: number;
  damage: [number, number];
  stats: EnemyStats;
  spriteConfig?: SpriteConfig; // Добавляем конфигурацию спрайта
  currentFrame?: number; // Текущий кадр анимации
  loot?: LootTable;
  experience: number;
  isAggressive: boolean;
  aggroRange: number;
  skills: Skill[];
  element?: Element;
  immunities?: Element[];
  isElite?: boolean;
  isUnique?: boolean;
}

// Тип противника
export enum EnemyType {
  Undead = 'undead',
  Demon = 'demon',
  Beast = 'beast',
  Human = 'human',
  Insect = 'insect',
}

// Статистика противника
export interface EnemyStats {
  strength: number;
  dexterity: number;
  vitality: number;
  attackRating: number;
  defense: number;
  resistances: {
    fire: number;
    cold: number;
    lightning: number;
    poison: number;
  };
}

// Таблица добычи
export interface LootTable {
  gold?: [number, number];
  items?: {
    itemId: string;
    chance: number;
  }[];
}

// Упавший предмет
export interface DroppedItem {
  id: string;
  item: Item;
  position: Position;
}

// NPC
export interface NPC {
  id: string;
  name: string;
  type: NPCType;
  position: Position;
  direction: Direction;
  isInteractable: boolean;
  interactionRadius: number;
  dialogues: Dialogue[];
  shop?: Shop;
  quests?: string[]; // ID квестов, которые может выдать NPC
}

// Тип NPC
export enum NPCType {
  Merchant = 'merchant',
  Blacksmith = 'blacksmith',
  Healer = 'healer',
  QuestGiver = 'quest-giver',
  Trainer = 'trainer',
}

// Диалог
export interface Dialogue {
  id: string;
  text: string;
  responses?: DialogueResponse[];
}

// Ответ в диалоге
export interface DialogueResponse {
  id: string;
  text: string;
  nextDialogueId?: string;
  action?: DialogueAction;
}

// Действие в диалоге
export interface DialogueAction {
  type: DialogueActionType;
  data?: Record<string, any>;
}

// Тип действия в диалоге
export enum DialogueActionType {
  StartQuest = 'start-quest',
  CompleteQuest = 'complete-quest',
  OpenShop = 'open-shop',
  GiveItem = 'give-item',
  Teleport = 'teleport',
}

// Магазин
export interface Shop {
  id: string;
  name: string;
  items: ShopItem[];
}

// Предмет в магазине
export interface ShopItem {
  item: Item;
  price: number;
  quantity: number;
}

// Квест
export interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: QuestStatus;
  requiredLevel?: number;
  requiredQuests?: string[]; // ID квестов, которые нужно выполнить перед этим
}

// Цель квеста
export interface QuestObjective {
  id: string;
  description: string;
  type: QuestObjectiveType;
  target: string; // ID цели, например, ID предмета или монстра
  required: number;
  current: number;
  isCompleted: boolean;
}

// Тип цели квеста
export enum QuestObjectiveType {
  KillEnemy = 'kill-enemy',
  CollectItem = 'collect-item',
  InteractWithNPC = 'interact-with-npc',
  ReachLocation = 'reach-location',
}

// Награда за квест
export interface QuestReward {
  experience: number;
  gold: number;
  items?: Item[];
  skills?: Skill[];
}

// Статус квеста
export enum QuestStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Completed = 'completed',
  Failed = 'failed',
}

// Настройки игры
export interface GameSettings {
  soundVolume: number;
  musicVolume: number;
  effectsVolume: number;
  showFPS: boolean;
  showDamage: boolean;
  showMinimap: boolean;
  difficultyLevel: DifficultyLevel;
}

// Уровень сложности
export enum DifficultyLevel {
  Normal = 'normal',
  Nightmare = 'nightmare',
  Hell = 'hell',
}

// Тип для входных данных игрока
export interface PlayerInput {
  moveUp: boolean;
  moveDown: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  attack: boolean;
  useSkill1: boolean;
  useSkill2: boolean;
  useSkill3: boolean;
  useSkill4: boolean;
  usePotion: boolean;
  openInventory: boolean;
  openCharacterSheet: boolean;
  openSkillTree: boolean;
  openMap: boolean;
}

// Тип для действия в игре
export interface GameAction {
  type: GameActionType;
  payload?: any;
}

// Типы действий в игре
export enum GameActionType {
  MOVE_PLAYER = 'MOVE_PLAYER',
  ATTACK = 'ATTACK',
  USE_SKILL = 'USE_SKILL',
  TAKE_DAMAGE = 'TAKE_DAMAGE',
  USE_ITEM = 'USE_ITEM',
  EQUIP_ITEM = 'EQUIP_ITEM',
  UNEQUIP_ITEM = 'UNEQUIP_ITEM',
  PICK_UP_ITEM = 'PICK_UP_ITEM',
  DROP_ITEM = 'DROP_ITEM',
  INTERACT_WITH_NPC = 'INTERACT_WITH_NPC',
  COMPLETE_OBJECTIVE = 'COMPLETE_OBJECTIVE',
  COMPLETE_QUEST = 'COMPLETE_QUEST',
  CHANGE_MAP = 'CHANGE_MAP',
  GAIN_EXPERIENCE = 'GAIN_EXPERIENCE',
  LEVEL_UP = 'LEVEL_UP',
  SPEND_STAT_POINT = 'SPEND_STAT_POINT',
  LEARN_SKILL = 'LEARN_SKILL',
  UPGRADE_SKILL = 'UPGRADE_SKILL',
  BUY_ITEM = 'BUY_ITEM',
  SELL_ITEM = 'SELL_ITEM',
  SAVE_GAME = 'SAVE_GAME',
  LOAD_GAME = 'LOAD_GAME',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
  TOGGLE_PAUSE = 'TOGGLE_PAUSE',
  UPDATE_ANIMATION = 'UPDATE_ANIMATION', // Добавлен тип для обновления анимации
}