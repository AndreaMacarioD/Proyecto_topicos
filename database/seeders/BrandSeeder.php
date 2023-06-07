<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::create([
            'name' => 'Metalica',
        ]);
        Brand::create([
            'name' => 'Twenty One Pilots',
        ]);
        Brand::create([
            'name' => 'My Chemical Romance',
        ]);
        Brand::create([
            'name' => 'System of a Down ',
        ]);
        Brand::create([
            'name' => 'Eminenm',
        ]);
        Brand::create([
            'name' => 'Gorillaz',
        ]);
    }
}
