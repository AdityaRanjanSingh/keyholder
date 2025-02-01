import { Text, useFont, useGLTF, useTexture } from "@react-three/drei";
import React from "react";
import { degToRad } from "three/src/math/MathUtils.js";

const CARD_DESCRIPTIONS = {
  support: "Support the mission to be successful",
  sabotage: "Sabotage the mission to make if failure",
  approve: "Approve the vote",
  reject: "Reject the vote",
};

export function Card({ type = "shield", ...props }) {
  const { nodes, materials } = useGLTF("/models/card.glb");
  const texture = useTexture(`cards/${type}.jpg`);
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
        <meshStandardMaterial
          {...materials.Front}
          map={texture}
          color="white"
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_1.geometry}
        material={materials.Borders}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_2.geometry}
        material={materials.Back}
      />
      <Text
        font="/fonts/RobotoSlab-Bold.ttf"
        fontSize={0.15}
        anchorY={"top"}
        anchorX={"left"}
        position-x={-0.46}
        position-y={-0.3}
        position-z={0.01}
      >
        {type.toUpperCase()}
        <meshStandardMaterial
          color="white"
          roughness={materials.Front.roughness}
        />
      </Text>
    </group>
  );
}

useGLTF.preload("/models/card.glb");
useTexture.preload("/cards/punch.jpg");
useTexture.preload("/cards/shield.jpg");
useTexture.preload("/cards/grab.jpg");
useFont.preload("/fonts/RobotoSlab-Bold.ttf");
useFont.preload("/fonts/RobotoSlab-Regular.ttf");
