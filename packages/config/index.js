export const DEFAULT_REGIONS = Object.freeze({
  supabase: 'sa-east-1',
  vercelFunction: 'iad1',
  vercelCdn: 'global'
});

export function readRuntimeConfig(env = process.env) {
  return {
    projectSlug: env.SANKOFA_PROJECT_SLUG || env.VITE_PROJECT_SLUG || '',
    supabaseUrl: env.SUPABASE_URL || env.VITE_SUPABASE_URL || '',
    supabasePublishableKey: env.SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    supabaseRegion: env.SUPABASE_REGION || DEFAULT_REGIONS.supabase,
    vercelRegion: env.VERCEL_REGION || DEFAULT_REGIONS.vercelFunction
  };
}

export function validateRuntimeConfig(config, { requireSupabase = false } = {}) {
  const errors = [];
  if (!config.projectSlug) errors.push('SANKOFA_PROJECT_SLUG is required');
  if (requireSupabase && !config.supabaseUrl) errors.push('SUPABASE_URL is required');
  if (requireSupabase && !config.supabasePublishableKey) errors.push('SUPABASE_PUBLISHABLE_KEY is required');
  return { ok: errors.length === 0, errors };
}
