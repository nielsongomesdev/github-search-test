import { useState, type SyntheticEvent } from "react";
import { Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, IconButton, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LanguageToggle } from "../LanguageToggle";

export const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const normalizedSearch = search.trim();
    if (normalizedSearch !== "") {
      navigate(`/profile/${encodeURIComponent(normalizedSearch)}`);
      setSearch("");
    }
  };

  return (
    <Box as="header" w="100%" h="88px" bg="white" boxShadow="sm">
      <Flex maxW="1200px" mx="auto" h="100%" alignItems="center" px={4} gap={8}>
        <Heading
          fontSize="32px"
          fontWeight="500"
          cursor="pointer"
          onClick={() => navigate("/")}
          w={{ base: "auto", md: "280px" }}
          flexShrink={0}
        >
          <Text as="span" color="brand.blue">
            {t("home_title_1")}{" "}
          </Text>
          <Text as="span" color="brand.purple">
            {t("home_title_2")}
          </Text>
        </Heading>
        <Box as="form" onSubmit={handleSearch} w="100%" maxW="590px">
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A0AEC0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </InputLeftElement>
            <Input
              placeholder={t("search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="white"
              borderRadius="4px"
              borderColor="border.gray"
              fontSize="18px"
              fontWeight="400"
              _placeholder={{ color: "rgba(0, 0, 0, 0.36)" }}
              _focus={{
                borderColor: "brand.purple",
                boxShadow: "0 0 0 1px #8C19D2",
              }}
            />
            <InputRightElement display={{ base: "flex", md: "none" }}>
              <IconButton
                aria-label={t("search_button")}
                type="submit"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                }
                size="sm"
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box ml="auto">
          <LanguageToggle />
        </Box>
      </Flex>
    </Box>
  );
};
