import React, { useEffect, useRef, useState } from 'react';
import './PlatformerGame.css';
import { useNavigate } from 'react-router-dom';

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.velocityX = 0;
    this.velocityY = 0;
    this.jumping = false;
    this.color = '#4a90e2';
  }

  update() {
    // Apply gravity
    this.velocityY += GRAVITY;
    
    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Friction
    this.velocityX *= 0.9;
    
    // Keep player in bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    
    // Ground collision (bottom of canvas)
    if (this.y + this.height > CANVAS_HEIGHT - 20) {
      this.y = CANVAS_HEIGHT - 20 - this.height;
      this.velocityY = 0;
      this.jumping = false;
    }
    
    // Death zone (falling off)
    if (this.y > CANVAS_HEIGHT) {
      return 'gameOver';
    }
  }

  jump() {
    if (!this.jumping) {
      this.velocityY = JUMP_FORCE;
      this.jumping = true;
    }
  }

  moveLeft() {
    this.velocityX = -MOVE_SPEED;
  }

  moveRight() {
    this.velocityX = MOVE_SPEED;
  }

  draw(ctx) {
    // Draw player as a cute character
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add eyes
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + 5, this.y + 8, 8, 8);
    ctx.fillRect(this.x + 17, this.y + 8, 8, 8);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x + 7, this.y + 10, 4, 4);
    ctx.fillRect(this.x + 19, this.y + 10, 4, 4);
  }
}

class Platform {
  constructor(x, y, width, height, type = 'normal') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.color = type === 'goal' ? '#4ade80' : 
                 type === 'moving' ? '#f59e0b' : '#64748b';
    this.moveDirection = 1;
    this.initialX = x;
  }

  update() {
    if (this.type === 'moving') {
      this.x += this.moveDirection * 2;
      if (this.x > this.initialX + 100 || this.x < this.initialX - 100) {
        this.moveDirection *= -1;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    if (this.type === 'goal') {
      // Draw flag on goal platform
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x + this.width/2 - 2, this.y - 30, 4, 30);
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(this.x + this.width/2 + 2, this.y - 30);
      ctx.lineTo(this.x + this.width/2 + 20, this.y - 20);
      ctx.lineTo(this.x + this.width/2 + 2, this.y - 10);
      ctx.closePath();
      ctx.fill();
    }
  }
}

class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.collected = false;
    this.animationTime = 0;
  }

  update() {
    this.animationTime += 0.1;
  }

  draw(ctx) {
    if (!this.collected) {
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      
      // Animated coin
      const scale = 1 + Math.sin(this.animationTime) * 0.1;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
}

function PlatformerGame() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('playing'); // playing, won, gameOver
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const keysPressed = useRef({});
  const gameLoopRef = useRef();
  const playerRef = useRef();
  const platformsRef = useRef([]);
  const coinsRef = useRef([]);

  // Initialize game objects
  const initializeGame = () => {
    playerRef.current = new Player(50, 200);
    
    // Create platforms for level
    platformsRef.current = [
      // Ground
      new Platform(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20),
      
      // Static platforms
      new Platform(150, 320, 100, 15),
      new Platform(300, 270, 100, 15),
      new Platform(450, 220, 80, 15),
      new Platform(250, 150, 100, 15),
      
      // Moving platform
      new Platform(500, 170, 80, 15, 'moving'),
      
      // Goal platform
      new Platform(700, 120, 80, 15, 'goal'),
    ];

    // Create coins
    coinsRef.current = [
      new Coin(190, 290),
      new Coin(340, 240),
      new Coin(480, 190),
      new Coin(290, 120),
      new Coin(600, 140),
    ];

    setScore(0);
    setGameState('playing');
  };

  // Check collision between player and platforms
  const checkPlatformCollisions = (player, platforms) => {
    for (let platform of platforms) {
      if (player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y < platform.y + platform.height &&
          player.y + player.height > platform.y) {
        
        // Check if landing on top of platform
        if (player.velocityY > 0 && player.y < platform.y) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.jumping = false;
          
          // Check if it's the goal platform
          if (platform.type === 'goal') {
            setGameState('won');
          }
        }
      }
    }
  };

  // Check collision with coins
  const checkCoinCollisions = (player, coins) => {
    for (let coin of coins) {
      if (!coin.collected) {
        const distance = Math.sqrt(
          Math.pow(player.x + player.width/2 - coin.x, 2) +
          Math.pow(player.y + player.height/2 - coin.y, 2)
        );
        
        if (distance < coin.radius + 15) {
          coin.collected = true;
          setScore(prev => prev + 10);
        }
      }
    }
  };

  // Game loop
  const gameLoop = () => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const player = playerRef.current;
    const platforms = platformsRef.current;
    const coins = coinsRef.current;

    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background elements
    ctx.fillStyle = '#334155';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(i * 200 + 50, 50, 2, 2);
      ctx.fillRect(i * 200 + 150, 100, 2, 2);
    }

    // Handle input
    if (keysPressed.current['ArrowLeft']) player.moveLeft();
    if (keysPressed.current['ArrowRight']) player.moveRight();
    if (keysPressed.current[' '] || keysPressed.current['ArrowUp']) player.jump();

    // Update game objects
    const gameStatus = player.update();
    if (gameStatus === 'gameOver') {
      setGameState('gameOver');
      return;
    }

    platforms.forEach(platform => platform.update());
    coins.forEach(coin => coin.update());

    // Check collisions
    checkPlatformCollisions(player, platforms);
    checkCoinCollisions(player, coins);

    // Draw everything
    platforms.forEach(platform => platform.draw(ctx));
    coins.forEach(coin => coin.draw(ctx));
    player.draw(ctx);

    // Draw UI
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, CANVAS_WIDTH - 100, 30);

    // Instructions
    ctx.font = '14px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('Use arrow keys to move, Space/Up to jump', 10, CANVAS_HEIGHT - 30);
    ctx.fillText('Reach the green platform to win!', 10, CANVAS_HEIGHT - 10);
  };

  // Set up game loop
  useEffect(() => {
    initializeGame();
    
    const interval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    gameLoopRef.current = interval;

    return () => clearInterval(interval);
  }, [gameState]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
      
      // Prevent space from scrolling
      if (e.key === ' ') {
        e.preventDefault();
      }
      
      // ESC to exit game
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);

  const handleRestart = () => {
    initializeGame();
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Hidden Game</h1>
        <button onClick={handleExit} className="exit-button">
          Exit to Portfolio
        </button>
      </div>
      
      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
        />
        
        {gameState === 'won' && (
          <div className="game-overlay">
            <div className="game-message">
              <h2>🎉 You Won! 🎉</h2>
              <p>Score: {score}</p>
              <button onClick={handleRestart}>Play Again</button>
              <button onClick={handleExit}>Exit</button>
            </div>
          </div>
        )}
        
        {gameState === 'gameOver' && (
          <div className="game-overlay">
            <div className="game-message">
              <h2>Game Over!</h2>
              <p>Score: {score}</p>
              <button onClick={handleRestart}>Try Again</button>
              <button onClick={handleExit}>Exit</button>
            </div>
          </div>
        )}
      </div>
      
      <div className="game-controls">
        <p>🎮 Controls: Arrow Keys to Move | Space/Up to Jump | ESC to Exit</p>
      </div>
    </div>
  );
}

export default PlatformerGame;