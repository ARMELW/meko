import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Typography } from "@/components";
import { ControlledTextInput } from "@/components/molecules/form/controlled-input";
import { LoadingButton } from "@/components/atoms/actions/loading-button";
import { useTranslation } from "react-i18next";
import { shareSchema, ShareFormData } from "@/app/share/schema";
import { handleSimpleApiError } from "@/utils/error-handler";
import { useState } from "react";

export interface ShareFormProps {
  onSubmit: (data: ShareFormData) => Promise<void>;
  loading?: boolean;
}

export function ShareForm({ onSubmit, loading = false }: ShareFormProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, reset } = useForm<ShareFormData>({
    defaultValues: { email: "" },
    resolver: zodResolver(shareSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: ShareFormData) => {
    setError(null);
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
  setError(t("share.error", "Erreur lors du partage"));
      handleSimpleApiError(err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 flex flex-col gap-4">
      <Typography variant="h2" className="text-center">
  {t("share.title", "Partager avec un ami")}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <ControlledTextInput
          name="email"
          control={control}
          placeholder={t("share.emailPlaceholder", "Email de l'ami")}
          type="email"
          required
        />
        {error && (
          <Typography className="text-red-500 text-sm text-center">{error}</Typography>
        )}
        <LoadingButton
          loading={loading}
          type="submit"
          size="small"
          color="secondary"
          className="w-full"
        >
          {t("share.cta", "Envoyer")}
        </LoadingButton>
      </form>
    </Card>
  );
}
