import {
  CelestialBody,
  BodyPosition,
  AspectType,
  AspectData,
} from '@mystic/core';
import { AstrologyConfig } from './constants.js';

export function calculateAspects(
  bodies: Record<CelestialBody, BodyPosition>,
  config: AstrologyConfig
): AspectData[] {
  const bodyKeys = Object.keys(bodies) as CelestialBody[];
  const aspects: AspectData[] = [];

  for (let i = 0; i < bodyKeys.length; i++) {
    for (let j = i + 1; j < bodyKeys.length; j++) {
      const bodyA = bodies[bodyKeys[i]!]!;
      const bodyB = bodies[bodyKeys[j]!]!;

      // Skip calculated non-physical points if comparing with other points
      if (
        (bodyA.body === CelestialBody.SOUTH_NODE && bodyB.body === CelestialBody.NORTH_NODE) ||
        (bodyA.body === CelestialBody.NORTH_NODE && bodyB.body === CelestialBody.SOUTH_NODE)
      ) {
        continue; // North and South node are permanently 180 degrees opposite by definition
      }

      const diff = Math.abs(bodyA.longitude - bodyB.longitude) % 360;
      const angle = Math.min(diff, 360 - diff);

      const isLuminary =
        bodyA.body === CelestialBody.SUN ||
        bodyA.body === CelestialBody.MOON ||
        bodyB.body === CelestialBody.SUN ||
        bodyB.body === CelestialBody.MOON;

      for (const [aspectKey, orbConfig] of Object.entries(config.aspectOrbs)) {
        const aspectType = aspectKey as AspectType;
        const maxOrb = isLuminary ? orbConfig.sunMoonOrb : orbConfig.planetOrb;
        const orb = Math.abs(angle - orbConfig.angle);

        if (orb <= maxOrb) {
          // Determine applying vs separating
          // Faster body moving towards slower body
          const fasterBody = Math.abs(bodyA.speed) >= Math.abs(bodyB.speed) ? bodyA : bodyB;
          const slowerBody = fasterBody === bodyA ? bodyB : bodyA;
          const relSpeed = fasterBody.speed - slowerBody.speed;

          // If relative speed closes the angular gap towards exact angle, it is applying
          const isApplying = relSpeed > 0 ? angle < orbConfig.angle : angle > orbConfig.angle;

          aspects.push({
            bodyA: bodyA.body,
            bodyB: bodyB.body,
            aspectType,
            angle,
            orb,
            isApplying,
          });
        }
      }
    }
  }

  // Sort by tightness of orb (most exact aspect first)
  aspects.sort((a, b) => a.orb - b.orb);
  return aspects;
}
