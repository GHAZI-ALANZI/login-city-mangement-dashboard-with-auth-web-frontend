
"use client";

import { useEffect, useRef } from "react";

const CityBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let X = (canvas.width = window.innerWidth);
    let Y = (canvas.height = window.innerHeight);
    let speed = 1;
    let frameCount = 0;

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

     /** 🎨 Create Magic Fantasy Sky */
    const drawSky = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, Y);
      gradient.addColorStop(0, "#3b008d"); // Deep Purple
      gradient.addColorStop(0.3, "#6d00d7"); // Vivid Violet
      gradient.addColorStop(0.6, "#ff0080"); // Neon Pink
      gradient.addColorStop(1, "#ff5400"); // Fantasy Sunset Orange
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, X, Y);
    };



    /** 🌕 Draw Amazing Fantasy Moon */
    const drawMoon = () => {
      ctx.save();
      const gradient = ctx.createRadialGradient(X - 150, 110, 30, X - 150, 100, 80);
      gradient.addColorStop(0, "rgba(255, 255, 200, 1)"); // Bright center
      gradient.addColorStop(0.5, "rgba(255, 200, 150, 0.8)");
      gradient.addColorStop(1, "rgba(255, 150, 100, 0)"); // Fading glow

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 50;
      ctx.shadowColor = "rgba(255, 255, 180, 0.8)";
      ctx.beginPath();
      ctx.arc(X - 150, 130, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

     /** ✨ Twinkling Stars */
     class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = rand(0, X);
        this.y = rand(0, Y / 2);
        this.size = rand(1.6, 1);
        this.opacity = Math.random();
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.opacity = Math.random();
      }
    }
    
    /** 🚦 Glowing Streetlights */
    class Streetlight {
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y - 100, 5, 100);

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x + 2.5, this.y - 100, 7, 0, Math.PI * 2);
        ctx.fill();

        // **Light Glow**
        ctx.save();
        ctx.shadowBlur = 44;
        ctx.shadowColor = "rgba(255, 255, 150, 0.57)";
        ctx.fillStyle = "rgba(255, 255, 150, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x + 2.5, this.y - 100, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /** Clear and Detailed Road */
    const drawRoad = () => {
      ctx.fillStyle = "rgb(40,40,40)";
      ctx.fillRect(0, Y - 120, X, 120);

      // **White Edge Lines**
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, Y - 120);
      ctx.lineTo(X, Y - 120);
      ctx.moveTo(0, Y - 20);
      ctx.lineTo(X, Y - 20);
      ctx.stroke();

      // **Dashed Lane Markings**
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 3;
      ctx.setLineDash([40, 20]);
      ctx.beginPath();
      ctx.moveTo(0, Y - 70);
      ctx.lineTo(X, Y - 70);
      ctx.stroke();
      ctx.setLineDash([]);

      // **Road Signs**
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Arial";
     
    };
    /** True 3D Buildings with Real Glowing Windows */
    class Building {
      x: number;
      y: number;
      bW: number;
      bH: number;
      depth: number;
      windowGrid: boolean[][];

      constructor(x: number, bW: number, bH: number) {
        this.x = x;
        this.y = Y - 120 - bH;
        this.bW = bW;
        this.bH = bH;
        this.depth = 20;
        this.windowGrid = this.generateWindows();
      }

      generateWindows() {
        return Array.from({ length: Math.floor(this.bW / 20) }, () =>
          Array.from({ length: Math.floor(this.bH / 30) }, () => Math.random() > 0.7)
        );
      }

      updateWindows() {
        if (frameCount % 100 === 0) {
          this.windowGrid = this.generateWindows();
        }
      }

      draw() {
        // **Front face**
        ctx.fillStyle = "rgb(50,50,50)";
        ctx.fillRect(this.x, this.y, this.bW, this.bH);

        // **Side face (3D effect)**
        ctx.fillStyle = "rgb(30,30,30)";
        ctx.beginPath();
        ctx.moveTo(this.x + this.bW, this.y);
        ctx.lineTo(this.x + this.bW + this.depth, this.y + 10);
        ctx.lineTo(this.x + this.bW + this.depth, this.y + this.bH + 10);
        ctx.lineTo(this.x + this.bW, this.y + this.bH);
        ctx.closePath();
        ctx.fill();

        // **Real Glowing Windows**
        for (let i = 0; i < this.windowGrid.length; i++) {
          for (let j = 0; j < this.windowGrid[i].length; j++) {
            if (this.windowGrid[i][j]) {
              ctx.save();
              ctx.shadowBlur = 20;
              ctx.shadowColor = "rgba(255, 255, 150, 1)";
              ctx.fillStyle = "rgba(255, 255, 150, 1)";
              ctx.fillRect(this.x + i * 20 + 5, this.y + j * 30 + 5, 15, 20);
              ctx.fillRect(this.x + this.bW + 5, this.y + j * 30 + 5, 10, 20);
              ctx.restore();
            }
          }
        }
      }

      update() {
        this.x -= speed;
        if (this.x + this.bW < 0) {
          this.x = X;
        }
        this.updateWindows();
      }
    }
     
    /** Super-Fast Neon Flash Lights on Road */
    class FlashLight {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      speed: number;

      constructor(y: number, color: string, speed: number) {
        this.x = rand(0, X);
        this.y = y;
        this.width = rand(50, 150); // Long streak effect
        this.height = 5;
        this.color = color;
        this.speed = speed;
      }

      draw() {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
        gradient.addColorStop(0, "rgba(255,255,255,0.1)");
        gradient.addColorStop(0.5, this.color);
        gradient.addColorStop(1, "rgba(255,255,255,0.1)");

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      update() {
        this.x += this.speed;
        if (this.x > X) this.x = -this.width;
      }
    }
    // Create Everything
    const stars = Array.from({ length: 547 }, () => new Star());
    const streetlights = Array.from({ length: X / 200 }, (_, i) => new Streetlight(i * 200, Y - 100));

    const buildings = Array.from({ length: Math.ceil(X / 100) }, (_, i) =>
      new Building(i * 120, rand(100, 200), rand(Y * 0.3, Y * 0.6))
    );
    const flashLights = [
      new FlashLight(Y - 80, "cyan", 15),
      new FlashLight(Y - 60, "red", 20),
      new FlashLight(Y - 100, "white", 25),
    ];

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, X, Y);
      frameCount++;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, X, Y);
      drawSky();
      drawMoon();


      stars.forEach((s) => { s.update(); s.draw(); });

      buildings.forEach((b) => {
        b.update();
        b.draw();
        drawRoad();
      streetlights.forEach((s) => s.draw());
      });
      flashLights.forEach((fl) => { fl.update(); fl.draw(); });


      requestAnimationFrame(render);
    };

    render();
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};


export default CityBackground;
