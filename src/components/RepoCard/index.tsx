import { Box, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { type Repository } from "../../schemas/repositorySchema";

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  const { t, i18n } = useTranslation();

  const formattedDate = new Date(repo.updated_at).toLocaleDateString(
    i18n.language === "pt" ? "pt-BR" : "en-US",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <Box
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      _last={{ borderBottom: "none" }}
    >
      <Flex direction="column" gap={2}>
        <ChakraLink
          href={repo.html_url}
          isExternal
          fontSize="xl"
          fontWeight="700"
          color="gray.800"
          _hover={{ color: "brand.blue", textDecoration: "underline" }}
        >
          {repo.name}
        </ChakraLink>

        {repo.description && (
          <Text fontSize="sm" color="gray.600" lineHeight="1.6">
            {repo.description}
          </Text>
        )}

        <Flex gap={2} alignItems="center" mt={2} color="gray.500" fontSize="xs">
          <Flex gap={1} alignItems="center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <Text>{repo.stargazers_count}</Text>
          </Flex>
          <Text>•</Text>

          <Text>
            {t("updated_on")} {formattedDate}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
