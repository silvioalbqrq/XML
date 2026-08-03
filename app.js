async function enviarParaBackend(event) {
    event.preventDefault();

    const chave = document.getElementById('chaveAcesso').value.trim();
    const arquivoPfx = document.getElementById('arquivoPfx').files[0];
    const senhaPfx = document.getElementById('senhaPfx').value;
    const urlBackend = document.getElementById('urlApiBackend').value.trim();
    const btnConsultar = document.getElementById('btnConsultar');
    const resultadoContainer = document.getElementById('resultadoContainer');

    if (chave.length !== 44 || isNaN(chave)) {
        alert('Informe uma chave de acesso válida de 44 dígitos.');
        return;
    }

    // Prepara o formulário multipart para envio do arquivo .pfx
    const formData = new FormData();
    formData.append('chaveAcesso', chave);
    formData.append('certificadoPfx', arquivoPfx);
    formData.append('senhaPfx', senhaPfx);

    btnConsultar.disabled = true;
    btnConsultar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Conectando à SEFAZ via Backend...`;

    try {
        const response = await fetch(urlBackend, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Erro SEFAZ: ' + (data.erro || 'Falha ao processar requisição.'));
            return;
        }

        resultadoContainer.classList.remove('hidden');
        document.getElementById('xmlCode').textContent = data.xml;
        resultadoContainer.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        alert('Erro de conexão com o servidor API Backend. Verifique se o server.js está rodando.');
    } finally {
        btnConsultar.disabled = false;
        btnConsultar.innerHTML = `<i class="fa-solid fa-lock"></i> Autenticar na SEFAZ e Baixar XML`;
    }
}

function salvarXmlLocal() {
    const chave = document.getElementById('chaveAcesso').value.trim() || 'NFe_Completa';
    const xmlConteudo = document.getElementById('xmlCode').textContent;

    if (!xmlConteudo) return;

    const blob = new Blob([xmlConteudo], { type: 'text/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NFe_Real_${chave}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
