<?php

namespace App\Enums;

use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum Watering: string implements HasLabel, HasIcon
{
    case Rarely = 'rarely';
    case Weekly = 'weekly';
    case TwiceWeekly = 'twice_weekly';
    case Frequent = 'frequent';

    public function getLabel(): string
    {
        return match ($this) {
            self::Rarely => 'Rarely',
            self::Weekly => 'Weekly',
            self::TwiceWeekly => 'Twice Weekly',
            self::Frequent => 'Frequent',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Rarely => 'heroicon-o-eye-dropper',
            self::Weekly => 'heroicon-o-beaker',
            self::TwiceWeekly => 'heroicon-o-arrow-path',
            self::Frequent => 'heroicon-o-cloud-arrow-down',
        };
    }
}
