from pathlib import Path
import json
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "examples" / "legal-policy-pack"
CONFIG = json.loads((OUT / "config.json").read_text(encoding="utf-8"))
SOURCE = Path(r"C:\Users\thoso\.codex\plugins\cache\openai-curated-remote\openai-templates\0.1.1\skills\artifact-template-legal-memorandum\assets\reference.docx")

sections = []
for line in (OUT / "legal-policy-handbook.md").read_text(encoding="utf-8").splitlines():
    if line.startswith("## ") and line[3:] not in ("Contents", "Publication checklist"):
        sections.append(line[3:])

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
ET.register_namespace("w", NS["w"])
source_lines = (OUT / "legal-policy-handbook.md").read_text(encoding="utf-8").splitlines()

def paragraph(text="", style=None, bold=False, italic=False):
    p = ET.Element(f"{{{NS['w']}}}p")
    pPr = ET.SubElement(p, f"{{{NS['w']}}}pPr")
    if style:
        pStyle = ET.SubElement(pPr, f"{{{NS['w']}}}pStyle")
        pStyle.set(f"{{{NS['w']}}}val", style)
    run = ET.SubElement(p, f"{{{NS['w']}}}r")
    if bold or italic:
        rPr = ET.SubElement(run, f"{{{NS['w']}}}rPr")
        if bold: ET.SubElement(rPr, f"{{{NS['w']}}}b")
        if italic: ET.SubElement(rPr, f"{{{NS['w']}}}i")
    t = ET.SubElement(run, f"{{{NS['w']}}}t")
    t.text = text
    return p

body = ET.Element(f"{{{NS['w']}}}body")
body.append(paragraph(f"{CONFIG['projectName']} Legal Policy Handbook", "Title"))
body.append(paragraph(f"Version {CONFIG['version']} | Effective {CONFIG['effectiveDate']}", italic=True))
body.append(paragraph("Legal review required. This is a customizable South African policy template, not legal advice or a guarantee of compliance. Confirm the final wording, data flows, sector rules, and business practices with qualified counsel before publication.", bold=True))
body.append(paragraph("Contents", "Heading1"))
for index, heading in enumerate(sections, 1):
    body.append(paragraph(f"{index}. {heading}"))
for heading in sections:
    body.append(paragraph(heading, "Heading1"))
    start = source_lines.index(f"## {heading}") + 1
    end = next((i for i in range(start, len(source_lines)) if source_lines[i].startswith("## ")), len(source_lines))
    for line in source_lines[start:end]:
        line = line.strip()
        if line and not line.startswith("<a ") and not line.startswith(">"):
            body.append(paragraph(line))
sectPr = ET.Element(f"{{{NS['w']}}}sectPr")
body.append(sectPr)

output = OUT / "legal-policy-handbook.docx"
with zipfile.ZipFile(SOURCE if SOURCE.exists() else output, "r") as zin:
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/document.xml":
                root = ET.fromstring(data)
                old_body = root.find("w:body", NS)
                root.remove(old_body)
                root.append(body)
                data = ET.tostring(root, encoding="utf-8", xml_declaration=True)
            elif item.filename.startswith("word/footer") and item.filename.endswith(".xml"):
                root = ET.fromstring(data)
                old_paragraphs = root.findall("w:p", NS)
                for p in old_paragraphs:
                    root.remove(p)
                root.append(paragraph(f"{CONFIG['projectName']} | Version {CONFIG['version']} | Draft pending legal review"))
                data = ET.tostring(root, encoding="utf-8", xml_declaration=True)
            zout.writestr(item, data)
print(output)
