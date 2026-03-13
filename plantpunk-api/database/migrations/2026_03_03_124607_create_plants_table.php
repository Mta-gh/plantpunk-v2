<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('scientific_name')->nullable();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('light')->nullable();
            $table->string('watering')->nullable();
            $table->text('watering_info')->nullable();
            $table->string('humidity')->nullable();
            $table->string('difficulty')->nullable();
            $table->text('substrate')->nullable();
            $table->integer('temperature_min')->nullable();
            $table->integer('temperature_max')->nullable();
            $table->text('tips')->nullable();
            $table->boolean('toxic_to_pets')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plants');
    }
};
