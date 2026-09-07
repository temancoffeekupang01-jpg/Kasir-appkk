import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Coffee } from 'lucide-react'
import { toast } from 'sonner'

type Menu = { id: number; nama: string; harga: number; kategori: string }
type CartItem = Menu & { qty: number }

const MENU_DUMMY: Menu[] = [
  { id: 1, nama: 'Es Kopi Susu', harga: 18000, kategori: 'Kopi' },
  { id: 2, nama: 'Americano', harga: 15000, kategori: 'Kopi' },
  { id: 3, nama: 'Cappuccino', harga: 20000, kategori: 'Kopi' },
  { id: 4, nama: 'Roti Bakar', harga: 12000, kategori: 'Makanan' },
  { id: 5, nama: 'French Fries', harga: 15000, kategori: 'Makanan' },
]

export default function HalamanKasir() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (menu: Menu) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === menu.id)
      if (exist) {
        return prev.map(item => 
          item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...menu, qty: 1 }]
    })
    toast.success(`${menu.nama} ditambah`)
  }

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id)
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return toast.error('Keranjang kosong')
    toast.success(`Checkout berhasil! Total: Rp${total.toLocaleString('id-ID')}`)
    setCart([])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* KIRI - MENU */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Coffee /> Teman Coffee Kupang
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {MENU_DUMMY.map(menu => (
            <button
              key={menu.id}
              onClick={() => addToCart(menu)}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-left"
            >
              <p className="font-bold">{menu.nama}</p>
              <p className="text-sm text-gray-500">{menu.kategori}</p>
              <p className="text-lg font-bold mt-2">Rp{menu.harga.toLocaleString('id-ID')}</p>
            </button>
          ))}
        </div>
      </div>

      {/* KAN - KERANJANG */}
      <div className="w-1/3 bg-white p-4 shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart /> Keranjang
        </h2>
        
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Keranjang kosong</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-3 border-b pb-2">
                <div>
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm">Rp{item.harga.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 border rounded"><Minus size={14}/></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 border rounded"><Plus size={14}/></button>
                  <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total</span>
            <span>Rp{total.toLocaleString('id-ID')}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  )
          }
