"""Teste de fogo do Lab 2: com um pedido que não cita a tool, o Claude escolhe buscar_leads?
Roda o mesmo pedido N vezes em sessões novas, porque a escolha não é determinística.

Uso:  python testes/escolhe_tool.py [N]
"""
import json
import os
import subprocess
import sys
from pathlib import Path

CLAUDE = os.path.expandvars(
    r"%USERPROFILE%\.vscode\extensions\anthropic.claude-code-2.1.318-win32-x64\resources\native-binary\claude.exe"
)
PROJETO = Path(__file__).resolve().parents[2]
PEDIDO = "pra quais negócios eu deveria oferecer meu serviço primeiro? só os mais promissores"
N = int(sys.argv[1]) if len(sys.argv) > 1 else 3

rodadas = []
for i in range(1, N + 1):
    proc = subprocess.run(
        [CLAUDE, "-p", PEDIDO, "--output-format", "stream-json", "--verbose",
         "--allowedTools", "mcp__freelapda-leads__buscar_leads"],
        cwd=PROJETO, capture_output=True, text=True, encoding="utf-8", timeout=300,
    )
    ferramentas, resposta = [], ""
    for linha in proc.stdout.splitlines():
        try:
            ev = json.loads(linha)
        except json.JSONDecodeError:
            continue
        if ev.get("type") == "assistant":
            ferramentas += [c["name"] for c in ev["message"]["content"] if c.get("type") == "tool_use"]
        elif ev.get("type") == "result":
            resposta = ev.get("result", "")
    usou = "mcp__freelapda-leads__buscar_leads" in ferramentas
    rodadas.append({"rodada": i, "usou_buscar_leads": usou, "ferramentas": ferramentas, "resposta": resposta})
    print(f"rodada {i}: usou buscar_leads = {usou}  ferramentas = {ferramentas}")

print(f"\nescolheu a tool em {sum(r['usou_buscar_leads'] for r in rodadas)} de {N} rodadas")
(Path(__file__).parent / "escolhe-tool.json").write_text(
    json.dumps({"pedido": PEDIDO, "rodadas": rodadas}, ensure_ascii=False, indent=2), encoding="utf-8")
