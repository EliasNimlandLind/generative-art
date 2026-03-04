import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Visualisations = () => {
	const meshRef = useRef<THREE.InstancedMesh>(null!);

	const count = 20;

	const object = useMemo(() => new THREE.Object3D(), []);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		for (let index = 0; index < count; index++) {
			const xDimension = Math.sin(index * 0.3 + elapsedTime) * 5;
			const yDimension = Math.cos(index * 0.5 + elapsedTime) * 5;
			const zDimension = Math.sin(index * 0.2 + elapsedTime) * 5;

			object.position.set(xDimension, yDimension, zDimension);

			object.rotation.x = elapsedTime + index;
			object.rotation.y = elapsedTime * 0.5;

			object.updateMatrix();

			meshRef.current.setMatrixAt(index, object.matrix);
		}

		meshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, count]}>
			<boxGeometry args={[0.4, 0.4, 0.4]} />
			<meshStandardMaterial color='white' />
		</instancedMesh>
	);
};

export default function GenerativeScene() {
	return (
		<Canvas camera={{ position: [0, 0, 12] }}>
			<ambientLight intensity={1} />
			<pointLight position={[10, 10, 10]} />

			<Visualisations />
		</Canvas>
	);
}
