import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Coffee, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '../lib/supabase' // 1. IMPORT SUPABASE

type Menu = { id: number; nama: string; harga: number; kategori: string }
type CartItem = Menu & { qty: number }

export default function HalamanKasir() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [menu, setMenu] = useState<Menu[]>([]) // 2. STATE BUAT MENU
  const [loading, setLoading] = useState(true) // 3. STATE LOADING

  // 4. AMBIL DATA DARI SUPABASE PAS HALAMAN DIBUKA
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('menu').select('*')
      
      if (error) {
        toast.error('Gagal ambil menu: ' + error.message)
      } else {
        setMenu(data || [])
      }
      setLoading(false)
    }
    fetchMenu()
  }, [])

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

        {loading ? ( // 5. KALO LAGI LOADING
          <div className="flex justify-center items-center h-96">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {menu.map(menu => ( // 6. GANTI DARI MENU_DUMMY JADI menu
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
        )}
      </div>

      {/* KANAN - KERANJANG - SAMA KAYAK TADI */}
      <div className="w-1/3 bg-white p-4 shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart /> Keranjang
        </h2>
        
        <div className="flex-1 overflow-y-auto">
