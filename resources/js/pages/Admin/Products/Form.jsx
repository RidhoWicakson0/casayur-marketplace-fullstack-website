import { Link, useForm } from '@inertiajs/react';

export default function ProductForm({ product = null }) {
    const editing = Boolean(product);
    const { data, setData, post, transform, processing, errors } = useForm({
        name: product?.name || '', category: product?.category || 'ready', price: product?.price || '', stock: product?.stock || '', description: product?.description || '', image: null,
    });
    const submit = (event) => {
        event.preventDefault();
        transform((formData) => editing ? { ...formData, _method: 'patch' } : formData);
        post(editing ? `/admin/products/${product.id}` : '/admin/products', { forceFormData: true });
    };
    return <main className="min-h-screen bg-paper p-5 text-ink sm:p-8"><div className="mx-auto max-w-3xl"><Link href="/admin/products" className="text-sm text-leaf">← Kembali ke produk</Link><h1 className="mt-4 font-display text-3xl font-bold">{editing ? 'Edit produk' : 'Tambah produk'}</h1><form onSubmit={submit} className="mt-6 grid gap-5 rounded-2xl border border-line bg-surface p-6 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium sm:col-span-2">Nama produk<input value={data.name} onChange={(e) => setData('name', e.target.value)} className="rounded-lg border border-line bg-paper p-3" />{errors.name && <span className="text-danger">{errors.name}</span>}</label>
        <label className="grid gap-1 text-sm font-medium">Kategori<select value={data.category} onChange={(e) => setData('category', e.target.value)} className="rounded-lg border border-line bg-paper p-3"><option value="ready">Ready stock</option><option value="po">Preorder</option></select></label>
        <label className="grid gap-1 text-sm font-medium">Harga<input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className="rounded-lg border border-line bg-paper p-3" />{errors.price && <span className="text-danger">{errors.price}</span>}</label>
        <label className="grid gap-1 text-sm font-medium">Stok<input type="number" value={data.stock} onChange={(e) => setData('stock', e.target.value)} className="rounded-lg border border-line bg-paper p-3" />{errors.stock && <span className="text-danger">{errors.stock}</span>}</label>
        <label className="grid gap-1 text-sm font-medium sm:col-span-2">Foto<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setData('image', e.target.files[0])} className="rounded-lg border border-line bg-paper p-3" />{errors.image && <span className="text-danger">{errors.image}</span>}</label>
        <label className="grid gap-1 text-sm font-medium sm:col-span-2">Deskripsi<textarea rows="5" value={data.description} onChange={(e) => setData('description', e.target.value)} className="rounded-lg border border-line bg-paper p-3" />{errors.description && <span className="text-danger">{errors.description}</span>}</label>
        <button disabled={processing} className="rounded-lg bg-leaf px-5 py-3 font-semibold text-white hover:bg-leaf-deep disabled:opacity-60 sm:col-span-2">{processing ? 'Menyimpan...' : editing ? 'Simpan perubahan' : 'Simpan produk'}</button>
    </form></div></main>;
}
