import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function UpdateUser({ variant }: { variant: string }) {
  const getCurrentTimestamp = () => new Date().toISOString();

  const handleAction = () => {
    const timestamp = getCurrentTimestamp();
    let message = "";
    let description = "";

    switch (variant) {
      case "add":
        message = "Account has been added";
        description = `createdAt: ${timestamp}`;
        break;
      case "update":
        message = "Account has been updated";
        description = `updatedAt: ${timestamp}`;
        break;
      case "delete":
        message = "Account has been deleted";
        description = `deletedAt: ${timestamp}`;
        break;
      default:
        break;
    }

    toast(message, {
      description,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <Button variant="outline" onClick={handleAction}>
      {variant.charAt(0).toUpperCase() + variant.slice(1)} Account
    </Button>
  );
}