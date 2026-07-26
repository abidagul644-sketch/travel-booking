const imageMap = {
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
  murree: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=600&h=400&fit=crop',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
  karachi: 'https://images.unsplash.com/photo-1621506646401-8ee372cd0dee?w=600&h=400&fit=crop',
  multan: 'https://images.unsplash.com/photo-1621855041766-b53da9ba6a58?w=600&h=400&fit=crop',
  turkey: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop',
  istanbul: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop',
  cappadocia: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600&h=400&fit=crop',
  pakistan: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=600&h=400&fit=crop',
  india: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
  paris: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
  london: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop',
  maldives: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop',
  thailand: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
  japan: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
  newyork: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
  singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop',
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
];

export function getDestinationImage(destination) {
  if (!destination) return fallbackImages[0];
  const key = destination.toLowerCase();

  for (const place in imageMap) {
    if (key.includes(place)) {
      return imageMap[place];
    }
  }

  const index = destination.length % fallbackImages.length;
  return fallbackImages[index];
}