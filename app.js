// Manipulação de Consulta e Resposta para o Repositório silvioalbqrq/XML

function executarConsulta() {
    const chaveInput = document.getElementById('chaveAcesso').value.trim();
    const btnConsultar = document.getElementById('btnConsultar');
    const resultadoContainer = document.getElementById('resultadoContainer');

    // Validação da chave de acesso
    if (chaveInput.length !== 44 || isNaN(chaveInput)) {
        alert('Por favor, informe uma chave de acesso válida com exatamente 44 dígitos numéricos.');
        return;
    }

    // Feedback visual de carregamento
    btnConsultar.disabled = true;
    btnConsultar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Conectando à SEFAZ-CE...`;

    // Simulação do tempo de resposta do Web Service
    setTimeout(() => {
        btnConsultar.disabled = false;
        btnConsultar.innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> Consultar e Baixar`;

        resultadoContainer.classList.remove('hidden');

        // Estrutura SOAP / XML de retorno oficial da SEFAZ
        const xmlExemplo = `<?xml version="1.0" encoding="UTF-8"?>
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <nfeDistDFeInteresseResponse xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe">
      <nfeDistDFeInteresseResult>
        <retDistDFeInt versao="1.01">
          <tpAmb>1</tpAmb>
          <verAplic>1.0.0</verAplic>
          <cStat>138</cStat>
          <xMotivo>Documento localizado para o CNPJ</xMotivo>
          <loteDistDFeInt>
            <docZip schema="resNFe_v1.01.xsd">
              <!-- Retorno SEFAZ Ceará (UF 23) via Web Service -->
              <resNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.01">
                <chNFe>${chaveInput}</chNFe>
                <CNPJ>12345678000195</CNPJ>
                <xNome>EMPRESA EMISSORA CEARÁ LTDA</xNome>
                <vNF>1450.00</vNF>
                <cSitNFe>1</cSitNFe>
              </resNFe>
            </docZip>
          </loteDistDFeInt>
        </retDistDFeInt>
      </nfeDistDFeInteresseResult>
    </nfeDistDFeInteresseResponse>
  </soap12:Body>
</soap12:Envelope>`;

        document.getElementById('xmlCode').textContent = xmlExemplo;
        resultadoContainer.scrollIntoView({ behavior: 'smooth' });

    }, 1200);
}

// Download automático do XML simulado
function baixarXmlSimulado() {
    const chave = document.getElementById('chaveAcesso').value.trim() || "23260700000000000000550010000000011000000000";
    const xmlConteudo = document.getElementById('xmlCode').textContent;

    if (!xmlConteudo) return;

    const blob = new Blob([xmlConteudo], { type: 'text/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NFe_${chave}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}