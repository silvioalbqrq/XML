# Portal DF-e — Consulta e Download de NF-e (SEFAZ-CE)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-success?style=flat-square&logo=github)](https://silvioalbqrq.github.io/XML/)
[![SEFAZ-CE](https://img.shields.io/badge/SEFAZ--CE-UF%2023-blue?style=flat-square)](https://www.sefaz.ce.gov.br/)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-green?style=flat-square)](LICENSE)

Aplicação web e documentação técnica para consulta e download de arquivos **XML de Nota Fiscal Eletrônica (NF-e)** diretamente da **SEFAZ Ceará / Ambiente Nacional**, utilizando a arquitetura de **Web Service SOAP com Certificado Digital A1 (Opção 2)**.

🔗 **Acesse o Portal Online:** [https://silvioalbqrq.github.io/XML/](https://silvioalbqrq.github.io/XML/)

---

## 📌 Visão Geral da Arquitetura (Opção 2)

O ecossistema fiscal brasileiro exige autenticação por certificado digital (mTLS) para distribuição de documentos fiscais eletrônicos. Esta aplicação exemplifica a integração via **Web Service de Distribuição de DF-e (`NFeDistribuicaoDFe`)**.

### Fluxo de Comunicação
```text
[ Cliente Web ] ──(Chave 44 dígitos)──> [ Backend / Node.js ]
                                                │
                                       (Certificado A1 mTLS)
                                                │
                                                ▼
                                    [ Web Service SEFAZ / AN ]
                                                │
[ XML .xml ] <──(GZIP / Base64 / SOAP)──────────┘