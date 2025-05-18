import GameEngine from './components/game/GameEngine';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <GameProvider>
      <GameEngine />
    </GameProvider>
  );
}

export default App;