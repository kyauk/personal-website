import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function Track() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      canvas.style.width = container.offsetWidth + 'px';
      canvas.style.height = container.offsetHeight + 'px';
      ctx.scale(dpr, dpr);
      drawTrack();
    };

    // Las Vegas GP track points - more detailed
    const getTrackPoints = (width, height) => {
      const scale = Math.min(width / 520, height / 380) * 1.15;
      const offsetX = (width - 480 * scale) / 2;
      const offsetY = (height - 340 * scale) / 2;

      // More detailed Las Vegas street circuit
      const points = [
        [40, 280],   // Start/Finish straight
        [40, 180],   // Long straight (The Strip)
        [40, 100],   // Approaching T1-2
        [55, 60],    // Turn 1
        [85, 35],    // Turn 2
        [140, 30],   // Short straight
        [185, 35],   // Turn 3-4 complex
        [210, 55],   // Turn 4 exit
        [215, 95],   // Turn 5
        [215, 135],  // Turn 6
        [240, 155],  // Turn 7 entry
        [280, 160],  // Turn 7-8
        [330, 155],  // Turn 8-9 complex
        [370, 140],  // Turn 9 exit
        [400, 115],  // Turn 10
        [430, 105],  // Turn 11
        [455, 115],  // Turn 12 entry
        [470, 145],  // Turn 12
        [475, 190],  // Turn 13
        [465, 230],  // Turn 14 entry
        [440, 255],  // Turn 14
        [400, 270],  // Straight
        [350, 275],  // Approaching T15
        [300, 285],  // Turn 15
        [250, 300],  // Turn 16
        [190, 310],  // Turn 17 entry
        [140, 305],  // Turn 17
        [90, 295],   // Back straight
        [40, 280],   // Return to S/F
      ];

      return points.map(([x, y]) => [x * scale + offsetX, y * scale + offsetY]);
    };

    const drawKerbs = (ctx, points, trackWidth) => {
      // Draw kerbs at key corners
      const kerbCorners = [3, 4, 7, 8, 11, 14, 17, 22, 24]; // indices of turn apexes

      kerbCorners.forEach(idx => {
        if (idx < points.length - 1) {
          const p1 = points[idx];
          const p2 = points[idx + 1];
          const angle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);

          // Inner kerb (red-white)
          ctx.save();
          ctx.translate(p1[0], p1[1]);
          ctx.rotate(angle);

          const kerbLength = 25;
          const kerbWidth = 4;

          for (let i = 0; i < 5; i++) {
            ctx.fillStyle = i % 2 === 0 ? 'rgba(200, 40, 40, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(i * (kerbLength / 5) - kerbLength / 2, -trackWidth / 2 - kerbWidth, kerbLength / 5, kerbWidth);
          }

          ctx.restore();
        }
      });
    };

    const drawDRSZones = (ctx, points, trackWidth) => {
      // DRS zones - detection and activation
      const drsZones = [
        { start: 0, end: 2, color: 'rgba(0, 200, 80, 0.3)' },  // Main straight
        { start: 18, end: 20, color: 'rgba(0, 200, 80, 0.3)' }, // Back section
      ];

      drsZones.forEach(zone => {
        ctx.strokeStyle = zone.color;
        ctx.lineWidth = trackWidth + 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[zone.start][0], points[zone.start][1]);
        for (let i = zone.start + 1; i <= zone.end && i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
      });
    };

    const drawTurnNumbers = (ctx, points, scale) => {
      const turns = [
        { idx: 3, num: '1-2', offsetX: -20, offsetY: -15 },
        { idx: 5, num: '3-4', offsetX: 15, offsetY: -10 },
        { idx: 8, num: '5', offsetX: 20, offsetY: 0 },
        { idx: 9, num: '6', offsetX: 20, offsetY: 10 },
        { idx: 11, num: '7-8', offsetX: 0, offsetY: -18 },
        { idx: 13, num: '9', offsetX: 15, offsetY: -10 },
        { idx: 14, num: '10', offsetX: 15, offsetY: -5 },
        { idx: 15, num: '11', offsetX: 15, offsetY: 0 },
        { idx: 17, num: '12', offsetX: 18, offsetY: 5 },
        { idx: 18, num: '13', offsetX: 18, offsetY: 10 },
        { idx: 20, num: '14', offsetX: 10, offsetY: 18 },
        { idx: 23, num: '15', offsetX: 0, offsetY: 20 },
        { idx: 24, num: '16', offsetX: -5, offsetY: 18 },
        { idx: 26, num: '17', offsetX: -18, offsetY: 10 },
      ];

      ctx.font = `${9 * scale}px Inter, system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      turns.forEach(turn => {
        if (turn.idx < points.length) {
          const p = points[turn.idx];
          ctx.fillText(turn.num, p[0] + turn.offsetX * scale * 0.8, p[1] + turn.offsetY * scale * 0.8);
        }
      });
    };

    const drawSectorMarkers = (ctx, points, trackWidth) => {
      // Sector lines
      const sectors = [0, 9, 18]; // S1, S2, S3 start points
      const colors = ['rgba(255, 50, 50, 0.7)', 'rgba(50, 150, 255, 0.7)', 'rgba(255, 200, 50, 0.7)'];

      sectors.forEach((idx, i) => {
        if (idx < points.length) {
          const p = points[idx];
          const nextP = points[(idx + 1) % points.length];
          const angle = Math.atan2(nextP[1] - p[1], nextP[0] - p[0]) + Math.PI / 2;

          ctx.strokeStyle = colors[i];
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(p[0] - Math.cos(angle) * (trackWidth / 2 + 5), p[1] - Math.sin(angle) * (trackWidth / 2 + 5));
          ctx.lineTo(p[0] + Math.cos(angle) * (trackWidth / 2 + 5), p[1] + Math.sin(angle) * (trackWidth / 2 + 5));
          ctx.stroke();
        }
      });
    };

    const drawTrack = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const points = getTrackPoints(width, height);
      const trackWidth = 32;
      const scale = Math.min(width / 520, height / 380) * 1.15;

      // Draw path helper
      const drawPath = (points) => {
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1]);
        }
      };

      // Runoff area (gravel/asphalt)
      ctx.strokeStyle = 'rgba(80, 75, 70, 0.4)';
      ctx.lineWidth = trackWidth + 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      drawPath(points);
      ctx.stroke();

      // Track barrier (white line)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = trackWidth + 8;
      drawPath(points);
      ctx.stroke();

      // DRS zones (before main track)
      drawDRSZones(ctx, points, trackWidth);

      // Main track surface
      ctx.strokeStyle = 'rgba(50, 50, 55, 0.95)';
      ctx.lineWidth = trackWidth;
      drawPath(points);
      ctx.stroke();

      // Track texture (subtle lines)
      ctx.strokeStyle = 'rgba(60, 60, 65, 0.5)';
      ctx.lineWidth = trackWidth - 4;
      drawPath(points);
      ctx.stroke();

      // Center line (racing line hint)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.setLineDash([15, 15]);
      drawPath(points);
      ctx.stroke();
      ctx.setLineDash([]);

      // Kerbs
      drawKerbs(ctx, points, trackWidth);

      // Sector markers
      drawSectorMarkers(ctx, points, trackWidth);

      // Start/Finish line - checkered pattern
      const sfPoint = points[0];
      const nextPoint = points[1];
      const sfAngle = Math.atan2(nextPoint[1] - sfPoint[1], nextPoint[0] - sfPoint[0]) + Math.PI / 2;

      ctx.save();
      ctx.translate(sfPoint[0], sfPoint[1]);
      ctx.rotate(sfAngle);

      const checkerSize = 4;
      const checkerRows = 2;
      const checkerCols = Math.floor(trackWidth / checkerSize);

      for (let row = 0; row < checkerRows; row++) {
        for (let col = 0; col < checkerCols; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 30, 30, 0.9)';
          ctx.fillRect(
            col * checkerSize - trackWidth / 2,
            row * checkerSize - checkerRows * checkerSize / 2,
            checkerSize,
            checkerSize
          );
        }
      }
      ctx.restore();

      // Turn numbers
      drawTurnNumbers(ctx, points, scale);

      // Pit lane indicator
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = `${8 * scale}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('PIT', points[0][0] + 25 * scale, points[0][1] + 5);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-sm font-medium text-charcoal/50 uppercase tracking-wider">
            Thanks for visiting!
          </span>
          <h3 className="text-2xl font-bold text-charcoal mt-2">
            Here's a fun track to waste your time on:
          </h3>
          <p className="text-charcoal/60 mt-2">
            Las Vegas Grand Prix Circuit — Drive it with your cursor!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-charcoal/8 to-charcoal/4 rounded-3xl p-6 border border-muted/30 shadow-lg"
        >
          <div className="relative w-full h-80 md:h-[420px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-between items-center mt-5 px-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
              <span className="text-charcoal/50">S1</span>
              <span className="w-3 h-3 rounded-full bg-blue-500/70 ml-2"></span>
              <span className="text-charcoal/50">S2</span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/70 ml-2"></span>
              <span className="text-charcoal/50">S3</span>
            </div>
            <div className="flex gap-6 text-charcoal/50">
              <span>6.201 km</span>
              <span>17 Turns</span>
              <span>Las Vegas, NV</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
