'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const categories = [
  { 
    id: 1, 
    name: 'Appetizers',
    description: 'Start your culinary journey with our exquisite appetizers',
    image: '/placeholder.svg?height=400&width=600',
    items: [
      { id: 1, name: 'Truffle Arancini', price: '$12', description: 'Crispy risotto balls with black truffle', image: '/placeholder.svg?height=300&width=400' },
      { id: 2, name: 'Tuna Tartare', price: '$16', description: 'Fresh tuna with avocado and citrus dressing', image: '/placeholder.svg?height=300&width=400' },
      { id: 3, name: 'Foie Gras Terrine', price: '$18', description: 'Served with brioche and fig jam', image: '/placeholder.svg?height=300&width=400' },
      { id: 4, name: 'Lobster Bisque', price: '$14', description: 'Creamy lobster soup with cognac', image: '/placeholder.svg?height=300&width=400' },
      { id: 5, name: 'Caesar Salad', price: '$10', description: 'Classic salad with house-made dressing', image: '/placeholder.svg?height=300&width=400' },
      { id: 6, name: 'Escargot', price: '$15', description: 'Traditional French preparation with garlic butter', image: '/placeholder.svg?height=300&width=400' },
    ]
  },
  { 
    id: 2, 
    name: 'Main Courses',
    description: 'Indulge in our chef\'s signature main dishes',
    image: '/placeholder.svg?height=400&width=600',
    items: [
      { id: 1, name: 'Wagyu Beef Fillet', price: '$42', description: 'A5 Wagyu beef with truffle jus', image: '/placeholder.svg?height=300&width=400' },
      { id: 2, name: 'Dover Sole Meunière', price: '$38', description: 'Classic French preparation with lemon and parsley', image: '/placeholder.svg?height=300&width=400' },
      { id: 3, name: 'Rack of Lamb', price: '$36', description: 'Herb-crusted with ratatouille', image: '/placeholder.svg?height=300&width=400' },
      { id: 4, name: 'Truffle Risotto', price: '$28', description: 'Arborio rice with black truffle and parmesan', image: '/placeholder.svg?height=300&width=400' },
      { id: 5, name: 'Duck Breast', price: '$34', description: 'Pan-seared with cherry sauce', image: '/placeholder.svg?height=300&width=400' },
      { id: 6, name: 'Lobster Thermidor', price: '$45', description: 'Classic preparation with cognac cream', image: '/placeholder.svg?height=300&width=400' },
    ]
  },
  { 
    id: 3, 
    name: 'Desserts',
    description: 'Complete your meal with our decadent desserts',
    image: '/placeholder.svg?height=400&width=600',
    items: [
      { id: 1, name: 'Crème Brûlée', price: '$10', description: 'Classic vanilla bean custard with caramelized sugar', image: '/placeholder.svg?height=300&width=400' },
      { id: 2, name: 'Chocolate Soufflé', price: '$12', description: 'Warm chocolate soufflé with vanilla ice cream', image: '/placeholder.svg?height=300&width=400' },
      { id: 3, name: 'Tarte Tatin', price: '$11', description: 'Upside-down caramelized apple tart', image: '/placeholder.svg?height=300&width=400' },
      { id: 4, name: 'Cheese Plate', price: '$16', description: 'Selection of artisanal cheeses with accompaniments', image: '/placeholder.svg?height=300&width=400' },
      { id: 5, name: 'Profiteroles', price: '$11', description: 'Choux pastry with vanilla ice cream and chocolate sauce', image: '/placeholder.svg?height=300&width=400' },
      { id: 6, name: 'Mille-feuille', price: '$12', description: 'Layered puff pastry with vanilla cream', image: '/placeholder.svg?height=300&width=400' },
    ]
  },
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null)

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const selectedCategoryData = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)
    : null

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#2c2c2c] p-8">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="categories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif text-center mb-12">Our Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={category.image}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-serif mb-2">{category.name}</h2>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="category-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={() => setSelectedCategory(null)}
              className="mb-8"
              variant="outline"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Menu
            </Button>
            <h1 className="text-4xl font-serif text-center mb-4">
              {selectedCategoryData?.name}
            </h1>
            <p className="text-center text-gray-600 mb-12">{selectedCategoryData?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {selectedCategoryData?.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-serif">{item.name}</h3>
                        <span className="text-lg font-semibold text-[#b8860b]">{item.price}</span>
                      </div>
                      <Separator className="my-2" />
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}