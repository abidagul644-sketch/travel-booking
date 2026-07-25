// Har destination ke liye consistent (hamesha wahi) image dega, kyun ke seed uske naam se banta hai
export function getDestinationImage(destination) {
  const seed = encodeURIComponent(destination || 'travel');
  return `https://picsum.photos/seed/${seed}/600/400`;
}