from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'docs' / 'member' / 'Sankofa_Member_Handbook.docx'
doc = Document()
section = doc.sections[0]
section.top_margin = Inches(.7); section.bottom_margin = Inches(.7); section.left_margin = Inches(.8); section.right_margin = Inches(.8)
styles = doc.styles
styles['Normal'].font.name = 'Aptos'; styles['Normal'].font.size = Pt(10); styles['Normal'].font.color.rgb = RGBColor(30, 30, 30)
for name, size in [('Title', 25), ('Heading 1', 17), ('Heading 2', 13), ('Heading 3', 11)]:
    styles[name].font.name = 'Aptos Display'; styles[name].font.size = Pt(size); styles[name].font.color.rgb = RGBColor(0, 0, 0)

def add_page_number(paragraph):
    run = paragraph.add_run()
    fld = OxmlElement('w:fldSimple'); fld.set(qn('w:instr'), 'PAGE')
    run._r.addnext(fld)

footer = section.footer.paragraphs[0]
footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
footer.add_run('Sankofa Digital Library  |  Member Handbook  |  ')
add_page_number(footer)

title = doc.add_paragraph(style='Title'); title.alignment = WD_ALIGN_PARAGRAPH.CENTER; title.add_run('Sankofa Member Handbook')
sub = doc.add_paragraph(); sub.alignment = WD_ALIGN_PARAGRAPH.CENTER; sub.add_run('Access, governance, delivery, and operational runbooks').italic = True
doc.add_paragraph('This handbook explains how approved members use the Sankofa Digital Library platform. It covers role boundaries, project operations, reusable packages, CI/CD, Supabase controls, and release responsibilities. The central operating rule is simple: members can request work from the browser, while protected automation performs privileged changes and records an audit event.')

doc.add_heading('Contents', level=1)
toc = doc.add_paragraph(); fld = OxmlElement('w:fldSimple'); fld.set(qn('w:instr'), 'TOC \\o "1-3" \\h \\z \\u'); toc._p.append(fld)

sections = [
('1 Purpose and operating model', [('The platform is a reusable foundation for React and Vite applications. It separates general UI primitives, typed contracts, Supabase adapters, project generation, and delivery workflows from product-specific business logic.', 'Generated applications use one isolated Supabase project, static-first Vercel hosting, and GitHub as the source of truth for code, issues, pull requests, workflows, and boards. Sensitive emergency, evidence-vault, covert-dispatch, and survivor-safety logic remains outside the generic packages unless separately reviewed.')]),
('2 Roles and access', [('Leads manage architecture, releases, protected settings, and permissions. Developers implement features and open pull requests. Triage classifies issues and maintains backlog hygiene. UAT validates acceptance criteria without pushing code. Observers receive read-only visibility.', 'Authorization data belongs in the platform membership table and Supabase RLS policies. Do not use user-editable profile metadata for authorization decisions. Do not expose service-role keys in frontend code or Vercel public environment variables.')]),
('3 Package model', [('The public package boundaries are @sankofa/ui for React primitives, @sankofa/contracts for shared contracts and role/status constants, @sankofa/config for runtime validation and region defaults, @sankofa/supabase for portable migrations and backend adapters, and create-sankofa-app for starter generation.', 'Generated projects pin package versions and keep a changelog and compatibility matrix. Product repositories own their domain data, routing, and business rules.')]),
('4 Delivery workflow', [('Pull requests run quality, security, and Supabase contract checks with least-privilege GitHub permissions. Hosted smoke tests are reserved for previews, release candidates, or explicitly requested runs. Production environments require protected approval from Leads.', 'The standard board statuses are ToDo, In Progress, Review, In Review, Rejected, and Done. Common labels cover bug, feature, documentation, security, accessibility, performance, CI, backend, frontend, UAT, and blocked work.')]),
('5 Supabase and regional defaults', [('Supabase defaults to sa-east-1, the closest supported primary region for South African users. Every exposed table must enable RLS and use policies that match the actual ownership and role model. Updates require both USING and WITH CHECK clauses.', 'Vercel serves static assets through its global CDN. The platform does not assume South African managed compute on the Free plan; server execution must remain Edge-compatible or use the configured default region.')]),
('6 Member operations', [('The member view uses GitHub OAuth through Supabase Auth when configured. A signed-in user still needs an approved platform role. Operation requests are stored with actor, project, operation, status, and result metadata. Protected automation performs changes using scoped credentials.', 'For incidents, record the request ID, affected project, workflow URL, deployment ID, and final result. Never paste access tokens or service-role keys into issues, comments, logs, or screenshots.')]),
('7 Release checklist', [('Before release, confirm the compatibility matrix, changelog, build output, unit tests, accessibility checks, migration validation, hosted smoke result, and protected environment approval. Verify that generated applications build from an empty repository using npm ci and npm run build.', 'After release, inspect the deployment URL, check the public documentation surface, confirm no sensitive product-specific logic entered public packages, and record the release commit and deployment identifier in the project board.')]),
]
for heading, paragraphs in sections:
    doc.add_heading(heading, level=1)
    for paragraph in paragraphs: doc.add_paragraph(paragraph)

doc.add_heading('Role summary', level=1)
table = doc.add_table(rows=1, cols=3); table.style = 'Table Grid'
for cell, text in zip(table.rows[0].cells, ['Role', 'Primary responsibility', 'Mutation boundary']): cell.text = text
rows = [('Leads','Architecture, releases, permissions','Protected settings and approvals'),('Developers','Implementation and pull requests','Code through reviewed branches'),('Triage','Routing and backlog hygiene','Issues, labels, board organization'),('UAT','Acceptance testing','Comments, validation, release sign-off'),('Observers','Read-only reporting','No secrets, mutations, or workflow triggers')]
for row in rows:
    cells = table.add_row().cells
    for cell, text in zip(cells, row): cell.text = text

doc.add_heading('Command quick reference', level=1)
for command in ['sankofa create <project-name> --dry-run', 'sankofa doctor --json', 'sankofa validate --json', 'sankofa project:configure --dry-run', 'sankofa supabase:bootstrap --dry-run', 'sankofa github:configure --dry-run', 'sankofa vercel:configure --dry-run']:
    doc.add_paragraph(command, style='List Bullet')

doc.core_properties.title = 'Sankofa Member Handbook'; doc.core_properties.subject = 'Sankofa platform access and operations'; doc.core_properties.author = 'Sankofa Digital Studio'
OUT.parent.mkdir(parents=True, exist_ok=True); doc.save(OUT); print(OUT)
