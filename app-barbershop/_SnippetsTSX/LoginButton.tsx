// Inserido em qualquer página TSX

"use client";

const Header = () => {
   const {data} = useSession();
   const HandleLoginClick = async () => {
      await signIn();
   }

   {/* Caso esteja autenticado mostra o nome, caso contrário o botão de Login */}

   {data?.user ? (
      <div> 
         <Button onClick={() => signOut()}>Logout</Button>
         <h1>{data.user.name}</h1>
      </div>
   ) : (
      <Button onClick={HandleLoginClick}>Login</Button>
   )}
}