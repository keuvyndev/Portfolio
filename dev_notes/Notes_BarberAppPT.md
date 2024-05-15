# Anotações sobre o desenvolvimento do app barbershop.

> Parei em 01:27m.
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
| NEXTJS | "use client"; | Refereciando no topo de componentes para indicar que o cliente poderá interagir com ele. |
| NEXTJS | const nextConfig = { images:{ remotePatterns: [{ hostname: "utfs.io", }, ], }, ; | Adiciona um host nas permisões do arquivo next.config |
| NEXTJS | const nextConfig = { images:{ remotePatterns: [{ hostname: "utfs.io", }, ], }, ; | Adiciona um host nas permisões do arquivo next.config |
| NEXTJS | .flex.item-center.gap-2 | Cria rapidamente a div: <div className="flex item-center gap-2"> |
| NEXTJS | const router = useRouter(); const handleBookingClick = () => { router.push(`/barbershops/${barbershop.id}`); } | Cria função de rota no componente para ir a um caminho especifico. |
| NEXTJS | const router = useRouter(); const handleBackClick = () => { router.back(); } | Cria função de rota no componente para retornar |
| NEXTJS | const router = useRouter(); const handleBackClick = () => { router.replace("/"); } | Cria função de rota no componente para retornar para home page fazendo substituição na URL. O que inibi o problema de retorno da seta do navegador |
| NEXTJS | const timeList = useMemo(() => {return date ? generateDayTimeList(date) : []; }, [date]); | A função useMemo, garante que uma rotina só será executada caso haja alterações em dados significativos da pagina. |
| NEXTJS | <Button variant={ hour === time ? 'default' : 'outline' }></Button> | Adiciona uma condição a um elemento do button, neste caso variant para fazer highlight |
| NEXTJS | console.log({session}); | Gera um log no console |

##### PRISMA - ORM
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| PRISMA | npm install prisma --save-dev | Instala o prisma no projeto |
| PRISMA | npx prisma init --datasource-provider postgresql | Inicializa o prisma com PostgreSQL. |
| PRISMA | npx prisma migrate dev --name init | Cria o banco e as tabelas com base no schema.prisma definido. |
| PRISMA | npx prisma db seed | Alimenta o banco com a seed (requer ts-node e configuração do package.json) |
| PRISMA | npx prisma format | Re-organiza o Schema. |
| PRISMA | npx prisma studio | Abre o banco. |

##### SHADECN
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| SHADECN | [Site Oficial](https://ui.shadcn.com) | Saiba mais sobre clicando aqui. |
| SHADECN | npx shadcn-ui@latest init | Instala a biblioteca do SHADCN que auxiliar na construção da interface. |
| SHADECN | npx shadcn-ui@latest add card | Instala cards ao projeto. |
| SHADECN | npx shadcn-ui@latest add button | Instala buttons ao projeto. |
| SHADECN | npx shadcn-ui@latest add input | Instala inputs ao projeto. |
| SHADECN | npx shadcn-ui@latest add badge | Instala badges ao projeto. |
| SHADECN | npx shadcn-ui@latest add avatar | Instala avatar ao projeto. |
| SHADECN | npx shadcn-ui@latest add sheet | Instala sheet ao projeto. |
| SHADECN | npx shadcn-ui@latest add calendar | Instala calendar ao projeto. |
| SHADECN | [Site Oficial](https://react-day-picker.js.org/using-daypicker/customization) | Página de personalização do calendar do shadcnUi. |

##### TAILWIND CSS
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| TAILWIND | [Site Oficial](https://tailwindcss.com) | Saiba mais sobre clicando aqui. |
| TAILWIND | p-[1-99] ou py[1-99] ou px[1-99] ou pt [1-99] | Altera o padding py, px ou pt (padding top). |
| TAILWIND | mt-[1-99], mb[1-99], mr[1-99], ml[1-99] | Altera a margem top, bot, right, left. |
| TAILWIND | justify-between | Define um alinhamento onde, o primeito item é alocado no início do eixo principal, e o último no final. Os demais são distribuiídos entre estes dois. |
| TAILWIND | justify-start | Define um alinhamento onde, os items são alinhados a esquerda |
| TAILWIND | items-center | Garante que todos os flex-items dentro de um display flex vão centralizar (verticalmente e horizontalmente) |
| TAILWIND | flex | Faz com que todos os elementos do container sejam organizados em uma linha (Habilita flex-row por padrão) |
| TAILWIND | flex-row | Faz com que todos os elementos do container sejam organizados em uma linha. |
| TAILWIND | flex-col | Faz com que todos os elementos do container sejam organizados em uma coluna. |
| TAILWIND | gap[0-99] | Gera um espaçamento entre os elementos de X pixels. |
| TAILWIND | w-fit | Faz com que o elemento ocupe apenas o espaço necessário dentro de um display flex |
| TAILWIND | border-l border-solid border-secondary | Adiciona uma borda a uma div |
| TAILWIND | min-w-[0px-99px] max-w-[0px-99px] | Adiciona um limite mínimo e máximo para uso de espaço horizontal. |
| TAILWIND | rounded-2xl | Faz com que um container/imagem ganhe borda curva. |
| TAILWIND | text-ellipsis | Se não couber o texto ele colocar "..." três pontos. |
| TAILWIND | text-nowrap | Não permite quebra de linha. |
| TAILWIND | overflow-hidden | Não permite aumentar na vertical com scroll |
| TAILWIND | overflow-x-auto | Faz com que um container de imagens possa ser rolado em sí mesmo (usado em div). |
| TAILWIND | w-full ou h-full | Faz com que o elemento ocupe 100% da largura ou altura disponível |
| TAILWIND | [&::-webkit-scrollbar]:hidden | Esconde a scrollbar. |
| TAILWIND | relative | Faz com que um container receba um position relative. Muito usado para trabalhar com items (filho com position absolute) |
| TAILWIND | absolute | Faz com que um container possa ser alinhado de forma absoluta usando com referencia o container pai (se houver) ou o documento (se não houver container pai) |
| TAILWIND | relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] | Propriedade de className, define um limite mínimo e máximo para imagem. |
| TAILWIND | <p className="text-primary font-bold">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", }).format(Number(service.price))} </p> | Valor monetário. |

##### CSS
| CSS | className="" } | Habilita CSS em uma TAG |
| CSS | className="capitalize" } | Faz com que apenas a primeira letra da palavra fique maiuscula. "Teste" |
| CSS | className="text-xs" } | Define o tamanho da fonte muito pequeno. |
| CSS | className="text-sm" } | Define o tamanho da fonte pequeno. |
| CSS | className="text xl" } | Define o tamanho da fonte para 20. |
| CSS | className="font-bold" } | Define netrigo. |
| CSS | className="uppercase" } | Deixa todo texto em maiúsculo. |
| CSS | className="bg-[#221C3D] text-primary" } | Define uma cor de fundo e uma cor de texto. |
| CSS | className="hover:bg-[#221C3D]" } | Define a cor de highlight ao passar o mouse. |
| CSS | <div className="px-1 relative w-full h-[159px]"> <Image alt={barbershop.name} src= barbershop. ImageUrl} fill sizes="100vw" className="rounded-2xl" style={{ objectFit: "cover", }} } | Faz com que a imagem mantenha o aspecto rátio. |
| CSS | fill style={{objectFit:"cover",} | Faz com que a imagem mantenha o aspecto rátio de forma simplificada. A div precisa ser relative. |

##### OUTROS COMANDOS
| TIPO    | COMANDO   | DESCRIÇÃO |
| :-------: | :-------:   | :---------: |
| LIB DATEFNS | [Site Oficial DATEFNS](https://date-fns.org/v3.6.0/docs/format) | Saiba mais sobre clicando aqui. |
| LIB DATEFNS | npm i date-fns | Instala lib para datas |
| LIB DATEFNS | {format(new Date()), } | Instala lib para datas |
| LIB DATEFNS | {format(new Date(), "EEEE", {locale: ptBR})} | Mostra o dia da semana em Português |
| LIB DATEFNS | {format(new Date(), " EEEE, dd 'de' MMMM", { locale: ptBR })} | Mostra o dia da semana, Dia do Mês e Mês em Português |
| LUCID.DEV | [Site Oficial LUCID.DEV](https://lucide.dev/icons) | Abre a lista de todos os ícones possíveis para importar. |
| LUCID.DEV | <ChevronLeftIcon />} | Importa o icone de seta esquerda do LucidDev (usado como botão) |
| LUCID.DEV | <MenuIcon />} | Importa o icone de menu do LucidDev (usado como botão) |
| LUCID.DEV | <MapPinIcon />} | Importa o icone de menu do mapa |
| VSCODE | Collapse | Fecha todas pastas do VSCode |
| NEXT.AUTH | npm install next-auth | Instala o sistema de autenticação para next |
| NEXT.AUTH | [Provedor Google](https://next-auth.js.org/providers/google) | Lista de provedores |
| NEXT.AUTH | [Adaptador Prisma](https://next-auth.js.org/adapters) | Lista de adapters (BD) |
| NEXT.AUTH | npm install @auth/prisma-adapter | Instala adaptador do prisma para next.auth |
| NEXT.AUTH | const {data, status} = useSession(); | Recebe os dados da sessão do usuário em user component |
| NEXT.AUTH | const session = await getServerSession() | Recebe os dados da sessão do usuário em um server component
| NEXT.AUTH | const handleLogoutClick = () => signOut(); | Instancia função de logout em um componente |
| NEXT.AUTH | const handleLoginClick = () => signIn('google'); | Instancia função de login em um componente sem a pré-tela do google |