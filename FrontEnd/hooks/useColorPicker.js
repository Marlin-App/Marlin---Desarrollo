
export function useColorPicker() {
  const [color, setColor] = useState('black');

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return {
    color,
    handleChange,
  };
}