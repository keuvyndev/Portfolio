import { toggleFavoriteRestaurant } from "@/app/_actions/restaurants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseToggleFavoriteRestaurantPage {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorited?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantPage) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorited
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado com sucesso!",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push(`/my-favorite-restaurants`),
          },
        },
      );
    } catch (error) {
      toast.success("Você já possui este restaurante nos seus favoritos.");
      console.error(error);
    }
  };

  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
