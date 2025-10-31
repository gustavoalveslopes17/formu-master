const app = document.getElementById('app');

const routes = {
  home: `
    <section>
      <h2>Bem-vindo ao FormuMaster</h2>
      <p>Este site demonstra uma SPA com validação de formulários e templates dinâmicos.</p>
    </section>
  `,
  form: `
    <section>
      <h2>Formulário de Cadastro</h2>
      <form id="cadastroForm">
        <label>Nome:
          <input type="text" name="nome" required />
        </label><br /><br />
        <label>Email:
          <input type="email" name="email" required />
        </label><br /><br />
        <label>Idade:
          <input type="number" name="idade" min="1" max="120" required />
        </label><br /><br />
        <button type="submit">Enviar</button>
      </form>
      <div id="mensagem"></div>
    </section>
  `
};

// SPA Navigation
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const route = btn.getAttribute('data-route');
    render(route);
  });
});

function render(route) {
  app.innerHTML = routes[route];
  if (route === 'form') {
    setupForm();
  }
}

// Form validation
function setupForm() {
  const form = document.getElementById('cadastroForm');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const idade = parseInt(form.idade.value);

    if (!nome || !email || isNaN(idade) || idade < 1 || idade > 120) {
      mensagem.innerHTML = `<p style="color:red;">Preencha todos os campos corretamente.</p>`;
    } else {
      mensagem.innerHTML = `<p style="color:green;">Dados enviados com sucesso!</p>`;
      localStorage.setItem('formData', JSON.stringify({ nome, email, idade }));
      form.reset();
    }
  });
}

// Inicializa com a página inicial
render('home');