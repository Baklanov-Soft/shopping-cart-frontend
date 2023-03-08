import { ColorScheme } from '@mantine/core';
import { useState } from 'react';

type UseColorSchemeToggleReturnType = [
  ColorScheme,
  (colorScheme: ColorScheme) => void
];

function useColorSchemeToggle(
  scheme: ColorScheme
): UseColorSchemeToggleReturnType {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(scheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    document.cookie = 'COLOR_SCHEME=' + nextColorScheme + ';path=/';
  };

  return [colorScheme, toggleColorScheme];
}

export default useColorSchemeToggle;
