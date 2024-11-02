# [US] Development Notes for the Barbershop App

**VSCode Extensions**
- **Simple React Snippets**: Assists in creating React commands.
- **TailWind CSS**: Assists in creating Tailwind commands.

---

## Prisma Access

- **GitHub**
  - Organization: `DataSupa`
  - Project Name: `app-barbershop`
  - Password: `eq3B3gV9Pmdua87T`

---

### Commands Learned

#### GIT
| Type | Command | Description |
| ---- | ------- | ----------- |
| **GIT** | `git checkout <branch_name>` | Switches the branch. |
| **GIT** | `git add .` | Stages all changes for commit. |
| **GIT** | `git add file.txt` | Stages a specific file for commit. |
| **GIT** | `git log --oneline` | Checks the last commit. |
| **GIT** | `git push origin` | Pushes changes to the current repository. |
| **GIT** | `git push origin main` | Pushes changes to the "main" branch. |

#### NEXT.JS
| Type | Command | Description |
| ---- | ------- | ----------- |
| **NEXT.JS** | `npx create-next-app@latest` | Creates the app with Next.JS. |
| **NEXT.JS** | `npm run dev` | Starts the development server. |
| **NEXT.JS** | `npm install -D ts-node` | Installs TS-Node, which allows running TypeScript files (used for seed). |
| **NEXT.JS** | `"use client";` | Indicates that the client can interact with the component. |
| **NEXT.JS** | `.flex.item-center.gap-2` | Quickly creates the div: `<div className="flex item-center gap-2">`. |
| **NEXT.JS** | `const router = useRouter(); const handleBookingClick = () => { router.push(\`/barbershops/${barbershop.id}\`); }` | Creates a routing function for a specific path. |
| **NEXT.JS** | `const router = useRouter(); const handleBackClick = () => { router.back(); }` | Creates a routing function to go back. |
| **NEXT.JS** | `const timeList = useMemo(() => {return date ? generateDayTimeList(date) : []; }, [date]);` | Ensures that a routine runs only with significant data changes. |

#### PRISMA - ORM
| Type | Command | Description |
| ---- | ------- | ----------- |
| **PRISMA** | `npm install prisma --save-dev` | Installs Prisma in the project. |
| **PRISMA** | `npx prisma init --datasource-provider postgresql` | Initializes Prisma with PostgreSQL. |
| **PRISMA** | `npx prisma migrate dev --name init` | Creates the database and tables based on `schema.prisma`. |
| **PRISMA** | `npx prisma generate` | Updates TypeScript definitions after a migration. |
| **PRISMA** | `npx prisma db seed` | Seeds the database (requires ts-node and configuration in package.json). |
| **PRISMA** | `npx prisma format` | Formats the Schema. |
| **PRISMA** | `npx prisma studio` | Opens the database. |

#### SHADECN
| Type | Command | Description |
| ---- | ------- | ----------- |
| **SHADECN** | `[Official Site](https://ui.shadcn.com)` | Learn more by clicking here. |
| **SHADECN** | `npx shadcn-ui@latest init` | Installs the SHADCN library that assists in building the interface. |
| **SHADECN** | `npx shadcn-ui@latest add card` | Installs cards to the project. |
| **SHADECN** | `npx shadcn-ui@latest add button` | Installs buttons to the project. |
| **SHADECN** | `npx shadcn-ui@latest add calendar` | Installs the calendar to the project. |

#### TAILWIND CSS
| Type | Command | Description |
| ---- | ------- | ----------- |
| **TAILWIND** | `[Official Site](https://tailwindcss.com)` | Learn more by clicking here. |
| **TAILWIND** | `p-[1-99] or py[1-99] or px[1-99]` | Changes the padding (py, px, or pt for padding top). |
| **TAILWIND** | `mt-[1-99], mb[1-99], mr[1-99], ml[1-99]` | Changes top, bottom, right, left margins. |
| **TAILWIND** | `justify-between` | Defines an alignment where the first item is placed at the start of the main axis and the last at the end. |
| **TAILWIND** | `rounded-2xl` | Makes a container/image have rounded borders. |

#### CSS
| Type | Command | Description |
| ---- | ------- | ----------- |
| **CSS** | `className=""` | Enables CSS on a tag. |
| **CSS** | `className="capitalize"` | Capitalizes the first letter of the word. |
| **CSS** | `className="text-sm"` | Sets the font size to small. |
| **CSS** | `className="bg-[#221C3D] text-primary"` | Sets a background color and text color. |

#### OTHER COMMANDS
| Type | Command | Description |
| ---- | ------- | ----------- |
| **DATEFNS** | `[DATEFNS Official Site](https://date-fns.org/v3.6.0/docs/format)` | Learn more by clicking here. |
| **DATEFNS** | `npm i date-fns` | Installs the library for date manipulation. |
| **DATEFNS** | `{format(new Date(), "EEEE", {locale: ptBR})}` | Displays the day of the week in Portuguese. |

## Outros Comandos e Tags Utilizados

Além dos comandos e tags documentados, fiz uso de muitas outras tags CSS, Tailwind, e comandos no ShadeCN que não foram registrados. Essa abordagem me ajudou a acompanhar melhor os exercícios e a focar no aprendizado contínuo.

---

# (PT) Anotações sobre o Desenvolvimento do App Barbershop

**Extensões VSCode**
- **Simple React Snippets**: Facilita a criação de comandos React.
- **TailWind CSS**: Facilita a criação de comandos Tailwind.

---

## Acesso Prisma

- **GitHub**
  - Organization: `DataSupa`
  - Project Name: `app-barbershop`
  - Password: `eq3B3gV9Pmdua87T`

---

### Comandos Aprendidos

#### GIT
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **GIT** | `git checkout <nome_branche>` | Altera a branch. |
| **GIT** | `git add .` | Adiciona todas as alterações para commit. |
| **GIT** | `git add arquivo.txt` | Adiciona um arquivo específico para commit. |
| **GIT** | `git log --oneline` | Verifica o último commit. |
| **GIT** | `git push origin` | Envia as alterações para o repositório atual. |
| **GIT** | `git push origin main` | Envia as alterações para a branch "main". |

#### NEXT.JS
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **NEXT.JS** | `npx create-next-app@latest` | Cria o app com Next.JS. |
| **NEXT.JS** | `npm run dev` | Inicializa o serviço. |
| **NEXT.JS** | `npm install -D ts-node` | Instala o TS-Node, que permite executar arquivos TypeScript (usado para seed). |
| **NEXT.JS** | `"use client";` | Indica que o cliente poderá interagir com o componente. |
| **NEXT.JS** | `.flex.item-center.gap-2` | Cria rapidamente a div: `<div className="flex item-center gap-2">`. |
| **NEXT.JS** | `const router = useRouter(); const handleBookingClick = () => { router.push(\`/barbershops/${barbershop.id}\`); }` | Cria função de rota para um caminho específico. |
| **NEXT.JS** | `const router = useRouter(); const handleBackClick = () => { router.back(); }` | Cria função de rota para retornar. |
| **NEXT.JS** | `const timeList = useMemo(() => {return date ? generateDayTimeList(date) : []; }, [date]);` | Garante que uma rotina só será executada com alterações significativas. |

#### PRISMA - ORM
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **PRISMA** | `npm install prisma --save-dev` | Instala o Prisma no projeto. |
| **PRISMA** | `npx prisma init --datasource-provider postgresql` | Inicializa o Prisma com PostgreSQL. |
| **PRISMA** | `npx prisma migrate dev --name init` | Cria o banco e as tabelas com base no `schema.prisma`. |
| **PRISMA** | `npx prisma generate` | Atualiza as definições do TS após um migrate. |
| **PRISMA** | `npx prisma db seed` | Alimenta o banco com a seed (requer ts-node e configuração do package.json). |
| **PRISMA** | `npx prisma format` | Reorganiza o Schema. |
| **PRISMA** | `npx prisma studio` | Abre o banco. |

#### SHADECN
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **SHADECN** | `[Site Oficial](https://ui.shadcn.com)` | Saiba mais clicando aqui. |
| **SHADECN** | `npx shadcn-ui@latest init` | Instala a biblioteca SHADCN que auxilia na construção da interface. |
| **SHADECN** | `npx shadcn-ui@latest add card` | Instala cards ao projeto. |
| **SHADECN** | `npx shadcn-ui@latest add button` | Instala botões ao projeto. |
| **SHADECN** | `npx shadcn-ui@latest add calendar` | Instala o calendário ao projeto. |

#### TAILWIND CSS
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **TAILWIND** | `[Site Oficial](https://tailwindcss.com)` | Saiba mais clicando aqui. |
| **TAILWIND** | `p-[1-99] ou py[1-99] ou px[1-99]` | Altera o padding (py, px, ou pt para padding top). |
| **TAILWIND** | `mt-[1-99], mb[1-99], mr[1-99], ml[1-99]` | Altera a margem top, bottom, right, left. |
| **TAILWIND** | `justify-between` | Define um alinhamento onde o primeiro item é alocado no início do eixo principal e o último no final. |
| **TAILWIND** | `rounded-2xl` | Faz com que um container/imagem ganhe borda curva. |

#### CSS
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **CSS** | `className=""` | Habilita CSS em uma tag. |
| **CSS** | `className="capitalize"` | Faz com que apenas a primeira letra da palavra fique maiúscula. |
| **CSS** | `className="text-sm"` | Define o tamanho da fonte como pequeno. |
| **CSS** | `className="bg-[#221C3D] text-primary"` | Define uma cor de fundo e uma cor de texto. |

#### OUTROS COMANDOS
| Tipo | Comando | Descrição |
| ---- | ------- | --------- |
| **DATEFNS** | `[Site Oficial DATEFNS](https://date-fns.org/v3.6.0/docs/format)` | Saiba mais clicando aqui. |
| **DATEFNS** | `npm i date-fns` | Instala a lib para manipulação de datas. |
| **DATEFNS** | `{format(new Date(), "EEEE", {locale: ptBR})}` | Mostra o dia da semana em português. |

## Other Commands and Tags Used

In addition to the documented commands and tags, I used many other CSS tags, Tailwind, and commands in ShadeCN that were not recorded. This approach helped me better track the exercises and focus on continuous learning.