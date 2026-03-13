<?php

namespace App\Enums;

use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum Light: string implements HasLabel, HasIcon
{
    case Low = 'low';
    case Medium = 'medium';
    case BrightIndirect = 'bright_indirect';
    case DirectSun = 'direct_sun';

    public function getLabel(): string
    {
        return match ($this) {
            self::Low => 'Low Light',
            self::Medium => 'Medium Light',
            self::BrightIndirect => 'Bright Indirect',
            self::DirectSun => 'Direct Sun',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Low => 'heroicon-o-moon',
            self::Medium => 'heroicon-o-cloud',
            self::BrightIndirect => 'heroicon-o-sun',
            self::DirectSun => 'heroicon-o-bolt',
        };
    }
}
