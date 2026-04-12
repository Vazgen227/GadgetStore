import fragrancesData from '../data/fragrances.json'

export type Product = {
  id: number
  title: string
  brand: string
  price: number
  category: string
  description: string
  volume: string
  type: string
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  rating: number
  reviews: number
  inStock: boolean
  image: string
}

export type ProductsResponse = {
  products: Product[]
  total: number
}

// Імітація затримки API для реалістичності
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Отримати всі парфуми
 */
export async function getProducts(): Promise<ProductsResponse> {
  await delay(500) // симулюємо мережевий запит
  
  return {
    products: fragrancesData.products as Product[],
    total: fragrancesData.products.length
  }
}

/**
 * Отримати парфум по ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  await delay(300)
  
  const product = fragrancesData.products.find(p => p.id === id)
  return product as Product || null
}

/**
 * Пошук парфумів по ключовому слову
 */
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(400)
  
  const lowerQuery = query.toLowerCase()
  return fragrancesData.products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  ) as Product[]
}

/**
 * Фільтрація по категорії
 */
export async function filterByCategory(category: string): Promise<Product[]> {
  await delay(300)
  
  return fragrancesData.products.filter(p => 
    p.category === category
  ) as Product[]
}

/**
 * Фільтрація по бренду
 */
export async function filterByBrand(brand: string): Promise<Product[]> {
  await delay(300)
  
  return fragrancesData.products.filter(p => 
    p.brand.toLowerCase() === brand.toLowerCase()
  ) as Product[]
}

/**
 * Фільтрація по ціні
 */
export async function filterByPrice(min: number, max: number): Promise<Product[]> {
  await delay(300)
  
  return fragrancesData.products.filter(p => 
    p.price >= min && p.price <= max
  ) as Product[]
}

/**
 * Сортування парфумів
 */
export async function sortProducts(
  products: Product[], 
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'popularity'
): Promise<Product[]> {
  await delay(200)
  
  const sorted = [...products]
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'popularity':
      return sorted.sort((a, b) => b.reviews - a.reviews)
    default:
      return sorted
  }
}

/**
 * Отримати унікальні бренди
 */
export function getUniqueBrands(): string[] {
  const brands = fragrancesData.products.map(p => p.brand)
  return [...new Set(brands)].sort()
}

/**
 * Отримати унікальні категорії
 */
export function getUniqueCategories(): string[] {
  const categories = fragrancesData.products.map(p => p.category)
  return [...new Set(categories)].sort()
}

/**
 * Отримати рекомендовані парфуми (топ рейтинг)
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  await delay(300)
  
  return fragrancesData.products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit) as Product[]
}

/**
 * Отримати схожі парфуми (по бренду або категорії)
 */
export async function getSimilarProducts(productId: number, limit: number = 4): Promise<Product[]> {
  await delay(300)
  
  const product = fragrancesData.products.find(p => p.id === productId)
  if (!product) return []
  
  const similar = fragrancesData.products.filter(p => 
    p.id !== productId && 
    (p.brand === product.brand || p.category === product.category)
  )
  
  return similar.slice(0, limit) as Product[]
}
