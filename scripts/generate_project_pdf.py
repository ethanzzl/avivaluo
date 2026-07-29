#!/usr/bin/env python3
"""Generate the Aviva portfolio project handbook PDF from the Markdown source."""

from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "Aviva大双网站项目文档.md"
OUTPUT = ROOT / "output" / "pdf" / "Aviva大双网站项目文档.pdf"

PAPER = colors.HexColor("#FAF8F2")
INK = colors.HexColor("#211F1C")
MUTED = colors.HexColor("#6F6A63")
LINE = colors.HexColor("#DDD7CD")
ACCENT = colors.HexColor("#C94F3D")


def register_fonts() -> tuple[str, str]:
    candidates = [
        (
            "/System/Library/Fonts/STHeiti Light.ttc",
            "/System/Library/Fonts/STHeiti Medium.ttc",
        ),
        (
            "/Library/Fonts/Arial Unicode.ttf",
            "/Library/Fonts/Arial Unicode.ttf",
        ),
        (
            "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
            "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        ),
    ]
    for regular, bold in candidates:
        if Path(regular).exists() and Path(bold).exists():
            try:
                pdfmetrics.registerFont(TTFont("AvivaBody", regular))
                pdfmetrics.registerFont(TTFont("AvivaBold", bold))
                return "AvivaBody", "AvivaBold"
            except Exception:
                continue
    raise RuntimeError("No usable Chinese font was found.")


BODY_FONT, BOLD_FONT = register_fonts()


def inline_markup(value: str) -> str:
    value = html.escape(value.strip())
    value = re.sub(
        r"!\[([^\]]*)\]\(([^)]+)\)",
        lambda match: html.escape(match.group(1)),
        value,
    )
    value = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda match: (
            f'<link href="{html.escape(match.group(2), quote=True)}" '
            f'color="#C94F3D">{match.group(1)}</link>'
        ),
        value,
    )
    value = re.sub(
        r"&lt;(https?://[^&]+)&gt;",
        lambda match: f'<link href="{match.group(1)}" color="#C94F3D">{match.group(1)}</link>',
        value,
    )
    value = re.sub(r"`([^`]+)`", r'<font name="AvivaBold">\1</font>', value)
    value = re.sub(r"\*\*([^*]+)\*\*", r'<font name="AvivaBold">\1</font>', value)
    return value


def make_styles():
    base = getSampleStyleSheet()
    return {
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            fontName=BOLD_FONT,
            fontSize=29,
            leading=38,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=10 * mm,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=12,
            leading=20,
            textColor=MUTED,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName=BOLD_FONT,
            fontSize=21,
            leading=29,
            textColor=INK,
            spaceBefore=6 * mm,
            spaceAfter=5 * mm,
            keepWithNext=True,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName=BOLD_FONT,
            fontSize=15,
            leading=22,
            textColor=INK,
            spaceBefore=5 * mm,
            spaceAfter=3 * mm,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "H3",
            parent=base["Heading3"],
            fontName=BOLD_FONT,
            fontSize=11.5,
            leading=18,
            textColor=ACCENT,
            spaceBefore=3.5 * mm,
            spaceAfter=2 * mm,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=9.4,
            leading=15.5,
            textColor=INK,
            spaceAfter=2.7 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=9.2,
            leading=15,
            textColor=INK,
            leftIndent=5 * mm,
            firstLineIndent=-3.2 * mm,
            bulletIndent=1.8 * mm,
            spaceAfter=1.5 * mm,
        ),
        "quote": ParagraphStyle(
            "Quote",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=9.2,
            leading=15,
            textColor=MUTED,
            leftIndent=5 * mm,
            borderColor=ACCENT,
            borderWidth=1.5,
            borderPadding=(2 * mm, 3 * mm, 2 * mm, 4 * mm),
            spaceAfter=4 * mm,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName=BODY_FONT,
            fontSize=8.2,
            leading=13,
            textColor=INK,
            backColor=colors.HexColor("#F0ECE4"),
            borderPadding=4 * mm,
            leftIndent=2 * mm,
            rightIndent=2 * mm,
            spaceBefore=2 * mm,
            spaceAfter=4 * mm,
        ),
        "caption": ParagraphStyle(
            "Caption",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=8,
            leading=12,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=4 * mm,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["BodyText"],
            fontName=BODY_FONT,
            fontSize=7.5,
            leading=10,
            textColor=MUTED,
        ),
    }


STYLES = make_styles()


class AvivaDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=20 * mm,
            rightMargin=20 * mm,
            topMargin=21 * mm,
            bottomMargin=18 * mm,
            title="Aviva大双网站项目文档",
            author="Aviva大双",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="main",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="content", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        canvas.setStrokeColor(LINE)
        canvas.line(20 * mm, 14 * mm, A4[0] - 20 * mm, 14 * mm)
        canvas.setFont(BODY_FONT, 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(20 * mm, 9 * mm, "Aviva大双 · 网站开发、上线与维护手册")
        canvas.drawRightString(A4[0] - 20 * mm, 9 * mm, f"{doc.page}")
        canvas.restoreState()


def image_flowable(path: Path, max_width: float = 165 * mm, max_height: float = 105 * mm) -> Image:
    with PILImage.open(path) as img:
        width, height = img.size
    scale = min(max_width / width, max_height / height)
    return Image(str(path), width=width * scale, height=height * scale)


def parse_table(lines: list[str]) -> Table:
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell or "") for cell in cells):
            continue
        rows.append([Paragraph(inline_markup(cell), STYLES["body"]) for cell in cells])
    column_count = max(len(row) for row in rows)
    width = 170 * mm / column_count
    table = Table(rows, colWidths=[width] * column_count, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#EEE9DF")),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("FONTNAME", (0, 0), (-1, 0), BOLD_FONT),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def build_story() -> list:
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    story = []

    story.extend(
        [
            Spacer(1, 25 * mm),
            Paragraph("AVIVA DASHUANG / AVIVA大双", STYLES["cover_subtitle"]),
            Spacer(1, 12 * mm),
            Paragraph("网站项目文档", STYLES["cover_title"]),
            Paragraph("开发、上线与维护手册", STYLES["cover_subtitle"]),
            Spacer(1, 18 * mm),
            image_flowable(
                ROOT / "source-assets" / "projects" / "curated" / "paris-printemps-a14.webp",
                max_width=170 * mm,
                max_height=86 * mm,
            ),
            Spacer(1, 10 * mm),
            Paragraph(
                "正式网站：<link href=\"https://www.avivaluo.com\" color=\"#C94F3D\">www.avivaluo.com</link><br/>"
                "版本 1.3 · 2026-07-29",
                STYLES["cover_subtitle"],
            ),
            PageBreak(),
        ]
    )

    index = 0
    in_code = False
    code_lines: list[str] = []
    paragraph_lines: list[str] = []
    table_lines: list[str] = []

    def flush_paragraph():
        nonlocal paragraph_lines
        if paragraph_lines:
            text = " ".join(line.strip() for line in paragraph_lines)
            story.append(Paragraph(inline_markup(text), STYLES["body"]))
            paragraph_lines = []

    def flush_table():
        nonlocal table_lines
        if table_lines:
            story.append(parse_table(table_lines))
            story.append(Spacer(1, 3 * mm))
            table_lines = []

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if index == 0 and stripped.startswith("# "):
            index += 1
            continue
        if stripped.startswith("> "):
            index += 1
            continue
        if stripped.startswith("```"):
            flush_paragraph()
            flush_table()
            if in_code:
                escaped = html.escape("\n".join(code_lines)).replace("\n", "<br/>")
                story.append(Paragraph(escaped, STYLES["code"]))
                code_lines = []
                in_code = False
            else:
                in_code = True
            index += 1
            continue
        if in_code:
            code_lines.append(line)
            index += 1
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            flush_paragraph()
            table_lines.append(stripped)
            index += 1
            continue
        flush_table()
        if not stripped:
            flush_paragraph()
            index += 1
            continue
        image_match = re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", stripped)
        if image_match:
            flush_paragraph()
            image_path = (SOURCE.parent / image_match.group(2)).resolve()
            if image_path.exists():
                story.append(
                    KeepTogether(
                        [
                            image_flowable(image_path),
                            Spacer(1, 1.5 * mm),
                            Paragraph(inline_markup(image_match.group(1)), STYLES["caption"]),
                        ]
                    )
                )
            index += 1
            continue
        heading_match = re.match(r"^(#{2,4})\s+(.+)$", stripped)
        if heading_match:
            flush_paragraph()
            level = len(heading_match.group(1))
            text = heading_match.group(2)
            style = STYLES[{2: "h1", 3: "h2", 4: "h3"}[level]]
            lookahead = index + 1
            while lookahead < len(lines) and not lines[lookahead].strip():
                lookahead += 1
            next_image = (
                re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", lines[lookahead].strip())
                if lookahead < len(lines)
                else None
            )
            if next_image:
                image_path = (SOURCE.parent / next_image.group(2)).resolve()
                if image_path.exists():
                    story.append(
                        KeepTogether(
                            [
                                Paragraph(inline_markup(text), style),
                                image_flowable(image_path),
                                Spacer(1, 1.5 * mm),
                                Paragraph(inline_markup(next_image.group(1)), STYLES["caption"]),
                            ]
                        )
                    )
                    index = lookahead + 1
                    continue
            story.append(Paragraph(inline_markup(text), style))
            index += 1
            continue
        bullet_match = re.match(r"^[-*]\s+(.+)$", stripped)
        numbered_match = re.match(r"^(\d+)\.\s+(.+)$", stripped)
        if bullet_match or numbered_match:
            flush_paragraph()
            if bullet_match:
                body = bullet_match.group(1)
                bullet = "•"
            else:
                body = numbered_match.group(2)
                bullet = f"{numbered_match.group(1)}."
            story.append(
                Paragraph(
                    inline_markup(body),
                    STYLES["bullet"],
                    bulletText=bullet,
                )
            )
            index += 1
            continue
        if stripped.startswith(">"):
            flush_paragraph()
            story.append(Paragraph(inline_markup(stripped.lstrip("> ")), STYLES["quote"]))
            index += 1
            continue
        paragraph_lines.append(stripped)
        index += 1

    flush_paragraph()
    flush_table()
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = AvivaDocTemplate(str(OUTPUT))
    doc.build(build_story())
    print(OUTPUT)


if __name__ == "__main__":
    main()
