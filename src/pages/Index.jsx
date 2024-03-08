import React, { useState, useEffect } from "react";
import { Box, Flex, useToast } from "@chakra-ui/react";

const cellSize = "20px"; // Size of each cell in the grid
const gridSize = 20; // Size of the grid

const Index = () => {
  const toast = useToast();
  const [snake, setSnake] = useState([{ x: 8, y: 8 }]); // Initial position of the snake
  const [food, setFood] = useState({ x: 5, y: 5 }); // Initial position of the food

  useEffect(() => {
    // This function would contain the logic to move the snake and check for collisions
    const handleKeyDown = (event) => {
      toast({
        title: `Key pressed: ${event.key}`,
        status: "info",
        duration: 900,
        isClosable: true,
      });
      // Update snake position based on key pressed
      // setSnake(newSnakePosition)
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake]);

  // This function would need to calculate the new food position when it is eaten
  const generateNewFood = () => {
    setFood({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
  };

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Box width={`${cellSize * gridSize}`} height={`${cellSize * gridSize}`} bg="gray.800" position="relative">
        {Array.from({ length: gridSize }, (_, rowIndex) => Array.from({ length: gridSize }, (_, colIndex) => <Box key={`${rowIndex}-${colIndex}`} size={cellSize} bg="gray.700" border="1px" borderColor="gray.900" position="absolute" top={`${rowIndex * parseInt(cellSize)}px`} left={`${colIndex * parseInt(cellSize)}px`} />))}
        {snake.map((segment, index) => (
          <Box key={index} size={cellSize} bg="green.500" position="absolute" top={`${segment.y * parseInt(cellSize)}px`} left={`${segment.x * parseInt(cellSize)}px`} />
        ))}
        <Box size={cellSize} bg="red.500" position="absolute" top={`${food.y * parseInt(cellSize)}px`} left={`${food.x * parseInt(cellSize)}px`} />
      </Box>
    </Flex>
  );
};

export default Index;
