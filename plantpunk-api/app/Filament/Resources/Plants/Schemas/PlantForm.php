<?php

namespace App\Filament\Resources\Plants\Schemas;

use App\Enums\Difficulty;
use App\Enums\Humidity;
use App\Enums\Light;
use App\Enums\Watering;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PlantForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->preload()
                    ->createOptionForm([
                        TextInput::make('name')->required(),
                        TextInput::make('slug')->required(),
                    ]),
                Select::make('tags')
                    ->relationship('tags', 'name')
                    ->multiple()
                    ->preload()
                    ->createOptionForm([
                        TextInput::make('name')->required(),
                        TextInput::make('slug')->required(),
                    ]),
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $state, Set $set, string $operation) {
                        if ($operation === 'edit') {
                            return;
                        }
                        $set('slug', Str::slug($state));
                    }),
                TextInput::make('scientific_name'),
                TextInput::make('slug')->required(),
                RichEditor::make('description')
                    ->extraInputAttributes(['style' => 'min-height: 300px'])
                    ->columnSpan('full'),

                Section::make('Characteristics')
                    ->columns(2)
                    ->schema([
                        Select::make('light')
                            ->enum(Light::class)
                            ->options(Light::class),
                        Select::make('watering')
                            ->enum(Watering::class)
                            ->options(Watering::class),
                        Textarea::make('watering_info')
                            ->columnSpan('full'),
                        Select::make('humidity')
                            ->enum(Humidity::class)
                            ->options(Humidity::class),
                        Select::make('difficulty')
                            ->enum(Difficulty::class)
                            ->options(Difficulty::class),
                        Textarea::make('substrate')
                            ->columnSpan('full'),
                        TextInput::make('temperature_min')
                            ->numeric()
                            ->suffix('°C'),
                        TextInput::make('temperature_max')
                            ->numeric()
                            ->suffix('°C'),
                        Toggle::make('toxic_to_pets')
                            ->columnSpan('full'),
                    ]),
                Section::make('')
                    ->columns(2)
                    ->schema([
                    RichEditor::make('tips')
                        ->extraInputAttributes(['style' => 'min-height: 200px'])
                        ->columnSpan('full'),
                    FileUpload::make('image')
                        ->image()
                        ->directory('plants'),
                        ])
            ]);
    }
}
