<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('category', ['ready', 'po']);
            $table->decimal('price', 12, 2);
            $table->integer('stock')->default(0);
            $table->timestamps();
        });

        // Users dengan koordinat (Decimal untuk stabilitas)
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();
        });

        // Orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->enum('type', ['ready', 'po']);
            $table->string('status');
            $table->decimal('shipping_cost', 10, 2);
            $table->timestamps();
        });

        // Order Items
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->integer('quantity');
            $table->decimal('price', 12, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('location');
        });
        Schema::dropIfExists('products');
    }
};
