import * as THREE from 'three';

interface ThreeAnimationOptions {
  containerId: string;
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
  lineOpacity?: number;
  rotationSpeedX?: number;
  rotationSpeedY?: number;
  connectionDistance?: number;
}

export class ThreeAnimation {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particleSystem: THREE.Points;
  private lines: THREE.LineSegments[] = [];
  private lineGeometry: THREE.BufferGeometry;
  private lineMaterial: THREE.LineBasicMaterial;
  private options: Required<ThreeAnimationOptions>;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver;

  constructor(options: ThreeAnimationOptions) {
    const defaultOptions: Required<ThreeAnimationOptions> = {
      containerId: options.containerId,
      particleCount: 150,
      particleSize: 0.05,
      particleColor: '#2c9e5e', // Vert naturel pour correspondre au thème
      lineColor: '#34d8ac', // Vert vif pour les connections
      lineOpacity: 0.15,
      rotationSpeedX: 0.0005,
      rotationSpeedY: 0.001,
      connectionDistance: 2
    };

    this.options = { ...defaultOptions, ...options };
    
    const container = document.getElementById(this.options.containerId);
    if (!container) {
      throw new Error(`Container with id ${this.options.containerId} not found`);
    }
    
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, 
      this.container.clientWidth / this.container.clientHeight, 
      0.1, 
      1000
    );
    
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
    
    // Create particles
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(this.options.particleCount * 3);
    const colors = new Float32Array(this.options.particleCount * 3);
    
    for (let i = 0; i < this.options.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      colors[i3] = 0.5 + Math.random() * 0.5;
      colors[i3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i3 + 2] = 0.5 + Math.random() * 0.5;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({ 
      size: this.options.particleSize, 
      vertexColors: true, 
      transparent: true,
      opacity: 0.7
    });
    
    this.particleSystem = new THREE.Points(particles, material);
    this.scene.add(this.particleSystem);
    
    // Prepare for lines
    this.lineGeometry = new THREE.BufferGeometry();
    this.lineMaterial = new THREE.LineBasicMaterial({ 
      color: new THREE.Color(this.options.lineColor),
      transparent: true, 
      opacity: this.options.lineOpacity
    });
    
    this.camera.position.z = 5;
    
    // Set up resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  public start(): void {
    this.animate();
  }

  public stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.resizeObserver.disconnect();
    
    // Clean up
    this.lines.forEach(line => this.scene.remove(line));
    this.scene.remove(this.particleSystem);
    this.container.removeChild(this.renderer.domElement);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    this.particleSystem.rotation.x += this.options.rotationSpeedX;
    this.particleSystem.rotation.y += this.options.rotationSpeedY;
    
    // Update line connections
    const positions = this.particleSystem.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    
    for (let i = 0; i < this.options.particleCount; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];
      
      for (let j = i + 1; j < this.options.particleCount; j++) {
        const j3 = j * 3;
        const x2 = positions[j3];
        const y2 = positions[j3 + 1];
        const z2 = positions[j3 + 2];
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );
        
        if (distance < this.options.connectionDistance) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);
        }
      }
    }
    
    this.lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    // Remove old lines
    this.lines.forEach(line => this.scene.remove(line));
    this.lines = [];
    
    // Add new lines
    const line = new THREE.LineSegments(this.lineGeometry, this.lineMaterial);
    this.scene.add(line);
    this.lines.push(line);
    
    this.renderer.render(this.scene, this.camera);
  }

  private handleResize(): void {
    if (!this.container) return;
    
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}
