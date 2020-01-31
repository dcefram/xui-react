import get from './get';

// Because polished.js doesn't like native CSS variables, we have to do this workaround helper
export default function(props: any, path: string[], fallback: any) {
  const value = get(props, path, fallback);

  if (value[0] !== '#') {
    return fallback;
  }

  return value;
}
