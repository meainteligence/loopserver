 let produtoSelecionado = "";
        let precoSelecionado = "";

        function abrirCheckout(nome, preco) {
            produtoSelecionado = nome;
            precoSelecionado = preco;
            document.getElementById('check-prod').innerText = nome;
            document.getElementById('checkout').style.display = 'block';
        }

        function fecharCheckout() {
            document.getElementById('checkout').style.display = 'none';
        }

        function enviarPedido() {
            const nome = document.getElementById('c-nome').value;
            const loja = document.getElementById('c-loja').value;
            const logo = document.getElementById('c-logo').value;
            const dom = document.getElementById('c-com').value;

            if(!nome || !loja) return alert("Preencha os campos obrigatórios!");

            const msg = `*SOLICITAÇÃO DE PROJETO LOOP*%0A%0A` +
                        `*Plano:* ${produtoSelecionado}%0A` +
                        `*Preço Base:* R$ ${precoSelecionado}%0A%0A` +
                        `*Cliente:* ${nome}%0A` +
                        `*Negócio:* ${loja}%0A` +
                        `*Tem Logo:* ${logo}%0A` +
                        `*Domínio:* ${dom}`;

            window.open(`https://wa.me/5554993243670?text=${msg}`, '_blank');
        }
         async function verificarDominio() {
    const nomeOriginal = document.getElementById('domain-input').value.trim();
    const tld = document.getElementById('tld-select').value;
    const resultDiv = document.getElementById('domain-result');
    const statusCard = document.getElementById('status-card');
    const statusText = document.getElementById('status-text');
    const btnReservar = document.getElementById('btn-reservar');

    // Limpeza simples do nome (remove espaços e caracteres especiais)
    const nome = nomeOriginal.toLowerCase().replace(/[^a-z0-9-]/g, '');

    if (nome.length < 3) {
        alert("Por favor, digite um nome válido (mínimo 3 caracteres).");
        return;
    }

    const dominioCompleto = nome + tld;

    // Interface em estado de busca
    resultDiv.style.display = 'block';
    statusText.innerHTML = `<i class="ph ph-circle-notch-bold"></i> Consultando base de dados real para <strong>${dominioCompleto}</strong>...`;
    statusCard.style.background = "#f5f5f7";
    btnReservar.style.display = 'none';

    try {
        // Usando o serviço RDAP (padrão sucessor do WHOIS)
        // Nota: domínios .com.br usam caminhos diferentes, aqui tratamos de forma geral
        const url = `https://rdap.org/domain/${dominioCompleto}`;
        
        const response = await fetch(url);

        // Se o status for 404, significa que o domínio NÃO foi encontrado (está disponível!)
        if (response.status === 404) {
            statusText.innerHTML = `<i class="ph ph-check-circle" style="color: green;"></i> EXCELENTE! <strong>${dominioCompleto}</strong> está disponível para registro!`;
            statusCard.style.background = "rgba(0, 255, 0, 0.05)";
            statusCard.style.border = "1px solid rgba(0, 128, 0, 0.2)";
            btnReservar.style.display = 'inline-block';
        } 
        // Se retornar 200, o domínio existe (está ocupado)
        else if (response.ok) {
            statusText.innerHTML = `<i class="ph ph-x-circle" style="color: red;"></i> INDISPONÍVEL! <strong>${dominioCompleto}</strong> já possui dono.`;
            statusCard.style.background = "rgba(255, 0, 0, 0.05)";
            statusCard.style.border = "1px solid rgba(255, 0, 0, 0.2)";
            btnReservar.style.display = 'none';
        }
        else {
            throw new Error();
        }

    } catch (error) {
        // Caso a API falhe ou bloqueie (CORS), damos uma resposta segura
        statusText.innerHTML = `<i class="ph ph-warning" style="color: orange;"></i> Não foi possível validar agora. <br> <small>Tente novamente ou nos chame no WhatsApp para checagem manual.</small>`;
        btnReservar.style.display = 'inline-block';
        btnReservar.innerText = "Consultar via WhatsApp";
    }
}
