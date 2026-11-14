# Supabase deployment and RLS guide

Use one Supabase project per generated application. Start with the migration in `packages/supabase/migrations`, review policies, and apply it through the normal Supabase migration workflow.

The foundation stores roles in `platform_members`, operation requests in `operation_requests`, project links in `project_links`, and audit history in `audit_events`. Every table enables RLS. Public clients use only the publishable/anonymous key; service-role credentials belong only in protected automation.

The default region is `sa-east-1`. Keep the region configurable when a product has a different residency requirement.
