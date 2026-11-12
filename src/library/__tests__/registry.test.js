import { describe, expect, it } from 'vitest';
import { COMPONENT_REGISTRY } from '../docs/registry';

describe('component registry', () => {
  it('contains exactly 30 showcase entries', () => {
    expect(COMPONENT_REGISTRY).toHaveLength(30);
    expect(new Set(COMPONENT_REGISTRY.map((entry) => entry.id)).size).toBe(30);
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
