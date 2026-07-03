# IrrigAI — Documentação

Sistema inteligente de irrigação para hortas domésticas com ESP32, sensores e plataforma web.

---

## O que é

O IrrigAI monitora a umidade e temperatura do solo em tempo real e aciona automaticamente uma bomba d'água quando necessário. Os dados são enviados a uma API local e exibidos em um dashboard web.

---

## Hardware necessário

- ESP32 (DevKit v1) — microcontrolador com Wi-Fi
- Sensor capacitivo de umidade do solo (GPIO 34)
- Sensor de temperatura DHT22 (GPIO 4)
- Módulo relé 5V 1-canal (GPIO 26)
- Mini bomba d'água 5V DC submersível
- Fonte 5V 2A

---

## Conexões

| Componente       | Pino ESP32 | Observação                        |
|------------------|------------|-----------------------------------|
| Sensor umidade   | GPIO 34    | ADC — leitura analógica 0–100%    |
| DHT22            | GPIO 4     | Protocolo 1-Wire                  |
| Relé (IN)        | GPIO 26    | LOW = bomba ligada (ativo-baixo)  |
| VCC sensores     | 3.3V       | —                                 |
| Bomba            | Fonte 5V   | Não ligar direto no ESP32         |

---

## Como funciona

1. ESP32 lê umidade e temperatura a cada 5 segundos.
2. Se umidade < 30%, a bomba é ligada. Se > 70%, é desligada.
3. Os dados são enviados via HTTP POST para a API Flask na rede local.
4. O dashboard consome a API e exibe tudo em tempo real no navegador.

---

## Modos de irrigação

- **Automático** — ESP32 decide com base nos limites de umidade configurados.
- **Manual** — usuário controla pelo dashboard via `POST /api/control`.

---

## API Flask — endpoints

| Método | Rota           | Descrição                        |
|--------|----------------|----------------------------------|
| GET    | /api/status    | Última leitura dos sensores      |
| POST   | /api/data      | Recebe dados do ESP32            |
| GET    | /api/history   | Histórico das últimas 100 leituras |
| POST   | /api/control   | Controle manual da bomba         |
| GET    | /api/export    | Exporta histórico em CSV         |

---

## Executando o backend

```bash
# Instalar dependências
pip install flask psycopg2-binary

# Modo CSV (sem banco externo)
python main.py

# Modo PostgreSQL
python app_postgres.py
```

---

## Estrutura do projeto

```
IrrigAI/
├── index.html          # Landing page
├── docs.html           # Documentação web
├── DOCUMENTACAO.md     # Este arquivo
├── css/                # Estilos por seção
├── js/                 # Scripts (nav, animações)
├── imgs/               # Logo e favicon
└── dashboard/          # App de monitoramento
    ├── index.html
    ├── app.js
    ├── style.css
    ├── main.py         # API Flask (CSV)
    └── app_postgres.py # API Flask (PostgreSQL)
```

---

## Impacto esperado

- Redução de até 40% no consumo de água comparado à irrigação manual.
- Solo mantido na faixa ideal de umidade, sem excesso nem ressecamento.
- Sistema autônomo 24h, sem necessidade de intervenção.
- Custo total de hardware abaixo de R$ 80.

---

© 2025 IrrigAI — Projeto Acadêmico de Pesquisa
