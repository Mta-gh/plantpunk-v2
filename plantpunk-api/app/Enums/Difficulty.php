<?php

namespace App\Enums;

use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum Difficulty: string implements HasLabel, HasIcon
{
    case Beginner = 'beginner';
    case Intermediate = 'intermediate';
    case Advanced = 'advanced';

    public function getLabel(): string
    {
        return match ($this) {
            self::Beginner => 'Beginner',
            self::Intermediate => 'Intermediate',
            self::Advanced => 'Advanced',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Beginner => 'heroicon-o-face-smile',
            self::Intermediate => 'heroicon-o-academic-cap',
            self::Advanced => 'heroicon-o-fire',
        };
    }
}
