import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product, ProductCategory } from '@/types/casayur';

const STORAGE_KEY = 'casayur.cart.v1';

type CartContextValue = {
    items: CartItem[];
    count: number;
    addItem: (product: Product, qty?: number) => void;
    setQty: (productId: number, qty: number) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
    subtotalFor: (category: ProductCategory) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const item = value as Partial<CartItem>;

    return (
        typeof item.productId === 'number' &&
        typeof item.name === 'string' &&
        (item.category === 'ready' || item.category === 'po') &&
        typeof item.price === 'number' &&
        typeof item.qty === 'number' &&
        typeof item.stock === 'number'
    );
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);

            if (raw) {
                const parsed: unknown = JSON.parse(raw);

                if (Array.isArray(parsed)) {
                    setItems(parsed.filter(isCartItem));
                }
            }
        } catch {
            // Ignore malformed storage and start with an empty cart.
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!loaded || typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, loaded]);

    const addItem = (product: Product, qty = 1) => {
        if (product.stock <= 0) {
            return;
        }

        setItems((current) => {
            const existing = current.find((item) => item.productId === product.id);

            if (!existing) {
                return [
                    ...current,
                    {
                        productId: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        qty: Math.min(qty, product.stock),
                        stock: product.stock,
                    },
                ];
            }

            return current.map((item) =>
                item.productId === product.id
                    ? {
                          ...item,
                          name: product.name,
                          category: product.category,
                          price: product.price,
                          qty: Math.min(item.qty + qty, product.stock),
                          stock: product.stock,
                      }
                    : item,
            );
        });
    };

    const setQty = (productId: number, qty: number) => {
        setItems((current) => {
            if (qty <= 0) {
                return current.filter((item) => item.productId !== productId);
            }

            return current.map((item) =>
                item.productId === productId
                    ? { ...item, qty: Math.min(qty, item.stock) }
                    : item,
            );
        });
    };

    const removeItem = (productId: number) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
    };

    const clear = () => {
        setItems([]);
    };

    const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);

    const subtotalFor = (category: ProductCategory) =>
        items
            .filter((item) => item.category === category)
            .reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <CartContext.Provider
            value={{ items, count, addItem, setQty, removeItem, clear, subtotalFor }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }

    return context;
}
