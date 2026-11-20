import { describe, expect, it } from 'vitest';
import { componentChecks } from '../../showcase/componentGuidance';
import { COMPONENT_REGISTRY } from '../docs/registry';

describe('component registry', () => {
  it('uses unique identifiers and has mobile and offline guidance for every entry', () => {
    const ids = COMPONENT_REGISTRY.map((entry) => entry.id);
    expect(ids).toHaveLength(52);
    expect(new Set(ids).size).toBe(ids.length);
    expect(Object.keys(componentChecks).sort()).toEqual([...ids].sort());
  });

  it('has complete descriptors for every entry', () => {
    for (const entry of COMPONENT_REGISTRY) {
      expect(entry.name).toBeTruthy();
      expect(entry.category).toBeTruthy();
      expect(entry.sourceProject).toBeTruthy();
      expect(entry.sourcePath).toBeTruthy();
      expect(entry.responsiveBehavior).toBeTruthy();
      expect(entry.accessibility).toBeTruthy();
      expect(Array.isArray(entry.props)).toBe(true);
      expect(Array.isArray(entry.customization)).toBe(true);
      expect(Array.isArray(entry.previewControls)).toBe(true);
      expect(entry.testPath).toContain('src/library/__tests__/');
    }
  });
});
