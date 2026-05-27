import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

type Variant = "hero" | "updates" | "expertise" | "story" | "research" | "experience" | "publications" | "contact";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h = () => setR(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return r;
}

// A stylized "protein" — a smooth ribbon described by a 3D curve, rendered as a tube
function ProteinRibbon({
  seed = 1,
  color,
  radius = 0.18,
  scale = 1,
  ...props
}: { seed?: number; color: string; radius?: number; scale?: number } & ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null);

  const geom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const turns = 5 + (seed % 3);
    const steps = 220;
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      const angle = t * Math.PI * 2 * turns + seed;
      const r = 1.1 + Math.sin(t * Math.PI * 2 + seed) * 0.35;
      const y = (t - 0.5) * 4.2;
      pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
    return new THREE.TubeGeometry(curve, 400, radius, 12, false);
  }, [seed, radius]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.x += delta * 0.03;
  });

  return (
    <group ref={ref} scale={scale} {...props}>
      <mesh geometry={geom}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0.15}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          transmission={0.05}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

// Stylized RNA strand — phosphate backbone with bases as instanced spheres
function RNAStrand({
  seed = 2,
  color,
  baseColor,
  length = 40,
  scale = 1,
  ...props
}: { seed?: number; color: string; baseColor: string; length?: number; scale?: number } & ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const instRef = useRef<THREE.InstancedMesh>(null);

  const { tubeGeom, positions } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < length; i++) {
      const t = i / (length - 1);
      const angle = t * Math.PI * 6 + seed;
      const r = 0.7 + Math.sin(t * Math.PI * 3 + seed) * 0.15;
      const y = (t - 0.5) * 4.0;
      const p = new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
      pts.push(p);
      positions.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
    const tubeGeom = new THREE.TubeGeometry(curve, length * 6, 0.05, 8, false);
    return { tubeGeom, positions };
  }, [seed, length]);

  useEffect(() => {
    if (!instRef.current) return;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.scale.setScalar(0.09 + (i % 4) * 0.012);
      dummy.updateMatrix();
      instRef.current!.setMatrixAt(i, dummy.matrix);
    });
    instRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.15;
  });

  return (
    <group ref={ref} scale={scale} {...props}>
      <mesh geometry={tubeGeom}>
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.1} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <instancedMesh ref={instRef} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, positions.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial color={baseColor} roughness={0.3} emissive={baseColor} emissiveIntensity={0.4} />
      </instancedMesh>
    </group>
  );
}

// Drifting nucleotide cluster
function Nucleotides({ count = 80, color }: { count?: number; color: string }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12),
      speed: 0.1 + Math.random() * 0.3,
      scale: 0.05 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useEffect(() => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    data.forEach((d, i) => {
      dummy.position.copy(d.pos);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [data]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    data.forEach((d, i) => {
      dummy.position.set(
        d.pos.x + Math.sin(t * d.speed + d.phase) * 0.5,
        d.pos.y + Math.cos(t * d.speed * 0.7 + d.phase) * 0.4,
        d.pos.z + Math.sin(t * d.speed * 0.5 + d.phase) * 0.3,
      );
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} />
    </instancedMesh>
  );
}

function MouseParallax({ children, strength = 0.4 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += (target.current.x * strength - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-target.current.y * strength - ref.current.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene({ variant, dark }: { variant: Variant; dark: boolean }) {
  const palette = dark
    ? { protein: "#6aa8ff", rna: "#7be3ff", base: "#a07bff", dot: "#7bbbff" }
    : { protein: "#3b6fd8", rna: "#1aa7c2", base: "#7a5cff", dot: "#5aa1ff" };

  const content = (() => {
    switch (variant) {
      case "hero":
        return (
          <>
            <ProteinRibbon seed={1} color={palette.protein} scale={1.1} position={[-2.2, 0, 0]} />
            <RNAStrand seed={3} color={palette.rna} baseColor={palette.base} scale={1.0} position={[2.0, -0.3, 0.2]} />
          </>
        );
      case "research":
        return (
          <>
            <ProteinRibbon seed={5} color={palette.protein} scale={1.2} position={[0, 0, 0]} />
            <RNAStrand seed={7} color={palette.rna} baseColor={palette.base} scale={0.9} position={[1.4, 0.4, 0.6]} />
            <Nucleotides count={50} color={palette.dot} />
          </>
        );
      case "expertise":
        return (
          <>
            <ProteinRibbon seed={2} color={palette.protein} scale={0.9} position={[-1.6, 0.2, 0]} />
            <ProteinRibbon seed={9} color={palette.rna} scale={0.7} position={[1.8, -0.4, -0.3]} />
            <Nucleotides count={40} color={palette.dot} />
          </>
        );
      case "story":
        return (
          <>
            <RNAStrand seed={11} color={palette.rna} baseColor={palette.base} scale={1.1} position={[0, 0, 0]} />
            <Nucleotides count={60} color={palette.dot} />
          </>
        );
      case "updates":
      case "experience":
      case "publications":
        return (
          <>
            <ProteinRibbon seed={variant.length} color={palette.protein} scale={0.85} position={[1.5, 0, 0]} />
            <Nucleotides count={50} color={palette.dot} />
          </>
        );
      case "contact":
        return <Nucleotides count={100} color={palette.dot} />;
    }
  })();

  return (
    <>
      <ambientLight intensity={dark ? 0.6 : 0.9} />
      <directionalLight position={[5, 5, 5]} intensity={dark ? 0.8 : 1.1} />
      <pointLight position={[-5, -3, -2]} intensity={dark ? 0.6 : 0.4} color={palette.rna} />
      <MouseParallax>{content}</MouseParallax>
      <EffectComposer>
        <Bloom intensity={dark ? 0.9 : 0.5} luminanceThreshold={0.2} luminanceSmoothing={0.6} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function MolecularCanvas({ variant = "hero", className = "" }: { variant?: Variant; className?: string }) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (reduced || mobile) {
    return (
      <div
        className={`pointer-events-none ${className}`}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, oklch(0.78 0.14 210 / 0.25), transparent 60%), radial-gradient(ellipse at 70% 70%, oklch(0.62 0.18 240 / 0.25), transparent 60%)",
        }}
      />
    );
  }

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} dark={theme === "dark"} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default MolecularCanvas;
