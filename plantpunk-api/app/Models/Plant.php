<?php

namespace App\Models;

use App\Enums\Difficulty;
use App\Enums\Humidity;
use App\Enums\Light;
use App\Enums\Watering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Plant extends Model
{
    protected $fillable = [
        'name',
        'scientific_name',
        'slug',
        'description',
        'image',
        'category_id',
        'light',
        'watering',
        'watering_info',
        'humidity',
        'difficulty',
        'substrate',
        'temperature_min',
        'temperature_max',
        'tips',
        'toxic_to_pets',
    ];

    protected function casts(): array
    {
        return [
            'light' => Light::class,
            'watering' => Watering::class,
            'humidity' => Humidity::class,
            'difficulty' => Difficulty::class,
            'toxic_to_pets' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
