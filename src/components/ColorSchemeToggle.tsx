import { ActionIcon, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { BsMoon, BsSun } from 'react-icons/bs';

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={() => toggleColorScheme()}>
      <ThemeIcon variant="light">
        {colorScheme === 'dark' ? <BsSun /> : <BsMoon />}
      </ThemeIcon>
    </ActionIcon>
  );
}
export default ColorSchemeToggle;
