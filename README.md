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

⚡ Recursos do ProjetoInterface Responsiva: Design moderno estilo dashboard organizacional.Simulação de Consulta: Validação em tempo real do formato da Chave de Acesso (44 dígitos).Download de XML: Geração e exportação direta de arquivos .xml a partir do retorno da SEFAZ.Documentação de Integração: Exemplo pronto em Node.js usando axios e https.Agent para conexão SOAP com certificado PFX.🚀 Estrutura do RepositórioPlaintextsilvioalbqrq/XML/
├── index.html     # Interface do usuário e estrutura HTML5
├── styles.css     # Estilização em CSS3 (Tema Organizacional)
├── app.js         # Lógica de validação, requisição e geração do Blob XML
└── README.md      # Documentação oficial do projeto
🛠️ Exemplo de Integração Backend (Node.js)Para realizar a conexão real em ambiente de produção com a SEFAZ Ceará (UF 23), utilize a estrutura abaixo no seu servidor:JavaScriptconst fs = require('fs');
const https = require('https');
const axios = require('axios');

// Configuração do Agente HTTPS com Certificado Digital A1 (.pfx)
const httpsAgent = new https.Agent({
    pfx: fs.readFileSync('./certificado.pfx'),
    passphrase: 'SUA_SENHA_A1',
    rejectUnauthorized: false
});

// Envelope SOAP para a SEFAZ
const xmlSoapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)" xmlns:soap12="[http://www.w3.org/2003/05/soap-envelope](http://www.w3.org/2003/05/soap-envelope)">
  <soap12:Header>
    <nfeCabecMsg xmlns="[http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe](http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe)">
      <cUF>23</cUF>
      <versaoDados>1.01</versaoDados>
    </nfeCabecMsg>
  </soap12:Header>
  <soap12:Body>
    <nfeDistDFeInteresse xmlns="[http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe](http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe)">
      <nfeDadosMsg>
        <distDFeInt xmlns="[http://www.portalfiscal.inf.br/nfe](http://www.portalfiscal.inf.br/nfe)" versao="1.01">
          <tpAmb>1</tpAmb>
          <cUFAutor>23</cUFAutor>
          <CNPJ>12345678000195</CNPJ>
          <consChNFe>
            <chNFe>23260700000000000000550010000000011000000000</chNFe>
          </consChNFe>
        </distDFeInt>
      </nfeDadosMsg>
    </nfeDistDFeInteresse>
  </soap12:Body>
</soap12:Envelope>`;

// Envio para o endpoint do Ambiente Nacional / SEFAZ
axios.post(
    '[https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx](https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx)',
    xmlSoapEnvelope,
    {
        httpsAgent,
        headers: {
            'Content-Type': 'application/soap+xml; charset=utf-8',
            'SOAPAction': '[http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe/nfeDistDFeInteresse](http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe/nfeDistDFeInteresse)'
        }
    }
).then(res => console.log(res.data))
 .catch(err => console.error(err));
📑 Regra de Negócio SEFAZ (Manifestação)Retorno SEFAZCondição da NF-eConteúdo DisponívelresNFeSem Ciência/Manifestação do DestinatárioResumo da Nota (Chave, CNPJ, Data, Valor)procNFeCom Ciência ou Confirmação registradaXML Completo da Nota Fiscal com todos os itens💻 Como Rodar LocalmenteClone este repositório:Bashgit clone [https://github.com/silvioalbqrq/XML.git](https://github.com/silvioalbqrq/XML.git)
Abra a pasta do projeto:Bashcd XML
Abra o arquivo index.html em qualquer navegador ou utilize a extensão Live Server do VS Code.📄 LicençaEste projeto é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
