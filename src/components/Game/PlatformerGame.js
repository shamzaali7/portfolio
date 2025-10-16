import React, { useEffect, useRef, useState, useCallback } from 'react';
import './PlatformerGame.css';
import { useNavigate } from 'react-router-dom';

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

// Level Generator Class
class LevelGenerator {
  static generateLevel(levelNumber) {
    const difficulty = Math.min(levelNumber, 10); // Cap difficulty at level 10
    const platforms = [];
    const coins = [];
    const hazards = [];
    const powerUps = [];
    
    // Always add ground
    platforms.push({
      x: 0,
      y: CANVAS_HEIGHT - 20,
      width: CANVAS_WIDTH,
      height: 20,
      type: 'ground'
    });
    
    // Generate a guaranteed path to the goal
    const pathPoints = this.generatePath(difficulty);
    
    // Create platforms along the path
    pathPoints.forEach((point, index) => {
      if (index === pathPoints.length - 1) {
        // Goal platform
        platforms.push({
          x: point.x,
          y: point.y,
          width: 80,
          height: 15,
          type: 'goal'
        });
      } else {
        // Regular or moving platform
        const isMoving = Math.random() < (difficulty * 0.05) && index > 0;
        platforms.push({
          x: point.x,
          y: point.y,
          width: 80 + Math.random() * 40,
          height: 15,
          type: isMoving ? 'moving' : 'normal'
        });
        
        // Add coin above platform (70% chance)
        if (Math.random() < 0.7) {
          coins.push({
            x: point.x + 40,
            y: point.y - 30
          });
        }
      }
    });
    
    // Add extra platforms for alternate routes
    const extraPlatforms = Math.floor(difficulty * 1.5);
    for (let i = 0; i < extraPlatforms; i++) {
      const x = Math.random() * (CANVAS_WIDTH - 100) + 50;
      const y = Math.random() * (CANVAS_HEIGHT - 150) + 100;
      platforms.push({
        x: x,
        y: y,
        width: 60 + Math.random() * 60,
        height: 15,
        type: Math.random() < 0.2 ? 'moving' : 'normal'
      });
    }
    
    // Add hazards based on difficulty
    const hazardCount = Math.floor(difficulty * 0.7);
    for (let i = 0; i < hazardCount; i++) {
      hazards.push({
        x: 100 + Math.random() * (CANVAS_WIDTH - 200),
        y: 100 + Math.random() * (CANVAS_HEIGHT - 200),
        width: 30,
        height: 30,
        type: 'spike'
      });
    }
    
    // Add power-ups (rare)
    if (Math.random() < 0.3) {
      const powerUpTypes = ['doubleJump', 'speedBoost', 'invincibility'];
      powerUps.push({
        x: 200 + Math.random() * (CANVAS_WIDTH - 400),
        y: 150 + Math.random() * 100,
        type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
      });
    }
    
    return { platforms, coins, hazards, powerUps };
  }
  
  static generatePath(difficulty) {
    const points = [];
    const stepCount = 4 + Math.floor(difficulty / 2);
    const horizontalStep = (CANVAS_WIDTH - 150) / stepCount;
    
    // Starting position
    points.push({ x: 50, y: 320 });
    
    // Generate intermediate points with guaranteed reachability
    for (let i = 1; i < stepCount; i++) {
      const prevPoint = points[i - 1];
      const x = prevPoint.x + horizontalStep + (Math.random() - 0.5) * 50;
      // Ensure vertical distance is jumpable (max 80 pixels up)
      const maxJump = 80;
      const y = Math.max(100, Math.min(
        prevPoint.y + (Math.random() - 0.7) * maxJump,
        CANVAS_HEIGHT - 100
      ));
      points.push({ x: Math.min(Math.max(50, x), CANVAS_WIDTH - 100), y });
    }
    
    // Goal position (always at the top-right area)
    points.push({ 
      x: CANVAS_WIDTH - 100, 
      y: 120 + Math.random() * 50 
    });
    
    return points;
  }
}

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
    this.doubleJumpAvailable = false;
    this.speedMultiplier = 1;
    this.invincible = false;
    this.powerUpTimer = 0;
  }

  update() {
    // Apply gravity
    this.velocityY += GRAVITY;
    
    // Update position
    this.x += this.velocityX * this.speedMultiplier;
    this.y += this.velocityY;
    
    // Friction
    this.velocityX *= 0.9;
    
    // Update power-up timer
    if (this.powerUpTimer > 0) {
      this.powerUpTimer--;
      if (this.powerUpTimer === 0) {
        this.speedMultiplier = 1;
        this.invincible = false;
      }
    }
    
    // Keep player in bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
    
    // Ground collision (bottom of canvas)
    if (this.y + this.height > CANVAS_HEIGHT - 20) {
      this.y = CANVAS_HEIGHT - 20 - this.height;
      this.velocityY = 0;
      this.jumping = false;
      this.doubleJumpAvailable = true;
    }
    
    // Death zone (falling off)
    if (this.y > CANVAS_HEIGHT + 100) {
      return 'gameOver';
    }
  }

  jump() {
    if (!this.jumping) {
      this.velocityY = JUMP_FORCE;
      this.jumping = true;
    } else if (this.doubleJumpAvailable) {
      this.velocityY = JUMP_FORCE;
      this.doubleJumpAvailable = false;
    }
  }

  moveLeft() {
    this.velocityX = -MOVE_SPEED;
  }

  moveRight() {
    this.velocityX = MOVE_SPEED;
  }

  applyPowerUp(type) {
    switch (type) {
      case 'doubleJump':
        this.doubleJumpAvailable = true;
        break;
      case 'speedBoost':
        this.speedMultiplier = 1.5;
        this.powerUpTimer = 300; // 5 seconds at 60fps
        break;
      case 'invincibility':
        this.invincible = true;
        this.powerUpTimer = 180; // 3 seconds
        break;
      default:
        break;
    }
  }

  draw(ctx) {
    // Draw player with power-up effects
    if (this.invincible) {
      ctx.globalAlpha = 0.7 + Math.sin(Date.now() * 0.01) * 0.3;
    }
    
    ctx.fillStyle = this.speedMultiplier > 1 ? '#fbbf24' : this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Add eyes
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + 5, this.y + 8, 8, 8);
    ctx.fillRect(this.x + 17, this.y + 8, 8, 8);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x + 7, this.y + 10, 4, 4);
    ctx.fillRect(this.x + 19, this.y + 10, 4, 4);
    
    ctx.globalAlpha = 1;
  }
}

class Platform {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.type = data.type;
    this.color = data.type === 'goal' ? '#4ade80' : 
                 data.type === 'moving' ? '#f59e0b' : 
                 data.type === 'ground' ? '#475569' : '#64748b';
    this.moveDirection = 1;
    this.initialX = data.x;
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
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
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

class Hazard {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.type = data.type;
    this.animationTime = 0;
  }

  update() {
    this.animationTime += 0.05;
  }

  draw(ctx) {
    ctx.fillStyle = '#ef4444';
    
    if (this.type === 'spike') {
      // Draw animated spikes
      ctx.save();
      ctx.translate(this.x + this.width/2, this.y + this.height/2);
      ctx.rotate(this.animationTime);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const innerRadius = 10;
        const outerRadius = 15;
        
        if (i === 0) ctx.moveTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
        else ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
        
        const nextAngle = ((i + 0.5) / 8) * Math.PI * 2;
        ctx.lineTo(Math.cos(nextAngle) * innerRadius, Math.sin(nextAngle) * innerRadius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
}

class PowerUp {
  constructor(data) {
    this.x = data.x;
    this.y = data.y;
    this.type = data.type;
    this.radius = 15;
    this.collected = false;
    this.animationTime = 0;
    this.colors = {
      doubleJump: '#8b5cf6',
      speedBoost: '#06b6d4',
      invincibility: '#ec4899'
    };
  }

  update() {
    this.animationTime += 0.05;
  }

  draw(ctx) {
    if (!this.collected) {
      const floatY = this.y + Math.sin(this.animationTime) * 5;
      
      // Outer glow
      ctx.fillStyle = this.colors[this.type] + '40';
      ctx.beginPath();
      ctx.arc(this.x, floatY, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Main circle
      ctx.fillStyle = this.colors[this.type];
      ctx.beginPath();
      ctx.arc(this.x, floatY, this.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Icon
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const icons = {
        doubleJump: '⬆⬆',
        speedBoost: '⚡',
        invincibility: '🛡️'
      };
      ctx.fillText(icons[this.type], this.x, floatY);
    }
  }
}

// Particle system for effects
class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addParticle(x, y, type) {
    this.particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 30,
      type,
      color: type === 'coin' ? '#fbbf24' : '#4ade80'
    });
  }

  update() {
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.life--;
      return p.life > 0;
    });
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.life / 30;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;
  }
}

// High Score Manager
class HighScoreManager {
  static getHighScores() {
    const scores = localStorage.getItem('platformerHighScores');
    return scores ? JSON.parse(scores) : [];
  }

  static addHighScore(name, score, level) {
    const scores = this.getHighScores();
    scores.push({ name, score, level, date: new Date().toISOString() });
    scores.sort((a, b) => b.score - a.score);
    scores.splice(3); // Keep only top 3
    localStorage.setItem('platformerHighScores', JSON.stringify(scores));
    return scores;
  }

  static isHighScore(score) {
    const scores = this.getHighScores();
    return scores.length < 3 || score > scores[scores.length - 1]?.score || 0;
  }
}

function PlatformerGame() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('playing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeBonus, setTimeBonus] = useState(1000);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastCoinTime, setLastCoinTime] = useState(Date.now());
  const [highScores, setHighScores] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  
  const keysPressed = useRef({});
  const gameLoopRef = useRef();
  const playerRef = useRef();
  const platformsRef = useRef([]);
  const coinsRef = useRef([]);
  const hazardsRef = useRef([]);
  const powerUpsRef = useRef([]);
  const particleSystemRef = useRef(new ParticleSystem());
  const levelStartTime = useRef(Date.now());

  // Initialize game objects
  const initializeLevel = (levelNum = 1) => {
    const levelData = LevelGenerator.generateLevel(levelNum);
    
    playerRef.current = new Player(50, 200);
    platformsRef.current = levelData.platforms.map(p => new Platform(p));
    coinsRef.current = levelData.coins.map(c => new Coin(c));
    hazardsRef.current = levelData.hazards.map(h => new Hazard(h));
    powerUpsRef.current = levelData.powerUps.map(p => new PowerUp(p));
    
    levelStartTime.current = Date.now();
    setTimeBonus(1000);
    setComboMultiplier(1);
    setGameState('playing');
  };

  // Load high scores on mount
  useEffect(() => {
    setHighScores(HighScoreManager.getHighScores());
    initializeLevel(1);
  }, []);

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
          player.doubleJumpAvailable = true;
          
          // Check if it's the goal platform
          if (platform.type === 'goal') {
            handleLevelComplete();
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
          
          // Combo system
          const now = Date.now();
          if (now - lastCoinTime < 2000) {
            setComboMultiplier(prev => Math.min(prev + 0.5, 5));
          } else {
            setComboMultiplier(1);
          }
          setLastCoinTime(now);
          
          const points = Math.floor(10 * comboMultiplier * level);
          setScore(prev => prev + points);
          
          // Add particle effect
          particleSystemRef.current.addParticle(coin.x, coin.y, 'coin');
        }
      }
    }
  };

  // Check collision with hazards
  const checkHazardCollisions = (player, hazards) => {
    if (player.invincible) return;
    
    for (let hazard of hazards) {
      const distance = Math.sqrt(
        Math.pow(player.x + player.width/2 - (hazard.x + hazard.width/2), 2) +
        Math.pow(player.y + player.height/2 - (hazard.y + hazard.height/2), 2)
      );
      
      if (distance < 25) {
        setGameState('gameOver');
        checkForHighScore();
      }
    }
  };

  // Check collision with power-ups
  const checkPowerUpCollisions = (player, powerUps) => {
    for (let powerUp of powerUps) {
      if (!powerUp.collected) {
        const distance = Math.sqrt(
          Math.pow(player.x + player.width/2 - powerUp.x, 2) +
          Math.pow(player.y + player.height/2 - powerUp.y, 2)
        );
        
        if (distance < powerUp.radius + 15) {
          powerUp.collected = true;
          player.applyPowerUp(powerUp.type);
          setScore(prev => prev + 50 * level);
          particleSystemRef.current.addParticle(powerUp.x, powerUp.y, 'powerup');
        }
      }
    }
  };

  const handleLevelComplete = () => {
    // Calculate time bonus
    const timeTaken = (Date.now() - levelStartTime.current) / 1000;
    const bonus = Math.max(0, Math.floor(timeBonus - timeTaken * 10));
    setScore(prev => prev + bonus * level);
    
    // Move to next level
    setLevel(prev => prev + 1);
    initializeLevel(level + 1);
  };

  const checkForHighScore = useCallback(() => {
    if (HighScoreManager.isHighScore(score)) {
      setShowNameInput(true);
    }
  }, [score]);

  const submitHighScore = () => {
    if (playerName.trim()) {
      const newScores = HighScoreManager.addHighScore(playerName, score, level);
      setHighScores(newScores);
      setShowNameInput(false);
      setPlayerName('');
    }
  };

    // Input handling
  const handleInput = (player, keysPressed) => {
    if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) player.moveLeft();
    if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) player.moveRight();
    if (keysPressed.current[' '] || keysPressed.current['ArrowUp'] || keysPressed.current['w']) player.jump();
  };

  const updateObjects = (player, platforms, coins, hazards, powerUps, particleSystem) => {
    const gameStatus = player.update();
    platforms.forEach(p => p.update());
    coins.forEach(c => c.update());
    hazards.forEach(h => h.update());
    powerUps.forEach(pu => pu.update());
    particleSystem.update();
    return gameStatus;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runCollisions = (player, platforms, coins, hazards, powerUps) => {
    checkPlatformCollisions(player, platforms);
    checkCoinCollisions(player, coins);
    checkHazardCollisions(player, hazards);
    checkPowerUpCollisions(player, powerUps);
  };

    // Drawing
  const drawScene = (ctx, player, platforms, coins, hazards, powerUps, particleSystem) => {
    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Background
    ctx.fillStyle = '#334155';
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(i * 200 + 50, 50, 2, 2);
        ctx.fillRect(i * 200 + 150, 100, 2, 2);
    }

    // Draw objects
    platforms.forEach(p => p.draw(ctx));
    hazards.forEach(h => h.draw(ctx));
    coins.forEach(c => c.draw(ctx));
    powerUps.forEach(pu => pu.draw(ctx));
    particleSystem.draw(ctx);
    player.draw(ctx);
  };

    // UI drawing
  const drawUI = (ctx, score, level, comboMultiplier, timeBonus, player) => {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Level: ${level}`, CANVAS_WIDTH - 100, 30);

    if (comboMultiplier > 1) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`Combo x${comboMultiplier.toFixed(1)}`, 10, 55);
    }

    ctx.fillStyle = timeBonus > 500 ? 'white' : '#ef4444';
    ctx.font = '14px Arial';
    ctx.fillText(`Time Bonus: ${Math.floor(timeBonus)}`, CANVAS_WIDTH/2 - 50, 30);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('Arrow Keys/WASD to move | Space/Up/W to jump | ESC to exit', 10, CANVAS_HEIGHT - 30);
    ctx.fillText(`Reach the green platform! Avoid red hazards!`, 10, CANVAS_HEIGHT - 10);

    if (player.powerUpTimer > 0) {
        ctx.fillStyle = player.invincible ? '#ec4899' : '#06b6d4';
        ctx.fillRect(10, 70, (player.powerUpTimer / 300) * 100, 5);
    }
  };

    // Main game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const player = playerRef.current;
    const platforms = platformsRef.current;
    const coins = coinsRef.current;
    const hazards = hazardsRef.current;
    const powerUps = powerUpsRef.current;
    const particleSystem = particleSystemRef.current;

    handleInput(player, keysPressed);
    const status = updateObjects(player, platforms, coins, hazards, powerUps, particleSystem);

    if (status === 'gameOver') {
        setGameState('gameOver');
        checkForHighScore();
        return;
    }

    runCollisions(player, platforms, coins, hazards, powerUps);
    setTimeBonus(prev => Math.max(0, prev - 0.5));

    drawScene(ctx, player, platforms, coins, hazards, powerUps, particleSystem);
    drawUI(ctx, score, level, comboMultiplier, timeBonus, player);
  }, [gameState, score, level, comboMultiplier, timeBonus, checkForHighScore, runCollisions]);


  // Set up game loop
  useEffect(() => {
    const interval = setInterval(gameLoop, 1000 / 60); // 60 FPS
    gameLoopRef.current = interval;

    return () => clearInterval(interval);
  }, [gameLoop]);

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
    setScore(0);
    setLevel(1);
    initializeLevel(1);
  };

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Secret Platformer Game</h1>
        <div className="header-buttons">
          <button onClick={() => setHighScores(HighScoreManager.getHighScores())} className="score-button">
            🏆 High Scores
          </button>
          <button onClick={handleExit} className="exit-button">
            Exit to Portfolio
          </button>
        </div>
      </div>
      
      {/* High Scores Display */}
      <div className="high-scores">
        <h3>🏆 Top 3 Scores</h3>
        {highScores.length > 0 ? (
          <ol>
            {highScores.map((score, index) => (
              <li key={index} className={`score-entry ${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}`}>
                <span className="score-name">{score.name}</span>
                <span className="score-value">{score.score} pts</span>
                <span className="score-level">Lvl {score.level}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="no-scores">No high scores yet!</p>
        )}
      </div>
      
      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
        />
        
        {gameState === 'gameOver' && (
          <div className="game-overlay">
            <div className="game-message">
              <h2>Game Over!</h2>
              <p>Final Score: {score}</p>
              <p>Level Reached: {level}</p>
              
              {showNameInput && (
                <div className="name-input-container">
                  <h3>🎉 New High Score! 🎉</h3>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && submitHighScore()}
                    maxLength={20}
                    autoFocus
                  />
                  <button onClick={submitHighScore}>Submit Score</button>
                </div>
              )}
              
              <div className="button-group">
                <button onClick={handleRestart}>Try Again</button>
                <button onClick={handleExit}>Exit</button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="game-controls">
        <p>🎮 Arrow Keys/WASD: Move | Space/Up/W: Jump | ESC: Exit</p>
        <p>💎 Collect coins for points | ⚡ Grab power-ups | 🏁 Reach the green flag!</p>
      </div>
    </div>
  );
}

export default PlatformerGame;