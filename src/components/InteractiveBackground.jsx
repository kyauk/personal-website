import { useRef, useEffect } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const networksRef = useRef([]);
  const meshRef = useRef([]);
  const scrollRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const glowRadius = 200;

    // Create a single neural network structure
    const createNetwork = (startX, startY, scale = 1, phaseOffset = 0) => {
      const layers = [4, 6, 8, 6, 4];
      const layerSpacing = 140 * scale;
      const nodeSpacing = 45 * scale;

      const nodes = [];
      const connections = [];

      layers.forEach((nodeCount, layerIdx) => {
        const layerHeight = (nodeCount - 1) * nodeSpacing;
        const layerX = startX + layerIdx * layerSpacing;

        for (let i = 0; i < nodeCount; i++) {
          const nodeY = startY - layerHeight / 2 + i * nodeSpacing;
          nodes.push({
            x: layerX,
            y: nodeY,
            layer: layerIdx,
            nodeIndex: i,
            activation: 0,
            ambientActivation: 0,
          });
        }
      });

      let nodeOffset = 0;
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayerStart = nodeOffset;
        const currentLayerEnd = nodeOffset + layers[l];
        const nextLayerStart = currentLayerEnd;
        const nextLayerEnd = nextLayerStart + layers[l + 1];

        for (let i = currentLayerStart; i < currentLayerEnd; i++) {
          for (let j = nextLayerStart; j < nextLayerEnd; j++) {
            const nodeA = nodes[i];
            const nodeB = nodes[j];
            const vertDist = Math.abs(nodeA.y - nodeB.y);
            if (vertDist < nodeSpacing * 2.5) {
              connections.push({
                from: i,
                to: j,
                activation: 0,
              });
            }
          }
        }
        nodeOffset += layers[l];
      }

      return { nodes, connections, phaseOffset, layerCount: layers.length };
    };

    // Create warped mesh for background
    const createMesh = () => {
      const mesh = [];
      const spacingX = 80;
      const spacingY = 60;
      const cols = Math.ceil(canvas.width / spacingX) + 2;
      const rows = Math.ceil(canvas.height / spacingY) + 2;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          mesh.push({
            baseX: i * spacingX - spacingX / 2,
            baseY: j * spacingY - spacingY / 2,
            x: 0,
            y: 0,
            col: i,
            row: j,
          });
        }
      }

      return { points: mesh, cols, rows };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetworks();
      meshRef.current = createMesh();
    };

    const initNetworks = () => {
      networksRef.current = [];

      const networkPositions = [
        { x: canvas.width * 0.02, y: canvas.height * 0.25, scale: 0.7, phase: 0 },
        { x: canvas.width * 0.55, y: canvas.height * 0.15, scale: 0.8, phase: 2 },
        { x: canvas.width * 0.25, y: canvas.height * 0.7, scale: 0.7, phase: 4 },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, scale: 0.75, phase: 1 },
        { x: canvas.width * 0.4, y: canvas.height * 0.4, scale: 0.65, phase: 3 },
      ];

      if (canvas.width > 1200) {
        networkPositions.push(
          { x: canvas.width * 0.85, y: canvas.height * 0.2, scale: 0.55, phase: 5 },
          { x: canvas.width * 0.0, y: canvas.height * 0.85, scale: 0.5, phase: 2.5 },
        );
      }

      networkPositions.forEach(pos => {
        networksRef.current.push(createNetwork(pos.x, pos.y, pos.scale, pos.phase));
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const animate = () => {
      timeRef.current += 0.008;
      const time = timeRef.current;

      const fadeStart = window.innerHeight * 0.3;
      const fadeEnd = window.innerHeight * 0.85;
      const scrollFade = Math.max(0, 1 - (scrollRef.current - fadeStart) / (fadeEnd - fadeStart));

      if (scrollFade <= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Draw warped mesh background
      const mesh = meshRef.current;
      if (mesh.points) {
        // Update mesh positions with wave distortion
        mesh.points.forEach((point) => {
          const waveX = Math.sin(time * 0.5 + point.baseY * 0.008) * 8;
          const waveY = Math.cos(time * 0.4 + point.baseX * 0.006) * 6;
          point.x = point.baseX + waveX;
          point.y = point.baseY + waveY;
        });

        // Draw mesh lines
        ctx.strokeStyle = `rgba(92, 124, 94, ${0.025 * scrollFade})`;
        ctx.lineWidth = 0.5;

        // Horizontal-ish lines
        for (let j = 0; j < mesh.rows; j++) {
          ctx.beginPath();
          for (let i = 0; i < mesh.cols; i++) {
            const idx = j * mesh.cols + i;
            const point = mesh.points[idx];
            if (i === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
          ctx.stroke();
        }

        // Vertical-ish lines
        for (let i = 0; i < mesh.cols; i++) {
          ctx.beginPath();
          for (let j = 0; j < mesh.rows; j++) {
            const idx = j * mesh.cols + i;
            const point = mesh.points[idx];
            if (j === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
          ctx.stroke();
        }
      }

      // Draw each neural network
      networksRef.current.forEach(network => {
        const { nodes, connections, phaseOffset, layerCount } = network;

        // Update node activations with ambient propagation
        nodes.forEach((node) => {
          // Ambient wave propagation through layers
          const waveSpeed = 0.8;
          const layerPhase = (time * waveSpeed - node.layer * 0.4 + phaseOffset) % (layerCount * 0.8);
          const wavePeak = Math.max(0, 1 - Math.abs(layerPhase - node.layer * 0.4) * 1.5);
          const ambientTarget = wavePeak * 0.25 * (0.7 + Math.sin(node.nodeIndex * 0.8 + time) * 0.3);
          node.ambientActivation += (ambientTarget - node.ambientActivation) * 0.08;

          // Mouse interaction
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < glowRadius) {
            const targetActivation = Math.pow(1 - distance / glowRadius, 2);
            node.activation += (targetActivation - node.activation) * 0.12;
          } else {
            node.activation *= 0.94;
          }
        });

        // Draw connections
        connections.forEach((conn) => {
          const nodeA = nodes[conn.from];
          const nodeB = nodes[conn.to];

          const totalActivation = Math.max(
            (nodeA.activation + nodeB.activation) / 2,
            (nodeA.ambientActivation + nodeB.ambientActivation) / 2
          );
          conn.activation += (totalActivation - conn.activation) * 0.15;

          const baseOpacity = 0.035;
          const glowOpacity = conn.activation * 0.4;
          const opacity = (baseOpacity + glowOpacity) * scrollFade;

          const lineWidth = 0.5 + conn.activation * 1.5;

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.strokeStyle = `rgba(92, 124, 94, ${opacity})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((node) => {
          const totalActivation = Math.max(node.activation, node.ambientActivation);
          const baseOpacity = 0.07;
          const glowOpacity = totalActivation * 0.6;
          const opacity = (baseOpacity + glowOpacity) * scrollFade;
          const radius = 2.5 + totalActivation * 4;

          // Glow effect
          if (totalActivation > 0.04) {
            const gradient = ctx.createRadialGradient(
              node.x, node.y, 0,
              node.x, node.y, radius + totalActivation * 15
            );
            gradient.addColorStop(0, `rgba(122, 158, 126, ${totalActivation * 0.3 * scrollFade})`);
            gradient.addColorStop(1, 'rgba(122, 158, 126, 0)');

            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + totalActivation * 15, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92, 124, 94, ${opacity})`;
          ctx.fill();

          // Node border when activated
          if (totalActivation > 0.1) {
            ctx.strokeStyle = `rgba(122, 158, 126, ${totalActivation * 0.4 * scrollFade})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
