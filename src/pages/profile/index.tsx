import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Spinner, Text, Grid, GridItem, Image, Button, VStack, Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Header } from "../../components/Header";
import { RepoCard } from "../../components/RepoCard";
import { getUserByUsername, getUserRepositories } from "../../services/github";
import { type User } from "../../schemas/user";
import { type Repository } from "../../schemas/repositorySchema";

export const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(false);

  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("updated");
  const [hasMore, setHasMore] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const observerTarget = useRef(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      try {
        setLoadingUser(true);
        setError(false);
        const data = await getUserByUsername(username);
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setError(true);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchRepos = async () => {
      if (!username) return;
      try {
        setLoadingRepos(true);
        const data = await getUserRepositories(username, page, 10, sort);
        
        if (data.length < 10) {
          setHasMore(false);
        }
        
        setRepos((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (err) {
        console.error("Erro ao buscar repositórios:", err);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
  }, [username, page, sort]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRepos) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingRepos]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1); 
    setRepos([]); 
    setHasMore(true); 
  };

  if (loadingUser) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Flex height="calc(100vh - 88px)" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="brand.purple" thickness="4px" />
        </Flex>
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Flex height="calc(100vh - 88px)" alignItems="center" justifyContent="center">
          <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.500" fontWeight="500" px={4} textAlign="center">
            {t("user_not_found")}
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Box maxW="1200px" mx="auto" p={{ base: 3, md: 4 }} pt={{ base: 6, md: 10 }}>
        <Grid templateColumns={{ base: "1fr", md: "280px 1fr" }} gap={{ base: 4, md: 8 }}>
          <GridItem>
            <Flex direction="column" gap={6}>
              <Flex direction="column" gap={6} bg="white" p={6} borderRadius="4px" boxShadow="sm" border="1px solid" borderColor="gray.200">
              <Flex gap={4} alignItems={{ base: "flex-start", md: "center" }}>
                  <Image src={user.avatar_url} alt={user.name || user.login} borderRadius="full" boxSize={{ base: "56px", md: "48px" }} objectFit="cover" border="1px solid" borderColor="border.gray" flexShrink={0} />
                  <Box flex={1}>
                    <Text fontSize={{ base: "lg", md: "lg" }} fontWeight="700" color="gray.800" lineHeight="1.2">{user.name || user.login}</Text>
                    <Text fontSize={{ base: "14px", md: "14px" }} fontWeight="400" lineHeight="150%" color="rgba(160, 174, 192, 1)">@{user.login}</Text>
                    {user.bio && <Text color="gray.600" fontSize={{ base: "xs", md: "sm" }} lineHeight="1.4" display={{ base: "block", md: "none" }} mt={1}>{user.bio}</Text>}
                    <Flex gap={4} mt={2} fontSize={{ base: "xs", md: "sm" }} color="gray.600" display={{ base: "flex", md: "none" }}>
                      <Flex gap={1} alignItems="center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        <Text>{user.followers}</Text>
                      </Flex>
                      <Flex gap={1} alignItems="center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <Text>{user.following}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                {user.bio && <Text color="gray.600" fontSize="sm" display={{ base: "none", md: "block" }}>{user.bio}</Text>}
                <VStack align="start" spacing={2} color="gray.600" fontSize="sm" display={{ base: "none", md: "flex" }}>
                  <Flex gap={2} alignItems="center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <Text>{user.followers} {t('followers')}</Text>
                  </Flex>
                  <Flex gap={2} alignItems="center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    <Text>{user.following} {t('following')}</Text>
                  </Flex>
                </VStack>
                <Flex gap={2} wrap="wrap" color="gray.600" fontSize={{ base: "xs", md: "sm" }} alignItems="center" display={{ base: "flex", md: "none" }}>
                  {user.company && <Flex gap={1} alignItems="center" px={2} py={1} bg="gray.100" borderRadius="2px"><Text>🏢 {user.company}</Text></Flex>}
                  {user.location && <Flex gap={1} alignItems="center" px={2} py={1} bg="gray.100" borderRadius="2px"><Text>📍 {user.location}</Text></Flex>}
                  {user.email && <Flex gap={1} alignItems="center" px={2} py={1} bg="gray.100" borderRadius="2px"><Text>📧 {user.email}</Text></Flex>}
                </Flex>
                <VStack align="start" spacing={3} color="gray.600" fontSize="sm" w="100%" display={{ base: "none", md: "flex" }}>
                  {user.company && <Flex gap={2} alignItems="center"><Text>🏢 {user.company}</Text></Flex>}
                  {user.location && <Flex gap={2} alignItems="center"><Text>📍 {user.location}</Text></Flex>}
                  {user.blog && (
                    <Button
                      as="a"
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="link"
                      color="gray.600"
                      fontWeight="normal"
                      leftIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>}
                    >
                      {t('website')}
                    </Button>
                  )}
                  {user.twitter_username && (
                    <Button
                      as="a"
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="link"
                      color="gray.600"
                      fontWeight="normal"
                      leftIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>}
                    >
                      @{user.twitter_username}
                    </Button>
                  )}
                </VStack>
                <Flex gap={2} wrap="wrap" display={{ base: "flex", md: "none" }}>
                  {user.blog && (
                    <Button
                      as="a"
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="link"
                      color="gray.600"
                      fontWeight="normal"
                      fontSize="xs"
                      leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>}
                    >
                      {t('website')}
                    </Button>
                  )}
                  {user.twitter_username && (
                    <Button
                      as="a"
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="link"
                      color="gray.600"
                      fontWeight="normal"
                      fontSize="xs"
                      leftIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>}
                    >
                      @{user.twitter_username}
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Button w="100%" h="44px" bg="brand.purple" color="white" borderRadius="4px" fontWeight="600" cursor="default" _hover={{}} _active={{}}>
                {t('contact')}
              </Button>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" gap={4}>
              <Flex justifyContent="space-between" alignItems={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="600" color="gray.800">
                  {t('repositories')}
                </Text>
                
                <Select 
                  w={{ base: "100%", md: "200px" }} 
                  bg="white" 
                  value={sort} 
                  onChange={handleSortChange}
                  borderColor="gray.300"
                  fontSize={{ base: "sm", md: "md" }}
                  _focus={{ borderColor: "brand.purple", boxShadow: '0 0 0 1px #8C19D2' }}
                >
                  <option value="updated">{t('sort_updated')}</option>
                  <option value="created">{t('sort_created')}</option>
                  <option value="pushed">{t('sort_pushed')}</option>
                  <option value="full_name">{t('sort_alphabetical')}</option>
                </Select>
              </Flex>
              <Box bg="white" borderRadius="4px" p={6} border="1px solid" borderColor="gray.200" boxShadow="sm">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}

                <Box ref={observerTarget} h="20px" w="100%">
                  {loadingRepos && (
                    <Flex justify="center" p={4}>
                      <Spinner color="brand.purple" />
                    </Flex>
                  )}
                </Box>
                
                {!hasMore && repos.length > 0 && (
                  <Text textAlign="center" mt={4} color="gray.500" fontSize="sm">
                    {t('end_of_list')}
                  </Text>
                )}
              </Box>
            </Flex>
          </GridItem>

        </Grid>
      </Box>
    </Box>
  );
};