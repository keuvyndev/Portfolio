# Anotações sobre o desenvolvimento do app barbershop.

> Parei em 1h03m.
> Crtl + Shift + V para visualizar.

**Data de início:** 04 de MAR de 2024
**Descrição:** Desenvolvendo um um aplicativo para uma barbearia.

**Tecnologias usadas:**
* Figma para visualizar a interface do app;
* PrismaORM para construção da estrutura de dados;
* Supabase/Docker com PostgreSQL para armazenar os dados;
* React com Next JS 13 TypeScript com TailWind para construir a interface;

**Recursos:**
Figma: [Clique aqui para acessar.](https://www.figma.com/file/TJquYVeL0si5dpXxJNtPkM/FSW-Barber-[Live]?type=design&node-id=0-1&mode=design&t=NW0xE8GdwZbNcfNS-0)
Notion para seed do banco e mais informações: [Clique aqui para acessar.](https://www.notion.so/Primeira-Aula-6e3f7410c7384ff786eb6e08b48af8d1?pvs=4)

**Extensões VSCode**
Simple React Snippets: Usado para auxiliar na criação de comandos react.
TailWind CSS: Usado para auxiliar na criação de comandos tailwind.

## ACESSO PRISMA
GITHUB
Organization: DataSupa
Project Name: app-barbershop
Password: eq3B3gV9Pmdua87T

### Comandos aprendidos 

##### GIT
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| GIT | git checkout <nome_branche> | Muda a branche. |
| GIT | git add . | Adiciona todas as alterações para commite. |
| GIT | git add arquivo.txt | Adiciona um arquivo para commite. |
| GIT | git log --oneline | Verifica ultimo commit realizado. |

##### NEXTJS
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| NEXTJS | npx create-next-app@latest | Cria o app com NextJS. |
| NEXTJS | npm run dev | Inicializa o serviço. |
| NEXTJS | npm install -D ts-node | Instala o TS-Node que permiti executar arquivos typescript (usado para seed). |

##### PRISMA - ORM
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| PRISMA | npm install prisma --save-dev | Instala o prisma no projeto |
| PRISMA | npx prisma init --datasource-provider postgresql | Inicializa o prisma com PostgreSQL. |
| PRISMA | npx prisma migrate dev --name init | Cria o banco e as tabelas com base no schema.prisma definido. |
| PRISMA | npx prisma db seed | Alimenta o banco com a seed (requer ts-node e configuração do package.json) |
| PRISMA | npx prisma studio | Abre o banco. |

##### SHADECN
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| SHADECN | [Site Oficial](https://ui.shadcn.com) | Saiba mais sobre clicando aqui. |
| SHADECN | npx shadcn-ui@latest init | Instala a biblioteca do SHADCN que auxiliar na construção da interface. |
| SHADECN | npx shadcn-ui@latest add card | Instala cards ao projeto. |
| SHADECN | npx shadcn-ui@latest add button | Instala buttons ao projeto. |

##### TAILWIND CSS
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| TAILWIND | [Site Oficial](https://tailwindcss.com) | Saiba mais sobre clicando aqui. |

##### OUTROS COMANDOS
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| ? | ? | ? |