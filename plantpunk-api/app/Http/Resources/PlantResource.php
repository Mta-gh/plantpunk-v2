<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'scientific_name' => $this->scientific_name,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => $this->image,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'light' => $this->light ? [
                'value' => $this->light->value,
                'label' => $this->light->getLabel(),
                'icon' => $this->light->getIcon(),
            ] : null,
            'watering' => $this->watering ? [
                'value' => $this->watering->value,
                'label' => $this->watering->getLabel(),
                'icon' => $this->watering->getIcon(),
            ] : null,
            'watering_info' => $this->watering_info,
            'humidity' => $this->humidity ? [
                'value' => $this->humidity->value,
                'label' => $this->humidity->getLabel(),
                'icon' => $this->humidity->getIcon(),
            ] : null,
            'difficulty' => $this->difficulty ? [
                'value' => $this->difficulty->value,
                'label' => $this->difficulty->getLabel(),
                'icon' => $this->difficulty->getIcon(),
            ] : null,
            'substrate' => $this->substrate,
            'temperature_min' => $this->temperature_min,
            'temperature_max' => $this->temperature_max,
            'tips' => $this->tips,
            'toxic_to_pets' => $this->toxic_to_pets,
        ];
    }
}
