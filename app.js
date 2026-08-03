// Lógica para Consulta e Geração do XML Completo (procNFe com itens)

function executarConsultaCompleta() {
    const chaveInput = document.getElementById('chaveAcesso').value.trim();
    const btnConsultar = document.getElementById('btnConsultar');
    const resultadoContainer = document.getElementById('resultadoContainer');

    if (chaveInput.length !== 44 || isNaN(chaveInput)) {
        alert('Por favor, informe uma chave de acesso válida com exatamente 44 dígitos numéricos.');
        return;
    }

    btnConsultar.disabled = true;
    btnConsultar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registrando Ciência e Baixando Ítens...`;

    setTimeout(() => {
        btnConsultar.disabled = false;
        btnConsultar.innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> Gerar Ciência e Baixar XML`;

        resultadoContainer.classList.remove('hidden');

        // Estrutura do XML Completo autorizada pela SEFAZ após a Ciência da Emissão (procNFe)
        const xmlCompletoExemplo = `<?xml version="1.0" encoding="UTF-8"?>
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  <NFe>
    <infNFe Id="NFe${chaveInput}" versao="4.00">
      <ide>
        <cUF>23</cUF>
        <cNF>00000110</cNF>
        <natOp>VENDA DE MERCADORIA</natOp>
        <mod>55</mod>
        <serie>1</serie>
        <nNF>12345</nNF>
        <dhEmi>2026-08-03T08:30:00-03:00</dhEmi>
        <tpNF>1</tpNF>
        <idDest>1</idDest>
        <cMunFG>2304400</cMunFG>
        <tpImp>1</tpImp>
        <tpEmis>1</tpEmis>
      </ide>
      <emit>
        <CNPJ>12345678000195</CNPJ>
        <xNome>EMPRESA EMISSORA CEARÁ LTDA</xNome>
        <enderEmit>
          <xLgr>RUA COMERCIAL</xLgr>
          <nro>100</nro>
          <xBairro>CENTRO</xBairro>
          <cMun>2304400</cMun>
          <xMun>FORTALEZA</xMun>
          <UF>CE</UF>
        </enderEmit>
      </emit>
      <dest>
        <CNPJ>98765432000110</CNPJ>
        <xNome>EMPRESA DESTINATARIA AUTORIZADA LTDA</xNome>
      </dest>
      <!-- DETALHAMENTO COMPLETO DOS ITENS DA NOTA FISCAL -->
      <det nItem="1">
        <prod>
          <cProd>000123</cProd>
          <cEAN>7891234567890</cEAN>
          <xProd>MERCADORIA DE EXEMPLO - ITEM 01</xProd>
          <NCM>84713012</NCM>
          <CFOP>5102</CFOP>
          <uCom>UN</uCom>
          <qCom>10.0000</qCom>
          <vUnCom>100.0000</vUnCom>
          <vProd>1000.00</vProd>
        </prod>
        <imposto>
          <ICMS>
            <ICMS00>
              <orig>0</orig>
              <CST>00</CST>
              <vBC>1000.00</vBC>
              <pICMS>20.00</pICMS>
              <vICMS>200.00</vICMS>
            </ICMS00>
          </ICMS>
        </imposto>
      </det>
      <det nItem="2">
        <prod>
          <cProd>000124</cProd>
          <cEAN>SEM GTIN</cEAN>
          <xProd>MERCADORIA DE EXEMPLO - ITEM 02</xProd>
          <NCM>84714100</NCM>
          <CFOP>5102</CFOP>
          <uCom>CX</uCom>
          <qCom>5.0000</qCom>
          <vUnCom>90.0000</vUnCom>
          <vProd>450.00</vProd>
        </prod>
      </det>
      <total>
        <ICMSTot>
          <vBC>1000.00</vBC>
          <vICMS>200.00</vICMS>
          <vProd>1450.00</vProd>
          <vNF>1450.00</vNF>
        </ICMSTot>
      </total>
    </infNFe>
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
      <!-- Assinatura Digital do Emitente -->
    </Signature>
  </NFe>
  <protNFe versao="4.00">
    <infProt>
      <tpAmb>1</tpAmb>
      <verAplic>CE_1.0.0</verAplic>
      <chNFe>${chaveInput}</chNFe>
      <dhRecbto>2026-08-03T08:31:00-03:00</dhRecbto>
      <nProt>123260000123456</nProt>
      <digVal>abc123def456ghi789=</digVal>
      <cStat>100</cStat>
      <xMotivo>Autorizado o uso da NF-e</xMotivo>
    </infProt>
  </protNFe>
</nfeProc>`;

        document.getElementById('xmlCode').textContent = xmlCompletoExemplo;
        resultadoContainer.scrollIntoView({ behavior: 'smooth' });

    }, 1400);
}

// Download do XML completo com a tag <nfeProc> e lista de itens
function baixarXmlCompleto() {
    const chave = document.getElementById('chaveAcesso').value.trim() || "23260700000000000000550010000000011000000000";
    const xmlConteudo = document.getElementById('xmlCode').textContent;

    if (!xmlConteudo) return;

    const blob = new Blob([xmlConteudo], { type: 'text/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NFe_Completa_${chave}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
