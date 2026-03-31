import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  const displayUsername = username ? decodeURIComponent(username) : "";

  return (
    <Box p={8}>
      <Heading>Profile Page</Heading>
      <Text mt={4}>Showing results for: {displayUsername}</Text>
    </Box>
  );
};
