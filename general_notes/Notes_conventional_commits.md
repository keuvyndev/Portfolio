# Convenção de Commits

> Crtl + Shift + V para visualizar.

ℹ️ **test:** Indica qualquer tipo de criação ou alteração de códigos de teste. Exemplo: Criação de testes unitários.

✨ **feat:** Indica o desenvolvimento de uma nova feature ao projeto. Exemplo: Acréscimo de um serviço, funcionalidade, endpoint, etc.

🔨 **refactor:** Usado quando houver uma refatoração de código que não tenha qualquer tipo de impacto na lógica/regras de negócio do sistema. Exemplo: Mudanças de código após um code review.

🎨 **style:** Empregado quando há mudanças de formatação e estilo do código que não alteram o sistema de nenhuma forma. Exemplo: Mudar o style-guide, mudar de convenção lint, arrumar indentações, remover espaços em brancos, remover comentários, etc..

🐛 **fix:** Utilizado quando há correção de erros que estão gerando bugs no sistema. Exemplo: Aplicar tratativa para uma função que não está tendo o comportamento esperado e retornando erro.

🔧 **chore:** Indica mudanças no projeto que não afetem o sistema ou arquivos de testes. São mudanças de desenvolvimento. Exemplo: Mudar regras do eslint, adicionar prettier, adicionar mais extensões de arquivos ao .gitignore.

📝 **docs:** Usado quando há mudanças na documentação do projeto. Exemplo: Adicionar informações na documentação da API, mudar o README, etc.

🔨 **build:** Utilizada para indicar mudanças que afetam o processo de build do projeto ou dependências externas. Exemplo: Gulp, adicionar/remover dependências do npm, etc.

⚡ **perf:** Indica uma alteração que melhorou a performance do sistema. Exemplo: Alterar ForEach por while, melhorar a query ao banco, etc.

🚧 **ci:** Utilizada para mudanças nos arquivos de configuração de CI. Exemplo: Circle, Travis, BrowserStack, etc.

⏪ **revert:** Indica a reversão de um commit anterior.