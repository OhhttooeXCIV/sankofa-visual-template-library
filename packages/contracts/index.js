export const MEMBER_ROLES = Object.freeze(['lead', 'developer', 'triage', 'uat', 'observer']);
export const OPERATION_STATUSES = Object.freeze(['requested', 'approved', 'running', 'succeeded', 'failed', 'cancelled']);
export const PROJECT_STATUSES = Object.freeze(['ToDo', 'In Progress', 'Review', 'In Review', 'Rejected', 'Done']);

export function isMemberRole(value) { return MEMBER_ROLES.includes(value); }
export function isProjectStatus(value) { return PROJECT_STATUSES.includes(value); }

export function createAuditEvent(input = {}) {
  if (!input.action || !input.actorId) throw new Error('Audit events require action and actorId');
  return {
    action: input.action,
    actorId: input.actorId,
    resourceType: input.resourceType || 'platform',
    resourceId: input.resourceId || null,
    metadata: input.metadata || {},
    occurredAt: input.occurredAt || new Date().toISOString()
  };
}
