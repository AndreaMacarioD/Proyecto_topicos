<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'category_id' => 1,
            'brand_id' => 1,
            'name' => 'Metalica',
            'relase' => '1991-8-12',
            'price' => 566.87,
            'description' => 'The Black Album is one of the most commercially successful and critically acclaimed albums of all time, with global sales of over 35 million, and contains a series of relentless singles, Enter Sandman, The Unforgiven, Nothing Else Matters, Wherever I May Roam and Sad But True. Remastered by Bob Ludwig at Gateway Mastering and supervised by executive producer Greg Fidelman. Includes digital download.',
            'quantity' => 5,
            'deliverTime' => 3,
            'image' => 'imagesP/metallica.jpg'
        ]);
        Product::create([
            'category_id' => 2,
            'brand_id' => 2,
            'name' => 'BlurryFace',
            'relase' => '2015-5-17',
            'price' => 247.43,
            'description' => 'Blurryface is the highly anticipated second studio album from Twenty One Pilots. In the follow up to their successful debut Vessel, the band worked with famed producers Mike Elizondo, Mike Crossey, Tim Anderson and Ricky Reed to create a collection of dynamic and diverse songs.',
            'quantity' => 8,
            'deliverTime' => 6,
            'image' => 'imagesP/blurryface.jpg'
        ]);
        Product::create([
            'category_id' => 3,
            'brand_id' => 5,
            'name' => 'The Eminenm Show',
            'relase' => '2002-5-26',
            'price' => 1499.95,
            'description' => 'The Eminem Show is the fourth studio album by American rapper Eminem, released on May 28, 2002 by Shady Records, Aftermath Entertainment and Interscope Records. It was the best-selling album of 2002 in the United States, with sales of 7.6 million copies.',
            'quantity' => 23,
            'deliverTime' => 2,
            'image' => 'imagesP/theshow.jpg'
        ]);
        Product::create([
            'category_id' => 2,
            'brand_id' => 6,
            'name' => 'The Now Now',
            'relase' => '2018-6-29',
            'price' => 1829.32,
            'description' => 'The Now Now, 11 new songs from the world\'s most famous virtual act, produced by Gorillaz, with James Ford and Remi Kabaka, recorded at Studio 13, London.',
            'quantity' => 4,
            'deliverTime' => 6,
            'image' => 'imagesP/thenownow.jpg'
        ]);
        Product::create([
            'category_id' => 1,
            'brand_id' => 4,
            'name' => 'Toxicity',
            'relase' => '2001-9-4',
            'price' => 2670.46,
            'description' => 'Toxicity is the second studio album by the band System of a Down. Released on September 4, 2001 by American Recordings, this CD had great international success, selling more than 12 million copies worldwide, and made the band known around the world. It is part of the list of the 100 albums you must have before the end of the world, published in 2012 by Sony Music.',
            'quantity' => 23,
            'deliverTime' => 11,
            'image' => 'imagesP/toxicity.jpg'
        ]);
    }
}
