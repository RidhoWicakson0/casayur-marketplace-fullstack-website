export type ProductCategory = 'ready' | 'po';

export type Product = {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    stock: number;
    description?: string | null;
    image_url?: string | null;
};

export type CartItem = {
    productId: number;
    name: string;
    category: ProductCategory;
    price: number;
    qty: number;
    stock: number;
};

export type ShippingBreakdown = {
    distance: number;
    shipping: { ready: number; po: number };
    total_shipping: number;
    cod_available: boolean;
    po_available: boolean;
};
