# Portal DF-e — Download de XML Real com Certificado A1 (SEFAZ-CE)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Online-success?style=flat-square&logo=github)](https://silvioalbqrq.github.io/XML/)
[![SEFAZ-CE](https://img.shields.io/badge/SEFAZ--CE-UF%2023-blue?style=flat-square)](https://www.sefaz.ce.gov.br/)
[![mTLS Security](https://img.shields.io/badge/Autentica%C3%A7%C3%A3o-Certificado%20A1%20(.pfx)-orange?style=flat-square)]()
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-green?style=flat-square)](LICENSE)

Aplicação web desenvolvida para consulta e download do **XML completo com todos os itens, produtos e tributação (`procNFe`)** diretamente dos servidores da **SEFAZ Ceará / Ambiente Nacional**, utilizando autenticação mTLS via **Certificado Digital A1 (`.pfx`)** e registro da **Ciência da Emissão**.

🔗 **Acesse o Portal Online:** [https://silvioalbqrq.github.io/XML/](https://silvioalbqrq.github.io/XML/)

---

## 🏗️ Arquitetura do Sistema (Solução 2)

Devido às restrições de segurança dos navegadores que impedem o acesso direto ao arquivo de chave privada (`.pfx`) a partir de páginas estáticas, o projeto utiliza uma **arquitetura híbrida**:

```text
[ GitHub Pages ] ──(Chave + PFX + Senha)──> [ API Backend Node.js ]
(silvioalbqrq/XML)                                    │
                                            (Conexão mTLS / SOAP)
                                                      │
                                                      ▼
[ XML Completo <procNFe> ] <─────────────── [ SEFAZ CE / AN ]
