<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Rock',
        ]);
        Category::create([
            'name' => 'Pop',
        ]);
        Category::create([
            'name' => 'Hip Hop',
        ]);
    }
}
