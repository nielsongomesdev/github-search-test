import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const handleToggle = () => {
    const nextLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      borderColor="gray.300"
      color="gray.600"
      _hover={{ bg: "gray.50" }}
    >
      {i18n.language === "pt" ? "EN" : "PT"}
    </Button>
  );
};
