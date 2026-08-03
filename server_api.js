const express = require('express');
const cors = require('cors');
const multer = require('multer');
const https = require('https');
const axios = require('axios');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Mantém o .pfx em memória RAM (Segurança)

app.use(cors()); // Permite chamadas vindas do seu GitHub Pages
app.use(express.json());

app.post('/api/baixar-xml-real', upload.single('certificadoPfx'), async (req, res) => {
    try {
        const { chaveAcesso, senhaPfx } = req.body;
        const pfxBuffer = req.file ? req.file.buffer : null;

        if (!chaveAcesso || !pfxBuffer) {
            return res.status(400).json({ erro: 'Chave de acesso e arquivo Certificado A1 (.pfx) são obrigatórios.' });
        }

        // 1. Configura o Agente HTTPS com o Certificado Digital A1 enviado pelo usuário
        const httpsAgent = new https.Agent({
            pfx: pfxBuffer,
            passphrase: senhaPfx || '',
            rejectUnauthorized: false
        });

        // 2. Transmite a solicitação para a Distribuição de DF-e da SEFAZ
        const soapEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Header>
    <nfeCabecMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
      <cUF>23</cUF>
      <versaoDados>1.01</versaoDados>
    </nfeCabecMsg>
  </soap12:Header>
  <soap12:Body>
    <nfeDistDFeInteresse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
      <nfeDadosMsg>
        <distDFeInt xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01">
          <tpAmb>1</tpAmb>
          <cUFAutor>23</cUFAutor>
          <consChNFe>
            <chNFe>${chaveAcesso}</chNFe>
          </consChNFe>
        </distDFeInt>
      </nfeDadosMsg>
    </nfeDistDFeInteresse>
  </soap12:Body>
</soap12:Envelope>`;

        console.log(`Conectando à SEFAZ via mTLS para a chave: ${chaveAcesso}...`);

        const sefazRes = await axios.post(
            'https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx',
            soapEnvelope,
            {
                httpsAgent,
                headers: {
                    'Content-Type': 'application/soap+xml; charset=utf-8',
                    'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe/nfeDistDFeInteresse'
                }
            }
        );

        // Retorna o XML real bruto retornado pelos servidores da Receita/SEFAZ
        return res.json({ xml: sefazRes.data });

    } catch (error) {
        console.error("Erro mTLS SEFAZ:", error.message);
        return res.status(500).json({ erro: 'Falha na autenticação do certificado com a SEFAZ: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor API rodando na porta 3000. Pronto para receber chamadas do GitHub Pages!");
});