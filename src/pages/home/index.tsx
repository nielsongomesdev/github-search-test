import { Box, Heading, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box p={8} textAlign="center">
      <Heading mb={4}>{t("search_title")}</Heading>
      <Button onClick={toggleLanguage} colorScheme="blue">
        Mudar Idioma / Change Language
      </Button>
    </Box>
  );
};
