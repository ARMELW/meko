import { useChildren } from "@/app/children";
import { Typography } from "@/components";

function ChildMonitoringPage() {
  const { data: childrenResponse, isLoading } = useChildren();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Typography as="h3" align="center" className="mb-8">
        Liste de vos enfants
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childrenResponse?.data.map((child) => (
          <div
            key={child.id}
            className="rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={
                  child.avatarUrl ||
                  "/assets/images/avatars/frame_26088240.png"
                }
                alt={`Avatar de ${child.firstname}`}
                className="w-full h-full object-cover"
              />
            </div>
            <Typography as="h3" className="text-xl font-semibold mb-2">
              {child.firstname} {child.lastname}
            </Typography>
            <Typography as="p" className="text-gray-600">
              Né(e) le :{" "}
              {new Date(child.birthday).toLocaleDateString("fr-FR")}
            </Typography>
          </div>
        ))}

        {(!childrenResponse?.data || childrenResponse.data.length === 0) && (
          <div className="col-span-full text-center">
            <Typography as="p" className="text-gray-500">
              Vous n'avez pas encore ajouté d'enfant à votre compte.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export { ChildMonitoringPage };
