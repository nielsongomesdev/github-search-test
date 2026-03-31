import { useState, type SyntheticEvent } from "react";
import { Box, Heading, Input, Button, Flex, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const normalizedUsername = username.trim();
    if (normalizedUsername !== "") {
      navigate(`/profile/${encodeURIComponent(normalizedUsername)}`);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      bg="white"
    >
      <Box position="absolute" top={4} right={4}>
        <Button
          size="sm"
          onClick={toggleLanguage}
          variant="outline"
          borderColor="border.gray"
          bg="white"
          fontWeight="500"
        >
          {i18n.language === "pt" ? "EN" : "PT"}
        </Button>
      </Box>

      <Box maxW="800px" w="100%" px={4} textAlign="center">
        <Heading
          mb={10}
          fontSize={{ base: "5xl", md: "80px" }}
          fontWeight="500"
          lineHeight="100%"
        >
          <Text as="span" color="brand.blue">
            {t("home_title_1")}{" "}
          </Text>
          <Text as="span" color="brand.purple">
            {t("home_title_2")}
          </Text>
        </Heading>

        <form onSubmit={handleSearch}>
          <Flex gap="32px" w="100%" direction={{ base: "column", md: "row" }}>
            <InputGroup size="lg" w="100%" maxW={{ md: "592px" }}>
              <InputLeftElement pointerEvents="none" height="48px">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A0AEC0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </InputLeftElement>

              <Input
                placeholder={t("search_placeholder")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                height={{ base: "48px", md: "45px" }}
                bg="white"
                borderRadius="6px"
                borderColor="border.gray"
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="400"
                _placeholder={{ color: "placeholder" }}
                _hover={{ borderColor: "brand.purple" }}
                _focus={{
                  borderColor: "brand.purple",
                  boxShadow: "0 0 0 1px #8C19D2",
                }}
              />
            </InputGroup>

            <Button
              type="submit"
              bg="brand.purple"
              color="white"
              width={{ base: "100%", md: "195px" }}
              height={{ base: "48px", md: "45px" }}
              borderRadius="6px"
              py={{ base: 3, md: 2 }}
              px={{ base: 6, md: 6 }}
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight="600"
              _hover={{ bg: "brand.hoverPurple" }}
              _active={{ bg: "brand.activePurple" }}
            >
              {t("search_button")}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
