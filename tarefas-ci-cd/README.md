# TaskFlow — Aplicação de tarefas com CI/CD

Aplicação web simples para adicionar, concluir, excluir e limpar tarefas. Os dados ficam salvos no `localStorage` do navegador.

## Tecnologias
- HTML, CSS e JavaScript
- Node.js (testes automatizados)
- GitHub Actions (CI/CD)
- GitHub Pages (deploy)

## Executar localmente
Não é necessário instalar dependências. Abra `index.html` no navegador. Para executar os testes, instale o Node.js 22 ou superior e rode:

```bash
npm test
```

## Pipeline CI/CD
1. **CI:** a cada `push` para `main` ou Pull Request, o GitHub Actions executa os testes com `node --test`.
2. **CD:** após um `push` bem-sucedido para `main`, o workflow publica os arquivos no GitHub Pages. O deploy só ocorre se os testes passarem.

## Como publicar no GitHub
1. Crie um repositório público chamado `taskflow-ci-cd` no GitHub.
2. Extraia os arquivos deste projeto e, no terminal, entre na pasta.
3. Execute:

```bash
git init
git add .
git commit -m "feat: cria aplicação TaskFlow com CI/CD"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/taskflow-ci-cd.git
git push -u origin main
```

4. No repositório, abra **Settings → Pages** e em **Build and deployment → Source**, selecione **GitHub Actions**.
5. Acesse **Actions** e acompanhe o workflow `CI/CD - TaskFlow`. Quando terminar com sucesso, o endereço publicado aparecerá no job de deploy e em **Settings → Pages**.

> Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub. O primeiro deploy pode levar alguns minutos.
