import { describe, expect, it } from 'vitest';
import { MEMBER_ROLES, PROJECT_STATUSES, createAuditEvent } from '../../../packages/contracts/index.js';
import { DEFAULT_REGIONS, validateRuntimeConfig } from '../../../packages/config/index.js';

describe('Sankofa platform foundation', () => {
  it('defines the least-privilege member roles and board statuses', () => {
    expect(MEMBER_ROLES).toEqual(['lead', 'developer', 'triage', 'uat', 'observer']);
    expect(PROJECT_STATUSES).toContain('In Review');
  });

  it('defaults Supabase to the closest supported primary region', () => {
    expect(DEFAULT_REGIONS.supabase).toBe('sa-east-1');
  });

  it('creates auditable events without exposing secrets', () => {
    const event = createAuditEvent({ action: 'project.requested', actorId: 'user-1' });
    expect(event).toMatchObject({ action: 'project.requested', actorId: 'user-1' });
    expect(event).not.toHaveProperty('token');
  });

  it('fails closed when required runtime configuration is absent', () => {
    expect(validateRuntimeConfig({ projectSlug: '' })).toEqual({ ok: false, errors: ['SANKOFA_PROJECT_SLUG is required'] });
  });
});
