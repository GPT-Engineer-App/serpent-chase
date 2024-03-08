import React, { useState, useEffect } from "react";
import { Box, Flex, useToast } from "@chakra-ui/react";

const cellSize = "20px"; // Size of each cell in the grid
const gridSize = 20; // Size of the grid

const Index = () => {
  const toast = useToast();
  const [snake, setSnake] = useState([{ x: 8, y: 8 }]); // Initial position of the snake
  const [food, setFood] = useState({ x: 5, y: 5 }); // Initial position of the food

  const moveSnake = (direction) => {
    setSnake((previousSnake) => {
      let newHead = { ...previousSnake[0] };
      if (direction === "ArrowUp") newHead.y -= 1;
      if (direction === "ArrowDown") newHead.y += 1;
      if (direction === "ArrowLeft") newHead.x -= 1;
      if (direction === "ArrowRight") newHead.x += 1;

      if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize) {
        toast({
          title: "Game over!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return [{ x: 8, y: 8 }];
      }

      if (newHead.x === food.x && newHead.y === food.y) {
        generateNewFood();
        return [newHead, ...previousSnake];
      }

      const newSnake = previousSnake.slice();
      newSnake.unshift(newHead);
      newSnake.pop();
      return newSnake;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.startsWith("Arrow")) {
        moveSnake(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [snake, toast]);

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
