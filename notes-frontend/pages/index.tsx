import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  Heading,
  StackDivider,
  ChakraProvider,
  extendTheme,
  theme,
} from '@chakra-ui/react';
import { useContract, useContractWrite, useContractRead, useAddress, ConnectWallet } from '@thirdweb-dev/react';

const customTheme = extendTheme({
  ...theme,
  components: {
    
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

const NotesApp = () => {
  const { contract } = useContract("0xC957A6077d367621a5eC8ADbBC6A57de4Ec5DF70");
  const [newNote, setNewNote] = useState('');
  const address = useAddress();

  const { mutateAsync: createNote, isLoading } = useContractWrite(contract, "createNote");

  const handleCreateNote = async () => {
    try {
      if (newNote) {
        const data = await createNote({ args: [newNote] }); // Pass newNote as an argument
        setNewNote('');
        console.info("Contract call success", data);
      } else {
        console.error("Note cannot be empty");
      }
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };
  
  

  // Use useContractRead to fetch the user's note
  const { data: userNote, isLoading: noteIsLoading } = useContractRead(contract, "userNotes", [address]);

  return (
    <ChakraProvider theme={customTheme}>
      <Box p={"7%"} bg="black" minH="100vh" display="flex" flexDir="column" alignItems="center">
        <ConnectWallet/>
        <Heading as="h1" pt={5} mb={4} color="white">
          The Notes Dapp
        </Heading>
        <VStack
          spacing={4}
          align="stretch"
          w="100%"
          maxW="400px"
        >
          <Input
            type="text"
            placeholder="Enter a new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={handleCreateNote}
            isLoading={isLoading}
          >
            Create Note
          </Button>
          
          {userNote && (
            <Box
              p={4}
              bg="black" // Background color
              borderRadius="md" // Rounded corners
              borderWidth={1} // Border width
              borderColor="teal.200" // Border color
              shadow="md" // Box shadow
            >
              <Text>Your Note: {userNote}</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default NotesApp;
